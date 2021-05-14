import { Route } from '@angular/router';

type Data = {
	title: string;
};

type SchemaData = { [k: string]: unknown };
type SchemaDataGeneric<T> = {
	[k in keyof T]: T[k];
};

export type RoutingData<T = SchemaData> = Partial<SchemaDataGeneric<T> & Data>;
export interface Routing<T = SchemaData> extends Route {
	path: string;
	data?: RoutingData<T>;
	children?: Routings;
}
export type Routings<T = SchemaData> = Routing<T>[];
