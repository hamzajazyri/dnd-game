import { Component, Input, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropZoneResult, objectJsonType } from '../const';
import { DroppableZoneComponent } from './components/droppable-zone/droppable-zone.component';
import { DraggableElemComponent } from './components/draggable-elem/draggable-elem.component';

@Component({
  selector: 'app-dnd-game',
  standalone: true,
  imports: [CommonModule, DroppableZoneComponent, DraggableElemComponent],
  templateUrl: './dnd-game.component.html',
  styleUrls: ['./dnd-game.component.scss']
})
export class DndGameComponent {
  @Input({alias: 'object-data', required: true}) objectData!: objectJsonType;

  @ViewChildren(DroppableZoneComponent) droppableZones!: QueryList<DroppableZoneComponent>;

  get objectNames() {
    return [...new Set(this.objectData.objects.map( x => x.name))];
  }
  result!: DropZoneResult;
  showResult = false;

  checkResult() {
    this.result = {elementsCount: 0, errorsCount: 0};
    for(const dropzone of this.droppableZones) {
      const dropZoneResult = dropzone.checkResult();
      this.result.elementsCount += dropZoneResult.elementsCount;
      this.result.errorsCount += dropZoneResult.errorsCount;
    }
    this.showResult = true;
  }
}
