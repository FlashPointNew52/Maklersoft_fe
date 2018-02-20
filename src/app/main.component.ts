/**
 * Created by Aleksandr on 25.01.17.
 */
import {Component} from '@angular/core';

import {HubService} from './service/hub.service';
import {RequestService} from "./service/request.service";
import {ConfigService} from "./service/config.service";
import {PersonService} from "./service/person.service";
import {UserService} from "./service/user.service";
import {OfferService} from "./service/offer.service";
import {OrganisationService} from "./service/organisation.service";
import {TaskService} from "./service/task.service";
import {AnalysisService} from "./service/analysis.service";
import {HistoryService} from "./service/history.service";
import {PhotoService} from "./service/photo.service";
import {AccountService} from "./service/account.service";
import {SessionService} from "./service/session.service";


@Component({
    selector: 'main',
    styles: [``],
    template: `
        <div
            (contextmenu)="contextMenu($event)"
            (click)="click($event)"
        >
            <context-menu
                [menu]="_hubService.shared_var['cm']"
                [hidden]="_hubService.shared_var['cm_hidden']"
            >
            </context-menu>
            <tab-system onmousedown="return false" onselectstart="return false"></tab-system>
            <notebook></notebook>
        </div>
    `
})

export class MainComponent {
    constructor(private _hubService: HubService) {
        this._hubService.shared_var['cm_hidden'] = true;

    }

    contextMenu(e) {
        this._hubService.shared_var['cm_hidden'] = true;
    }

    click(e) {
        this._hubService.shared_var['cm_hidden'] = true;
    }
}
