import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DndGameComponent } from './dnd-game.component';

describe('DndGameComponent', () => {
  let component: DndGameComponent;
  let fixture: ComponentFixture<DndGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DndGameComponent]
    });
    fixture = TestBed.createComponent(DndGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
