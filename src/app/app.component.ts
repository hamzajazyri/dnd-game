import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DndGameComponent } from './dnd-game/dnd-game.component';
import { objectJson, objectJsonType } from './const';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DndGameComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'dragAndDrop-game';

  obj : objectJsonType = objectJson;
}
