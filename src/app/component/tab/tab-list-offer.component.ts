import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef
} from '@angular/core';

import {OfferService, OfferSource} from '../../service/offer.service';
import {ConfigService} from '../../service/config.service';
import {HubService} from "../../service/hub.service";
import {UserService} from "../../service/user.service";
import {PersonService} from "../../service/person.service";
import {OrganisationService} from "../../service/organisation.service";

import {SuggestionService} from "../../service/suggestion.service";

import {Tab} from '../../class/tab';
import {Offer} from '../../entity/offer';

import {User} from "../../entity/user";
import {Person} from "../../entity/person";
import {Organisation} from "../../entity/organisation";
import {SessionService} from "../../service/session.service";
import {Account} from "../../entity/account";
import {PhoneBlock} from "../../class/phoneBlock";

@Component({
    selector: 'tab-list-offer',
    inputs: ['tab'],
    styles: [`
        .underline{
            border: 2px solid;
            color: rgb(61, 155, 233);
            position: absolute;
            top: 91px;
            left: 30px;
            width: 100vw;
        }
        .search-form {
            position: absolute;
            width: 38%;
            margin-left: 610px;
            margin-top: 15px;
            z-index: 1;
        }

        .search-form.table-mode {
            border: 1px solid #fff;
        }

        .round_menu{
            width: 230px;
            height: 50px;
            position: absolute;
            left: 400px;
            top: 15px;
            text-align: center;
            z-index: 10;
            line-height: 50px;
            display: flex;
            justify-content: space-around;

        }
        .fake{
            font-size: 12pt;
            color: #fbfbfb;
            background-color: #0b9700;
            height: 28px;
            line-height: 28px;
            width: 80px;
            cursor: pointer;
            text-align: center;
        }

        .tool-box {
            height: 30px;
            margin: 0 12px;
        }

        .search-box {
            display: flex;
            position: relative;
            height: 30px;
            margin: 12px 12px 8px 12px;
        }

        .search-box > a {
            font-size: 10pt;
            color: #fbfbfb;
            background-color: #0e60c5;
            height: 28px;
            line-height: 28px;
            width: 80px;
            cursor: pointer;
            text-align: center;
        }

        .offer-list {
            position: relative;
        }

        .digest-list {
            overflow-x: scroll;
            border-right: 1px solid #ccc;
            border-top: 1px solid #ccc;
            background-color: rgb(247,247,247);
        }

        .pane {
            float: left;
            width: 370px;
            height: 100%;
            //border-right: 1px solid #ccc;
        }

        .work-area {
            float: left;
            height: calc(100% - 115px);
            margin-top: 115px;
            border-top: 1px solid #ccc;
        }

        .fixed-button {
            position: fixed;
            top: 0;
            left: 0;
        }

        .inline-select {
            display: inline-block;
            height: 20px;
            padding: 0 15px 0 0;
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

        .head{
            width: 100%;
            height: 115px;
            display: flex;
        }

        .head > span{
            font-size: 16pt;
            display: block;
            margin: 30px 0 0 30px;
            color: #595a5a;
        }

        .seen {
            background-color: #dbe2f0 !important;
        }

        .modified {
            background-color: #dff0d8 !important;
        }

        .src-sel {
            background-color: #3366cc !important;
        }

        .suggestions {
            left: 0px;
            min-width: 160px;
            margin-top: 27px;
            padding: 5px 0;
            background-color: #f7f7f7;
            border: 1px solid #e3e3e3;
            width: 88%;
            position: absolute;
            z-index: 2;
            font-size: 11pt;
        }

        .suggestions > ul {
            margin: 0 0;
            list-style: none;
            padding: 3px 20px;
        }

        .suggestions > ul:hover {
            background: #bbbbbb;
            cursor: default;
        }

        .no-mouse-events {
            pointer-events: none;
        }
    `],
    template: `
        <digest-window *ngIf="tab.active"
            [open]="openPopup"
        ></digest-window>
        <div class = "round_menu">
            <div class="button plus" (click)="toggleView()">выкл</div>
            <div class="button plus" [style.background-image]="'url(assets/plus.png)'" (click) ="addOffer()">Добавить</div>
            <div (click)="toggleSource('import')" class="button" [class.button_active]="this.source != 1" [style.background-image]="'url(assets/base_plus.png)'">Общая</div>
            <div (click)="toggleSource('local')"  class="button" [class.button_active]="this.source == 1" [style.background-image]="'url(assets/base.png)'">Компания</div>
        </div>
        <div class="search-form" [class.table-mode]="tableMode">

            <div class="search-box">
                <input type="text" class="" placeholder="" [style.width]="getInputWidth()" onclick="focus()"
                    style="height: 28px; background-color: rgb(247, 247, 247); border: 1px solid rgba(204, 204, 204, 0.47);"
                    [(ngModel)]="searchQuery" (keyup)="searchStringChanged($e)"
                >
                <span class="icon-search" style="position: absolute; top: 7px;" [style.right]="getSearchPosition()"></span>
                <a (click)="toggleDraw()" [hidden]="tableMode">
                    <span>Обвести</span>
                </a>
                <div class="suggestions" (document:click)="docClick()" *ngIf="sgList.length > 0">
                    <ul *ngFor="let item of sgList" >
                        <li >
                            <a (click)="select(item)">{{item}}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="tool-box">

                <div class="pull-left">

                    <div class="inline-select">
                        <ui-select class="view-value edit-value"
                            [options]="[
                                {value: 'sale', label: 'Продажа'},
                                {value: 'rent', label: 'Аренда'}
                            ]"
                            [value]="filter.offerTypeCode"
                            [config]="{icon: 'icon-square', drawArrow: true}"
                            (onChange)="filter.offerTypeCode = $event.selected.value; searchParamChanged($event);"
                        >
                        </ui-select>
                    </div>
                    <div class="inline-select" *ngIf="source == 1">
                        <ui-select class="view-value edit-value"
                            [options]="stageCodeOptions"
                            [value]="filter.stage"
                            [config]="{icon: 'icon-square', drawArrow: true}"
                            (onChange)="filter.stageCode = $event.selected.value; searchParamChanged($event);"
                        >
                        </ui-select>
                    </div>
                    <div class="inline-select">
                        <ui-select class="view-value edit-value"
                            [options]="agentOpts"
                                [value]="filter.agent"
                            [config]="{icon: 'icon-person', drawArrow: true}"
                            (onChange)="filter.contactType = $event.selected.value; searchParamChanged($event);"
                        >
                        </ui-select>
                    </div>
                    <div class="inline-select" *ngIf="source == 1">
                        <ui-select class="view-value edit-value"
                            [options]="[
                                {value: 'all', label: 'Все'},
                                {value: '1', label: 'Красный', icon: 'icon-circle tag-red'},
                                {value: '2', label: 'Оранжевый', icon: 'icon-circle tag-orange'},
                                {value: '3', label: 'Желтый', icon: 'icon-circle tag-yellow'},
                                {value: '4', label: 'Зеленый', icon: 'icon-circle tag-green'},
                                {value: '5', label: 'Голубой', icon: 'icon-circle tag-blue'},
                                {value: '6', label: 'Лиловый', icon: 'icon-circle tag-violet'},
                                {value: '7', label: 'Серый', icon: 'icon-circle tag-gray'}
                            ]"
                            [value]="filter.tag"
                            [config]="{icon: 'icon-tag', drawArrow: true}"
                            (onChange)="filter.tag = $event.selected.value; searchParamChanged($event);"
                        >
                        </ui-select>
                    </div>
                    <div class="inline-select">
                        <ui-select class="view-value edit-value"
                            [options]="[
                                {value: '1', label: '1 день'},
                                {value: '3', label: '3 дня'},
                                {value: '7', label: 'Неделя'},
                                {value: '14', label: '2 недели'},
                                {value: '30', label: 'Месяц'},
                                {value: '90', label: '3 месяца'},
                                {value: 'all', label: 'Все'}
                            ]"
                            [value]="filter.changeDate"
                            [config]="{icon: 'icon-month', drawArrow: true}"
                            (onChange)="filter.changeDate = $event.selected.value; searchParamChanged($event);"
                        >
                        </ui-select>
                    </div>
                </div>
                <div class="pull-right">

                    <span>{{ hitsCount }}</span>/<span>{{ selectedOffers.length }}</span>


                    <a (click)="toggleMode()">
                        <span
                            [ngClass]="{'icon-globus': tableMode, 'icon-table': !tableMode}"
                        ></span>
                    </a>
                </div>
            </div>
        </div>

        <hr class='underline'>

        <offer-table
            [hidden]="!tableMode"
            [offers]="offers"
            [source] = "source"
            [canLoad] = "canLoad"
            [page]="page"
            (onSort)="sortChanged($event)"
            (onListEnd)="listEndOrStart(1, 1, $event)"
            (onSelect)="selectedOffers = $event"
            (clickMenu) = "clickMenu($event)"
        >
        </offer-table>

        <div class="tab-button fixed-button" (click)="toggleLeftPane()">
            <span [ngClass]="{'icon-arrow-right': paneHidden, 'icon-arrow-left': !paneHidden}"></span>
        </div>

        <div class="offer-list"
             [hidden]="tableMode"
             (window:resize)="onResize($event)"
        >
            <div class="pane" [hidden]="paneHidden" [style.width.px]="paneWidth">
                <div class="head"><span>{{tab.header}}</span></div>

                <div class="digest-list"
                     (scroll)="scroll($event)"
                     [style.height]="paneHeight"
                     (contextmenu)="tableContextMenu($event)"
                >

                    <digest-offer *ngFor="let offer of offers; let i = index"
                                  [offer]="offer"
                                style="background-color: #fff"
                                [class.seen]="offer.openDate > timestamp"
                                [class.modified]="offer.changeDate > timestamp"
                                [class.selected]="selectedOffers.indexOf(offer) > -1"
                                (click)="click($event, offer, i)"
                                (contextmenu)="click($event, offer)"
                                (dblclick)="dblClick(offer)"
                    >
                    </digest-offer>
                </div>
            </div>
            <div class="work-area" [style.width.px]="mapWidth" [class.no-mouse-events]="!tab.active">
                <!--<google-map *ngIf="tab.active"
                    [latitude]="lat"
                    [longitude]="lon"
                    [zoom]="zoom"
                    [objects]="offers"
                    [selected_objects]="selectedOffers"
                    [draw_allowed]="mapDrawAllowed"
                    (drawFinished)="finishDraw($event)"
                    (markerClicked)="markerClick($event)"
                >
                </google-map>-->
            </div>
        </div>
    `
})

