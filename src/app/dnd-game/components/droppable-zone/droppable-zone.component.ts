import { AfterContentInit, Component, ComponentRef, ContentChildren, HostListener, Input, QueryList, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableElemComponent } from '../draggable-elem/draggable-elem.component';
import { objectType } from 'src/app/const';

@Component({
  selector: 'app-droppable-zone',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './droppable-zone.component.html',
  styleUrls: ['./droppable-zone.component.scss']
})
export class DroppableZoneComponent implements AfterContentInit {
  @Input('name') name!: string;
  @ContentChildren(DraggableElemComponent) childrens!: QueryList<DraggableElemComponent>;
  @ViewChild('containerRef', { static: true, read: ViewContainerRef }) containerRef!: ViewContainerRef;

  isDragEnter = false;
  childrenRefs : Array<ComponentRef<DraggableElemComponent>> = [];

  ngAfterContentInit(): void {
    for (const child of this.childrens) {
      const comp = this.containerRef.createComponent(DraggableElemComponent);
      comp.instance.data = child.data;
      this.childrenRefs.push(comp);
      comp.instance.onDragEventOver.subscribe( res => {
        this.childrenRefs = this.childrenRefs.filter( x => x != comp);
        comp.destroy();
      });
      this.containerRef.insert(comp.hostView);
    }
  }


  @HostListener('dragenter', ['$event'])
  handleDragEnter(event: DragEvent) {
    console.log("DRAG EVENT ENTER");
    this.isDragEnter = true;
  }

  @HostListener('dragleave', ['$event'])
  handleDragLeave(event: DragEvent) {
    console.log("DRAG EVENT LEAVE");
    this.isDragEnter = false;
  }

  @HostListener('dragover', ['$event'])
  handler(event: DragEvent) {
    event.preventDefault();
  }

  @HostListener('drop', ['$event'])
  handleDrop(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
    const comp = this.containerRef.createComponent(DraggableElemComponent);
    comp.instance.data = this.parseObject(event.dataTransfer!.getData('text/plain'));
    comp.instance.falsePosition = comp.instance.data.name != this.name;
    comp.instance.onDragEventOver.subscribe( res => {
      this.childrenRefs = this.childrenRefs.filter( x => x != comp);
      comp.destroy();
    });
    this.containerRef.insert(comp.hostView);
    this.childrenRefs.push(comp);
    this.isDragEnter = false;
  }

  checkResult() {
    for(const child of this.childrenRefs) {
      child.instance.displayCheckResult = true;
    }
  }

  private parseObject(objStr: string): objectType {
    return JSON.parse(objStr);
  }
}