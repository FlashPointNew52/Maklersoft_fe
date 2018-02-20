/**
 * Created by owl on 2/20/17.
 */

import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {SessionService} from "./session.service";
import {ConfigService} from './config.service';
import {AsyncSubject} from "rxjs/AsyncSubject";

import 'rxjs/add/operator/map';
import {Photo} from '../class/photo';


@Injectable()
export class UploadService {

    RS: String = "";

    constructor(private _configService: ConfigService, private _http: Http, private _sessionService: SessionService) {
        this.RS = this._configService.getConfig().RESTServer + '/api/v1/upload/';
    };

    uploadPhoto(postData: any, files: File[], type: string) {
        let headers = new Headers();
        let formData: FormData = new FormData();
        formData.append('files', files[0], files[0].name);
        var ret_subj = <AsyncSubject<string>>new AsyncSubject();
        if(postData !== "" && postData !== undefined && postData !== null){
            for (var property in postData) {
                if (postData.hasOwnProperty(property)) {
                    formData.append(property, postData[property]);
                }
            }
        }

        var _resourceUrl = this.RS + 'photo';
        var data_str = JSON.stringify({
            data: files[0],
            userId: this._sessionService.getUser().id,
            accountId: this._sessionService.getUser().accountId,
            type: type
        });
        this._http.post(_resourceUrl, data_str, { withCredentials: true })
            .map(res => res.json()).subscribe(
                data => {

                    var url: string = data.result;
                    ret_subj.next(url);
                    ret_subj.complete();

                },
                err => console.log(err)
        );

        return ret_subj;
    }

    delete(fileName: string) {
        var ret_subj = <AsyncSubject<string>>new AsyncSubject();
        var _resourceUrl = this.RS + 'delete'
        var data_str = JSON.stringify({fileName: fileName});
        this._http.post(_resourceUrl, data_str, { withCredentials: true })
            .map(res => res.json()).subscribe(
                data => {

                    let notFound = true;
                    var p: string = data.result;

                    // TODO: pass copy????
                    ret_subj.next(p);
                    ret_subj.complete();
                },
                err => console.log(err)
        );


        return ret_subj;
    }

}