export class TabListOfferComponent {
    public tab: Tab;
    public tableMode: boolean = false;
    source: OfferSource = OfferSource.LOCAL;
    searchQuery: string = "";
    searchArea: any[] = [];

    sgList: string[] = [];
    filter: any = {
        stageCode: 'all',
        contactType: 'all',
        tag: 'all',
        changeDate: 90,
        offerTypeCode: 'sale',
    };

    sort: any = {};

    agentOpts = [
        {value: 'all', label: 'Все объекты', bold: true},
        {value: 'realtor', label: 'Конкуренты', bold: true},
        {value: 'partner='+this._sessionService.getUser().accountId, label: 'Партнеры', bold: true},
        {value: 'private', label: 'Собственники', bold: true},
        {value: 'client='+this._sessionService.getUser().accountId, label: 'Клиенты', bold: true},
        {value: 'company='+this._sessionService.getUser().accountId, label: 'Наша компания', bold: true},
        {value: 'my', label: 'Мои объекты', bold: true}
    ];

    stageCodeOptions = [
        {value: 'all', label: 'Все'},
        {value: 'raw', label: 'Не активен'},
        {value: 'active', label: 'Активен'},
        {value: 'price', label: 'Прайс'},
        {value: 'deal', label: 'Сделка'},
        {value: 'suspended', label: 'Приостановлен'},
        {value: 'archive', label: 'Архив'}
    ];

