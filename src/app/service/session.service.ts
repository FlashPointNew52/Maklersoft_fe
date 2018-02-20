/**
 * Created by Aleksandr on 24.01.17.
 */

import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {AsyncSubject} from "rxjs/AsyncSubject";

import {ConfigService} from './config.service';

import {Account} from "../entity/account";
import {User} from "../entity/user";
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class SessionService {

    RS: String;

    authorized: Observable<boolean>;
    msg: Observable<string>;
    user: Observable<User>;
    account: Observable<Account>;

    _authorized: BehaviorSubject<boolean>;
    _msg: BehaviorSubject<string>;
    _user: BehaviorSubject<User>;
    _account: BehaviorSubject<Account>;

    private dataStore = {
        authorized: false,
        msg: "",
        user: null,
        account: null
    }

    constructor(private _configService: ConfigService, private _http: Http) {
        this.RS = this._configService.getConfig().RESTServer + '/session/';

        this.dataStore.authorized = false;
        this.dataStore.user = null;
        this.dataStore.account = null;

        this._authorized = <BehaviorSubject<boolean>>new BehaviorSubject(false);
        this.authorized = this._authorized.asObservable();

        this._msg = <BehaviorSubject<string>>new BehaviorSubject("");
        this.msg = this._msg.asObservable();

        this._user = <BehaviorSubject<User>>new BehaviorSubject(null);
        this.user = this._user.asObservable();

        this._account = <BehaviorSubject<Account>>new BehaviorSubject(null);
        this.account = this._account.asObservable();

    };

    getUser() {
        return this.dataStore.user;
    }

    getAccount() {
        return this.dataStore.account;
    }

    login(accountName: string, login: string, password: string) {
        console.log('login');

        var _endpointUrl = this.RS + 'login'

        var data_str = JSON.stringify({
            account: accountName,
            login: login,
            password: password
        });

        this._http.post(_endpointUrl, data_str, { withCredentials: true })
            .map(res => res.json())
            .subscribe(
                data => {
                    if (data.result == "OK") {

                        this.dataStore.authorized = true;
                        this._authorized.next(this.dataStore.authorized);

                        this.dataStore.msg = "logged in";
                        this._msg.next(this.dataStore.msg);

                        this.dataStore.user = data.user;
                        this._user.next(this.dataStore.user);

                        this.dataStore.account = data.account;
                        this._account.next(this.dataStore.account);

                    } else {

                        this.dataStore.authorized = false;
                        this._authorized.next(this.dataStore.authorized);

                        this.dataStore.msg = data.msg;
                        this._msg.next(this.dataStore.msg);

                        /*
                        this.dataStore.user = data.user;
                        this._user.next(Object.assign({}, this.dataStore).user);

                        this.dataStore.account = data.account;
                        this._account.next(Object.assign({}, this.dataStore).account);
                        */
                    }
                },
                err => console.log(err)
            );
    }

    logout() {
        console.log('logout');

        var _endpointUrl = this.RS + 'logout';

        this._http.post(_endpointUrl, "", { withCredentials: true })
            .map(res => res.json())
            .subscribe(
                data => {
                    this.dataStore.authorized = false;
                    this._authorized.next(this.dataStore.authorized);

                    this.dataStore.msg = "logged out";
                    this._msg.next(this.dataStore.msg);
                }
            );

    }

    check() {
        console.log('check');

        var _endpointUrl = this.RS + 'check';

        this._http.get(_endpointUrl, { withCredentials: true })
            .map(res => res.json())
            .subscribe(
                data => {
                    if (data.result == "OK") {

                        this.dataStore.authorized = true;
                        this._authorized.next(this.dataStore.authorized);

                        this.dataStore.msg = "logged in";
                        this._msg.next(this.dataStore.msg);

                        this.dataStore.user = data.user;
                        this._user.next(this.dataStore.user);

                        this.dataStore.account = data.account;
                        this._account.next(this.dataStore.account);

                    } else {

                        this.dataStore.authorized = false;
                        this._authorized.next(this.dataStore.authorized);

                    }
                },
                err => console.log(err)
            );
    }
}
