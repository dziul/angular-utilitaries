export interface ILoaderScriptLoadOptions
  extends Partial<Pick<HTMLScriptElement, 'id' | 'async' | 'defer'>> {
  class?: string;
}

export interface ILoaderScriptProps extends ILoaderScriptLoadOptions {
  src: string;
}

export interface ILoaderScriptLoad {
  src: string;
  options: ILoaderScriptLoadOptions;
}
