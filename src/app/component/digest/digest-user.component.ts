import {Component, OnInit} from '@angular/core';

import {HubService} from '../../service/hub.service'
import {UserService} from '../../service/user.service'

import {User} from '../../entity/user';

@Component({
    selector: 'digest-user',
    inputs: ['user'],
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
            margin-left: 50px;
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
            width: 90px;
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
                <span>Пользователь 
                    <span class="billet-label">{{ user.name }}</span>
                </span>
                <span>{{ user.change_date | formatDate }} / {{ user.add_date | formatDate }}</span>
            </div>
            <table style="width: 100%;">
                <tbody style="vertical-align: top; font-size: 14; font-weight: 200;">

                </tbody>
            </table>
        </div>
    `
})

export class DigestUserComponent implements OnInit {

    public user: User;

    private selected = false;
    resultText: string;
    to: any;

    constructor(private _hubService: HubService, private _userService: UserService) { };

    ngOnInit() { }

    select() {
        this.selected = !this.selected;
    }

    open() {
        this.selected = true;
        var tabSys = this._hubService.getProperty('tab_sys');
        tabSys.addTab('user', {user: this.user});
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
