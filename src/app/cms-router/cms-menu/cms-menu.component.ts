import {Component, Input} from '@angular/core';

@Component({
  selector: 'cms-menu, [cmsMenu]',
  template: `
    <li *ngFor="let item of menu || []">
      <a routerLink="{{'/' + item.path}}">{{item.title}}</a>
      <div *ngIf="item.children.length > 0">
        <ul cmsMenu [menu]="item.children"></ul>
      </div>
    </li>
  `,
  styles: []
})
export class CmsMenuComponent {

  @Input() menu;

  getMenuArray(menu) {
    return this.menu ? Array.from( this.menu ) : [];
  }
}
