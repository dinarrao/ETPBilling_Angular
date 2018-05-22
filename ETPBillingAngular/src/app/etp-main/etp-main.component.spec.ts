import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtpMainComponent } from './etp-main.component';

describe('EtpMainComponent', () => {
  let component: EtpMainComponent;
  let fixture: ComponentFixture<EtpMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtpMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtpMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