    stateCodeOptions = [
        {value: 'all', label: 'Все'},
        {value: 'raw', label: 'Не активен'},
        {value: 'active', label: 'Активен'},
        {value: 'work', label: 'Прайс'},
        {value: 'ок', label: 'Сделка'},
        {value: 'suspended', label: 'Приостановлен'},
        {value: 'archive', label: 'Архив'}
    ];

    paneHeight: number;
    paneWidth: number;
    mapWidth: number;
    paneHidden: boolean = false;

    public mapDrawAllowed = false;
    lat: number;
    lon: number;
    zoom: number;

    offers: Offer[];
    hitsCount: number = 0;
    page: number = 0;
    perPage: number = 100;

    suggestionTo: any;
    to: any;
    list: HTMLElement;

    selectedOffers: Offer[] = [];
    lastClckIdx: number = 0;

    timestamp: number = (Date.now() / 1000) - 1000;
    openPopup: any = {visible: false};
    canLoad: number = 0;

    constructor(private _elem: ElementRef,
                private _changeDetectorRef: ChangeDetectorRef,
                private _hubService: HubService,
                private _offerService: OfferService,
                private _userService: UserService,
                private _configService: ConfigService,
                private _suggestionService: SuggestionService,
                private _sessionService: SessionService,
                private _personService: PersonService,
                private _organisationService: OrganisationService
            ) {
        setTimeout(() => {
            this.tab.header = 'Предложения';
        });
    }

