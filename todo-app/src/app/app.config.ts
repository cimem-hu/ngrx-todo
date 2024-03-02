import { ApplicationConfig, isDevMode } from "@angular/core";
import { provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";

import { todoStore } from "./todo/store/todo.reducers";

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
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
  ]
};
