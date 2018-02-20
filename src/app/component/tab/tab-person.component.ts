import {Component, OnInit, AfterViewInit} from '@angular/core';


import {AnalysisService} from '../../service/analysis.service'
import {Tab} from '../../class/tab';
import {User} from '../../entity/user';
import {Offer} from '../../entity/offer';
import {Person} from '../../entity/person';
import {Organisation} from '../../entity/organisation';
import {Request} from '../../entity/request';
import {Task} from '../../class/task';
import {HistoryRecord} from '../../class/historyRecord';

import {HubService} from '../../service/hub.service';
import {ConfigService} from '../../service/config.service';
import {OfferService, OfferSource} from '../../service/offer.service';
import {RequestService} from '../../service/request.service';
import {TaskService} from '../../service/task.service';
import {HistoryService} from '../../service/history.service';
import {PersonService} from '../../service/person.service';
import {OrganisationService} from '../../service/organisation.service';
import {UserService} from '../../service/user.service';
import {SessionService} from "../../service/session.service";


@Component({
    selector: 'tab-person',
    inputs: ['tab'],
    styles: [`
        .header_col{
            width: calc(100% - 10px);
            height: 40px;
            background-color: #f7f7f7;
            padding-left: 20px;
            text-transform: uppercase;
            font-size: 10pt;
            color: #5f5d5d;
            line-height: 40px;
            margin-bottom: 10px;
        }
        .pane {
            float: left;
            width: 370px;
            height: 100%;
        }

        .work-area {
            float: left;
            width: 100%;
            height: 100%;
        }

        .tab-button {
            width: 30px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            font-size: 12px !important;
            cursor: pointer;
            color: #666;
        }

        .fixed-button {
            position: fixed;
            top: 0;
            left: 0;
        }

        .view-group {
            margin-bottom: 5px;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            height: 30px;
        }

        .view-label {
            white-space: nowrap;
            color: rgb(80, 80, 80);
            margin-top: 5px;
            font-size: 10pt;
            margin-right: 5px;
        }

        .view-value {
            width: 100%;
            text-align: right;
            color: #696969;
            font-size: 10pt;
            margin-top: 5px;
            height: 19px; /* костыль */
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }

        .edit-value {
            width: 100%;
            text-align: right;
            color: #696969;
            font-size: 10pt;
            height: 19px; /* костыль */
            border: none !important;
            overflow: visible;
        }

        .text-value {
            height: 3rem;
            border: 1px solid #E5E5E5 !important;
        }

        .edit-block > .view-group, .view-block > .view-group {
            height: 30px;
            margin-left: 57px;
        }

        .show_value{
            flex: 0 0 190px;
            margin-right: 30px;
            position: relative;
            text-align: right;
            height: 30px;
            display: flex;
            flex-direction: column;
            width: 143px;
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .edit-block >hr, .view-block >hr{
                margin: 5px -10px 5px 55px;
        }

        .show_value > span:first-child{
            height: 10px;
            font-size: 8pt;
        }
        .show_value > span:last-child{
            font-size: 10pt;
            color: #959595;
        }


        .tile-x {
            margin-right: 10px;
            width: 150px;
            height: 150px;
            color: #fff;
            position: relative;
        }


        .tile {
            margin: 0;
            margin-right: 10px;
        }

        .icon {
            line-height: 64px;
        }

        .tile-content.iconic .icon {
            width: 128px;
            margin-left: -64px;
        }

        .chart-block {
            overflow:hidden;
            border: 1px solid #e5e5e5;
        }

        .chart-header {
            width: 100%;
            height: 30px;
            border-bottom: 1px solid #e5e5e5;
            line-height: 30px;
            color: #fff;
        }

        .array-container > span {
            display: block;
            margin-bottom: 5px;
        }

        .array-container > input {
            margin-bottom: 5px;
        }

        .two-way-switch {
            display: table;
            border: 1px solid #3366cc;
            cursor: pointer;
        }

        .two-way-switch > div {
            display: table-cell;
            width: 90px;
            text-align: center;
            padding: 5px 15px;
            background-color: #fff;
            color: #333;
        }

        .two-way-switch > div.active {
            background-color: #3366cc;
            color: #fff;
        }

        .button {
            text-align: center;
            padding: 5px 15px;
            background-color: #3366cc;
            color: #fff;
            cursor: pointer;
            margin-top: 25px;
        }

        .view_icon{
            width: 28px;
            height: 25px;
            background-size: contain;
            float: left;
            background-repeat: no-repeat;
            background-position: center;
            margin-right: 12px;
            margin-top: 2px;
            margin-left: 17px;
        }

        .person_face{
            height: 220px;
            background-color: #f7f7f7;
        }

        .person_face > .rate{
            height: 20px;
            background-image: url(assets/star_rate.png);
            background-size: contain;
            width: 100px;
            margin-left: 20px;
            margin-top: 10px;
        }

        .person_face > img{
            width: 120px;
            height: 90px;
            margin: 20px 0 10 20px;
        }

        .person_face  .name{
            margin: 0 0 0 20px;
            border: 0 !important;
            font-size: 16pt;
            text-align: left;
            background-color: transparent;
            color: #595a5a;
            height: 23px;
            line-height: 23px;
        }

        .multiselect{
            width: 280px;
            position: relative;
            display: block;
            margin-right: 15px;
            overflow: hidden;
        }

        .multiply{
            position: relative;
            display: block;
            height: 30px;
            width: 280px;
            margin-right: 15px;
            margin-left: 0;
            overflow: hidden;
        }
        .arrow{
            background-image: url(assets/arrow.png);
            width: 18px;
            height: 10px;
            background-size: cover;
            margin: 0 10px;
            background-position: center;
            flex: 0 0 18px;
            position: absolute;
            top: 5px;
            right: -10px;
        }

        .lock a{
            color: #d6d6d6;
            text-decoration: none;
            cursor: no-drop;
        }

    `],
    template: `

        <div class="tab-button fixed-button" (click)="toggleLeftPane()">
            <span [ngClass]="{'icon-arrow-right': paneHidden, 'icon-arrow-left': !paneHidden}"></span>
        </div>

        <div class="person" (window:resize)="onResize($event)">

        <!-- ЛЕВАЯ СТВОРКА: НАЧАЛО -->

            <div class="pane" [hidden]="paneHidden" [style.width.px]="paneWidth">
                <div class="header">
                    <div class="header-label">{{ tab.header }}</div>
                </div>
                <div style="overflow: scroll; overflow-x: hidden; height: calc(100% - 111px);
                        border-right: 1px solid #cccccc;">
                        <div class = "person_face">
                    <img src="">
                    <div class="view-group" *ngIf="!editEnabled" style="flex-wrap: wrap;margin-top: -1px;">
                        <div class="view-value name" style="text-transform: uppercase;"> {{ person.name}}</div>
                        <div class="view-value name" style="font-size: 14pt; margin-top: 3px;"> {{ person.name}}</div>
                    </div>
                    <div class="view-group" *ngIf="editEnabled">
                        <input type="text" class="view-value edit-value name" [(ngModel)]="person.name">
                        <div class="pensil" style="position: relative; margin-right: 35px;"></div>
                    </div>
                    <div class="rate"></div>
                </div>
                <!--<div class="pull-container">
                    <div class="font-sz-2 pull-left">Источник: <span class="color-g1"><a href="" target="_blank"></a></span></div>
                    <div class="font-sz-1 color-g2 pull-right"> {{ person.add_date | formatDate }} </div>
                </div>-->
                <div class="pull-container" style="margin: 20px 10px 0px;">
                    <div class="pull-right" [hidden]="editEnabled" (click)="toggleEdit()"><a href="#" >Изменить</a></div>
                    <div class="pull-right" [hidden]="!editEnabled" (click)="save()"><a href="#" >Готово</a></div>
                </div>
                <div class="person-prop" [style.height]="paneHeight">

                        <!-- РЕЖИМ РЕДАКТИРОВАНИЯ: НАЧАЛО -->
                    <div class="edit-block" [hidden]="!editEnabled" style="margin: 10px 10px 10px 0px;">

                        <div class="header_col">Общая информация</div>
                        <div class='view_icon' [style.background-image]="'url(assets/person_icon/category.png)'"></div>
                        <div class="view-group">
                            <span class="view-label pull-left">Тип:</span>
                            <ui-slidingMenu class="view-value edit-value"
                                [options] = "[
                                    {value: 'NOT', label: 'Не указан'},
                                    {value: 'client', label: 'Клиент'},
                                    {value: 'realtor', label: 'Конкурент'},
                                    {value: 'company', label: 'Наша компания'},
                                    {value: 'partner', label: 'Партнер'},
                                    {value: 'owner', label: 'Собственник'}

                                ]"
                                [value]="person.typeCode"
                                (onChange)="person.typeCode = $event.selected.value">
                            >
                            </ui-slidingMenu>
                        </div>
                        <hr>
                        <div class='view_icon' [style.background-image]="'url(assets/user_icon/user.png)'"></div>
                        <div class="view-group" style='overflow: hidden; position: relative; display: block;'>
                            <ui-input-line [placeholder] = "'ФИО:'" [value] = "person.name"
                                [width] = "'225px'" (onChange)= "person.name = $event">
                            </ui-input-line>
                        </div>
                        <hr>
                        <div class='view_icon' [style.background-image]="'url(assets/user_icon/address.png)'"></div>
                        <div class="view-group multiselect" style='height: 30px;'>
                            <ui-input-line [placeholder] = "'Адрес:'" [value] = "addressStr"
                                [width] = "'225px'" (onChange)= "parseArray($event, personAddress, true)" [queryTipe]="'address'" (clicked)="showMenu($event)">
                            </ui-input-line>
                            <div class='arrow' (click)="showMenu($event)" *ngIf="personAddress[0] && personAddress[0].value !== undefined"></div>
                            <ui-multiselect class="view-value edit-value" style=""
                                [options] = "[
                                    {value: 'KRAY', label: 'Регион'},
                                    {value: 'CITY', label: 'Нас. пункт'},
                                    {value: 'DISTRICT', label: 'Район'},
                                    {value: 'STREET', label: 'Улица'},
                                    {value: 'HOUSE', label: 'Дом'},
                                    {value: 'HOUSING', label: 'Корпус'},
                                    {value: 'FLAT', label: 'Квартира'}
                                ]"
                                [masks] = "['','','','','','','']"
                                [values]="personAddress"
                                [width]="'36%'"
                                (onChange)="parseArray($event, personAddress, true)">
                            </ui-multiselect>
                        </div>
                        <hr>
                        <div class='view_icon' [style.background-image]="'url(assets/user_icon/phone.png)'"></div>
                        <div class="view-group multiply">
                            <span class="view-label pull-left">Телефоны:</span>
                            <div class="show_value">{{" "}}</div>
                            <div class='arrow' (click)="showMenu($event)"></div>
                            <ui-multiselect class="view-value edit-value" style=""
                                [options] = "[
                                    {value: 'MOBILE', label: 'Мобильный'},
                                    {value: 'HOME', label: 'Домашний'},
                                    {value: 'WORK', label: 'Рабочий'},
                                    {value: 'MAIN', label: 'Основной'},
                                    {value: 'SAME', label: 'Другой'}
                                ]"
                                [masks] = "['+_ (___) ___-__-__',
                                            '+_ (____) __-__-__',
                                            '+_ (___) ___-__-__',
                                            '+_ (____) ___-___',
                                            '+_ (____) __-__-__']"
                                [values]="personPhone"
                                [width]="'43%'"
                                (onChange)="parseArray($event, personPhone)">
                            </ui-multiselect>
                        </div>
                        <hr>
                        <div class='view_icon' [style.background-image]="'url(assets/user_icon/email.png)'"></div>
                        <div class="view-group multiply">
                            <span class="view-label pull-left">E-mail:</span>
                            <div class="show_value">{{" "}}</div>
                            <div class='arrow' (click)="showMenu($event)"></div>
                            <ui-multiselect class="view-value edit-value" style=""
                                [options] = "[
                                    {value: 'WORK', label: 'Рабочий'},
                                    {value: 'MAIN', label: 'Личный'}
                                    ]"
                                [masks] = "['', '']"
                                [values]="personEmail"
                                [width]="'36%'"
                                (onChange)="parseArray($event, personEmail)">
                            </ui-multiselect>
                        </div>
                        <hr>
                        <div class='view_icon' [style.background-image]="'url(assets/user_icon/website.png)'"></div>
                        <div class="view-group" style='overflow: hidden; position: relative; display: block;'>
                            <ui-input-line [placeholder] = "'WEB-сайт:'" [value] = "person.webSite"
                                [width] = "'225px'" (onChange)= "person.webSite = $event">
                            </ui-input-line>
                        </div>

                        <div class="header_col">Сопроводительная информация</div>
                        <div class='view_icon' [style.background-image]="'url(assets/user_icon/user.png)'"></div>
                        <div class="view-group">
                            <span class="view-label pull-left">Ответственный:</span>
                            <ui-slidingMenu class="view-value edit-value"
                                [options] = "agentOpts"
                                [value]="person.userId"
                                (onChange)="agentChanged($event)"
                            >
                            </ui-slidingMenu>
                        </div>
                        <hr>
                        <div class='view_icon' [style.background-image]="'url(assets/person_icon/contract.png)'"></div>
                        <div class="view-group" style='overflow: hidden; position: relative; display: block;'>
                                <ui-input-line [placeholder] = "'Договор № от'" [value] = "person.contract"
                                        [width] = "'225px'" (onChange)= "person.contract = $event">
                                </ui-input-line>
                        </div>
                        <hr>
                        <div class='view_icon' [style.background-image]="'url(assets/user_icon/status.png)'"></div>
                        <div class="view-group">
                            <span class="view-label pull-left">Состояние:</span>
                            <ui-slidingMenu class="view-value edit-value"
                                [options] = "[
                                    {value: 'NOT', label: 'Не указано'},
                                    {value: 'ACTIVE', label: 'Активно'},
                                    {value: 'NOT_ACTIVE', label: 'Не активно'},
                                    {value: 'ARCHIVE', label: 'Архив'}
                                ]"
                                [value]="person.stateCode"
                                (onChange)="person.stateCode = $event.selected.value">
                            >
                            </ui-slidingMenu>
                        </div>
                        <hr>
                        <div class='view_icon' [style.background-image]="'url(assets/person_icon/source.png)'"></div>
                        <div class="view-group">
                            <span class="view-label pull-left">Источник:</span>
                            <ui-slidingMenu class="view-value edit-value"
                                [options] = "[
                                    {value: 'NOT', label: 'Не указан'},
                                    {value: 'input', label: 'Входящий звонок'},
                                    {value: 'internet', label: 'Интернет'},
                                    {value: 'print', label: 'Печатное издание'},
                                    {value: 'spam', label: 'Рассылка'},
                                    {value: 'reccomend_cl', label: 'Рекомендация клиента'},
                                    {value: 'reccomend_pt', label: 'Рекомендация парнера'},
                                    {value: 'social', label: 'Социальные сети'},
                                    {value: 'excelent', label: 'Успешный опыт сотрудничества'},
                                    {value: 'cold', label: 'Холодная база'}
                                ]"
                                [value]="person.sourceCode"
                                (onChange)="person.sourceCode = $event.selected.value">
                            >
                            </ui-slidingMenu>
                        </div>
                        <hr>
                        <div class='view_icon' [style.background-image]="'url(assets/user_icon/office.png)'"></div>
                        <div class="view-group" style='position: relative; display: block;'>
                            <ui-slidingMenu class="view-value edit-value"
                                [options] = "organisationsOpts"
                                [value]="person.organisationId"
                                (onChange)="organisationChanged($event)"
                            >
                            </ui-slidingMenu>
                        </div>

                        <div class="header_col">Тэги</div>
                        <div style="margin: 0 0 20px 20px;">
                            <ui-tag-block
                                [value] = "person.tag"
                                (valueChange) = "person.tag = $event.value"
                            ></ui-tag-block>
                        </div>

                        <div class="header_col">Дополнительная информация</div>
                        <div class="view-group" style="flex-wrap: wrap; height: 50px; margin-left: 20px;">
                            <textarea class="view-value text-value" placeholder=""
                            [(ngModel)]="person.description" style="text-align: left;"></textarea>
                        </div>

                    </div>

                        <!-- РЕЖИМ РЕДАКТИРОВАНИЯ: КОНЕЦ -->
                        <!-- РЕЖИМ ОТОБРАЖЕНИЯ: НАЧАЛО -->
                    <div class="view-block" [hidden]="editEnabled" style="margin: 10px 10px 10px 0px;">
                            <div class="header_col">Общая информация</div>
                            <div class='view_icon' [style.background-image]="'url(assets/person_icon/category.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">Тип:</span>
                                <ui-view-value
                                    [options] = "[
                                        {value: 'NOT', label: 'Не указан'},
                                        {value: 'client', label: 'Клиент'},
                                        {value: 'realtor', label: 'Конкурент'},
                                        {value: 'company', label: 'Наша компания'},
                                        {value: 'partner', label: 'Партнер'}
                                    ]"
                                    [value]="person.typeCode"
                                >
                                </ui-view-value>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/user.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">ФИО:</span>
                                <span class="view-value"> {{ person.name }}</span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/address.png)'"></div>
                            <div class="view-group">
                                <ui-view-line
                                    [placeholder]= "'Адрес:'" [value]="addressStr"
                                >
                                </ui-view-line>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/phone.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">Телефон:</span>
                                <ui-multi-view
                                    [options] = "[
                                        {value: 'MOBILE', label: 'Мобильный'},
                                        {value: 'HOME', label: 'Домашний'},
                                        {value: 'WORK', label: 'Рабочий'},
                                        {value: 'MAIN', label: 'Основной'},
                                        {value: 'SAME', label: 'Другой'}
                                    ]"
                                    [values] = "[
                                        {type: getDateUser(personPhone).type, value: getDateUser(personPhone).value}
                                    ]"
                                >
                                </ui-multi-view>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/email.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">E-mail:</span>
                                <ui-multi-view
                                    [options] = "[
                                        {value: 'WORK', label: 'Рабочий'},
                                        {value: 'MAIN', label: 'Личный'}
                                        ]"
                                    [values] = "[
                                        {type: getDateUser(personEmail).type, value: getDateUser(personEmail).value}
                                    ]"
                                >
                                </ui-multi-view>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/website.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">WEB-сайт:</span>
                                <span class="view-value">
                                    <span *ngIf="!person?.webSite" class="view-value">Не указан</span>
                                    <a *ngIf="person?.webSite" [href]="'http://'+person.webSite" target="_blank">{{person?.webSite}}</a>
                                </span>
                            </div>

                            <div class="header_col">Сопроводительная информация</div>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/user.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">Ответственный:</span>
                                <span class="view-value" [class.link] = " person.agent?.id" (click)="openUser()">{{ person.agent?.name || 'Не указан'}}</span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/person_icon/contract.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">Договор:</span>
                                <span class="view-value">{{person.contract}}</span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/status.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">Состояние:</span>
                                <ui-view-value
                                    [options] = "[
                                        {value: 'NOT', label: 'Не указано'},
                                        {value: 'ACTIVE', label: 'Активно'},
                                        {value: 'NOT_ACTIVE', label: 'Не активно'},
                                        {value: 'ARCHIVE', label: 'Архив'}
                                    ]"
                                    [value]="person.stateCode"
                                >
                                </ui-view-value>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/person_icon/source.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">Источник:</span>
                                <ui-view-value
                                    [options] = "[
                                        {value: 'NOT', label: 'Не указан'},
                                        {value: 'input', label: 'Входящий звонок'},
                                        {value: 'internet', label: 'Интернет'},
                                        {value: 'print', label: 'Печатное издание'},
                                        {value: 'spam', label: 'Рассылка'},
                                        {value: 'reccomend_cl', label: 'Рекомендация клиента'},
                                        {value: 'reccomend_pt', label: 'Рекомендация парнера'},
                                        {value: 'social', label: 'Социальные сети'},
                                        {value: 'excelent', label: 'Успешный опыт сотрудничества'},
                                        {value: 'cold', label: 'Холодная база'}
                                    ]"
                                    [value]="person.sourceCode"
                                >
                                </ui-view-value>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/office.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">Организация:</span>
                                <span class="view-value" [class.link] = "person.organisation?.id" (click)="openOrganisation()">
                                    {{getTypeName(person.organisation?.type)}}{{ person?.organisation?.name ? (' "' +person?.organisation?.name+ '"') : 'Не указана'}}
                                </span>
                            </div>

                            <div class="header_col">Тэги</div>
                            <div style="margin: 0 0 20px 20px;">
                                <ui-tag-block
                                    [value] = "person.tag"
                                    (valueChange) = "person.tag = $event.value"
                                ></ui-tag-block>
                            </div>

                            <div class="header_col">Дополнительная информация</div>
                            <div class="view-group">
                                <span class="view-value" style="height: initial;"> {{ person.description }} </span>
                            </div>
                    </div>
                        <!-- РЕЖИМ ОТОБРАЖЕНИЯ: КОНЕЦ -->

                </div>
            </div>
        </div>

            <!-- Левая СТВОРКА: КОНЕЦ -->
            <!-- РАБОЧАЯ ОБЛАСТЬ: НАЧАЛО -->

            <div class="work-area" [style.width.px]="mapWidth">
                <ui-tabs
                    [headerMode]="!paneHidden"
                    [iconUrls]="['assets/main_offers.png', 'assets/base.png', 'assets/base_plus.png']"
                >
                    <ui-tab
                        [title]="'Главная'"
                        (tabSelect)="offersSelected()"
                    >
                        <div class="" style="position: absolute; top: 15px; left: 15px; z-index: 1;">
                            <div class="two-way-switch">
                                <div [class.active]="requestOfferType == 'sale'" (click)="toggleOffer('sale')">Продажа</div>
                                <div [class.active]="requestOfferType == 'rent'" (click)="toggleOffer('rent')">Аренда</div>
                            </div>
                        </div>
                        <!-- сильное колдунство, св-во right получаем из HubService -->
                        <!-- TODO: сделать это отдельным компонентом -->
                        <div  style="position: absolute; top: -31px; z-index: 1; border-left: 1px solid #ccc;" [style.right]="_hubService.shared_var['nb_width']">
                            <div style="width: 330px; background-color: #fff;">
                                <div class="header">
                                    <input type="text" style="width: 280px; margin-left: 10px; border: none;"
                                        (keydown)="offer_search_keydown($event)"
                                    >
                                    <span class="icon-search" style="margin-left: 10px; cursor: pointer;"
                                        (click)="offer_search()"
                                    ></span>
                                </div>

                                <div class="" style="width: 100%; overflow-y: scroll;" [style.height]="paneHeight">
                                    <div class="button" (click)="createOffer()">
                                        Добавить предложение
                                    </div>
                                    <digest-offer *ngFor="let offer of offers"
                                      [offer]="offer"
                                      [compact]="true"
                                     >
                                    </digest-offer>
                                </div>
                            </div>
                        </div>
                        <google-map [latitude]="lat" [longitude]="lon" [objects]="offers" [zoom]="zoom">
                        </google-map>
                    </ui-tab>
                    <ui-tab
                        [title]="'Заявки'"
                        (tabSelect)="requestsSelected()"
                    >
                        <div class="" style="margin: 15px;">
                            <div class="two-way-switch">
                                <div [class.active]="requestOfferType == 'sale'" (click)="toggleOffer('sale')">Продажа</div>
                                <div [class.active]="requestOfferType == 'rent'" (click)="toggleOffer('rent')">Аренда</div>
                            </div>
                        </div>
                        <div class="" style="max-width: 910px; overflow-y: scroll; " [style.height]="paneHeight">
                            <div class="button" (click)="createRequest()">Добавить заявку</div>
                            <digest-request *ngFor="let request of requests"
                                [request]="request"
                            >
                            </digest-request>
                        </div>
                    </ui-tab>
                    <ui-tab [title]="'Аналитика'"
                        (tabSelect)="analysisSelected()"
                    >
                        <div class="" style="max-width: 910px; overflow-y: scroll;" [style.height]="paneHeight">
                            <div style="padding: 15px;">
                                <div class="tile bg-gred fg-white">
                                    <div class="tile-content iconic">
                                        <span class="icon">{{ ch1_data_v1 }}</span>
                                    </div>
                                    <span class="tile-label">Всего задач</span>
                                </div>
                                <div class="chart-block">
                                    <div class="chart-header bg-gred">
                                        <span style="margin-left: 25px;">Активность</span>
                                    </div>
                                    <div>
                                        <ui-pie-chart
                                            [title]="''"
                                            [data]="ch1_data"
                                        >
                                        </ui-pie-chart>
                                    </div>
                                </div>
                            </div>
                            <div style="padding: 15px;">
                                <div style="float: left; display: flex; flex-direction: column;">
                                    <div class="tile bg-gorange fg-white" style="margin-bottom: 5px;">
                                        <div class="tile-content iconic">
                                            <span class="icon" style="font-size: 48px;">{{ ch4_data_v1 }}</span>
                                        </div>
                                        <span class="tile-label">Всего объявлений</span>
                                    </div>
                                    <div class="tile bg-gorange fg-white" >
                                        <div class="tile-content iconic">
                                            <span class="icon" style="font-size: 48px;">{{ ch4_data_v2 }}</span>
                                        </div>
                                        <span class="tile-label">Потрачено руб.</span>
                                    </div>
                                </div>

                                <div class="chart-block">
                                    <div class="chart-header bg-gorange">
                                        <span style="margin-left: 25px;">Реклама</span>
                                    </div>
                                    <div>
                                        <ui-bar-chart
                                            [title]="''"
                                            [data]="ch4_data"
                                        >
                                        </ui-bar-chart>
                                    </div>
                                </div>
                            </div>
                            <div style="padding: 15px;">
                                <div class="tile bg-gblue fg-white">
                                    <div class="tile-content iconic">
                                        <span class="icon">{{ ch2_data_v1 }}</span>
                                    </div>
                                    <span class="tile-label">Всего заявок</span>
                                </div>
                                <div class="chart-block">
                                    <div class="chart-header bg-gblue">
                                        <span style="margin-left: 25px;">Заявки</span>
                                    </div>
                                    <div>
                                        <ui-line-chart
                                            [title]="''"
                                            [data]="ch2_data"
                                        >
                                        </ui-line-chart>
                                    </div>
                                </div>
                            </div>
                            <div style="padding: 15px;">
                                <div style="float: left; display: flex; flex-direction: column;">
                                    <div class="tile bg-ggreen fg-white" style="margin-bottom: 5px;">
                                        <div class="tile-content iconic">
                                            <span class="icon">{{ ch3_data_v1 }}</span>
                                        </div>
                                        <span class="tile-label">Успешно</span>
                                    </div>
                                    <div class="tile bg-ggreen fg-white">
                                        <div class="tile-content iconic">
                                            <span class="icon">{{ ch3_data_v2 }}</span>
                                        </div>
                                        <span class="tile-label">Не успешно</span>
                                    </div>
                                </div>
                                <div class="chart-block">
                                    <div class="chart-header bg-ggreen">
                                        <span style="margin-left: 25px;">Показы</span>
                                    </div>
                                    <div>
                                        <ui-line-chart
                                            [title]="''"
                                            [data]="ch3_data"
                                        >
                                        </ui-line-chart>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </ui-tab>


                    <!--<ui-tab
                        [title]="'История'"
                        (tabSelect)="historySelected()"
                    >
                        <div class="" style="max-width: 910px; overflow-y: scroll;" [style.height]="paneHeight">
                            <digest-history *ngFor="let record of historyRecs"
                                [historyRecord]="record"
                            >
                            </digest-history>
                        </div>
                    </ui-tab>-->
                </ui-tabs>
            </div>
            <!-- РАБОЧАЯ ОБЛАСТЬ: КОНЕЦ -->
      </div>
    `
})

