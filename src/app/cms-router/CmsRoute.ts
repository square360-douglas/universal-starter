import {Data, LoadChildren, ResolveData, Route, Routes, RunGuardsAndResolvers, UrlMatcher} from '@angular/router/src/config';
import {Type} from '@angular/core';

/**
 * Extend original angular route with extra configuration to hold title & resource.
 * NB: Probably better to separate and use a service to resolve mapping resource to route?
 */
export class CmsRoute implements Route {
  path?: string;
  pathMatch?: string;
  matcher?: UrlMatcher;
  component?: Type<any>;
  redirectTo?: string;
  outlet?: string;
  canActivate?: any[];
  canActivateChild?: any[];
  canDeactivate?: any[];
  canLoad?: any[];
  data?: Data;
  resolve?: ResolveData;
  children?: Routes;
  loadChildren?: LoadChildren;
  runGuardsAndResolvers?: RunGuardsAndResolvers;

  // New properties remove this! this should go in data
  resource?: {
    url: string,
    params?: any
  };

}

export declare type CmsRoutes = CmsRoute[];
