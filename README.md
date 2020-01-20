# Headless Drupal Angular Universal Starter

![Angular Universal](https://angular.io/generated/images/marketing/concept-icons/universal.png)

A POC for a starter repository for Angular Headless Drupal. 

**Note** This is built upon a clone of the repo [https://github.com/angular/universal-starter](universal-starter]). \
The parent repo is no longer maintained as of Sep 2019, no attempt has been made to update this POC since.    

This POC aims to investigate specific problems which are not necessarily relevant to all applications.
* Dynamic routing determined by the CMS
* Comparison of Dynamic & Static SSR  


## Drupal Setup

### Install & enable jsonapi extra modules

JSON API includes useful extras like overriding endpoints, default field includes.

    compozer require drupal/jsonapi_extras
    drush en jsonapi jsonapi_extras

### Install & enable rest menu modules

    compozer require drupal/rest_menu_tree
    drush en rest_menu_tree

Enable Menu Tree web service, grant permission to anonymous user.

Check menu available at [http://ypfs.mcmac.localhost/entity/menu/main/tree?_format=json](http://ypfs.mcmac.localhost/entity/menu/main/tree?_format=json)

NB rest_menu_items previously had problem with unpublished nodes.

### Routing & Subrequests

Install & enable subrequests & decoupled router

    compozer require drupal/subrequests
    drush en subrequests
    compozer require drupal/decoupled_router
    drush en decoupled_router

Grant issue subrequests permission to anonymous

Fix problems with subrequests validation:

Disable drupal page cache and patch subrequests. Apply patch #4 in [https://www.drupal.org/project/subrequests/issues/3029570](https://www.drupal.org/project/subrequests/issues/3029570)

There is potentially a better solution to this now, but this gets the job done for now.

### Install, enable & configure Sitemap

Used by dougsby to determins pages to be statically rendered

    compozer require drupal/simple_sitemap
    drush en simple_sitemap

## Application Setup

Setup Application Endpoints in `app.settings.ts`

    export class AppSettings {
        public static FULL_SITE = 'http://ypfs.mcmac.localhost/';
        public static API_ENDPOINT = 'http://ypfs.mcmac.localhost';
        public static MY_BASE_URL = 'http://localhost:4200';
    }

## Running application

### Development mode:

    ng serve

### Dynamic SSR mode:

    npm run dssr

### Static SSR mode:

Compile and prerender static pages

    npm run build:prerender

Launch application and proxy server using pm2

    npm run dougsby

### Remote rendering

Post anything to:

    http://localhost:4000/api/rerender

## Time to render

A basic page rendering the JSON object: ~3400 pages analysed in 7m21s == 0.15s per page


## Deploying
**Note**: To deploy your static site to a static hosting platform you will have to deploy the `dist/browser` folder, rather than the usual `dist`

## Universal "Gotchas"
Moved to [/angular/universal/blob/master/docs/gotchas.md](https://github.com/angular/universal/blob/master/docs/gotchas.md)

# License
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](/LICENSE)