export class TabPersonComponent implements OnInit, AfterViewInit {
    public tab: Tab;

    person: Person = new Person();

    getDateUser = User.getData;

    personEmail: Array<any> = [];
    personPhone: Array<any> = [];
    personAddress: Array<any> = [];

    organisationsOpts: any[] = [];
    agentOpts: any[] = [];

    agent: User;
    organisation: Organisation;
    offers: Offer[];
    requests: Request[];
    historyRecs: HistoryRecord[];

    paneHidden: boolean = false;
    paneHeight: number;
    paneWidth: number;
    mapWidth: number;

    editEnabled: boolean = false;

    requestOfferType: string = 'sale';

    lat: number;
    lon: number;
    zoom: number;

    ch1_data: any[] = [];
    ch2_data: any[] = [];
    ch3_data: any[] = [];

    ch4_data: any[] = [];

    ch1_data_v1: number;
    ch2_data_v1: number;
    ch3_data_v1: number;
    ch3_data_v2: number;
    ch4_data_v1: number;
    ch4_data_v2: number;
    addressStr: string = '';

    constructor(private _hubService: HubService,
                private _configService: ConfigService,
                private _offerService: OfferService,
                private _requestService: RequestService,
                private _taskService: TaskService,
                private _analysisService: AnalysisService,
                private _historyService: HistoryService,
                private _personService: PersonService,
                private _organisationService: OrganisationService,
                private _userService: UserService,
                private _sessionService: SessionService
    ) {

        _organisationService.list("").subscribe(organisations => {
                for (let i = 0; i < organisations.length; i++) {
                    var o = organisations[i];
                    this.organisationsOpts.push({
                        value: o.id,
                        label: o.name
                    });
                }
            }
        );

        _userService.list(null, null, "").subscribe(agents => {
            for (let i = 0; i < agents.length; i++) {
                var a = agents[i];
                this.agentOpts.push({
                    value: a.id,
                    label: a.name
                });
            }
        });
    }

