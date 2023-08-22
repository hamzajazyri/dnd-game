import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DroppableZoneComponent } from './droppable-zone.component';

describe('DroppableZoneComponent', () => {
  let component: DroppableZoneComponent;
  let fixture: ComponentFixture<DroppableZoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DroppableZoneComponent]
    });
    fixture = TestBed.createComponent(DroppableZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
