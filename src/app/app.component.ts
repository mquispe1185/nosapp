import { Component } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { Spinkit } from 'ng-http-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NOS-app';
  public spinkit = Spinkit;
  constructor(public tokenService: AngularTokenService,
                    ) {
  }
}
