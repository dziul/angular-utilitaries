import { Injectable } from '@angular/core';

import { BehaviorSubject, of } from 'rxjs';
import { delay, startWith, switchMap, tap } from 'rxjs/operators';

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

  private reset() {
    this.request.next(this.initialCount);
  }

  get show() {
    return this.request.pipe(
      switchMap(value => {
        if (value === 0) {
          return of(false);
        } else {
          return of(false).pipe(
            delay(10000),
            tap(() => {
              console.error('loading screen closed automatically for more than 10s being active');
              this.reset();
            }),
            startWith(true)
          );
        }
      })
    );
  }
}
