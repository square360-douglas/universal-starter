import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultPageComponent } from './default-page/default-page.component';
import { CmsMenuComponent } from './cms-menu/cms-menu.component';
import {RouterModule} from '@angular/router';
import {DrupalService} from './drupal.service';
import {CmsRouterService} from './cms-router.service';

@NgModule({
  declarations: [
    DefaultPageComponent,
    CmsMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot([]),
  ],
  providers: [
      DrupalService,
      CmsRouterService
  ],
  exports: [
      DefaultPageComponent,
      CmsMenuComponent
  ]


})
export class CmsRouterModule { }
