import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

import {AsyncSubject} from "rxjs/AsyncSubject";

import {ConfigService} from './config.service';
import {SessionService} from "./session.service";

import {User} from '../entity/user';



@Injectable()
export class UserService {

    RS: String = "";

    cache: any = {};

    constructor(private _http: Http, private _configService: ConfigService, private _sessionService: SessionService) {
        this.RS = this._configService.getConfig().RESTServer + '/api/v1/user/';
    };

    listCached(role: string, superiorId: number, searchQuery: string) {
        return this.cache[role + superiorId + searchQuery];
    }

    list(role: string, superiorId: number, searchQuery: string) {
        console.log('user list');

        var query = [];

        var user: User = this._sessionService.getUser();
        var ret_subj = <AsyncSubject<User[]>>new AsyncSubject();

        if (this.cache[role + superiorId + searchQuery] == null) {

            query.push("accountId=" + user.accountId);

            if (role) {
                query.push("role=" + role);
            }
            if (superiorId) {
                query.push("superiorId=" + superiorId.toString());
            }
            if (searchQuery) {
                query.push("searchQuery=" + searchQuery);
            }


            var _resourceUrl = this.RS + 'list?' + query.join("&");


            this._http.get(_resourceUrl, {withCredentials: true})
                .map(res => res.json()).subscribe(
                data => {
                    var users: User[] = data.result;

                    this.cache[role + superiorId + searchQuery] = users;

                    console.log(this.cache);

                    ret_subj.next(users);
                    ret_subj.complete();
                },
                err => console.log(err)
            );
        } else {
            var users = this.cache[role + superiorId + searchQuery];
            ret_subj.next(users);
            ret_subj.complete();
        }

        return ret_subj;
    }

    listX(accountId: number, role: string, superiorId: number, searchQuery: string) {
        console.log('user list');

        var query = [];


        if (accountId) {
            query.push("accountId=" + accountId);
        }
        if (role) {
            query.push("role=" + role);
        }
        if (superiorId) {
            query.push("superiorId=" + superiorId.toString());
        }
        if (searchQuery) {
            query.push("searchQuery=" + searchQuery);
        }


        var _resourceUrl = this.RS + 'list?' + query.join("&");

        var ret_subj = <AsyncSubject<User[]>>new AsyncSubject();

        this._http.get(_resourceUrl, { withCredentials: true })
            .map(res => res.json()).subscribe(
                data => {
                    var users: User[] = data.result;

                    ret_subj.next(users);
                    ret_subj.complete();
                },
                err => console.log(err)
            );

        return ret_subj;
    }

    get(userId: number) {
        console.log('user get');

        var _resourceUrl = this.RS + 'get/' + userId;

        var ret_subj = <AsyncSubject<User>>new AsyncSubject();

        this._http.get(_resourceUrl, { withCredentials: true })
            .map(res => res.json()).subscribe(
                data => {
                    var u: User = data.result;

                    // TODO: pass copy????
                    ret_subj.next(u);
                    ret_subj.complete();
                },
                err => console.log(err)
            );

        return ret_subj;
    }

    save(user: User) {
        console.log('user save');

        var _user: User = this._sessionService.getUser();
        user.accountId = _user.accountId;


        var _resourceUrl = this.RS + 'save'

        var ret_subj = <AsyncSubject<User>>new AsyncSubject();

        var data_str = JSON.stringify(user);

        this._http.post(_resourceUrl, data_str, { withCredentials: true })
            .map(res => res.json()).subscribe(
                data => {

                    var u: User = data.result;

                    // TODO: pass copy????
                    ret_subj.next(u);
                    ret_subj.complete();
                },
                err => {
                    console.log(err)
                }
            );

        return ret_subj;
    }

    saveX(user: User) {
        console.log('user save');

        var _resourceUrl = this.RS + 'save'

        var ret_subj = <AsyncSubject<User>>new AsyncSubject();

        var data_str = JSON.stringify(user);

        this._http.post(_resourceUrl, data_str, { withCredentials: true })
            .map(res => res.json()).subscribe(
            data => {

                var u: User = data.result;

                // TODO: pass copy????
                ret_subj.next(u);
                ret_subj.complete();
            },
            err => {
                console.log(err)
            }
        );

        return ret_subj;
    }
}