    ngOnInit() {
        this.person = this.tab.args.person;
        this._personService.get(this.person.id).subscribe(pers => {
            this.person = pers;
        });
        var c = this._configService.getConfig();

        let loc = this._sessionService.getAccount().location;

        this.personAddress=[
            {type: 'KRAY', value: this.person.fullAddress.region},
            {type: 'CITY', value: this.person.fullAddress.city},
            {type: 'DISTRICT', value: this.person.fullAddress.admArea},
            {type: 'STREET', value: this.person.fullAddress.street},
            {type: 'HOUSE', value: this.person.fullAddress.house},
            {type: 'HOUSING', value: this.person.fullAddress.housing},
            {type: 'FLAT', value: this.person.fullAddress.apartment}
        ];

        this.getAddressStr();

        this.personPhone=[
            {type: 'MOBILE', value:  this.person.phoneBlock.cellphone},
            {type: 'HOME', value:  this.person.phoneBlock.home},
            {type: 'WORK', value: this.person.phoneBlock.office},
            {type: 'MAIN', value:  this.person.phoneBlock.main},
            {type: 'SAME', value:  this.person.phoneBlock.other},
            {type: 'FAX', value:  this.person.phoneBlock.fax}
        ];
        this.personEmail=[
            {type: 'WORK', value:  this.person.emailBlock.work},
            {type: 'MAIN', value:  this.person.emailBlock.main}
        ];

        if (c.map[loc]) {
            this.lat = c.map[loc].lat;
            this.lon = c.map[loc].lon;
            this.zoom = c.map[loc].zoom;
        } else {
            this.lat = c.map['default'].lat;
            this.lon = c.map['default'].lon;
            this.zoom = c.map['default'].zoom;
        }

        if (this.person.organisationId) {
            this._organisationService.get(this.person.organisationId).subscribe(org => {
                this.organisation = org;
            });
        }

        if (this.person.userId != null) {
            this._userService.get(this.person.userId).subscribe(agent => {
                this.person.agent = agent;
            });
        }

        if (this.person.id == null) {
            this.toggleEdit();
        }
        this.calcSize();
    }

