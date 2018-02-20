import {Component, OnInit} from '@angular/core';

import {HubService} from '../../service/hub.service'
import {UserService} from '../../service/user.service'
import {OrganisationService} from '../../service/organisation.service'
import {TaskService} from '../../service/task.service'

import {PhoneBlock} from '../../class/phoneBlock';
import {Person} from '../../entity/person';
import {Organisation} from '../../entity/organisation';
import {User} from '../../entity/user';
import {Task} from '../../class/task';

@Component({
    selector: 'digest-person',
    inputs: ['person'],
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
                <span>Контакт {{ person.id }}
                    <span class="billet-label">{{ person.name }}</span>
                </span>
                <span>{{ person.changeDate | formatDate }} / {{ person.addDate | formatDate }}</span>
            </div>
            <table style="width: 100%;">
                <tbody style="vertical-align: top; font-size: 14px; font-weight: 200;">
                <tr>
                    <td width="33%">
                        <span class="entry-header" style="width: 105px;">Организация:</span> {{ organisation.name }}
                    </td>
                    <td width="33%">
                        <span class="entry-header">Задача:</span> {{ task.type }}
                    </td>
                    <td width="33%">
                        <div style="float: left; display: block;">
                            <span class="entry-header" style="width: 90px;">Комментарий:</span>
                        </div>
                        <div style="oveflow: hidden;">
                            <span class="line-clamp line-clamp-1" style="font-style: italic; line-height: normal;"> {{ task.comment }} </span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="entry-header" style="width: 105px;">Ответственный:</span> <a href="#"> {{ agent.name
                        }} </a>
                    </td>
                    <td>
                        <span class="entry-header">Результат:</span> <span [class.badge-gray]="task.result_id == 0"
                                                                           [class.badge-green]="task.result_id == 1"
                                                                           [class.badge-red]="task.result_id == 2">{{ resultText }}</span>
                    </td>
                    <td>
        
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="entry-header" style="width: 105px;">Телефон:</span>{{ person.phoneBlock | phoneBlockAsString }}
                    </td>
                    <td></td>
                    <td>
        
                    </td>
                </tr>
                </tbody>
            </table>
        
        
        </div>
    `
})

export class DigestPersonComponent implements OnInit {
    public person: Person;
    private selected = false;

    organisation: Organisation = new Organisation();
    agent: User = new User();

    resultText: string;
    task: Task;
    to: any;

    constructor(private _hubService: HubService, private _userService: UserService, private _organisationService: OrganisationService, private _taskService: TaskService) { };

    ngOnInit() {
        this.task = this._taskService.getRandomTask();

        if (this.person.organisationId) {
            this._organisationService.get(this.person.organisationId).subscribe(org => {
                this.organisation = org;
            });
        }

        if (this.person.userId != null) {
            this._userService.get(this.person.userId).subscribe(agent => {
                this.agent = agent;
            });
        }

        this.resultText = this.getResultText();
    }

    select() {
        this.selected = !this.selected;
    }

    open() {
        this.selected = true;
        var tabSys = this._hubService.getProperty('tab_sys');
        tabSys.addTab('person', {person: this.person});
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

    getResultText() {
        return Task.getResultText(this.task);
    }
}
