import { Injectable } from '@angular/core';
import {DefaultPageComponent} from './default-page/default-page.component';
import {CmsMenuItem} from './CmsMenuItem';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {CmsRoute, CmsRoutes} from './CmsRoute';

@Injectable({
  providedIn: 'root'
})
export class CmsRouterService {


  protected routes: CmsRoutes;
  protected menu: Array<CmsMenuItem> = [];

  constructor(
      protected http: HttpClient,
      // protected http: TransferHttpService,
      protected router: Router,

  ) {}

  getMenu() {
    return this.menu;
  }

  /**
   * Save a copy
   */
  resetRoutes( routes: CmsRoutes ) {
    this.routes = routes;
    this.router.resetConfig( routes );
  }

  getAsyncRoutes( url: string, options: any = {} ) {

    this.http.get<any>(url).subscribe(
        data => {
          // Transform the retrieved menu info into an iterable entity suitable
          // for generating nav content
          this.processMenu(data);
          // Extract ng routes from the menu data to match the menu items
          this.transformMenuIntoRoutes(data, options);
          // Apply our new routes to the routing system
          // console.log('Async Routes', this.routes);
          console.log('Got Async Routes');

          // this.http.get(url).subscribe(() => console.log('got stuff again'));
          this.resetRoutes(this.routes);
        }
    );
  }

  processMenu(newMenu: any) {
    this.menu = [];
    Object.keys(newMenu).forEach( key => {
      this.processMenuItem(newMenu[key], this.menu);
    });
    // console.log(this.menu);
  }

  /**
   * Process our async menu object to create an iterable menu object with which to create links in the UI.
   */
  processMenuItem( menuItem: any, parent: Array<any> ) {

    const myMenuItem: CmsMenuItem = {
      title: menuItem.link.title,
      path:  this.getAliasFromMenuItem(menuItem),
      children: []
    };

    parent.push(myMenuItem);
    if (menuItem.has_children) {
      menuItem.subtree.forEach( (item, key) => {
        if ( typeof menuItem.subtree[key] === 'object') {
          this.processMenuItem(menuItem.subtree[key], myMenuItem.children);
        }
      });
    }
  }

  getResourceFromMenuItem( menuItem: any) {
    let path;
    if (menuItem.link.route_name === 'entity.node.canonical') {
      path = 'node/' + menuItem.link.route_parameters.node;
    }
    else {
      path = menuItem.link.url;
    }
    return path;
  }

  getAliasFromMenuItem( menuItem: any) {
    let path = menuItem.link.url;
    if (path.indexOf('/') === 0) {
      path = path.substr(1);
    }
    return path;
  }

  transformMenuIntoRoutes(menu, options: any = {}) {
    // Create a new route list
    const routes: CmsRoutes = [];

    for ( const key in menu ) {
      this.transformSubMenu( menu[key], routes, options );
    }
    // console.log(menu);

    this.routes = routes;
  }

  transformSubMenu( submenu, parent: CmsRoutes, options: any = {} ) {

    let resource = this.getResourceFromMenuItem(submenu);
    const alias = this.getAliasFromMenuItem(submenu);

    if ( options.defaultBase ) {
      resource = options.defaultBase + '/' + resource;
    }
    const route: CmsRoute = {
      path: alias,
      // title: submenu.title,
      data: {
        resource: {
          url: resource,
        },
      }
      // children: []
    };

    if ( options.params ) {
      route.data.resource.params = options.params;
    }

    if ( !submenu.component ) {
      route.component = DefaultPageComponent;
    }
    parent.push( route );

    // If menu item has any children, we process them
    if (submenu.has_children) {
      submenu.subtree.forEach((item) => {
        if ( typeof item === 'object') {
          // For now we add everything into a flat array of routes
          this.transformSubMenu( item, parent, options );
          // Later we should add hierarchy
          // this.transformSubMenu( item, route.children, options );
        }
      });
    }

    // Object.keys(submenu).forEach((key) => {
    //   const item = submenu[key];
    //   if ( typeof item === 'object') {
    //     this.transformSubMenu( item, route.children );
    //   }
    // });
  }

  /**
   * Converts our augmented router config into a list of
   * menu items. NB depreciated
   */
  getMenuFromRoutes() {

    const routerConfig = this.router.config as CmsRoutes;
    const menu = [];

    routerConfig.forEach( (route) => {
      this.getMenuItemFromRoutes(menu, route);
    });

    return menu;
  }

  getMenuItemFromRoutes( menuParent, route ) {

    const menuItem = {
      path: route.path,
      title: route.title,
      children: []
    };

    menuParent.push(menuItem);

    if (route.children && route.children.length) {

      menuItem.children = [];

      route.children.forEach( childRoute => {
        this.getMenuItemFromRoutes(menuItem.children, childRoute);
      });
    }

  }

}
