import {Component} from '@angular/core';


import {Tab} from '../../class/tab';
import {Offer} from '../../entity/offer';
import {Person} from '../../entity/person';
import {Organisation} from '../../entity/organisation';
import {Request} from '../../entity/request';
import {Task} from '../../class/task';
import {HistoryRecord} from '../../class/historyRecord';
import {User} from '../../entity/user';

import {HubService} from '../../service/hub.service';
import {ConfigService} from '../../service/config.service';
import {OfferService, OfferSource} from '../../service/offer.service';
import {RequestService} from '../../service/request.service';
import {TaskService} from '../../service/task.service';
import {HistoryService} from '../../service/history.service'
import {PersonService} from '../../service/person.service';
import {UserService} from '../../service/user.service';
import {AnalysisService} from '../../service/analysis.service'
import {Observable} from "rxjs";
import {SessionService} from "../../service/session.service";


@Component({
    selector: 'tab-request',
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

        .search-form {
            position: absolute;
            width: 41%;
            margin-left: 610;
            margin-top: 15px;
            z-index: 1;
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
            display: inline-block;
            float: left;
        }

        .with-button {
            overflow: hidden;
        }

        .with-button > input {
            float: left;
            width: calc(100% - 184px);
        }

        .search-button {
            width: 90px;
            height: 28px;
            background-color: #0b9700;
            color: #fff;
            cursor: pointer;
            font-size: 10pt;
            float: left;
            text-align: center;
        }

        .search-form.table-mode {
            border: 1px solid #fff;
        }

        .tool-box {
            height: 30px;
            margin: 0 12px;
        }

        .search-box {
            position: relative;
            margin: 12px 12 0 12;
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
            margin-right: 15px;
            height: 19px; /* костыль */
            border: none !important;
        }

        .text-value {
            height: 3rem;
            border: 1px solid #E5E5E5 !important;
        }

        .edit-block > .view-group, .view-block > .view-group {
            height: 30px;
            height: 30px;
            margin-left: 57px;
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

        .button {
            text-align: center;
            padding: 5px 15px;
            background-color: #3366cc;
            color: #fff;
            cursor: pointer;
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

        .edit-block >hr, .view-block >hr{
                margin: 5px -10px 5px 55px;
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

        .show_value{
            flex: 0 0 190px;
            margin-right: 30px;
            position: relative;
            text-align: right;
            height: 30px;
            display: flex;
            flex-direction: column;
        }

        .show_value > span:first-child{
            height: 10px;
            font-size: 8pt;
        }
        .show_value > span:last-child{
            font-size: 10pt;
            color: #959595;
        }

        .multiselect{
            width: 270px;
            position: relative;
            display: block;
            margin-right: 15px;
            overflow: hidden;
        }

        .head{
            width: 100%;
            height: 73px;
            display: block;
            background-color: #f7f7f7;
        }
        .new-request .rate{
            width: 370px;
            min-height: 150px;
            height: calc(100vh - 500px);
            background: white;
            overflow: scroll;
        }

        .new-request .rate >div:first-child{
            height: 40px;
            background: #f7f7f7;
            line-height: 40px;
            padding-left: 15px;
            text-transform: uppercase;
            font-size: 10pt;
            color: #5f5d5d;
            margin-top: 20px;
            margin-bottom: 20px;
        }

        .new-request .rate_line{
            width: 350px;
            margin-left: 15px;
            height: 20px;
            margin-top: 0px;
            display: flex;
        }

        .new-request .rate_line>div:last-child{
            line-height: 20px;
            margin-left: 15px;
            font-size: 9pt;
            color: #5b5b5b;
        }

        .new-request .rate_line >div:first-child {
            background-image: url(assets/star_rate.png);
            background-size: 13px 13px;
            width: 64px;
            background-position: left center;
            background-repeat: repeat-x;
        }

        .new-request .rate_line>div:first-child>div{
            background-image: url(assets/star_active.png);
            height: 20px;
            background-size: 13px 13px;
            background-position: left center;
            background-repeat: repeat-x;
        }
    `],
    template: `

        <div class="tab-button fixed-button" (click)="toggleLeftPane()">
            <span [ngClass]="{'icon-arrow-right': paneHidden, 'icon-arrow-left': !paneHidden}"></span>
        </div>

        <div class="new-request" [hidden]="!newRequest">
            <div class="header">
                <div class="header-label">{{ tab.header }}</div>
                <div class="search-form" [class.table-mode]="tableMode">
                    <div class="search-box with-button">
                        <input type="text" class="" placeholder="" [(ngModel)]="request.request" (keydown)="offer_search_keydown($event)"
                            style="height: 28px; background-color: rgb(247, 247, 247); border: 1px solid rgba(204, 204, 204, 0.47);"
                        >
                        <span class="icon-search" style="position: absolute; right: 190px;"></span>
                        <a (click)="toggleDraw()"><span>Обвести</span></a>
                        <div class="search-button" (click)="createRequest()">Добавить</div>
                    </div>
                    <div class="tool-box">
                        <div class="pull-left">
                            <div class="inline-select">
                                <ui-select class="view-value edit-value"
                                    [options] = "offerTypeCodeOptions"
                                    [value]="request.offerTypeCode"
                                    [config]="{icon: 'icon-', draw_arrow: true}"
                                    (onChange)="request.offerTypeCode = $event.selected.value; offer_search();"
                                    >
                                </ui-select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <!-- сильное колдунство, св-во right получаем из HubService -->
            <!-- TODO: сделать это отдельным компонентом -->
            <div  style="position: absolute; top: 114px; z-index: 1; " [style.right]="_hubService.shared_var['nb_width']">
                <div style="width: 370px; background-color: #fff; height: 500px; overflow: hidden;">
                    <div class="head">
                        <input type="text" style="width: 319px; margin-left: 10px; border: none; margin-top: 10px;"
                            (keydown)="offer_search_keydown($event)"
                        >
                        <span class="icon-search" style="margin-left: 10px; cursor: pointer;"
                            (click)="offer_search()"
                        ></span>
                        <div style="margin-top: 8px; margin-right: 35px; margin-left: auto; width: 126px; display: flex; align-items: center;">
                            <span style="margin-top: 0;margin-right: 5px;color: rgb(80, 80, 80);font-size: 10pt;">Общая база</span>
                            <ui-switch-button (newValue)="toggleSource($event)" [value]="source > 1 ? true : false"> </ui-switch-button>
                        </div>

                    </div>
                    <div class="" style="width: 100%; overflow-y: scroll; height: 427px;">
                        <digest-offer *ngFor="let offer of offers"
                            [offer]="offer"
                            [compact]="true"
                            (dblclick)="openOffer(offer)"
                        >
                        </digest-offer>
                    </div>
                </div>
                <div class="rate">
                    <div>Рейтинг локации</div>
                    <div class="rate_line" *ngFor="let rat of rate; let i = index">
                        <div on-mousemove ='inRate($event, i)' on-mouseout='outRate($event, i)' on-click='estimate($event,i)'>
                            <div [ngStyle]="{'width': rat.persent+'%'}"></div>
                        </div>
                        <div>{{rat.text}}</div>
                    </div>
                </div>
            </div>
            <google-map
                [latitude]="lat"
                [longitude]="lon"
                [zoom]="zoom"
                [objects]="offers"
                [draw_allowed]="mapDrawAllowed"
                (drawFinished)="drawFinished($event)"
            >
            </google-map>
        </div>


        <!------------------>

        <div class="request" (window:resize)="onResize($event)" [hidden]="newRequest">

            <!-- ЛЕВАЯ СТВОРКА: НАЧАЛО -->

            <div class="pane" [hidden]="paneHidden" [style.width.px]="paneWidth">
                <div class="header">
                    <div class="header-label">{{ tab.header }}</div>
                </div>

                <div style="overflow: scroll; overflow-x: hidden; height: calc(100% - 111px);
                        border-right: 1px solid #cccccc;">
                    <div class = "person_face">
                        <img src="/assets/offer_icon/district.png">
                        <div class="view-group" style="flex-wrap: wrap;margin-top: -1px;">
                            <div class="view-value name" style="text-transform: uppercase;"> {{ 'Заявка'}}</div>
                            <div class="view-value name" style="font-size: 14pt; margin-top: 3px;"> </div>
                        </div>
                        <div class="rate"></div>
                    </div>
                    <div class="pull-container" style="margin: 20px 10px 0px;">
                        <div class="pull-right" [hidden]="editEnabled" (click)="toggleEdit()"><a href="#" >Изменить</a></div>
                        <div class="pull-right" [hidden]="!editEnabled" (click)="save()"><a href="#" >Готово</a></div>
                    </div>

                    <div class="request-prop">
                        <!-- РЕЖИМ РЕДАКТИРОВАНИЯ: НАЧАЛО -->

                        <div class="edit-block" [hidden]="!editEnabled" style="margin: 10px 10px 10px 0px;">
                            <div class="header_col">Контактная информация</div>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/date_start.png)'"></div>
                            <div class="view-group" style='overflow: hidden; position: relative; display: block;'>
                                <ui-input-line [placeholder] = "'Дата заявки:'" [value] = "request.changeDate | formatDate"
                                    [width] = "'225px'" (onChange)= "request.changeDate = $event">
                                </ui-input-line>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/phone.png)'"></div>
                            <div class="view-group" style='position: relative; display: block;'>
                                <ui-input-line [placeholder] = "'Телефон:'" [value] = "person.name"
                                    [width] = "'225px'" (onChange)= "person = $event" [queryTipe]="'person'">
                                </ui-input-line>
                            </div>
                            <div class="header_col">Сопроводительная информация</div>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/user.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Ответственный</span>
                                <ui-slidingMenu class="view-value edit-value"
                                    [options] = "agentOpts"
                                    [value]="agent?.id"
                                    (onChange)="agentChanged($event)"
                                >
                                </ui-slidingMenu>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/status.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Стадия:</span>
                                <ui-slidingMenu class="view-value edit-value"
                                    [options] = "[
                                        {value: 'NO', label: '-'},
                                        {value: 'ACTIVE', label: 'Активно'},
                                        {value: 'NOT_ACTIVE', label: 'Не активно'},
                                        {value: 'ARCHIVE', label: 'Архив'}
                                    ]"
                                    [value]="request.stateCode"
                                    (onChange)="request.stateCode = $event.selected.value">
                                </ui-slidingMenu>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/person_icon/source.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Источник:</span>
                                <ui-slidingMenu class="view-value edit-value"
                                    [options] = "[
                                        {value: 'CALL', label: 'Входящий звонок'},
                                        {value: 'INTERNET', label: 'Интернет'},
                                        {value: 'PRINT', label: 'Печатное издание'},
                                        {value: 'PARTHER', label: 'Рассылка'},
                                        {value: 'CL_RECOMMEND', label: 'Рекомендация клиента'},
                                        {value: 'PAR_RECOMMEND', label: 'Рекомендация партнера'},
                                        {value: 'SOCIAL', label: 'Соц. сети'},
                                        {value: 'OTHER', label: 'Успешный опыт сотрудничества'}
                                    ]"
                                    [value]="request.stageCode"
                                    (onChange)="request.stageCode = $event.selected.value">
                                </ui-slidingMenu>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/offer_icon/offer.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Тип:</span>
                                <ui-slidingMenu class="view-value edit-value"
                                    [options] = "[
                                        {value: 'sale', label: 'Продажа'},
                                        {value: 'rent', label: 'Аренда'}
                                    ]"
                                    [value]="request.offerTypeCode"
                                    (onChange)="request.offerTypeCode = $event.selected.value">
                                </ui-slidingMenu>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/date_start.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Заявка:</span>
                                <input type="text" class="view-value edit-value" readonly [(ngModel)]="request.request">
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
                                <textarea class="view-value text-value"
                                placeholder="" [(ngModel)]="request.info"
                                style="text-align: left;"></textarea>
                            </div>
                        </div>

                        <!-- РЕЖИМ РЕДАКТИРОВАНИЯ: КОНЕЦ -->
                        <!-- РЕЖИМ ОТОБРАЖЕНИЯ: НАЧАЛО -->

                        <div class="view-block" [hidden]="editEnabled" style="margin: 10px 10px 10px 0px;">
                            <div class="header_col">Контактная информация</div>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/date_start.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Дата заявки:</span>
                                <span class="view-value"> {{ request.changeDate | formatDate }} </span>
                            </div>
                            <hr>
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
                                    [value]="person?.typeCode"
                                >
                                </ui-view-value>
                            </div>
                            <hr>
                            <div *ngIf='person'>
                                <div class='view_icon' [style.background-image]="'url(assets/user_icon/user.png)'"></div>
                                <div class="view-group">
                                    <span class="view-label">ФИО:</span>
                                    <span class="view-value" [class.link] = "person?.id" (click)="openPerson()">{{person?.name  || 'Не указано'}}</span>
                                </div>
                            </div>
                            <hr  *ngIf='person'>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/phone.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Телефон:</span>
                                <span class="view-value">{{person.phoneBlock?.main || person.phoneBlock?.cellphone || person.phoneBlock?.office}}</span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/email.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">E-mail:</span>
                                <span class="view-value">{{person.emailBlock?.main || person.emailBlock?.work }}</span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/website.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Web-сайт:</span>
                                <span class="view-value">
                                    <span *ngIf="!person?.webSite" class="view-value">Не указан</span>
                                    <a *ngIf="person?.webSite" [href]="'http://'+person.webSite" target="_blank">{{person?.webSite}}</a>
                                </span>
                            </div>
                            <hr *ngIf="person?.organisation">
                            <div  *ngIf="person?.organisation" class='view_icon' [style.background-image]="'url(assets/user_icon/office.png)'"></div>
                            <div  *ngIf="person?.organisation" class="view-group" >
                                <span class="view-label">Организация:</span>
                                <span class="view-value" [class.link] = "person?.organisation?.id" (click)="openOrganisation()">
                                    {{person?.organisation.type}}{{ person?.organisation.name ? (' "' +person?.organisation.name+ '"') : 'Не указано'}}
                                </span>
                            </div>

                            <div class="header_col">Сопроводительная информация</div>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/post.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Ответственный:</span>
                                <span class="view-value" [class.link] = " agent?.id" (click)="openUser()">{{ agent?.name || 'Не указан'}}</span>
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
                                <span class="view-label">Стадия:</span>
                                <ui-view-value
                                    [options] = "[
                                        {value: 'NO', label: '-'},
                                        {value: 'ACTIVE', label: 'Активно'},
                                        {value: 'NOT_ACTIVE', label: 'Не активно'},
                                        {value: 'ARCHIVE', label: 'Архив'}
                                    ]"
                                    [value]="request.stateCode"
                                >
                                </ui-view-value>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/person_icon/source.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Источник:</span>
                                <ui-view-value
                                    [options] = "[
                                        {value: 'CALL', label: 'Входящий звонок'},
                                        {value: 'INTERNET', label: 'Интернет'},
                                        {value: 'PRINT', label: 'Печатное издание'},
                                        {value: 'PARTHER', label: 'Рассылка'},
                                        {value: 'CL_RECOMMEND', label: 'Рекомендация клиента'},
                                        {value: 'PAR_RECOMMEND', label: 'Рекомендация партнера'},
                                        {value: 'SOCIAL', label: 'Соц. сети'},
                                        {value: 'OTHER', label: 'Успешный опыт сотрудничества'}
                                    ]"
                                    [value]="request.stageCode"
                                >
                                </ui-view-value>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/offer_icon/offer.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Тип:</span>
                                <ui-view-value
                                    [options] = "[
                                        {value: 'sale', label: 'Продажа'},
                                        {value: 'rent', label: 'Аренда'}
                                    ]"
                                    [value]="request.offerTypeCode"
                                >
                                </ui-view-value>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/date_end.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">Заявка:</span>
                                <span class="view-value"> {{ request.request }}</span>
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
                                <span class="view-value" style="height: initial;"> {{ request.info }} </span>
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
                    [iconUrls]="['assets/main_offers.png', 'assets/analitic.png', 'assets/history.png']"
                >
                    <ui-tab
                        [title]="'Главная'"
                        (tabSelect)="offersSelected()"
                    >
                        <!-- сильное колдунство, св-во right получаем из HubService -->
                        <!-- TODO: сделать это отдельным компонентом -->
                        <div  style="position: absolute; z-index: 1; border-left: 1px solid #ccc;" [style.right]="_hubService.shared_var['nb_width']">
                            <div style="width: 370px; background-color: #fff;">
                                    <div class="head">
                                        <input type="text" style="width: 319px; margin-left: 10px; border: none; margin-top: 10px;"
                                            (keydown)="offer_search_keydown($event)"
                                        >
                                        <span class="icon-search" style="margin-left: 10px; cursor: pointer;"
                                            (click)="offer_search()"
                                        ></span>
                                        <div style="margin-top: 8px; margin-right: 35px; margin-left: auto; width: 126px; display: flex; align-items: center;">
                                            <span style="margin-top: 0;margin-right: 5px;color: rgb(80, 80, 80);font-size: 10pt;">Общая база</span>
                                            <ui-switch-button (newValue)="toggleSource($event)" [value]="source > 1 ? true : false"> </ui-switch-button>
                                        </div>
                                    </div>
                                <div class="" style="width: 100%; overflow-y: scroll;" [style.height]="paneHeight">
                                    <digest-offer *ngFor="let offer of offers"
                                        [offer]="offer"
                                        [compact]="true"
                                    >
                                    </digest-offer>
                                </div>
                            </div>
                        </div>
                        <google-map
                            [latitude]="lat"
                            [longitude]="lon"
                            [zoom]="zoom"
                            [objects]="offers"
                            [polygone_points]="request?.searchArea"
                        >
                        </google-map>
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
                    <ui-tab
                        [title]="'История'"
                        (tabSelect)="historySelected()"
                    >
                        <div class="" style="max-width: 910px; overflow-y: scroll;" [style.height]="paneHeight">
                            <digest-history *ngFor="let record of historyRecs"
                                [historyRecord]="record"
                            >
                            </digest-history>
                        </div>
                    </ui-tab>
                </ui-tabs>
            </div>
            <!-- РАБОЧАЯ ОБЛАСТЬ: КОНЕЦ -->
        </div>
    `
})

export class TabRequestComponent {
    public tab: Tab;
    public request: Request;

    page: number = 0;
    perPage: number = 16;
    source: OfferSource = OfferSource.LOCAL;
    offers: Offer[];

    agent: User = new User();
    agentOpts: any[] = [];

    person: Person = new Person();
    personOpts: any[] = [];

    historyRecs: HistoryRecord[];

    newRequest: boolean = false;
    editEnabled: boolean = false;
    mapDrawAllowed: boolean = false;

    paneHidden: boolean = false;
    paneHeight: number;
    paneWidth: number;
    mapWidth: number;

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

    offerTypeCodeOptions =[
        {value: 'sale', label: 'Продажа'},
        {value: 'rent', label: 'Аренда'}
    ];

    stageCodeOptions = [
        {value: 'raw', label: 'Не активен'},
        {value: 'active', label: 'Активен'},
        {value: 'listing', label: 'Листинг'},
        {value: 'deal', label: 'Сделка'},
        {value: 'suspended', label: 'Приостановлен'},
        {value: 'archive', label: 'Архив'}
    ];

    rate = [
        {persent: 10, text: "Предприятия и промышленность", isRated: false},
        {persent: 25, text: "Образование, школы, д/сады", isRated: true},
        {persent: 50, text: "Парки, кинотеатры и отдых", isRated: false},
        {persent: 55, text: "Здоровье, поликлиники, аптеки", isRated: false},
        {persent: 45, text: "Спорт и фитнес", isRated: false},
        {persent: 40, text: "Развлечения и ночная жизнь", isRated: false},
        {persent: 75, text: "Рестораны и шопинг", isRated: false},
        {persent: 90, text: "Красота", isRated: false},
        {persent: 65, text: "Культура", isRated: false},
    ];

    /*
    stageCodeOptions = [
        {value: 'contact', label: 'Первичный контакт'},
        {value: 'pre_deal', label: 'Заключение договора'},
        {value: 'show', label: 'Показ'},
        {value: 'prep_deal', label: 'Подготовка договора'},
        {value: 'decision', label: 'Принятие решения'},
        {value: 'negs', label: 'Переговоры'},
        {value: 'deal', label: 'Сделка'}
    ];
    */

    constructor(private _hubService: HubService,
                private _configService: ConfigService,
                private _offerService: OfferService,
                private _requestService: RequestService,
                private _taskService: TaskService,
                private _analysisService: AnalysisService,
                private _historyService: HistoryService,
                private _personService: PersonService,
                private _userService: UserService,
                private _sessionService: SessionService
    ) {

        this._userService.list(null, null, "").subscribe(agents => {
            for (let i = 0; i < agents.length; i++) {
                var a = agents[i];
                this.agentOpts.push({
                    value: a.id,
                    label: a.name
                });
            }
        });


        /*this._personService.list(null, null, "").subscribe(persons => {
            for (let i = 0; i < persons.length; i++) {
                var p = persons[i];
                this.personOpts.push({
                    value: p.id,
                    label: p.name
                });
            }
        });*/

        setTimeout(() => {
            if (this.request.id) {
                this.tab.header = 'Заявка';
            } else {
                this.tab.header = 'Новая заявка';
            }
        });
    }

    ngOnInit() {
        this.request = this.tab.args.request;

        var c = this._configService.getConfig();
        let loc = this._sessionService.getAccount().location;
        if (this.request.searchArea && this.request.searchArea.length > 0) {

            var lat: number = 0.0;
            var lon: number = 0.0;
            this.request.searchArea.forEach(p => {
                lat += p.lat;
                lon += p.lon;
            })

            this.lat = lat / this.request.searchArea.length;
            this.lon = lon / this.request.searchArea.length;

        } else {
            if (c.map[loc]) {
                this.lat = c.map[loc].lat;
                this.lon = c.map[loc].lon;
                this.zoom = c.map[loc].zoom;
            } else {
                this.lat = c.map['default'].lat;
                this.lon = c.map['default'].lon;
                this.zoom = c.map['default'].zoom;
            }
        }
        if (this.request.id == null) {
            this.newRequest = true;
        } else {

        }

        this._offerService.list(0, 32, OfferSource.LOCAL, {offerTypeCode: this.request.offerTypeCode}, null, this.request.request, this.request.searchArea).subscribe(
            offers => {
                this.offers = offers.list;
            },
            err => console.log(err)
        );

        if (this.request.personId != null) {
            this._personService.get(this.request.personId).subscribe(
                data => {
                    this.person = data;
                }
            );
        }


        if (this.request.agentId != null) {
            this._userService.get(this.request.agentId).subscribe(agent => {
                this.agent = agent;
            });
        }

        this.calcSize();
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
        this.request.agentId = e.selected.value;
        if (this.request.agentId != null) {
            this._userService.get(this.request.agentId).subscribe(agent => {
                this.agent = agent;
            });
        }
    }

    personChanged(e) {
        this.request.personId = e.selected.value;
        if (this.request.agentId != null) {
            this._userService.get(this.request.agentId).subscribe(agent => {
                this.agent = agent;
            });
        }
    }

    save() {
        this._requestService.save(this.request).subscribe(request => {
            setTimeout(() => {
                this.request = request;
            });
            this.toggleEdit();
        });
    }

    offersSelected() {
        this.getOffers(0, 16);
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
        this._offerService.list(page, per_page, this.source, {offerTypeCode: this.request.offerTypeCode}, null, this.request.request, this.request.searchArea).subscribe(
            offers => {
                this.offers = offers.list;
            },
            err => console.log(err)
        );
    }

    offerSearch() {
        this.getOffers(this.page, this.perPage);
    }

    offer_search_keydown(e: KeyboardEvent) {
        if (e.keyCode == 13) {
            this.offerSearch();
        }
    }

    markerClick(r: Offer) {
        //r.selected = !r.selected;
        // scroll to object ???
    }

    drawFinished(e) {
        this.request.searchArea = e;
        this.offerSearch();
    }

    toggleDraw() {
        this.mapDrawAllowed = !this.mapDrawAllowed;
        if (!this.mapDrawAllowed) {
            this.request.searchArea = [];
            this.offerSearch();
        }
    }

    createRequest() {
        this.newRequest = false;

        this.save();
    }

    getOfferDigest(r: Offer) {
        return Offer.getDigest(r);
    }

    toggleSource(bool: boolean) {
        if (!bool) {
            this.source = OfferSource.LOCAL;
        } else {
            this.source = OfferSource.IMPORT;
        }
        this.page = 0;
        this.offerSearch();
    }

    showMenu(event){
        let parent: HTMLElement = (<HTMLElement>event.currentTarget).parentElement;
        let height: number = parent.getElementsByTagName('input').length * 35;
        if(parent.offsetHeight == 30){
            parent.style.setProperty('height', ""+(height+60)+'px');
            parent.style.setProperty('overflow', "visible");
             (<HTMLElement>event.currentTarget).style.setProperty('transform', 'rotate(180deg)');
        }
        else{
             parent.style.setProperty('height', "30px");
             parent.style.setProperty('overflow', "hidden");
              (<HTMLElement>event.currentTarget).style.setProperty('transform', 'rotate(0deg)')
        }
    }

    openOffer(offer: Offer) {
        var tab_sys = this._hubService.getProperty('tab_sys');
        tab_sys.addTab('offer', {offer: offer});
    }

    openUser(){
        if(this.agent.id){
            var tab_sys = this._hubService.getProperty('tab_sys');
            tab_sys.addTab('user', {user: this.agent});
        }
    }

    openOrganisation(){
        if(this.person.organisation.id){
            var tab_sys = this._hubService.getProperty('tab_sys');
            tab_sys.addTab('organisation', {organisation: this.person.organisation});
        }
    }

    openPerson(){
        if(this.person.id){
            var tab_sys = this._hubService.getProperty('tab_sys');
            tab_sys.addTab('person', {person: this.person});
        }
    }
}
