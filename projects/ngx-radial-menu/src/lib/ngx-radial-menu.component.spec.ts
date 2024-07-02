import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NgxRadialMenuComponent} from './ngx-radial-menu.component';

describe('NgxRadialMenuComponent', () => {
  let component: NgxRadialMenuComponent;
  let fixture: ComponentFixture<NgxRadialMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxRadialMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxRadialMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