    ngAfterViewInit() {
        setTimeout(() => {
            if (this.person.id) {
                this.tab.header = 'Контакт';
            } else {
                this.tab.header = 'Новый контакт';
            }
        });
    }

    onResize(e) {
        this.calcSize();
    }

    calcSize() {
        if (this.paneHidden) {
            this.paneWidth = 0;
        } else {
            this.paneWidth = 370;
        }
        this.mapWidth = document.body.clientWidth - (31) - this.paneWidth;
        this.paneHeight = document.body.clientHeight - 31;
    }

    toggleLeftPane() {
        this.paneHidden = !this.paneHidden;
        this.calcSize();
    }

    toggleEdit() {
        this.editEnabled = !this.editEnabled;
    }

    agentChanged(e) {
        this.person.userId = e.selected.value;
        if (this.person.userId != null) {
            this._userService.get(this.person.userId).subscribe(agent => {
                this.person.agent = agent;
            });
        }
    }

    organisationChanged(e) {
        this.person.organisationId = e.selected.value;
        if (this.person.organisationId != null) {
            this._organisationService.get(this.person.organisationId).subscribe(org => {
                this.person.organisation = org;
            });
        }
    }

    save() {
        let tem = this.getIndex(this.personPhone, "MOBILE");
        this.person.phoneBlock.cellphone =  tem > -1 ? this.personPhone[tem].value : null;
        tem =  this.getIndex(this.personPhone, "HOME");
        this.person.phoneBlock.home =  tem > -1 ? this.personPhone[tem].value : null;
        tem = this.getIndex(this.personPhone, "WORK");
        this.person.phoneBlock.office =  tem > -1 ? this.personPhone[tem].value : null;
        tem = this.getIndex(this.personPhone, "MAIN");
        this.person.phoneBlock.main =  tem > -1 ? this.personPhone[tem].value : null;
        tem = this.getIndex(this.personPhone, "SAME");
        this.person.phoneBlock.other =  tem > -1 ? this.personPhone[tem].value : null;
        tem = this.getIndex(this.personPhone, "FAX");
        this.person.phoneBlock.fax =  tem > -1 ? this.personPhone[tem].value : null;

        tem = this.getIndex(this.personAddress, "KRAY");
        this.person.fullAddress.region =  tem > -1 ? this.personAddress[tem].value : undefined;
        tem = this.getIndex(this.personAddress, "CITY");
        this.person.fullAddress.city =  tem > -1 ? this.personAddress[tem].value : undefined;
        tem = this.getIndex(this.personAddress, "DISTRICT");
        this.person.fullAddress.admArea =  tem > -1 ? this.personAddress[tem].value : undefined;
        tem = this.getIndex(this.personAddress, "STREET");
        this.person.fullAddress.street =  tem > -1 ? this.personAddress[tem].value : undefined;
        tem = this.getIndex(this.personAddress, "HOUSE");
        this.person.fullAddress.house =  tem > -1 ? this.personAddress[tem].value : undefined;
        tem = this.getIndex(this.personAddress, "HOUSING");
        this.person.fullAddress.housing =  tem > -1 ? this.personAddress[tem].value : undefined;
        tem = this.getIndex(this.personAddress, "FLAT");
        this.person.fullAddress.apartment =  tem > -1 ? this.personAddress[tem].value : undefined;

        tem =  this.getIndex(this.personEmail, "MAIN");
        this.person.emailBlock.main =  tem > -1 ? this.personEmail[tem].value : null;
        tem = this.getIndex(this.personEmail, "WORK");
        this.person.emailBlock.work =  tem > -1 ? this.personEmail[tem].value : null;

        this._personService.save(this.person).subscribe(
            person => {
                setTimeout(() => {
                    this.person.copyFields(person);
                    this.getAddressStr();
                });
                this.toggleEdit();
            },
            err => {
                console.log('Error: ' + err);
            }
        );

    }

