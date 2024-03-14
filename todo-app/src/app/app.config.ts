import { ApplicationConfig, isDevMode } from "@angular/core";
import { provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { provideEffects } from "@ngrx/effects";

import { todoStore } from "./todo/store/todo.reducers";
import { TodoEffects } from "./todo/store/todo.effects";
import { provideHttpClient } from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(
      { todo: todoStore },
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true
        }
      }
    ),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(TodoEffects),
    provideHttpClient()
  ]
};
