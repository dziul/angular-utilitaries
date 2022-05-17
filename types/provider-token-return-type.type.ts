
import { ProviderToken } from '@angular/core';

export type ProviderTokenReturnType<T> = T extends ProviderToken<infer U>
  ? U
  : T;