    ngOnInit() {

        if (this.tab.args.query) {
            this.searchQuery = this.tab.args.query;
        }
        for (var i = 0; i < localStorage.length; i++) {
            let name : string = localStorage.key(i);
            if(name.indexOf('offer_page') > -1)
                localStorage.removeItem(name);
        }
        this.tab.refreshRq.subscribe(
            sender => {
                this.listOffers(1);
            }
        )

        this.list = this._elem.nativeElement.querySelector('.digest-list');

        this.page = 0;
        this.listOffers(1);

        this._userService.list(null, null, "").subscribe(agents => {
            for (let i = 0; i < agents.length; i++) {
                var a = agents[i];
                this.agentOpts.push({
                    value: '' + a.id,
                    label: a.name,
                    bold: false
                });
            }
        });

        var c = this._configService.getConfig();

        let loc = this._sessionService.getAccount().location;

        if (c.map[loc]) {
            this.lat = c.map[loc].lat;
            this.lon = c.map[loc].lon;
            this.zoom = c.map[loc].zoom;
        } else {
            this.lat = c.map['default'].lat;
            this.lon = c.map['default'].lon;
            this.zoom = c.map['default'].zoom;
        }

        this.calcSize();
    }

    toggleView() {
        this._changeDetectorRef.detach();
    }

    listOffers(down: number, event: any = null) {
            this.canLoad = down;
            this._offerService.list(this.page, this.perPage, this.source, this.filter, this.sort, this.searchQuery, this.searchArea).subscribe(
                data => {
                    this.hitsCount = data.hitsCount || (this.hitsCount > 0 ? this.hitsCount : 0);
                    if (this.page == 0 && down == 1) {
                        this.offers = data.list;
                    } else {
                        if(down == 1){
                            data.list.forEach(i => {
                                this.offers.push(i);
                            });
                            if(~~(this.hitsCount/this.perPage) != this.page+1 && data.list.length < this.perPage){
                                this.hitsCount -= (this.perPage - data.list.length);
                            }

                        }
                    }
                    this.canLoad = 0;
                },
                err => {
                    console.log(err);
                    this.canLoad = 0;
                }
            );
    }

    onResize(e) {
        this.calcSize();
    }

    toggleMode() {
        this.tableMode = !this.tableMode;
    }

    toggleDraw() {
        this.mapDrawAllowed = !this.mapDrawAllowed;
        if (!this.mapDrawAllowed) {
            this.page = 0;
            this.offers = [];
            this.searchArea = [];
            this.listOffers(1);
        }
    }

    finishDraw(e) {
        this.page = 0;
        this.offers = [];
        this.searchArea = e;
        this.listOffers(1);
    }

    calcSize() {
        if (this.paneHidden) {
            this.paneWidth = 0;
        } else {
            this.paneWidth = 370;
        }
        this.mapWidth = document.body.clientWidth - (31) - this.paneWidth;
        this.paneHeight = document.body.clientHeight - 116;
    }

    toggleLeftPane() {
        this.paneHidden = !this.paneHidden;
        this.calcSize();
    }

