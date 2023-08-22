import { Component, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cord, objectType } from 'src/app/const';

@Component({
  selector: 'app-draggable-elem',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './draggable-elem.component.html',
  styleUrls: ['./draggable-elem.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DraggableElemComponent {
  @Input('data') data!: objectType;
  @Input('false-position') falsePosition = true;
  @Input('displayCheckResult') displayCheckResult = false;
  @Output() onDragEventOver = new EventEmitter();

  isDragStarted = false;
  initPosition!: Cord;
  offset!: Cord;
  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  @HostListener('dragstart', ['$event'])
  handleDragStart(event: DragEvent) {
    this.isDragStarted = true;
    console.log("DRAG EVENT START:");

    this.initPosition = { x: event.clientX-event.offsetX, y: event.clientY-event.offsetY };
    this.offset = {x: event.offsetX, y: event.offsetY};

    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', this.stringifyObject());
    }
  }

  @HostListener('dragend', ['$event'])
  handleDragOver(event: DragEvent) {
    console.log("event.dataTransfer");
    const dropped = event.dataTransfer!.dropEffect != 'none';

    if(dropped) {
      this.onDragEventOver.emit();
      return;
    }
    this.animateAndDestoryCopyNode(event);
    this.isDragStarted = false;
  }

  private animateAndDestoryCopyNode(event: DragEvent) {
    const copyElement = this.el.nativeElement.cloneNode(true);
    const endPosition = { x: event.clientX-this.offset.x, y: event.clientY-this.offset.y };

    this.renderer.appendChild(document.querySelector("body")!, copyElement);

    this.renderer.setStyle(copyElement, 'left', `${endPosition.x}px`);
    this.renderer.setStyle(copyElement, 'top', `${endPosition.y}px`);
    this.renderer.addClass(copyElement, 'draggable-animate');

    setTimeout( () => {
      this.renderer.setStyle(copyElement, 'left', `${this.initPosition.x}px`);
      this.renderer.setStyle(copyElement, 'top', `${this.initPosition.y}px`);
      this.renderer.setStyle(copyElement, 'opacity', `.5`);
    },0);

    setTimeout( () => {
      this.renderer.removeChild(document.querySelector("body")!, copyElement);
    }, 500);
  }

  private stringifyObject(){
    return JSON.stringify(this.data);
  }

}
