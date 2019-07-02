import {BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
//import {TransferHttpCacheModule} from '@nguniversal/common';
import {CmsRouterModule} from './cms-router/cms-router.module';
import {HttpClientModule} from '@angular/common/http';
import {DefaultPageComponent} from './cms-router/default-page/default-page.component';
import { TransferHttpModule, TransferHttpService } from '@gorniv/ngx-transfer-http';
import { PrebootModule } from 'preboot';
import { AboutPageComponent } from './about-page/about-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutPageComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-universal-demo'}),
    PrebootModule.withConfig({ appRoot: 'app-root' }),
    RouterModule.forRoot([]),
    HttpClientModule,
    // TransferHttpCacheModule,
    //BrowserTransferStateModule,
    TransferHttpModule,
    CmsRouterModule,
  ],
  providers: [
    TransferHttpService,
  ],
  entryComponents: [
    DefaultPageComponent,
    HomeComponent,
    AboutPageComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
