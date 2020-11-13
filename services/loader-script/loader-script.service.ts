import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

import { forkJoin, Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { ILoaderScriptLoadOptions, ILoaderScriptProps } from './loader-script.interface';

@Injectable({
  providedIn: 'root',
})
export class LoaderScriptService {
  private loadeds: {
    [url: string]: {
      subject: ReplaySubject<void>;
      element: HTMLScriptElement;
    };
  } = {};

  private renderer: Renderer2;
  constructor(@Inject(DOCUMENT) private document: Document, rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  remove(url: string) {
    if (this.loadeds[url]) {
      this.renderer.removeChild(this.document.head, this.loadeds[url].element);
      delete this.loadeds[url];
    }
  }

  load(src: string, options: ILoaderScriptLoadOptions = {}): Observable<void> {
    const loaded = this.loadeds[src];
    if (loaded) {
      return loaded.subject.asObservable();
    }

    const subject = new ReplaySubject<void>(1);
    const proprieties = { ...options, src };

    const script = this.createScript(proprieties, subject);

    this.loadeds[src] = { subject, element: script };
    return subject.asObservable();
  }

  loadBatch(toJoin: ILoaderScriptProps[]): Observable<void> {
    const batch = toJoin.map(({ src, ...options }) => this.load(src, options));
    return forkJoin(batch).pipe(map(() => {}));
  }

  private createScript(properties: ILoaderScriptProps, subject: ReplaySubject<void>) {
    const script: HTMLScriptElement = this.renderer.createElement('script');

    Object.keys(properties).forEach(propertyName => {
      this.renderer.setAttribute(script, propertyName, properties[propertyName]);
    });
    this.renderer.appendChild(this.document.head, script);
    this.renderer.listen(script, 'load', () => {
      subject.next();
      subject.complete();
    });
    this.renderer.listen(script, 'error', () => {
      subject.error(`Error loading script ${script.src}`);
    });

    return script;
  }
}
