import {ApplicationRef, Component} from '@angular/core';
import {CmsRoutes} from './cms-router/CmsRoute';
import {HomeComponent} from './home/home.component';
import {DefaultPageComponent} from './cms-router/default-page/default-page.component';
import {AppSettings} from './app.settings';
import {CmsRouterService} from './cms-router/cms-router.service';
import {AboutPageComponent} from './about-page/about-page.component';

@Component({
  selector: 'app-root',
  template: `
  <div class="app-container">
    <h1>Angular Universal Demo utilizing Angular & Angular CLI</h1>
    <nav>
      <ul cmsMenu [menu]="getMenuObject()"></ul>
    </nav>

    <div class="router-container">
      <router-outlet></router-outlet>
    </div>
  </div>
  `,
  styles: [`
    :host {
      background: #f1f1f1;
      font-family: Roboto,"Helvetica Neue Light","Helvetica Neue",Helvetica,Arial,"Lucida Grande",sans-serif;
      font-display: swap;
    }
    .nav-links {
      background: #008591;
    }
    .nav-links a {
      color: #fff;
      display: inline-block;
      padding: 1rem;
      margin-right: 3rem;
      text-decoration: none;
      font-weight: bold;
      letter-spacing: 0.1rem;
    }
    .router-container {
      border: 0.5rem #00afc4 solid;
      padding: 2rem;
    }
  `]
})
export class AppComponent {
  constructor(
      private routingService: CmsRouterService,
      appRef: ApplicationRef,
  ) {
    this.initRoutes();

    // appRef.isStable.subscribe(s => {
    //   console.log('Stable', s);
    // });
  }


  initRoutes() {
    // Set up base routes
    this.routingService.resetRoutes(this.baseRoutes());

    // Fetch dynamic routes
    this.addAsyncRoutes();
  }

  /**
   * Simulate loading dynamic routes
   * Todo: We should combine these with the default routes defined when the
   * application boots. If the path exists in the default routeConfig, we
   * maintain the predefined component and options. If the path is not defined
   * in the default routes, we set DynamicPageComponent and the appropriate
   * resource to be loaded.
   */
  baseRoutes() {
    const routes: CmsRoutes = [
      {
        path: '', redirectTo: 'home', pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'about',
        component: AboutPageComponent,
      },
      {path: '**', component: DefaultPageComponent},
    ];
    return routes;
  }

  addAsyncRoutes() {

    const menuResource = AppSettings.API_ENDPOINT + '/entity/menu/main/tree?_format=json';

    this.routingService.getAsyncRoutes(menuResource, {
      defaultBase: AppSettings.API_ENDPOINT,
      params: {
        _format: 'json'
      }
    });
  }

  getMenuObject() {
    return this.routingService.getMenu();
  }
}
