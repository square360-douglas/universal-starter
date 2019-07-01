import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {TransferHttpCacheModule} from '@nguniversal/common';
import {CmsRouterModule} from './cms-router/cms-router.module';
import {HttpClientModule} from '@angular/common/http';
import {DefaultPageComponent} from './cms-router/default-page/default-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-universal-demo'}),
    RouterModule.forRoot([]),
    HttpClientModule,
    TransferHttpCacheModule,
    CmsRouterModule,
  ],
  providers: [
  ],
  entryComponents: [
    HomeComponent,
      DefaultPageComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
