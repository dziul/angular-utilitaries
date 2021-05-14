import { Inject, Injectable } from '@angular/core';
import {
	ActivatedRoute,
	NavigationCancel,
	NavigationEnd,
	NavigationError,
	NavigationStart,
	Router,
	RouterEvent
} from '@angular/router';

import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { WINDOW, WindowAndGlobal } from '@core/tokens/window/window.token';

import { Routing, Routings, RoutingData } from './routing.interface';

type RoutingDataWithUrl = RoutingData<{ url: string }>;

@Injectable({ providedIn: 'root' })
class RoutingService {
	constructor(public router: Router, @Inject(WINDOW) private window: WindowAndGlobal) {}

	get loading(): Observable<boolean> {
		return this.router.events.pipe(
			filter(event =>
				[NavigationStart, NavigationError, NavigationCancel, NavigationEnd].some(c => event instanceof c)
			),
			map(event => event instanceof NavigationStart)
		);
	}

	get extrasState(): { [k: string]: unknown } | undefined {
		return this.router.getCurrentNavigation()?.extras?.state;
	}

	get navigationEnd(): Observable<RouterEvent> {
		return this.router.events.pipe(filter(event => event instanceof NavigationEnd)) as Observable<RouterEvent>;
	}

	get navigationStart(): Observable<RouterEvent> {
		return this.router.events.pipe(filter(event => event instanceof NavigationStart)) as Observable<RouterEvent>;
	}

	get currentActivatedRoute(): ActivatedRoute {
		let lastRoute = this.router.routerState.root;

		while (lastRoute.firstChild) {
			lastRoute = lastRoute.firstChild;
		}

		return lastRoute;
	}

	get currentData(): RoutingDataWithUrl {
		const { data } = this.currentActivatedRoute.snapshot;
		const { url } = this.router;
		return { ...data, url };
	}

	get breadcrumb(): RoutingDataWithUrl[] {
		let lastRoute = this.router.routerState.root;
		const urls: string[] = [];
		const dataList: RoutingDataWithUrl[] = [];

		while (lastRoute.firstChild) {
			lastRoute = lastRoute.firstChild;

			let url = lastRoute.snapshot.url.toString();
			let dataPop: RoutingDataWithUrl = {};
			if (!url) {
				url = urls.pop() || '';
				dataPop = dataList.pop() || {};
			}
			urls.push(url);
			url = `/${urls.join('/')}`;
			const { data } = lastRoute.snapshot;

			dataList.push({ ...dataPop, ...data, url });
		}

		return dataList;
	}

	redirectToUrl(url: string, target = '_self'): void {
		this.window.open(url, target);
	}
}

export { Routing, Routings, RoutingService };