    offersSelected() {
        this._offerService.list(0, 32, OfferSource.LOCAL, {offerTypeCode: this.requestOfferType, personId: this.person.id}, null,  "", []).subscribe(offers => {
            this.offers = offers.list;
        });
    }

    requestsSelected() {
        this._requestService.list(0, 32, this.requestOfferType, "all", null, this.person.id, "").subscribe(requests => {
            this.requests = requests;
        });
    }

    analysisSelected() {
        var a_data = this._analysisService.getObjAnalysis();
        this.ch1_data = a_data.ch1_data;
        this.ch1_data_v1 = a_data.ch1_data_v1;

        this.ch2_data = a_data.ch2_data;
        this.ch2_data_v1 = a_data.ch2_data_v1;

        this.ch3_data = a_data.ch3_data;
        this.ch3_data_v1 = a_data.ch3_data_v1;
        this.ch3_data_v2 = a_data.ch3_data_v2;

        this.ch4_data = [
            ['media', 'подано'],
            ['avito', 7],
            ['из рук в руки', 4],
            ['презент', 6],
            ['фарпост', 8],
            ['ВНХ', 6],
        ];

        this.ch4_data_v1 = 31;
        this.ch4_data_v2 = 5000;
    }

    historySelected() {
        this.historyRecs = this._historyService.getObjHistory();
    }

