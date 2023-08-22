import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { objectType } from 'src/app/const';

@Component({
  selector: 'app-draggable-elem',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './draggable-elem.component.html',
  styleUrls: ['./draggable-elem.component.scss']
})
export class DraggableElemComponent {
  @Input('data') data!: objectType;
  @Input('false-position') falsePosition = true;
  @Input('displayCheckResult') displayCheckResult = false;
  @Output() onDragEventOver = new EventEmitter();

  isDragStarted = false;

  constructor(
  ) {}

  @HostListener('dragstart', ['$event'])
  handleDragStart(event: DragEvent) {
    this.isDragStarted = true;
    console.log("DRAG EVENT START:");
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
    this.isDragStarted = false;
  }

  private stringifyObject(){
    return JSON.stringify(this.data);
  }

}