    tableContextMenu(e) {
        e.preventDefault();
        e.stopPropagation();

        var c = this;
        var users: User[] = this._userService.listCached("", 0, "");
        var uOpt = [];
        /*uOpt.push(
            {class: "entry", disabled: false, label: "Не задано", callback: function() {
                c.selectedOffers.forEach(o => {
                    o.agentId = null;
                    o.agent = null;
                    c._offerService.save(o);
                })
            }},
        )*/
        users.forEach(u => {
            if(u.id != this._sessionService.getUser().id)
            uOpt.push(
                {class: "entry", disabled: false, label: u.name, callback: () => {
                    this.clickMenu({event: "add_to_local", agent: u});
                }},
            )
        });

        var stateOpt = [];
        var states = [
            {value: 'raw', label: 'Не активен'},
            {value: 'active', label: 'Активен'},
            {value: 'work', label: 'В работе'},
            {value: 'suspended', label: 'Приостановлен'},
            {value: 'archive', label: 'Архив'}
        ];
        var stageOpt = [];
        var stages = [
            {value: 'contact', label: 'Первичный контакт'},
            {value: 'pre_deal', label: 'Заключение договора'},
            {value: 'show', label: 'Показ'},
            {value: 'prep_deal', label: 'Подготовка договора'},
            {value: 'decision', label: 'Принятие решения'},
            {value: 'negs', label: 'Переговоры'},
            {value: 'deal', label: 'Сделка'}
        ];
        states.forEach(s => {
            stateOpt.push(
                {class: "entry", disabled: false, label: s.label, callback: function() {
                    c.selectedOffers.forEach(o => {
                        o.stateCode = s.value;
                        c._offerService.save(o);
                    })
                }}
            )
        });
        stages.forEach(s => {
            stageOpt.push(
                {class: "entry", disabled: false, label: s.label, callback: function() {
                    c.selectedOffers.forEach(o => {
                        o.stageCode = s.value;
                        c._offerService.save(o);
                    });
                            setTimeout(function () {
                                c.listOffers(1);
                            }, 1200);
                }}
            )
        });

        let menu = {
            pX: e.pageX,
            pY: e.pageY,
            scrollable: false,
            items: [
                {class: "entry", disabled: this.selectedOffers.length == 1 ? false : true, icon: "dcheck", label: 'Проверить', callback: () => {
                    this.openPopup = {visible: true, task: "check"};
                    /*var tab_sys = this._hubService.getProperty('tab_sys');
                    var rq = [];
                    this.selectedOffers.forEach(o => {
                        if (o.person.phoneBlock) {
                            rq.push(PhoneBlock.getAsString(o.person.phoneBlock));
                        }
                    });
                    tab_sys.addTab('list_offer', {query: rq.join(" ")});*/
                }},
                {class: "entry", disabled: false, icon: "document", label: 'Открыть', callback: () => {
                    var tab_sys = this._hubService.getProperty('tab_sys');
                    this.selectedOffers.forEach(o => {
                        tab_sys.addTab('offer', {offer: o});
                    })
                }},
                {class: "entry", disabled: this.source == OfferSource.LOCAL? false : true, icon: "trash", label: 'Удалить',
                    callback: () => {
                        this.clickMenu({event: "del_obj"});
                    }
                },
                {class: "entry", disabled: this.selectedOffers.length == 1 ? false : true, icon: "edit", label: "Показать фото",
                    callback: () => {
                        this.clickMenu({event: "photo"});
                    }
                },
                {class: "entry", disabled: false, icon: "edit", label: "Показать на карте",
                    callback: () => {
                        this.clickMenu({event: "map"});
                    }
                },
                {class: "delimiter"},
                {class: "submenu", disabled: false, icon: "edit", label: "Изменить стадию", items: stageOpt},
                {class: "submenu", disabled: false, icon: "person", label: "Добавить", items: [
                    {class: "entry", disabled: this.source == OfferSource.LOCAL? true : false, label: "В базу компании",
                        callback: () => {
                            this.clickMenu({event: "add_to_local"});
                        }
                    },
                    {class: "entry", disabled: false, label: "В контакты",
                        callback: () => {
                            this.clickMenu({event: "add_to_person"});
                        }
                    },
                    {class: "entry", disabled: false, label: "В контрагенты",
                        callback: () => {
                            this.clickMenu({event: "add_to_company"});
                        }
                    },
                ]},
                {class: "submenu", disabled: false, icon: "person", label: "Назначить", items: [
                    {class: "entry", disabled: this.source == OfferSource.LOCAL? false : true, label: "Не назначено",
                        callback: () => {
                            this.clickMenu({event: "del_agent", agent: null});
                        }
                    },
                    {class: "entry", disabled: false, label: "На себя",
                        callback: () => {
                            this.clickMenu({event: "add_to_local", agent: this._sessionService.getUser()});
                        }
                    },
                    {class: "delimiter"}
                ].concat(uOpt)},
                {class: "entry", disabled: false, icon: "task", label: "Добавить задачу", items: [
                    //{class: "entry", disabled: false, label: "пункт x1", callback: function() {alert('yay s1!')}},
                    //{class: "entry", disabled: false, label: "пункт x2", callback: function() {alert('yay s2!')}},
                ]},
                {class: "submenu", disabled: false, icon: "edit", label: "Отправить сообщение", items: [
                    {class: "entry", disabled: false, label: "Произвольно", callback: function() {alert('yay s1!')}},
                    {class: "entry", disabled: false, label: "Шаблон 1", callback: function() {alert('yay s2!')}},
                    {class: "entry", disabled: false, label: "Шаблон 2", callback: function() {alert('yay s2!')}},
                    {class: "entry", disabled: false, label: "Шаблон 3", callback: function() {alert('yay s2!')}},
                ]},
                {class: "entry", disabled: false, icon: "edit", label: "Экспорт в источники", callback: () => {

                }},
                {class: "submenu", disabled: false, icon: "task", label: "Позвонить",  items: [
                    {class: "entry", disabled: false, label: "Произвольно", callback: function() {alert('yay s1!')}},
                    {class: "delimiter"},
                    {class: "entry", disabled: false, label: "На основной", callback: function() {alert('yay s1!')}},
                    {class: "entry", disabled: false, label: "На рабочий", callback: function() {alert('yay s1!')}},
                    {class: "entry", disabled: false, label: "На мобильный", callback: function() {alert('yay s2!')}},
                ]},

                /*{class: "submenu", disabled: true, icon: "advert", label: "Реклама", items: [
                    {class: "entry", disabled: false, label: "пункт x1", callback: function() {alert('yay s1!')}},
                    {class: "entry", disabled: false, label: "пункт x2", callback: function() {alert('yay s2!')}},
                ]},*/
                {class: "delimiter"},
                {class: "tag", icon: "tag", label: "Добавить тег:", items: [
                    {disabled: false, icon: '', callback: function() {}},
                    {disabled: false, icon: 'circle tag-red' , callback: function() {}},
                    {disabled: false, icon: 'circle tag-orange' , callback: function() {}},
                    {disabled: false, icon: 'circle tag-yellow' , callback: function() {}},
                    {disabled: false, icon: 'circle tag-green' , callback: function() {}},
                    {disabled: false, icon: 'circle tag-blue' , callback: function() {}},
                    {disabled: false, icon: 'circle tag-violet' ,callback: function() {}},
                    {disabled: false, icon: 'circle tag-gray' , callback: function() {}},

                ]}
            ]
        };

        this._hubService.shared_var['cm'] = menu;
        this._hubService.shared_var['cm_hidden'] = false;
    }

