import {Component, OnInit, AfterViewInit, trigger, state, style, transition, animate } from '@angular/core';

import {FormatDatePipe} from '../../pipe/format-date.pipe';

import {Tab} from '../../class/tab';
import {User} from '../../entity/user';
import {Offer} from '../../entity/offer';
import {Person} from '../../entity/person';
import {Organisation} from '../../entity/organisation';
import {Request} from '../../entity/request';
import {Task} from '../../class/task';
import {HistoryRecord} from '../../class/historyRecord';

import {HubService} from '../../service/hub.service';
import {UserService} from '../../service/user.service';
import {ConfigService} from '../../service/config.service';
import {OfferService, OfferSource} from '../../service/offer.service';
import {RequestService} from '../../service/request.service';
import {TaskService} from '../../service/task.service';
import {HistoryService} from '../../service/history.service';
import {PersonService} from '../../service/person.service';
import {OrganisationService} from '../../service/organisation.service';
import {AnalysisService} from '../../service/analysis.service';
import {SessionService} from "../../service/session.service";


@Component({
    selector: 'tab-user',
    inputs: ['tab'],
    styles: [`
        .header1{
            width: 100%;
            height: 110px;
            line-height: 30px;
            border-bottom: 4px solid rgb(11, 151, 0);
            display: flex;
        }
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

        .sebm-google-map-container {
            height: 100%;
        }

        .offer-prop {
            overflow-y: scroll;
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
            swidth: 100%;
            height: 30px;
            border-bottom: 1px solid #e5e5e5;
            line-height: 30px;
            color: #fff;
        }

        .array-container{
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-end;
        }

        .array-container > span {
            display: block;
            margin-bottom: 5px;
        }

        .array-container > input {
            margin-bottom: 5px;
            width: 80%;
        }

        .two-way-switch {
            display: table;
            border: 1px solid #3366cc;
            cursor: pointer;
            display: none;
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
        }

        .person_face{
            height: 220px;
            background-color: #f7f7f7;
        }

        .person_face > .rate{
            height: 20px;
            background-image: url(assets/star_active.png);
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

        .head{
            width: 100%;
            height: 31px;
            display: block;
            border-bottom: 4px solid rgba(61, 155, 233, 1);
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

        .add_button{
            height: 25px;
            margin-left: 0;
            margin-right: auto;
            font-size: 10pt;
            text-align: right;
            line-height: 25px;
            color: #29ac3b;
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

    `],
    template: `
        <div class="tab-button fixed-button" (click)="toggleLeftPane()">
            <span [ngClass]="{'icon-arrow-right': paneHidden, 'icon-arrow-left': !paneHidden}"></span>
        </div>

        <div class="person" (window:resize)="onResize($event)">

            <!-- ЛЕВАЯ СТВОРКА: НАЧАЛО -->

            <div class="pane" [hidden]="paneHidden" [style.width.px]="paneWidth">
                <div class="header1">
                    <div class="header-label">{{ tab.header }}</div>
                </div>

                <div style="overflow: scroll; overflow-x: hidden; height: calc(100% - 111px);
                        border-right: 1px solid #cccccc;">
                    <div class = "person_face">
                        <img src="">
                        <div style="flex-wrap: wrap;margin-top: -1px;">
                            <div class="view-value name" style="text-transform: uppercase;"> {{ (user.name?.split(' ')[0] === undefined ? " " : user.name?.split(' ')[0])}}</div>
                            <div class="view-value name" style="font-size: 14pt; margin-top: 3px;">
                                {{ (user.name?.split(' ')[1] === undefined ? " " : user.name?.split(' ')[1]) }} {{(user.name?.split(' ')[2] === undefined ? " " : user.name?.split(' ')[2])}}
                            </div>
                        </div>
                        <div class="rate"></div>
                    </div>
                    <div class="pull-container">
                        <div class="font-sz-2 pull-left"><span class="color-g1" ><a  href="" target="_blank"></a></span></div>
                        <div class="font-sz-1 color-g2 pull-right"> {{ user.addDate | formatDate }} </div>
                    </div>
                    <div class="pull-container" style="margin: 20px 10px 0px;">
                        <div class="pull-right" [hidden]="editEnabled" (click)="toggleEdit()" style="font-size: 10pt;"><a href="#" >Изменить</a></div>
                        <div class="pull-right" [hidden]="!editEnabled" (click)="save()" style="font-size: 10pt;"><a href="#" >Готово</a></div>
                    </div>
                    <div class="person-prop">
                        <!-- РЕЖИМ РЕДАКТИРОВАНИЯ: НАЧАЛО -->

                        <div class="edit-block" [hidden]="!editEnabled" style="margin: 10px 10px 10px 0px;">
                            <div class="header_col">Информация</div>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/user.png)'"></div>
                            <div class="view-group" style='overflow: hidden; position: relative; display: block;'>
                                <ui-input-line [placeholder] = "'ФИО'" [value] = "user.name"
                                    [width] = "'225px'" (onChange)= "user.name = $event">
                                </ui-input-line>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/office.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Офис:</span>
                                <ui-slidingMenu class="view-value edit-value"
                                    [options] = "[
                                        {value: 'NO', label: 'Не указан'},
                                        {value: 'CENTRAL', label: 'Центральный'},
                                        {value: 'MAIN', label: 'Головной'}
                                    ]"
                                    [value]="user.office"
                                    (onChange)="user.office = $event.selected.value">
                                </ui-slidingMenu>

                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/department.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Отдел:</span>
                                <ui-slidingMenu class="view-value edit-value"
                                    [options] = "[
                                        {value: 'NOT', label: 'Не указан'},
                                        {value: 'LIVING', label: 'Жилая недвижимость'},
                                        {value: 'COMMERSIAL', label: 'Коммерческая недвижимость'},
                                        {value: 'SUBURBAN', label: 'Загородная недвижимость'}
                                    ]"
                                    [value]="user.departmentCode"
                                    (onChange)="user.departmentCode = $event.selected.value">
                                </ui-slidingMenu>

                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/post.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Статус:</span>
                                <ui-slidingMenu class="view-value edit-value"
                                    [options] = "[
                                        {value: 'NOT', label: 'Не указан'},
                                        {value: 'TRAINEE', label: 'Стажер'},
                                        {value: 'OPERATOR', label: 'Оператор Call-центра'},
                                        {value: 'AGENT', label: 'Агент'},
                                        {value: 'MANAGER', label: 'Менеджер'},
                                        {value: 'TOP_MANAGER', label: 'Топ Менеджер'},
                                        {value: 'DIRECTOR', label: 'Директор'}
                                    ]"
                                    [value]="user.positionCode"
                                    (onChange)="user.positionCode = $event.selected.value">
                                </ui-slidingMenu>
                            </div>
                            <hr>

                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/date_start.png)'"></div>
                            <div class="view-group" style='overflow: hidden; position: relative; display: block;'>
                                <ui-input-line [placeholder] = "'Дата приёма'" [value] = "user.recruitmentDate |  date:'dd.MM.yyyy'"
                                    [width] = "'225px'" (onChange)= "setDate($event, true)">
                                </ui-input-line>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/date_end.png)'"></div>
                            <div class="view-group" style='overflow: hidden; position: relative; display: block;'>
                                <ui-input-line [placeholder] = "'Дата увольнения'" [value] = "user.dismissalDate |  date:'dd.MM.yyyy'"
                                    [width] = "'225px'" (onChange)= "setDate($event, false)">
                                </ui-input-line>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/responsible.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Ответственный:</span>
                                <ui-slidingMenu class="view-value edit-value"
                                    [options] = "agentOpts"
                                    [value]="superior.id"
                                    (onChange)="agentChanged($event)"
                                >
                                </ui-slidingMenu>

                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/status.png)'"></div>
                            <div class="view-group" >
                                <span class="view-label">Состояние:</span>
                                <ui-slidingMenu class="view-value edit-value"
                                    [options] = "[
                                        {value: 'NOT', label: 'Не указано'},
                                        {value: 'ACTIVE', label: 'Активно'},
                                        {value: 'NOT_ACTIVE', label: 'Не активно'},
                                        {value: 'ARCHIVE', label: 'Архив'}
                                    ]"
                                [value]="user.statusCode"
                                (onChange)="user.statusCode = $event.selected.value">
                                >
                                </ui-slidingMenu>
                            </div>

                            <div class="header_col">Контакты</div>
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
                                    [values]="userPhone"
                                    [width]="'43%'"
                                    (onChange)="parseArray($event, userPhone)">
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
                                    [values]="userEmail"
                                    [width]="'36%'"
                                    (onChange)="parseArray($event, userEmail)">
                                </ui-multiselect>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/website.png)'"></div>
                            <div class="view-group" style='overflow: hidden; position: relative; display: block;'>
                                <ui-input-line [placeholder] = "'WEB-сайт:'" [value] = "user.webSite"
                                    [width] = "'225px'" (onChange)= "user.webSite = $event">
                                </ui-input-line>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/address.png)'"></div>
                            <div class="view-group multiply">
                                <ui-input-line [placeholder] = "'Адрес проживания:'" [value] = "addressStr"
                                    [width] = "'225px'" (onChange)= "parseArray($event, userAddress, true)" [queryTipe]="'address'" (clicked)="showMenu($event)">
                                </ui-input-line >
                                <div class='arrow' (click)="showMenu($event)" *ngIf="userAddress[0] && userAddress[0]?.value"></div>
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
                                    [values]="userAddress"
                                    [width]="'36%'"
                                    (onChange)="parseArray($event, userAddress)">
                                </ui-multiselect>
                            </div>

                            <div class="header_col">Вход в систему</div>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/login.png)'"></div>
                            <div class="view-group" style='overflow: hidden; position: relative; display: block;'>
                                <ui-input-line [placeholder] = "'Логин'" [value] = "user.login"
                                    [width] = "'225px'" (onChange)= "user.login = $event">
                                </ui-input-line>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/password.png)'"></div>
                            <div class="view-group" style='overflow: hidden; position: relative; display: block;'>
                                <ui-input-line [placeholder] = "'Пароль'" [value] = "user.password"
                                    [width] = "'225px'" (onChange)= "user.password = $event">
                                </ui-input-line>
                            </div>

                            <div class="header_col">Тэги</div>
                            <div style="margin: 0 0 20px 20px;">
                                <ui-tag-block
                                    [value] = "user.tag"
                                    (valueChange) = "user.tag = $event.value"
                                ></ui-tag-block>
                            </div>

                            <div class="header_col">Дополнительная информация</div>
                            <div class="view-group" style="flex-wrap: wrap; height: 50px; margin-left: 20px;">
                                <textarea class="view-value text-value"
                                    placeholder="" [(ngModel)]="user.info"
                                    style="text-align: left;">
                                </textarea>
                            </div>
                        </div>

                        <!-- РЕЖИМ РЕДАКТИРОВАНИЯ: КОНЕЦ -->
                        <!-- РЕЖИМ ОТОБРАЖЕНИЯ: НАЧАЛО -->

                        <div class="view-block" [hidden]="editEnabled" style="margin: 10px 10px 10px 0px;">
                            <div class="header_col">Информация</div>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/user.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">ФИО:</span>
                                <span class="view-value" > {{ user.name || 'Не указан'}}</span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/office.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Офис:</span>
                                <ui-view-value
                                    [options] = "[
                                        {value: 'NO', label: 'Не указан'},
                                        {value: 'CENTRAL', label: 'Центральный'},
                                        {value: 'MAIN', label: 'Головной'}
                                    ]"
                                    [value]="user.office"
                                >
                                </ui-view-value>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/department.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Отдел:</span>
                                <ui-view-value
                                    [options] = "[
                                        {value: 'NOT', label: 'Не указан'},
                                        {value: 'LIVING', label: 'Жилая недвижимость'},
                                        {value: 'COMMERSIAL', label: 'Коммерческая недвижимость'},
                                        {value: 'SUBURBAN', label: 'Загородная недвижимость'}
                                    ]"
                                    [value]="user.departmentCode"
                                >
                                </ui-view-value>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/post.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Статус:</span>
                                <ui-view-value
                                    [options] = "[
                                        {value: 'NOT', label: 'Не указан'},
                                        {value: 'TRAINEE', label: 'Стажер'},
                                        {value: 'OPERATOR', label: 'Оператор Call-центра'},
                                        {value: 'AGENT', label: 'Агент'},
                                        {value: 'MANAGER', label: 'Менеджер'},
                                        {value: 'TOP_MANAGER', label: 'Топ Менеджер'},
                                        {value: 'DIRECTOR', label: 'Директор'}
                                    ]"
                                    [value]="user.positionCode"
                                >
                                </ui-view-value>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/date_start.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Дата приёма:</span>
                                <span class="view-value"> {{ (user.recruitmentDate | date:'dd.MM.yyyy') || 'Не указанa'}}</span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/date_end.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Дата увольнения:</span>
                                <span class="view-value"> {{ (user.dismissalDate | date:'dd.MM.yyyy') || 'Не указанa'}}</span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/responsible.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Ответственный:</span>
                                <span class="view-value" [class.link] = "superior.id" (click)="openUser()"> {{ superior.name || 'Не назначен'}}</span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/status.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Состояние:</span>
                                <ui-view-value
                                    [options] = "[
                                        {value: 'NOT', label: 'Не указано'},
                                        {value: 'ACTIVE', label: 'Активно'},
                                        {value: 'NOT_ACTIVE', label: 'Не активно'},
                                        {value: 'ARCHIVE', label: 'Архив'}
                                    ]"
                                    [value]="user.statusCode"
                                >
                                </ui-view-value>
                            </div>

                            <div class="header_col">Контакты</div>
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
                                        {type: getDateUser(userPhone).type, value: getDateUser(userPhone).value}
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
                                        {type: getDateUser(userEmail).type, value: getDateUser(userEmail).value}
                                    ]"
                                >
                                </ui-multi-view>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/email.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">WEB-сайт:</span>
                                <span class="view-value">
                                    <span *ngIf="!user?.webSite" class="view-value">Не указан</span>
                                    <a *ngIf="user?.webSite" [href]="'http://'+user.webSite" target="_blank">{{user?.webSite}}</a>
                                </span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/address.png)'"></div>
                            <div class="view-group">
                                <ui-view-line
                                    [placeholder]= "'Адрес проживания:'" [value]="addressStr"
                                >
                                </ui-view-line>
                            </div>
                            <div class="header_col">Вход в систему</div>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/login.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Логин</span>
                                <span class="view-value"> {{ user.login }}</span>
                            </div>

                            <div class="header_col">Тэги</div>
                            <div style="margin: 0 0 20px 20px;">
                                <ui-tag-block
                                    [value] = "user.tag"
                                    (valueChange) = "user.tag = $event.value"
                                ></ui-tag-block>
                            </div>

                            <div class="header_col">Дополнительная информация</div>
                            <div class="view-group">
                                <span class="view-value" style="height: initial;"> {{ user.info }} </span>
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
                    [color] = "'#0b9700'"
                >
                    <!--<ui-tab
                        [title]="'Предложения'"
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
                        <!--<div  style="position: absolute; top: 0px; z-index: 1; border-left: 1px solid #ccc;" [style.right]="_hubService.shared_var['nb_width']">
                            <div style="width: 330px; background-color: #fff;">
                                <div class="head">
                                    <input type="text" style="width: 280px; margin-left: 10px; border: 1px solid silver;
                                                                background-color: #f7f7f7;"
                                        (keydown)="offerSearchKeydown($event)"
                                    >
                                    <span class="icon-search" style="margin-left: 10px; cursor: pointer;"
                                        (click)="offerSearch()"
                                    ></span>
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
                        <!--<google-map [latitude]="lat" [longitude]="lon" [objects]="offers" [zoom]="zoom">
                        </google-map>
                    </ui-tab>-->

                    <ui-tab
                        [title]="'Главная'"
                        (tabSelect)="requestsSelected()"
                    >
                        <div class="" style="margin: 15px;">
                            <div class="two-way-switch">
                                <div [class.active]="requestOfferType == 'sale'" (click)="toggleOffer('sale')">Продажа</div>
                                <div [class.active]="requestOfferType == 'rent'" (click)="toggleOffer('rent')">Аренда</div>
                            </div>
                        </div>
                        <div class="" style="max-width: 910px; overflow-y: scroll; " [style.height]="paneHeight">

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

export class TabUserComponent implements OnInit, AfterViewInit {
    public tab: Tab;
    user: User;
    getDateUser = User.getData;
    superior: User = new User();
    superiorOpts = [];
    offers: Offer[];
    requests: Request[];

    userPhone: any[]=[];
    userEmail: any[]=[];
    userAddress: any[]=[];
    addressStr: string = '';

    historyRecs: HistoryRecord[];

    agentOpts: any[] = [];

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

    getRole(val){
        switch(val){
            case 'AGENT': return null;
            case 'MANAGER': return 'Менеджер';
            case 'TOP': return 'Директор';
        }
    }

    constructor(private _hubService: HubService,
                private _userService: UserService,
                private _configService: ConfigService,
                private _offerService: OfferService,
                private _requestService: RequestService,
                private _taskService: TaskService,
                private _analysisService: AnalysisService,
                private _historyService: HistoryService,
                private _personService: PersonService,
                private _organisationService: OrganisationService,
                private _sessionService: SessionService
    ) {

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

        this.user = this.tab.args.user;
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

        if (this.user.id == null) {
            this.editEnabled = true;
        }

        this.updateArrays();

        this._userService.list(null, null, "").subscribe(managers => {
            for (let m of managers) {
                this.superiorOpts.push({
                    value: m.id,
                    label: m.name
                });
            }
        });

        if (this.user.superiorId != null) {
            this._userService.get(this.user.superiorId).subscribe(superior => {
                this.superior = superior;
            });
        }

        this.calcSize();
    }

    ngAfterViewInit() {
        setTimeout(() => {
            if (this.user.id) {
                this.tab.header = 'Пользователь ';
            } else {
                this.tab.header = 'Новый пользователь';
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

    superiorChanged(e) {
        this.user.superiorId = e.selected.value;
        if (this.user.superiorId != null) {
            this._userService.get(this.user.superiorId).subscribe(superior => {
                this.superior = superior;
            });
        }
    }

    save() {
        let tem = this.getIndex(this.userPhone, "MOBILE");
        this.user.phoneBlock.cellphone =  tem > -1 ? this.userPhone[tem].value: null;
        tem =  this.getIndex(this.userPhone, "HOME");
        this.user.phoneBlock.home =  tem > -1 ? this.userPhone[tem].value : null;
        tem = this.getIndex(this.userPhone, "WORK");
        this.user.phoneBlock.office =  tem > -1 ? this.userPhone[tem].value  : null;
        tem = this.getIndex(this.userPhone, "MAIN");
        this.user.phoneBlock.main =  tem > -1 ? this.userPhone[tem].value  : null;
        tem = this.getIndex(this.userPhone, "SAME");
        this.user.phoneBlock.other =  tem > -1 ? this.userPhone[tem].value  : null;
        tem = this.getIndex(this.userPhone, "FAX");
        this.user.phoneBlock.fax =  tem > -1 ? this.userPhone[tem].value  : null;

        tem = this.getIndex(this.userAddress, "KRAY");
        this.user.fullAddress.region =  tem > -1 ? this.userAddress[tem].value  : undefined;
        tem = this.getIndex(this.userAddress, "CITY");
        this.user.fullAddress.city =  tem > -1 ? this.userAddress[tem].value  : undefined;
        tem = this.getIndex(this.userAddress, "DISTRICT");
        this.user.fullAddress.admArea =  tem > -1 ? this.userAddress[tem].value  : undefined;
        tem = this.getIndex(this.userAddress, "STREET");
        this.user.fullAddress.street =  tem > -1 ? this.userAddress[tem].value  : undefined;
        tem = this.getIndex(this.userAddress, "HOUSE");
        this.user.fullAddress.house =  tem > -1 ? this.userAddress[tem].value  : undefined;
        tem = this.getIndex(this.userAddress, "HOUSING");
        this.user.fullAddress.housing =  tem > -1 ? this.userAddress[tem].value  : undefined;
        tem = this.getIndex(this.userAddress, "FLAT");
        this.user.fullAddress.apartment =  tem > -1 ? this.userAddress[tem].value  : undefined;

        tem =  this.getIndex(this.userEmail, "MAIN");
        this.user.emailBlock.main = tem > -1 ? this.userEmail[tem].value  : null;
        tem = this.getIndex(this.userEmail, "WORK");
        this.user.emailBlock.work = tem > -1 ? this.userEmail[tem].value  : null;
        this._userService.save(this.user).subscribe(user => {
            setTimeout(() => {
                this.user = user;
            });
            this.toggleEdit();
        });

        setTimeout(()=> {
            this.updateArrays();
        },1000);
    }

    offersSelected() {
        this.getOffers(1, 16);
    }

    requestsSelected() {
        this.getRequests(0, 32);
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

    getOffers(page, perPage) {
        this._offerService.list(0, 32, OfferSource.LOCAL, {agentId: this.user.id, offerTypeCode: this.requestOfferType}, null, "", []).subscribe(offers => {
            this.offers = offers.list;
        });
    }

    getRequests(page, perPage) {
        this._requestService.list(0, 32, this.requestOfferType, "all", this.user.id, null, "").subscribe(requests => {
            this.requests = requests;
        });
    }

    offerSearchKeydown(e: KeyboardEvent) {
        if (e.keyCode == 13) {
            this.getOffers(0, 16);
        }
    }

    markerClick(r: Offer) {
        //r.selected = !r.selected;
        // scroll to object ???
    }

    toggleOffer(offer_type: string) {
        this.requestOfferType = offer_type;
        this.getOffers(0, 16);
        this.getRequests(0, 32);
    }

    getOfferDigest(r: Offer) {
        return Offer.getDigest(r);
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

    agentChanged(e) {
        this.user.superiorId = e.selected.value;
        this._userService.get(this.user.superiorId).subscribe(agent => {
            this.superior = agent;
        });
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
                if(array[i].value && array[i].value.trim() != '')
                    return i;
                else return -1;
        }
        return -1;
    }

    setDate(value, place){
        value = value.replace('/','.');
        if (value.split('.').length == 3  &&  value.split('.')[2]){
            if(value.split('.')[2].length > 3){
                if(place)
                    this.user.recruitmentDate = Math.round(new Date(value.split('.')[2],value.split('.')[1]-1,value.split('.')[0]).getTime());
                 else
                    this.user.dismissalDate = Math.round(new Date(value.split('.')[2],value.split('.')[1]-1,value.split('.')[0]).getTime());
            }
        }
    }

    getAddressStr(){
            this.addressStr = this.user.fullAddress.city !== undefined ? "" + this.user.fullAddress.city : '';
            this.addressStr += this.user.fullAddress.street !== undefined ? ", " + this.user.fullAddress.street : '';
            this.addressStr += this.user.fullAddress.house !== undefined ? ", " + this.user.fullAddress.house : '';
            if(this.userAddress.length == 0)
                this.addressStr = '';
    }

    updateArrays(){
        this.userPhone=[
            {type: 'MOBILE', value:  this.user.phoneBlock.cellphone},
            {type: 'HOME', value:  this.user.phoneBlock.home},
            {type: 'WORK', value: this.user.phoneBlock.office},
            {type: 'MAIN', value:  this.user.phoneBlock.main},
            {type: 'SAME', value:  this.user.phoneBlock.other},
            {type: 'FAX', value:  this.user.phoneBlock.fax}
        ];

        this.userEmail=[
            {type: 'WORK', value:  this.user.emailBlock.work},
            {type: 'MAIN', value:  this.user.emailBlock.main}
        ];

        this.userAddress=[
            {type: 'KRAY', value: this.user.fullAddress.region},
            {type: 'CITY', value: this.user.fullAddress.city},
            {type: 'DISTRICT', value: this.user.fullAddress.admArea},
            {type: 'STREET', value: this.user.fullAddress.street},
            {type: 'HOUSE', value: this.user.fullAddress.house},
            {type: 'HOUSING', value: this.user.fullAddress.housing},
            {type: 'FLAT', value: this.user.fullAddress.apartment}
        ];

        this.getAddressStr();
    }

    openUser(){
        if(this.superior.id){
            var tab_sys = this._hubService.getProperty('tab_sys');
            tab_sys.addTab('user', {user: this.superior});
        }
    }
}