    getOffers(page, per_page) {
        /*
        this._offerService.list(page, per_page, ).subscribe(
            data => {
                this.offers = data;
            }
        );
        */
    }

    offer_search() {
        this.getOffers(0, 16);
    }

    offer_search_keydown(e: KeyboardEvent) {
        if (e.keyCode == 13) {
            this.offer_search();
        }
    }

    markerClick(r: Offer) {
        //r.selected = !r.selected;
        // scroll to object ???
    }

    createRequest() {
        var tab_sys = this._hubService.getProperty('tab_sys');
        var req = new Request();
        req.personId = this.person.id;
        tab_sys.addTab('request', {request: req});
    }

    toggleOffer(offer_type: string) {
        this.requestOfferType = offer_type;

        this._offerService.list(0, 32, OfferSource.LOCAL, {offerTypeCode: this.requestOfferType, personId: this.person.id}, null, "", []).subscribe(offers => {
            this.offers = offers.list;
        });

        this._requestService.list(0, 32, this.requestOfferType, "all", null, this.person.id, "").subscribe(requests => {
            this.requests = requests;
        });

    }

    createOffer() {
        var tab_sys = this._hubService.getProperty('tab_sys');
        tab_sys.addTab('offer', {offer: {}, person: this.person});
    }

    getOfferDigest(r: Offer) {
        return Offer.getDigest(r);
    }

