import {TestBed} from '@angular/core/testing';

import {NgxRadialMenuService} from './ngx-radial-menu.service';

describe('NgxRadialMenuService', () => {
  let service: NgxRadialMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxRadialMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