    click(event: MouseEvent, offer: Offer, i: number) {
        this.setLocation(offer);

        if (event.button == 2) {    // right click
            if (this.selectedOffers.indexOf(offer) == -1) { // if not over selected items
                this.lastClckIdx = i;
                this.selectedOffers = [offer];
            }
        } else {
            if (event.ctrlKey) {
                // add to selection
                this.lastClckIdx = i;
                this.selectedOffers.push(offer);
                this.offerSelected(offer);
            } else if (event.shiftKey) {
                this.selectedOffers = [];
                var idx = i;
                var idx_e = this.lastClckIdx;
                if (i > this.lastClckIdx) {
                    idx = this.lastClckIdx;
                    idx_e = i;
                }
                while (idx <= idx_e) {
                    var oi = this.offers[idx++];
                    this.selectedOffers.push(oi);
                }
            } else {
                this.lastClckIdx = i;
                this.selectedOffers = [offer];
            }
        }
    }

    offerSelected(offer: Offer) {

    }

    dblClick(offer: Offer) {
        this.openOffer(offer);
    }

    tStart(event, offer: Offer) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        clearTimeout(this.to);
        this.to = setTimeout(() => {
            this.openOffer(offer);
        }, 1000);
    }

    tEnd(event, offer: Offer) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        clearTimeout(this.to);
    }

    setLocation(o: Offer) {
        if (o.locationLat && o.locationLon) {
            this.lat = o.locationLat;
            this.lon = o.locationLon;
        }
    }

    openOffer(offer: Offer) {
        var tab_sys = this._hubService.getProperty('tab_sys');
        tab_sys.addTab('offer', {offer: offer});
    }

    scroll(e) {
        if(this.canLoad == 0 && ~~(this.hitsCount/this.perPage)+1 != this.page){
            if (e.currentTarget.scrollTop + e.currentTarget.clientHeight >= e.currentTarget.scrollHeight ) {
                    this.page += 1;
                    this.listOffers(1, e);
            }
        }
    }

    listEndOrStart(pageAdd: number, toDown: number, event: Event){
        if(this.canLoad == 0 && ~~(this.hitsCount/this.perPage)+1 != this.page){
            this.page = this.page + pageAdd;
            if(this.page < 0) this.page = 0;
            this.listOffers(toDown, event);
        }
    }

    docClick() {
        this.sgList = [];
    }

    select(itm) {
        this.searchQuery = itm;
        this.sgList = [];
    }

    searchStringChanged(e) {
        let c = this;
        clearTimeout(this.suggestionTo);
        this.suggestionTo = setTimeout(function() {
            c.searchParamChanged(e);
        }, 500);
    }

    searchParamChanged(e) {
        if (this.searchQuery.length > 0) {
            let sq = this.searchQuery.split(" ");
            let lp = sq.pop()
            let q = sq.join(" ");
            this.sgList = [];
            if (lp.length > 0) {
                // запросить варианты
                this._suggestionService.listKeywords(this.searchQuery).subscribe(sgs => {
                    sgs.forEach(e => {
                        this.sgList.push(e);
                    })
                })
            }
        }
        this.page = 0;
        /*for (var i = 0; i < localStorage.length; i++) {
            let name : string = localStorage.key(i);
            if(name.indexOf('offer_page') > -1)
                localStorage.removeItem(name);
        }*/
        this.offers=[];
        this.listOffers(1);
    }

    sortChanged(e) {
        if (e.order == 0) {
            delete this.sort[e.field];
        } else {
            if (e.order == 1) {
                this.sort[e.field] = "ASC";
            } else {
                this.sort[e.field] = "DESC";
            }
        }
        /*for (var i = 0; i < localStorage.length; i++) {
            let name : string = localStorage.key(i);
            if(name.indexOf('offer_page') > -1)
                localStorage.removeItem(name);
        }*/
        this.page = 0;
        this.listOffers(1);
    }

    markerClick(o: Offer) {
        //r.selected = !r.selected;
        // scroll to object !?
        // lets get dirty!
        //if (r.selected) {
        let e: HTMLElement = <HTMLElement>this.list.querySelector('#r' + o.id);
        this.selectedOffers = [o];
        this.list.scrollTop = e.offsetTop - e.clientHeight;
        //}
    }

    addOffer() {
        var tab_sys = this._hubService.getProperty('tab_sys');
        tab_sys.addTab('offer', {offer: new Offer()});
    }

    toggleSource(s: string) {
        if (s == 'local') {
            this.source = OfferSource.LOCAL;
        } else {
            this.source = OfferSource.IMPORT;
        }
        this.offers = [];
        this.page = 0;
        this.sort={};
        let tfStr = localStorage.getItem('tableFields'+this.source);
        if (tfStr) {
            let tf = JSON.parse(tfStr);

            for (var fid in tf) {
                if(tf[fid].s != 0){
                    if (tf[fid].s == 1) {
                        this.sort[fid] = "ASC";
                    } else {
                        this.sort[fid] = "DESC";
                    }
                }
                /*this.fields.forEach(f => {
                    if (f.id == fid) {
                        f.visible = tf[fid].v;
                        f.sort = tf[fid].s;
                    }
                });*/
            }
        }

        this.listOffers(1);
    }

    getInputWidth(){
        if(this.tableMode)
            return '100%';
        else return '90%';
    }

    getSearchPosition(){
        if(this.tableMode)
            return '10px';
        else return '85px';
    }

    clickMenu(evt: any){
            this.selectedOffers.forEach(o => {
                if(evt.event == "add_to_local"){
                    if(this.source == OfferSource.LOCAL){
                        o.changeDate = Math.round((Date.now() / 1000));
                    } else{
                        o.addDate = null;
                    }
                    o.stageCode = 'raw';
                    if(evt.agent){
                        o.agentId = evt.agent.id;
                        o.agent = evt.agent;
                    } else {
                        o.agentId = null;
                        o.agent = null;
                    }
                    if(!o.person && o.phones_import && o.phones_import.length > 0){
                        let pers: Person = new Person();
                        pers.phoneBlock.main =  "+"+ o.phones_import[0];
                        o.phones_import[1] ? pers.phoneBlock.office = "+"+ o.phones_import[1] : null;
                        o.phones_import[2] ? pers.phoneBlock.other = "+"+ o.phones_import[2] : null;
                        o.phones_import[3] ? pers.phoneBlock.cellphone = "+"+ o.phones_import[3] : null;
                        o.phones_import[4] ? pers.phoneBlock.home = "+"+ o.phones_import[4] : null;
                        if(evt.agent) {
                            pers.agent = evt.agent
                            pers.agentId = evt.agent.id;
                        }
                        this._personService.save(pers).subscribe(
                            data => {
                                o.person = data;
                                o.personId = data.id;
                                this._offerService.save(o);
                            }
                        );
                    } else{
                        o.personId = o.person.id;
                        this._offerService.save(o);
                    }
                } else if(evt.event == "add_to_person"){
                    if(!o.person && o.phones_import && o.phones_import.length > 0){
                        let pers: Person = new Person();
                        pers.phoneBlock.main =  "+"+ o.phones_import[0];
                        o.phones_import[1] ? pers.phoneBlock.office = "+"+ o.phones_import[1] : null;
                        o.phones_import[2] ? pers.phoneBlock.other = "+"+ o.phones_import[2] : null;
                        o.phones_import[3] ? pers.phoneBlock.cellphone = "+"+ o.phones_import[3] : null;
                        o.phones_import[4] ? pers.phoneBlock.home = "+"+ o.phones_import[4] : null;
                        this._personService.save(pers).subscribe(
                            data => {
                                o.person = data;
                                o.personId = data.id;
                                /*this.offers.forEach(t => {
                                    if(t.phones_import)
                                });*/
                                var tabSys = this._hubService.getProperty('tab_sys');
                                tabSys.addTab('person', {person: o.person});
                            }
                        );
                    }
                }
                else if(evt.event == "add_to_company"){
                    if(!o.person && !o.company && o.phones_import && o.phones_import.length > 0){
                        let org: Organisation = new Organisation();
                        org.phoneBlock.main =  "+"+ o.phones_import[0];
                        o.phones_import[1] ? org.phoneBlock.office = "+"+ o.phones_import[1] : null;
                        o.phones_import[2] ? org.phoneBlock.other = "+"+ o.phones_import[2] : null;
                        o.phones_import[3] ? org.phoneBlock.cellphone = "+"+ o.phones_import[3] : null;
                        o.phones_import[4] ? org.phoneBlock.home = "+"+ o.phones_import[4] : null;
                        this._organisationService.save(org).subscribe(
                            data => {
                                o.company = data;
                                o.companyId = data.id;
                                var tabSys = this._hubService.getProperty('tab_sys');
                                tabSys.addTab('organisation', {organisation: o.company});
                            }
                        );
                    }
                } else if(evt.event == "del_agent"){
                    o.agentId = null;
                    o.agent = null;
                    this._offerService.save(o);
                } else if(evt.event == "del_obj"){
                    this._offerService.delete(o).subscribe(
                        data => {
                                this.selectedOffers.splice(this.selectedOffers.indexOf(o), 1);
                                this.offers.splice(this.offers.indexOf(o), 1);
                        }
                    );
                } else if(evt.event == "check"){
                    let phones = (o.person && o.person.phoneBlock) ? PhoneBlock.getAsArray(o.person.phoneBlock).join(" ")  :
                                    ( (o.company && o.company.phoneBlock) ? PhoneBlock.getAsArray(o.company.phoneBlock).join(" ") :
                                        ( o.phones_import ? o.phones_import.join(" ")  : "")
                                    )

                    this.openPopup = {visible: true, task: "check", value: phones, person: o.person};
                } else if(evt.event == "photo"){
                    this.openPopup = {visible: true, task: "photo", offer: o, value: this.source};
                } else {
                    this._offerService.save(o);
                }
            });
            if(evt.event == "map"){
                this.openPopup = {visible: true, task: "map", offers: this.selectedOffers, value: this.source,
                    map: {lat: this.lat, lot: this.lon, zoom: this.zoom}
                };
            }
    }
}
