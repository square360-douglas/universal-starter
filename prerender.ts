// Load zone.js for the server.
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import {readFileSync, writeFileSync, existsSync, mkdirSync} from 'fs';
import {join} from 'path';

import {enableProdMode} from '@angular/core';
// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Import module map for lazy loading
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';
import {renderModuleFactory} from '@angular/platform-server';
import {ROUTES} from './static.paths';

import {RouteResolver} from './sitemap';

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./server/main');

const BROWSER_FOLDER = join(process.cwd(), 'browser');

// Load the index.html file containing referances to your application bundle.
const index = readFileSync(join('browser', 'index.html'), 'utf8');

let previousRender = Promise.resolve();


const rr = new RouteResolver('http://hld.mcmac.localhost/sitemap.xml', ROUTES, 3);
rr.getAllRoutes().then(
    routes => {
      console.log('Routes', routes);
      // Iterate each route path
      routes.forEach(route => {

        console.log('Route: ', route);

        const fullPath = join(BROWSER_FOLDER, route);

        // Make sure the directory structure is there
        if (!existsSync(fullPath)) {
          mkdirSync(fullPath);
        }

        // Writes rendered HTML to index.html, replacing the file if it already exists.
        previousRender = previousRender.then(
        _ => {
            const options = {
                document: index,
                url: route,
                extraProviders: [
                    provideModuleMap(LAZY_MODULE_MAP)
                ]
            };
            console.log(options);
            return renderModuleFactory(AppServerModuleNgFactory, options);
            },
            e => console.log('Error in previousRender', e)
        ).then(
            (html) => {
                console.log('fullPath', fullPath);
                writeFileSync(join(fullPath, 'index.html'), html)
            },
            (e) => console.log('Couldn\'t render', e)
        );
      });
    },
    e => console.log('Error parsing routes', e)
);

