import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraggableElemComponent } from './draggable-elem.component';

describe('DraggableElemComponent', () => {
  let component: DraggableElemComponent;
  let fixture: ComponentFixture<DraggableElemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DraggableElemComponent]
    });
    fixture = TestBed.createComponent(DraggableElemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
