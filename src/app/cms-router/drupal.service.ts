import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppSettings} from '../app.settings';
import {TransferHttpService} from '@gorniv/ngx-transfer-http';

@Injectable({
  providedIn: 'root'
})
export class DrupalService {

  constructor(
      // private http: HttpClient,
      private http: TransferHttpService,
  ) { }


  /**
   * Given an alias will use subrequests to resolve the alias to an entity
   * and retrieve the JSONAPI resource.
   */
  getJSONAPIFromAlias( alias: string, includes = [] ) {

    //
    // includes = [
    //   'fields[article]=title,body&include=author',
    //   'fields[recipes]=title,summary&include=author',
    //   'fields[alpha]&include=ref_node'
    // ];

    const routeURI = '/router/translate-path?path=/' + alias + '&_format=json';
    let universalViewUri = '{{router.body@$.jsonapi.individual}}';

    if (includes.length) {
      universalViewUri += '?' + includes.join('&');
    }

    // console.log(universalViewUri);

    const blueprint = [
      {
        requestId: 'router',
        uri: routeURI,
        action: 'view'
      },
      {
        action: 'view',
        requestId: 'resolvedResource',
        uri: universalViewUri,
        headers: {
          'Content-Type': 'application/vnd.api+json'
        },
        waitFor: [
          'router'
        ]
      },
    ];

    const blueprintString = JSON.stringify(blueprint);

    const endpoint = AppSettings.API_ENDPOINT + '/subrequests?_format=json';

    // console.log( 'JSON API:');
    // console.log(endpoint);

    return this.http.post(endpoint, blueprintString);
  }

}
