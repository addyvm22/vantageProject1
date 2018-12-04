/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
let template = require('./app.html');

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    '../sass/main.scss'
  ],
  template
})
export class AppComponent {
  public appLogo = 'assets/img/mean2-seed.png';
  public author = 'Annant Gupta'
  public name = 'Mean2-Seed';
  public url = 'https://Github.com/annantrouterabbit';

  constructor() {

  }

  ngOnInit() {
    //console.log('Initial App State', this.appState.state);
  }

}

/*
 * For help or questions please contact me at @datatype_void on twitter
 * or our chat on Slack at http://www.davidniciforovic.com/wp-login.php?action=slack-invitation
 */
