import { Component, OnInit } from '@angular/core';
import {switchMap} from 'rxjs/internal/operators/switchMap';
import {ActivatedRoute} from '@angular/router';
import {DrupalService} from '../drupal.service';
import {map} from 'rxjs/internal/operators';

@Component({
  selector: 'app-default-page',
  template: `
    <p style="margin-top:5rem;color:darkgrey">This is <em>default page</em>.</p>
    <pre>{{jsonResource|json}}</pre>
  `,
  styles: []
})
export class DefaultPageComponent implements OnInit {


  public jsonApiResponse: any;
  public jsonResource: any;
  public data: any;
  public entity: any;

  constructor(
      private activeRoute: ActivatedRoute,
      private drupal: DrupalService,

  ) { }

  /**
   * On Init retrieve the data
   */
  ngOnInit() {

    this.activeRoute.url.pipe(
        // convert our url segments into a path
        map(url => url.join('/')),
        // Using the path, get the JSONAPI
        switchMap(url => this.drupal.getJSONAPIFromAlias(url)),
    ).subscribe(
        data => this.processJsonApiResponse(data),
        err => console.log('Error loading JSON API data', err),
        () => 'JSONAPI Load done'
    );
  }

  processJsonApiResponse(data: any) {
    this.jsonApiResponse = data;
    console.log('JSONAPI response');
    const jsonResource = JSON.parse(data['resolvedResource#uri{0}'].body);
    if (jsonResource) {
      // console.log(jsonResource);
      this.jsonResource = jsonResource;
      this.data = jsonResource.data;
    }
    else {
      console.log('Can\'t decode JSONAPI');
    }
  }


  /**
   * Queries the current JsonApiResource for an entity in the includes.
   * Just a temporary convencience.
   */
  getIncludedEntity(id: string) {
    return this.jsonResource.included.find(item => item.id === id) || false;
  }

}
