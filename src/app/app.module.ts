import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {NgxsModule} from "@ngxs/store";
import {AuthState} from "./redux/auth/auth.state";
import {LoadingState} from "./redux/loading/loading.state";
import {environment} from "../environments/environment";
import {NgxsStoragePluginModule} from "@ngxs/storage-plugin";
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";
import {AuthGuard} from "./utils/guards/auth.guard";
import {NoAuthGuard} from "./utils/guards/notauth.guard";
import {AuthInterceptor} from "./utils/interceptors/auth.interceptor";
import {LicenseManager} from "ag-grid-enterprise";


LicenseManager.setLicenseKey('');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    NgxsModule.forRoot([
      AuthState,
      LoadingState,
    ], {developmentMode: !environment.production}),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({
      key: ['auth.token', 'auth.user'],
    }),
  ],
  providers: [
    AuthGuard,
    NoAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
