import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlusSignPipeComponent } from './plus-sign-pipe.component';

describe('PlusSignPipeComponent', () => {
  let component: PlusSignPipeComponent;
  let fixture: ComponentFixture<PlusSignPipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlusSignPipeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlusSignPipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
