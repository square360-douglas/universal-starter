import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-page',
  template: `
    <h1>About the project</h1>
    <p>It's a belter.</p>
  `,
  styles: []
})
export class AboutPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
