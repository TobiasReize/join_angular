import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastMsgComponent } from './toast-msg.component';

describe('ToastMsgComponent', () => {
  let component: ToastMsgComponent;
  let fixture: ComponentFixture<ToastMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastMsgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToastMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
