# LoaderScriptService

Serviço para executar dependências de scripts (externos) quando são carregados.

> baseado no AMD (_Asynchronous module definition_)

| método | descrição |
| --- | --- |
| `load(src: string, options: ILoaderScriptLoadOptions = {}): Observable<void>` | emite quando o script é carregado e completa |
| `loadBatch(toJoin: ILoaderScriptProps[]): Observable<void>` |  emite apenas quando todos os scripts são carregados e completa |
| `remove(url: string):void` | remove script carregado |

