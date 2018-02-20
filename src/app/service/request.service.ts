import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

import {ConfigService} from './config.service';

import {Request} from '../entity/request';
import {AsyncSubject} from "rxjs/AsyncSubject";
import {User} from "../entity/user";
import {SessionService} from "./session.service";
import {Offer} from "../entity/offer";


@Injectable()
export class RequestService {

    RS: String = "";


    constructor(private _http: Http, private _configService: ConfigService, private _sessionService: SessionService) {
        this.RS = this._configService.getConfig().RESTServer + '/api/v1/request/';
    };

    list(page: number, perPage: number, offerTypeCode: string, stageCode: string, agentId: number, personId: number, searchQuery: string) {
        console.log('request list');

        var query = [];

        var user: User = this._sessionService.getUser();

        query.push('accountId=' + user.accountId);
        query.push('page=' + page);
        query.push('per_page=' + perPage);
        query.push('offerTypeCode=' + offerTypeCode);
        query.push('stageCode=' + stageCode);
        query.push('agent_id=' + (agentId ? agentId : ''));
        query.push('person_id=' + (personId ? personId : ''));
        query.push('search_query=' + searchQuery);

        var _resourceUrl = this.RS + 'list?' + query.join("&");

        var ret_subj = <AsyncSubject<Request[]>>new AsyncSubject();

        this._http.get(_resourceUrl, { withCredentials: true })
            .map(res => res.json()).subscribe(
                data => {
                    var requests: Request[] = data.result;

                    ret_subj.next(requests);
                    ret_subj.complete();
                },
                err => console.log(err)
            );
        return ret_subj;
    }

    listForOffer(offer: Offer) {
        console.log('request list for offer');

        let page = 0;
        let perPage = 16;

        var query = [];

        var user: User = this._sessionService.getUser();

        query.push('accountId=' + user.accountId);
        query.push('page=' + page);
        query.push('per_page=' + perPage);


        var _resourceUrl = this.RS + 'list_for_offer/' + offer.id + '?' + query.join("&");

        var ret_subj = <AsyncSubject<Request[]>>new AsyncSubject();

        this._http.get(_resourceUrl, { withCredentials: true })
            .map(res => res.json()).subscribe(
            data => {
                var requests: Request[] = data.result;

                ret_subj.next(requests);
                ret_subj.complete();
            },
            err => console.log(err)
        );
        return ret_subj;
    }

    save(request: Request) {
        console.log('request save');

        var user: User = this._sessionService.getUser();
        request.accountId = user.accountId;

        var _resourceUrl = this.RS + 'save'

        delete request["selected"];
        var data_str = JSON.stringify(request);

        var ret_subj = <AsyncSubject<Request>>new AsyncSubject();

        this._http.post(_resourceUrl, data_str, { withCredentials: true })
            .map(res => res.json()).subscribe(
            data => {

                var r: Request = data.result;

                // TODO: pass copy????
                ret_subj.next(r);
                ret_subj.complete();

            },
            err => console.log(err)
        );

        return ret_subj;
    }
}
