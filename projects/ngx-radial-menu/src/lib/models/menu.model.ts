import {Observable} from "rxjs";

export interface Menu extends Object {
  observables: Observable<Function>[];
  show: Function;
  hide: Function;
  data: any;
}
