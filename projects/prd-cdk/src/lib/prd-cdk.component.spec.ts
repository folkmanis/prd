import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrdCdkComponent } from './prd-cdk.component';

describe('PrdCdkComponent', () => {
  let component: PrdCdkComponent;
  let fixture: ComponentFixture<PrdCdkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrdCdkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrdCdkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
