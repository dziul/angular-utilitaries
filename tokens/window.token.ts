import { InjectionToken } from '@angular/core';

type WindowAndGlobalThis = Window & typeof globalThis;

const WINDOW = new InjectionToken<WindowAndGlobalThis>('Window Object', {
  providedIn: 'root',
  factory: () => window,
});

  
  export { WindowAndGlobalThis, WINDOW }
