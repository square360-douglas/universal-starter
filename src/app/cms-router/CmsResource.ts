import {HttpParams} from '@angular/common/http';

/**
 * Defines a resource. url and any associated get/post parameters
 */
export class CmsResource {
  url: string;
  params?: HttpParams;
}
