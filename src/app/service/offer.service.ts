import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

import {ConfigService} from './config.service';

import {Offer} from '../entity/offer';
import {AsyncSubject} from "rxjs/AsyncSubject";
import {GeoPoint} from "../class/geoPoint";
import {User} from "../entity/user";
import {SessionService} from "./session.service";
import {ListResult} from "../class/listResult";


export enum OfferSource {
    LOCAL = 1,
    IMPORT
}

@Injectable()
export class OfferService {

    RS: String = "";


    constructor(private _http: Http, private _configService: ConfigService, private _sessionService: SessionService) {
        this.RS = this._configService.getConfig().RESTServer + '/api/v1/offer/';
    };

    list(page: number, perPage: number, source: OfferSource, filter: any, sort: any, searchQuery: string, searchArea: GeoPoint[]) {
        console.log('offers list');

        var query = [];

        var user: User = this._sessionService.getUser();


        var source_str = 'local';
        if (source == OfferSource.IMPORT) {
            source_str = 'import';
        }

        query.push('accountId=' + user.accountId);
        query.push('page=' + page);
        query.push('per_page=' + perPage);
        query.push('source=' + source_str);
        query.push('filter=' + JSON.stringify(filter));
        if (sort) {
            query.push('sort=' + JSON.stringify(sort));
        }
        query.push('search_query=' + searchQuery);
        query.push('search_area=' + JSON.stringify(searchArea));

        var _resourceUrl = this.RS + 'list?' + query.join("&");

        var ret_subj = <AsyncSubject<ListResult>>new AsyncSubject();

        this._http.get(_resourceUrl, { withCredentials: true })
            .map(res => res.json()).subscribe(
                data => {
                    var obj: ListResult = new ListResult();
                    if(data.result){
                        obj.hitsCount = data.result.hitsCount;
                        obj.list = data.result.list;

                        ret_subj.next(obj);
                        ret_subj.complete();
                    }
                },
                err => console.log(err)
            );
        console.log(ret_subj);
        return ret_subj;
    }

    save(offer: Offer) {
        console.log('offer save', offer);

        var user: User = this._sessionService.getUser();
        offer.accountId = user.accountId;

        var _resourceUrl = this.RS + 'save';

        var data_str = JSON.stringify(offer, function(key, value) {
            if (typeof value === 'string' && value.length == 0) {
                return undefined;
            }
            return value;
        });

        var ret_subj = <AsyncSubject<Offer>>new AsyncSubject();


        this._http.post(_resourceUrl, data_str, { withCredentials: true })
            .map(res => res.json()).subscribe(
                data => {

                    var o: Offer = data.result;

                    // TODO: pass copy????
                    ret_subj.next(o);
                    ret_subj.complete();

                },
                err => console.log(err)
            );

        return ret_subj;
    }

    delete(offer: Offer) {
        console.log('offer delete', offer);

        var user: User = this._sessionService.getUser();
        offer.accountId = user.accountId;

        var _resourceUrl = this.RS + 'delete/'+offer.id;

        var data_str = JSON.stringify({accountId: user.accountId, user: user.id});
        /*offer, function(key, value) {
            if (typeof value === 'string' && value.length == 0) {
                return undefined;
            }
            return value;
        });*/

        var ret_res = <AsyncSubject<String>>new AsyncSubject();


        this._http.post(_resourceUrl, data_str, { withCredentials: true })
            .map(res => res.json()).subscribe(
                data => {
                    let o : String = data.result;
                    ret_res.next(o);
                    ret_res.complete();
                },
                err => console.log(err)
            );

        return ret_res;
    }

    getSimilar(offer: Offer, page: number, perPage: number) {
        console.log('offer get similar');
        console.log(offer);



        var query = [];

        var user: User = this._sessionService.getUser();


        var source_str = 'local';

        query.push('accountId=' + user.accountId);
        query.push('page=' + page);
        query.push('per_page=' + perPage);

        var _resourceUrl = this.RS + 'list_similar/' + offer.id + '?' + query.join("&");

        var ret_subj = <AsyncSubject<ListResult>>new AsyncSubject();

        this._http.get(_resourceUrl, { withCredentials: true })
            .map(res => res.json()).subscribe(
            data => {
                var obj: ListResult = new ListResult();

                obj.hitsCount = data.result.hitsCount;
                obj.list = data.result.list;

                ret_subj.next(obj);
                ret_subj.complete();
            },
            err => console.log(err)
        );

        return ret_subj;
    }
}
