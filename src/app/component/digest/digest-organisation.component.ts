import {Component, OnInit} from '@angular/core';

import {HubService} from '../../service/hub.service';

import {Organisation} from '../../entity/organisation';


@Component({
    selector: 'digest-organisation',
    inputs: ['organisation'],
    styles: [`
        .billet {
            background-color: inherit;
            color: #696969;
            font-weight: 200;
            font-size: 14px;
            position: relative;
    
            border-bottom: 1px solid #e5e5e5;
            overflow: hidden;
    
            padding: 10px 20px;
        }
    
        .billet-label {
            font-weight: 400;
            color:  #666;
            font-size: 17px;
            white-space: nowrap;
            margin-left: 25px;
        }
    
        .billet.selected {
            background-color: #157ad3;
            color: #fff !important;
        }
    
        .billet-block {
            display: inline-block;
            width: 32%;
        }
    
        .entry-header {
            display: inline-block;
            width: 115px;
            color: #aaa;
        }
    
        .badge-gray {
            display: inline-block;
            width: 85px;
            text-align: center;
            color: #666;
            background-color: #eee;
        }
        .badge-red {
            display: inline-block;
            width: 85px;
            text-align: center;
            color: #fff;
            background-color: #e05050;
        }
        .badge-green {
            display: inline-block;
            width: 85px;
            text-align: center;
            color: #fff;
            background-color: #50e050;
        }
    `],
    template: `
        <div class="billet"
            [class.selected]="selected"
            (click)="select()"
            (dblclick)="open()"
            (touchstart)="tStart()"
            (touchend)="tEnd()"
        >
            <div style="display: flex; justify-content: space-between;">
                <span>Организация {{ organisation.id }}
                    <span class="billet-label">{{ organisation.name }}</span>
                </span>
                <span>{{ organisation.change_date | formatDate }} / {{ organisation.add_date | formatDate }}</span>
            </div>
            <table style="width: 100%;">
                <tbody style="vertical-align: top; font-size: 14; font-weight: 200;">
                    <tr>
                        <td width="33%">
                            <span class="entry-header">Адрес:</span><span style="font-weight: 400;"> {{ organisation.address }} </span>
                        </td>
                        <td width="33%">
                            <span class="entry-header" style="width: 105px;"></span>
                        </td>
                        <td width="33%">
                            <span class="entry-header"></span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="entry-header"></span>
                        </td>
                        <td></td>
                        <td>
                            <span class="entry-header"></span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="entry-header"></span>
                        </td>
                        <td></td>
                        <td>
                            <span class="entry-header" style="width: 90px;"></span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
})

export class DigestOrganisationComponent implements OnInit {

    public organisation: Organisation;

    private selected = false;
    private to: any;

    constructor(private _hubService: HubService) { };

    ngOnInit() { }

    select() {
        this.selected = !this.selected;
    }

    open() {
        this.selected = true;
        var tabSys = this._hubService.getProperty('tab_sys');
        tabSys.addTab('organisation', {organisation: this.organisation});
    }

    tStart() {
        clearTimeout(this.to);
        this.to = setTimeout(() => {
            this.open();
        }, 1000);
    }

    tEnd() {
        clearTimeout(this.to);
    }

}
