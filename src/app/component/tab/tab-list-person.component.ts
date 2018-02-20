import {
    Component, OnInit, AfterViewInit,
} from '@angular/core';

import {HubService} from '../../service/hub.service';
import {ConfigService} from '../../service/config.service';
import {PersonService} from '../../service/person.service';

import {Tab} from '../../class/tab';
import {Person} from '../../entity/person';

import {Observable} from 'rxjs/Observable';
import {User} from "../../entity/user";
import {UserService} from "../../service/user.service";


@Component({
    selector: 'tab-list-person',
    inputs: ['tab'],
    styles: [`
        .underline{
            margin: 0;
            border: 2px solid;
            margin-top: 16px;
            color: rgb(61, 155, 233);
        }
        .search-form {
            background: #fff;
            z-index: 1;
            width: 38%;
            margin-left: 610px;
            margin-top: 27px;
        }

        .tool-box {
            height: 30px;
            margin: 0 12px;
        }

        .round_menu{
            width: 170;
            height: 50px;
            position: absolute;
            left: 450px;
            top: 15px;
            text-align: center;
            z-index: 10;
            line-height: 50px;
            display: flex;
            justify-content: space-around;
        }

        .search-box {
            position: relative;
            margin: 12px 12px 8px 12px;
        }

        .person-list-wrapper {
            padding-top: 25px;
            max-width: 1200px;
            margin: 0 auto;
            height: 100%;
            width: 100%;
        }

        .scroll-wrapper {
            height: calc(100% - 115px);
            overflow-y: auto;
        }

        .inline-select {
            display: inline-block;
            height: 20px;
            padding: 0 15px;
            font-size: 14px;
            color: #666;
        }

        .button {
            height: 50px;
            width: 50px;
            border-radius: 40px;
            cursor: pointer;
            font-size: 11px;
            line-height: 120px;
            background-size: cover;
            background-color: #bcbfc1;
            color: #807982;
            border: 2px solid #bcbfc1;
        }

        .button_active, .button:hover{
            border-color: #1061c4;
            background-color: #1061c4;
        }

        .plus:hover{
            border-color: #0ea122;
            background-color: #0ea122;
        }

    `],
    template: `
        <div class="header-label-abs">{{ tab.header }}</div>
        <div class = "round_menu">
            <div class="button plus" [style.background-image]="'url(assets/plus.png)'"  (click)="addPerson()">Добавить</div>
            <div (click)="this.main_menu = true"   class="button"  [class.button_active]="this.main_menu" [style.background-image]="'url(assets/base_plus.png)'">Общая</div>
            <div (click)="this.main_menu = false"  class="button" [class.button_active]="!this.main_menu" [style.background-image]="'url(assets/base.png)'">Компания</div>
        </div>
        <div class="search-form" [class.table-mode]="tableMode">
            <div class="search-box">
                <input type="text" class="" placeholder="" style="height: 28px; width: 100%;
                background-color: rgb(247, 247, 247); border: 1px solid rgba(204, 204, 204, 0.47);"
                    [(ngModel)]="searchQuery" (keyup)="searchParamChanged($event)"
                >
                <span class="icon-search" style="position: absolute; right: 12px; top: 7px;"></span>
            </div>
            <div class="tool-box">
                <div class="inline-select">
                    <ui-select class="view-value edit-value"
                        [options] = "agentOpts"
                        [value]="0"
                        [config]="{icon: 'icon-person', drawArrow: true}"
                        (onChange)="userId = $event.selected.value; searchParamChanged()"
                    >
                    </ui-select>
                </div>
                <div class="inline-select">
                    <ui-select class="view-value edit-value"
                        [options] = "[
                            {value: 0, label: 'Все'},
                            {value: 1, label: 'Красный', icon: 'icon-circle tag-red'},
                            {value: 2, label: 'Оранжевый', icon: 'icon-circle tag-orange'},
                            {value: 3, label: 'Желтый', icon: 'icon-circle tag-yellow'},
                            {value: 4, label: 'Зеленый', icon: 'icon-circle tag-green'},
                            {value: 5, label: 'Голубой', icon: 'icon-circle tag-blue'},
                            {value: 6, label: 'Лиловый', icon: 'icon-circle tag-violet'},
                            {value: 7, label: 'Серый', icon: 'icon-circle tag-gray'}
                        ]"
                        [value]="0"
                        [config]="{icon: 'icon-tag', drawArrow: true}"
                    >
                    </ui-select>
                </div>
                <div class="inline-select">
                    <ui-select class="view-value edit-value"
                        [options] = "[
                            {value: 1, label: '1 день'},
                            {value: 2, label: '3 дня'},
                            {value: 3, label: 'Неделя'},
                            {value: 4, label: '2 недели'},
                            {value: 5, label: 'Месяц'},
                            {value: 6, label: '3 месяца'},
                            {value: 7, label: 'Все'}
                        ]"
                        [value]="6"
                        [config]="{icon: 'icon-month', drawArrow: true}"
                    >
                    </ui-select>
                </div>
            </div>
        </div>
        <hr class='underline'>
        <div class="person-list-wrapper">
            <div class="scroll-wrapper">
                <digest-person *ngFor="let p of persons"
                    [person]="p"
                >
                </digest-person>
            </div>
        </div>
    `
})

export class TabListPersonComponent implements OnInit {
    public tab: Tab;

    persons: Person[];
    userId: number;
    searchQuery: string = "";
    agentOpts = [{
        value: 0,
        label: '-'
    }];
    main_menu: boolean = true;
    isImport: boolean = true;
    constructor(private _configService: ConfigService, private _hubService: HubService, private _personService: PersonService, private _userService: UserService) {
        setTimeout(() => {
            this.tab.header = 'Контакты';
        });
    }

    ngOnInit() {

        this.tab.refreshRq.subscribe(
            sender => {
                this.listPersons();
            }
        )

        this.listPersons();

        this._userService.list(null, null, "").subscribe(agents => {
            for (let i = 0; i < agents.length; i++) {
                var a = agents[i];
                this.agentOpts.push({
                    value: a.id,
                    label: a.name
                });
            }
        });
    }

    listPersons() {
        this._personService.list(this.userId, null, this.searchQuery).subscribe(
            data => {
                this.persons = data;
            },
            err => console.log(err)
        );
    }

    addPerson() {
        var tab_sys = this._hubService.getProperty('tab_sys');
        tab_sys.addTab('person', {person: new Person()});
    }

    searchParamChanged() {
        this.listPersons();
    }

    scroll(e) {
        if (e.currentTarget.scrollTop + e.currentTarget.clientHeight >= e.currentTarget.scrollHeight) {
            this.listPersons();
        }
    }
    getImage(s: string){
        if (s == 'local') {
          if(this.isImport)
            return "url(assets/base.png)";
          else
            return "url(assets/base_color.png)";
        } else {
          if(this.isImport)
            return "url(assets/base_plus_color.png)";
          else
            return "url(assets/base_plus.png)";
        }
    }
}