    showMenu(event){
        let parent: HTMLElement = (<HTMLElement>event.currentTarget).parentElement;
        let height: number = parent.getElementsByClassName('input_field').length * 35;
        if (parent.offsetHeight == 30) {
            parent.style.setProperty('height', ""+(height+55)+'px');
            parent.style.setProperty('overflow', "visible");
             (<HTMLElement>event.currentTarget).style.setProperty('transform', 'rotate(180deg)');
        }
        else {
             parent.style.setProperty('height', "30px");
             parent.style.setProperty('overflow', "hidden");
              (<HTMLElement>event.currentTarget).style.setProperty('transform', 'rotate(0deg)')
        }
    }

    parseArray(values: Array<any>, obj, isAddress?: boolean){
        for(let val of values){
            let no = true;
            for(let en of obj){
                if(val.type == en.type){
                    en.value = val.value;
                    no = false;
                }
            }
            if(no && val.value)
                obj.push(val);
        }
        for(let i=0 ; i< obj.length; ++i){
            if(obj[i].value === undefined || obj[i].value === null){
                obj.splice(i,1);
                i--;
            }
        }
        if(isAddress){
            this.getAddressStr();
        }

    }

    getIndex(array: Array<any>, str: string){
        for(let i =0; i<array.length; ++i){
            if(array[i].type == str)
                return i;
        }
        return -1;
    }

    getTypeName(type){
        switch(type){
            case "OOO": return "ООО";
            case "ZAO": return "ЗАО";
            case "AO": return "АО";
            case "PAO": return "ПАО";
            case "IP": return "ИП";
            case "OAO": return "ОАО";
            default: return "";
        }
    }

    getAddressStr(){
        this.addressStr = this.person.fullAddress.city !== undefined ? ""+this.person.fullAddress.city : '';
        this.addressStr += this.person.fullAddress.street !== undefined ? ", " + this.person.fullAddress.street : '';
        this.addressStr += this.person.fullAddress.house !== undefined ? ", " + this.person.fullAddress.house : '';
    }

    openUser() {
        if(this.person.agent.id){
            var tab_sys = this._hubService.getProperty('tab_sys');
            tab_sys.addTab('user', {user: this.person.agent});
        }
    }

    openOrganisation(){
        if(this.person.organisation.id){
            var tab_sys = this._hubService.getProperty('tab_sys');
            tab_sys.addTab('organisation', {organisation: this.person.organisation});
        }
    }

}
