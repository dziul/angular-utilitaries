import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private initialCount = 0;
  private requestCount = this.initialCount;

  private request = new BehaviorSubject<number>(this.initialCount);

  constructor() {}

  start() {
    this.request.next(++this.requestCount);
  }

  stop() {
    this.request.next(--this.requestCount);
  }

  get show(): Observable<boolean> {
    return this.request.pipe(map(value => value > 0));
  }
}
