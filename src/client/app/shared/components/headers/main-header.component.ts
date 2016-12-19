import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../app.service';
import { AuthService } from '../../services';

@Component({
    selector: 'main-header',
    templateUrl: './main-header.component.html'
})

export class MainHeader implements OnInit {
    public appLogo = '/assets/img/mean2-seed.png';
    constructor(private appState: AppState, private authService: AuthService) {
    }
    ngOnInit() {

    }

    logout() {
        this.authService.logout().map(res => res.json)
            .subscribe((res) => {
                console.log(res);
            }, (err) => {
                console.error(err);
            });
    }
}