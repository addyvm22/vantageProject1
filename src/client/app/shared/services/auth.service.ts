import { AppState } from '../../app.service';
import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';

const HEADER = {
    headers: new Headers({
        'Content-Type': 'application/json'
    })
};

const ROUTE_URI = '/api/auth/';

// `Injectable` is usually used with `Dart` metadata
// generation; it has no special meaning within `TypeScript`
// This makes sure `TypeScript` emits the needed metadata
// Reference : http://blog.thoughtram.io/angular/2015/09/17/resolve-service-dependencies-in-angular-2.html
@Injectable()
export class AuthService {

    redirectUrl: string;

    // The `public` keyword denotes that the constructor parameter will
    // be retained as a field.
    // Reference: https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#336-members
    // Add `Http` type annotation to the `http` function argument
    // Type annotations in TypeScript are used to record the
    // intended contract of the function or variable.
    // Reference: https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#3-types
    // Here we intend the constructor function to be called with the
    // `Http` parameter
    constructor(public http: Http, private appState: AppState) {
        this.authenticate().subscribe((res) => {
            if (res === 0) {
                this.appState.set('isAuthenticated', 0);
            } else {
                this.appState.set('isAuthenticated', 1);
                this.appState.set('userData', res);
            }
        });
    }

    // Check whether a user is logged in or not
    authenticate() {
        return this.http.get(`${ROUTE_URI}authenticate`,
            HEADER)
            .map(res => res.json());
    }

    // Get user session data object from server if user is logged in
    getSessionData() {
        return this.http.get(`${ROUTE_URI}session`,
            HEADER)
            .map(res => res.json());
    }

    login(user) {

        return this.http.post(`${ROUTE_URI}login`,
            JSON.stringify(user),
            HEADER)
            .map((res) => {
                let data = res.json();
                this.appState.set('isAuthenticated', 1);
                this.appState.set('userData', data);
                return data;
            })
    }

    logout() {

        this.appState.set('isAuthenticated', false);
        this.appState.set('userData', {});

        return this.http.post(`${ROUTE_URI}logout`,
            HEADER);
    }

    register(user) {

        return this.http.post(`${ROUTE_URI}register`,
            JSON.stringify(user),
            HEADER);
    }
}
