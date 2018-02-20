import {Component, OnInit, AfterViewInit} from '@angular/core';

import {HubService} from '../../service/hub.service';
import {ConfigService} from '../../service/config.service';
import {OfferService} from '../../service/offer.service';
import {RequestService} from '../../service/request.service';
import {TaskService} from '../../service/task.service';
import {HistoryService} from '../../service/history.service'
import {PhotoService} from '../../service/photo.service'
import {UserService} from '../../service/user.service'

import {AnalysisService} from '../../service/analysis.service'
import {Tab} from '../../class/tab';
import {Offer} from '../../entity/offer';
import {Request} from '../../entity/request';
import {Task} from '../../class/task';
import {HistoryRecord} from '../../class/historyRecord';
import {Photo} from '../../class/photo';
import {User} from '../../entity/user';
import {PersonService} from "../../service/person.service";
import {Person} from "../../entity/person";
import {UploadService} from "../../service/upload.service";
import {SuggestionService} from "../../service/suggestion.service";

import {SessionService} from "../../service/session.service";
import {GoogleChartComponent} from '../ui/chart/google-chart.component';


@Component({
    selector: 'tab-offer',
    inputs: ['tab'],
    styles: [`
        .pane {
            float: left;
            width: 370px;
            height: 100%;
            //border-right: 1px solid #ccc;
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

        .offer-prop {
            overflow-y: scroll;
            height: calc(100% - 111px);
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
            width: 115px;
            display: inline-block;
            flex: 0 0 115px;
        }

        .view-value {
            width: 170px;
            text-align: right;
            color: #696969;
            font-size: 10pt;
            margin-top: 5px;
            height: 19px;
            margin-right: 17px;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .view-block .view-value {
            overflow: hidden;
            margin-right: 0;
        }

        .edit-value {
            width: 100%;
            text-align: right;
            color: #696969;
            font-size: 10pt;
            height: 19px; /* костыль */
            border: none !important;
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
            margin: 0 10px 0 0;
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
        .title_row{
            width: calc(100% - 20px);
            height: 30px;
            line-height: 30px;
            background-color: #f1f1f1;
            margin-bottom: 15px;
            padding-left: 20px;
            color: #464646;
            font-size: 11pt;
            margin-top: 30px;
        }

        .head{
            width: 100%;
            height: 73px;
            display: block;
            background-color: #f7f7f7;
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

        .edit-block hr, .view-block hr{
                margin: 5px -10px 5px 55px;
        }

        .graph{
            width: 359px;
            float: left;
            position: relative;
        }
        .graph > .price{
            position: absolute;
            z-index: 100;
            color: dimgrey;
            background: #f7f7f7;
            width: 100%;
            height: 53px;
            padding-left: 10px;
        }

        .arrow{
            background-image: url(assets/arrow.png);
            width: 18px;
            height: 10px;
            background-size: cover;
            margin: 5px 13px 0;
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
            font-size: 10pt;
            color: dimgrey;
            line-height: 30px;
        }

        .gm_container{
            width: calc(100% - 370px);
            height: 495px;
            display:flex;
        }

        .map_menu{
            width: 150px;
            background-color: #f7f7f7;
            //border-right: 1px solid silver;
            border-top: 1px solid silver;
        }
        .map_menu >div {
            height: 30px;
            width: 80%;
            text-align: left;
            background-color: rgba(0, 140, 219, 1);
            color: #ffffff;
            margin: 3px auto;
            line-height: 30px;
            font-size: 10pt;
            padding-left: 20px;
        }

        .map_menu >div:hover, .active_map_menu {
            background-color: rgba(18, 54, 120, 1) !important;
            color: white !important;
        }

        .offer_face{
            height: 220px;
            background-color: #f7f7f7;
            padding-top: 5px;
            position: relative;
        }

        .offer_face > .price{
            display: flex;
            margin: 0;
            justify-content: center;
            width: 100%;
        }

        .offer_face > .price > div{
            font-size: 20pt;
            text-align: center;
            color: #3d9be9;
            margin: 5px 0;
        }
        .offer_face > .price > div:after{
            content: " ";
            background-image: url(assets/ruble1.png);
            width: 28px;
            height: 28px;
            background-size: 27px;
            float: right;
            margin: 5px 0 0 2px
        }

        .offer_face > .rate{
            height: 20px;
            background-image: url(assets/star_active.png);
            background-size: contain;
            width: 100px;
            margin-left: 20px;
            margin-top: 6px;
        }

        .offer_face > div{
            font-size: 11pt;
            margin: 20px 0 0 20px;
            text-align: left;
            display: inline-block;
            width: 300px;
        }

        .offer_face > .street{
            font-size: 17pt;
            margin-top: -2px;
            color: black;
        }

        .offer_face > .district{
            font-size: 10pt;
            margin: -4px 0 22px 20px;
            color: dimgrey;
        }

        .offer_face > .rooms{
            font-size: 11pt;
            margin: 0 0 0 20px;
            text-align: left;
        }
        .offer_face > .rooms >div{
            width: 18px;
            height: 18px;
            float: left;
            background-size: cover;
            margin-right: 3px;
        }

        .offer_face > .date{
            right: 0;
            width: 159px;
            position: absolute;
            text-align: right;
            margin-right: 20px;
            color: #cccaca;
            font-size: 9pt;
            bottom: 23px;
        }

        .header_col{
            width: 100%;
            height: 40px;
            background-color: #f7f7f7;
            padding-left: 20px;
            text-transform: uppercase;
            font-size: 10pt;
            color: #5f5d5d;
            line-height: 40px;
            margin-bottom: 10px;
        }

        .star_container{
            height: 340px;
        }

        .statistic{
            position: relative;
            height: calc(100% - 0px);
            //border-right: 1px solid silver;
            display: flex;
            flex-wrap: wrap;
            align-content: flex-start;
            background-color: #f7f7f7;
            width: calc(100% - 371px);
            float: left;
            padding-top: 29px;
        }

        .statistic > div{
            margin-left: 20px;
            width: 356px;
        }

        .statistic > div:first-of-type >span{
            margin-top: 8px;
            display: block;
            font-size: 10pt;
            color: #5b5b5b;
        }

        .statistic > hr{
            height: 1px;
            width: 90%;
            margin: 0 auto 30px;
            border: 0;
            border-top: 1px solid silver;
        }

        .statistic .rate_line{
            width: 100%;
            height: 25px;
            display: flex;
        }

        .statistic > div:not(:last-child) >div:first-child {
            text-align: left;
            color: #293c63;
            width: 360px;
        }

        .statistic .rate_line>div:last-child{
            line-height: 25px;
            margin-left: 15px;
            font-size: 9pt;
            color: #5b5b5b;
        }

        .statistic > div:nth-child(3)>span{
            margin-top: 15px;
            display: block;
            font-size: 10pt;
            color: #5b5b5b;
            text-align: left;
        }

        .statistic > div .rate_line >div:first-child {
            background-image: url(assets/star_disable.png);
            background-size: 15px 15px;
            width: 74px;
            background-position: left center;
            background-repeat: repeat-x;
        }
        .statistic .rate_line>div:first-child>div{
            background-image: url(assets/star_active.png);
            height: 25px;
            background-size: 15px 15px;
            background-position: left center;
            background-repeat: repeat-x;
        }

        /*.statistic >div:nth-child(2):hover .rate_line >div:first-child{
            background-image: url(assets/star_rate_disabled.png);
            background-size: 20px 20px;
            width: 101px;
            background-position: left center;
            background-repeat: repeat-x;
        }

        .statistic >div:nth-child(2):hover .rate_line >div:first-child>div{
            background-image: url();
        }*/

        .multiply{
            position: relative;
            display: block;
            height: 30px;
            //width: 280px;
            margin-right: 5px;
            margin-left: 58px;
            overflow: hidden;
        }

        .suggestions {
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

        a {
            cursor: hand;
        }

        .a1{
            //margin-right: 18px;
            width: 143px;
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: right;
            font-size: 10pt;
            margin-top: 5px;
        }


    `],
    template: `
        <div class="tab-button fixed-button" (click)="toggleLeftPane()">
            <span [ngClass]="{'icon-arrow-right': paneHidden, 'icon-arrow-left': !paneHidden}"></span>
        </div>

        <div class="offer" (window:resize)="onResize($event)">

            <!-- ПРАВАЯ СТВОРКА: НАЧАЛО -->

            <div class="pane" [hidden]="paneHidden" [style.width.px]="paneWidth">
                <div class="header">
                    <div class="header-label">{{ tab.header }}</div>
                </div>
                <div class="offer-prop" style="overflow-x: hidden;">
                    <div class = "offer_face">
                        <div class="price"><div>{{offer.ownerPrice === undefined ? " " : split_number(offer.ownerPrice*1000)}}</div></div>
                        <span style=""></span>
                        <div class="type" style="text-transform: uppercase; color: #696969; height: 19px; margin-top: 0;">
                            <ui-view-value
                                [options] = "typeCodeOptions"
                                [value]="offer.typeCode"
                                [Style]="{'text-align': 'left', 'width': '300px'}"
                                    >
                            </ui-view-value>
                        </div>
                        <div class="street"> {{ (offer.fullAddress.street === undefined ? " " : offer.fullAddress.street) + (offer.fullAddress.house === undefined ? " " : (", "+ offer.fullAddress.house))}}</div>
                        <div class="district"> {{ (offer.fullAddress.city === undefined ? " " : offer.fullAddress.city) +(offer.district === undefined ? " " : (", "+ offer.district))}}</div>
                        <div class="rooms">
                            <div [style.background-image]="'url(assets/offer_icon/rooms.png)'"></div>
                            {{ "Комнат "+ (offer.roomsCount === undefined ? " " : offer.roomsCount)}}
                        </div>
                        <div class="rooms">
                            <div [style.background-image]="'url(assets/offer_icon/floor.png)'"></div>
                            {{ "Этаж "+ (offer.floor === undefined ? " " : offer.floor)}}
                        </div>
                        <div class="rate"></div>
                        <div class="date">{{offer.addDate | formatDate}}</div>
                    </div>

                    <div>
                        <div class="pull-container" style="margin: 20px 10px 0px;">
                            <div class="pull-right" [hidden]="editEnabled" (click)="toggleEdit()" style="font-size: 10pt;"><a href="#" >Изменить</a></div>
                            <div class="pull-right" [hidden]="!editEnabled" (click)="save()" style="font-size: 10pt;"><a href="#" >Готово</a></div>
                        </div>
                        <!--<div class="pull-container">

                            <div class="font-sz-1 color-g2 pull-right"> {{offer.lastSeenDate }} </div>
                        </div>
                        <div class="font-sz-2 color-g2 line-clamp line-clamp-2" style="margin: 5px 5px 0 5px;">{{ offer.sourceMediaText }}</div>
                        -->
                        <!-- РЕЖИМ РЕДАКТИРОВАНИЯ: НАЧАЛО -->

                        <div class="edit-block" [hidden]="!editEnabled" style="margin: 10px 0px 50px 0px;">
                            <div class="header_col">Поиск клиента</div>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/phone.png)'"></div>
                            <div class="view-group" style='position: relative; display: block;'>
                                <ui-input-line [placeholder] = "'Телефон:'" [value] = "offer.person?.name"
                                    [width] = "'225px'" (onChange)= "offer.person = $event" [queryTipe]="'person'">
                                </ui-input-line>
                            </div>

                            <div class="header_col">Сопроводительная информация</div>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/user.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Ответственный:</span>
                                <ui-slidingMenu class="view-value edit-value"
                                    [options] = "agentOpts"
                                    [value]="offer.agent?.id"
                                    (onChange)="agentChanged($event)"
                                >
                                </ui-slidingMenu>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/person_icon/contract.png)'"></div>
                            <div class="view-group" style='overflow: hidden; position: relative; display: block;'>
                                <ui-input-line [placeholder] = "'Договор № от'" [value] = "offer.contractStr"
                                        [width] = "'225px'" (onChange)= "offer.contractStr = $event">
                                </ui-input-line>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/offer_icon/stage.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Стадия:</span>
                                <ui-slidingMenu class="view-value edit-value"
                                    [options] = "stateCodeOptions"
                                    [value]="offer.stateCode"
                                    (onChange)="offer.stateCode = $event.selected.value"
                                >
                                </ui-slidingMenu>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/person_icon/source.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">Источник:</span>
                                <ui-slidingMenu class="view-value edit-value" *ngIf="!offer.sourceUrl"
                                    [options] = "sourceOptions"
                                    [value]="offer.sourceCode"
                                    (onChange)="offer.sourceCode = $event.selected.value"
                                >
                                </ui-slidingMenu>
                                <span class="color-g1" *ngIf="offer.sourceUrl">
                                    <a href="" target="_blank" class="a1">{{ offer.sourceUrl }}</a>
                                </span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/offer_icon/offer.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Предложение:</span>
                                <ui-slidingMenu class="view-value edit-value"
                                    [options] = "offerTypeCodeOptions"
                                    [value]="offer.offerTypeCode"
                                    (onChange)="offer.offerTypeCode = $event.selected.value"
                                >
                                </ui-slidingMenu>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/offer_icon/property_type.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Категория:</span>
                                <ui-slidingMenu class="view-value edit-value"
                                    [options] = "[
                                        {value: 'REZIDENTIAL', label: 'Жилая недвижимость'},
                                        {value: 'COMMERSIAL', label: 'Коммерческая недвижимость'},
                                        {value: 'LAND', label: 'Земельный участок'}
                                    ]"
                                    [value]="categoryOffer"
                                    (onChange)="categoryOffer = $event.selected.value"
                                >
                                </ui-slidingMenu>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/offer_icon/type.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Тип объекта:</span>
                                <ui-slidingMenu class="view-value edit-value"
                                    [options] = "getTypeCodeArray()"
                                    [value]="offer.typeCode"
                                    (onChange)="offer.typeCode = $event.selected.value"
                                >
                                </ui-slidingMenu>
                            </div>

                            <!--<div class="view-group">
                                <span class="view-label">Номер</span>
                                <input class="view-value edit-value vv-2" [(ngModel)]="offer.houseNum">/
                                <input class="view-value edit-value vv-2" [(ngModel)]="offer.apNum">
                            </div>-->


                            <div class = "header_col">Описание объекта:</div>
                    <div *ngIf="offer.typeCode == 'apartment' || offer.typeCode == 'room' || offer.typeCode == 'apartment_small' || offer.typeCode == 'apartment_small'">
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/address.png)'"></div>
                            <div class="view-group multiply" style='height: 30px;'>
                                <ui-input-line [placeholder] = "'Адрес объекта:'" [value] = "addressStr"
                                    [width] = "'225px'" (onChange)= "parseArray($event, offerAddress, true)" [queryTipe]="'address'" (clicked)="showMenu($event,true)">
                                </ui-input-line>
                                <div class='arrow' (click)="showMenu($event, true)" *ngIf="offerAddress[0] && offerAddress[0].value !== undefined"></div>
                                <ui-multiselect class="view-value edit-value" style=""
                                    [options] = "[
                                        {value: 'KRAY', label: 'Регион'},
                                        {value: 'CITY', label: 'Нас. пункт'},
                                        {value: 'DISTRICT', label: 'Адм. район'},
                                        {value: 'STREET', label: 'Улица'},
                                        {value: 'HOUSE', label: 'Дом'},
                                        {value: 'HOUSING', label: 'Корпус'},
                                        {value: 'FLAT', label: 'Квартира'}
                                    ]"
                                    [masks] = "['','','','','','','']"
                                    [values]="offerAddress"
                                    [width]="'36%'"
                                    (onChange)="parseArray($event, offerAddress, true)">
                                </ui-multiselect>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/offer_icon/state.png)'"></div>
                            <div class="view-group" >
                                <span class="view-label">Статус объекта:</span>
                                <ui-slidingMenu class="view-value edit-value"
                                    [options] = "[
                                        {value: 'true', label: 'Новостройка'},
                                        {value: 'false', label: 'Вторичка'}
                                    ]"
                                    [value]="offer.newBuilding"
                                    (onChange)="offer.newBuilding = ($event.selected.value == 'true')"
                                >
                                </ui-slidingMenu>
                            </div>
                            <hr>
                            <div *ngIf="offer.newBuilding" class='view_icon' [style.background-image]="'url(assets/offer_icon/stage.png)'"></div>
                            <div *ngIf="offer.newBuilding" class="view-group" >
                                <span class="view-label">Стадия объекта:</span>
                                <ui-slidingMenu class="view-value edit-value"
                                    [options] = "[
                                        {value: 'PROJECT', label: 'Проект'},
                                        {value: 'BUILDING', label: 'Строящийся'},
                                        {value: 'READY', label: 'Сдан'}
                                    ]"
                                    [value]="offer.objectStage"
                                    (onChange)="offer.objectStage = $event.selected.value"
                                >
                                </ui-slidingMenu>
                            </div>
                            <hr *ngIf="offer.newBuilding">
                            <div class='view_icon' [style.background-image]="'url(assets/offer_icon/year.png)'"></div>
                            <div class="view-group" style='overflow: hidden; position: relative; display: block;'>
                                <ui-input-line [placeholder] = "'Год постройки:'" [value] = "offer.buildYear"
                                        [width] = "'225px'" (onChange)= "offer.buildYear = $event">
                                </ui-input-line>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/offer_icon/property_type.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Тип дома:</span>
                                <ui-slidingMenu class="view-value edit-value"
                                    [options] = "apSchemaOptions"
                                    [value]="offer.apSchemeId"
                                    (onChange)="offer.apSchemeId = $event.selected.value"
                                >
                                </ui-slidingMenu>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/offer_icon/material.png)'"></div>
                            <div class="view-group" >
                                <span class="view-label">Материал:</span>
                                <ui-slidingMenu class="view-value edit-value"
                                    [options] = "houseTypeOptions"
                                    [value]="offer.houseTypeId"
                                    (onChange)="offer.houseTypeId = $event.selected.value"
                                >
                                </ui-slidingMenu>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/offer_icon/rooms.png)'"></div>
                            <div class="view-group" style='overflow: hidden; position: relative; display: block;'>
                                <ui-input-line [placeholder] = "'Количество комнат:'" [value] = "offer.roomsCount"
                                    [width] = "'225px'" (onChange)= "offer.roomsCount = ParseInt($event)">
                                </ui-input-line>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/offer_icon/room_type.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Тип комнат:</span>
                                <ui-slidingMenu class="view-value edit-value"
                                    [options] = "roomSchemeOptions"
                                    [value]="offer.roomSchemeId"
                                    (onChange)="offer.roomSchemeId = $event.selected.value"
                                >
                                </ui-slidingMenu>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/offer_icon/floor.png)'"></div>
                            <div class="view-group multiply">
                                <span class="view-label pull-left">Этажи:</span>
                                <div class="show_value">{{" "}}</div>
                                <div class='arrow' (click)="showMenu($event, true)"></div>
                                <ui-multiselect class="view-value edit-value" style=""
                                    [options] = "[
                                        {value: 'FLOOR', label: 'Этаж'},
                                        {value: 'FLOORS', label: 'Этажность'},
                                        {value: 'LEVELS', label: 'Уровней'}
                                    ]"
                                    [masks] = "['','','']"
                                    [values]="offerFloor"
                                    [width]="'43%'"
                                    (onChange)="parseArray($event, offerFloor)">
                                </ui-multiselect>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/offer_icon/square.png)'"></div>
                            <div class="view-group multiply">
                                <span class="view-label pull-left">Площадь:</span>
                                <div class="show_value">{{" "}}</div>
                                <div class='arrow' (click)="showMenu($event, true)"></div>
                                <ui-multiselect class="view-value edit-value" style=""
                                    [options] = "[
                                        {value: 'TOTAL', label: 'Общая'},
                                        {value: 'LIVING', label: 'Жилая'},
                                        {value: 'KITCHEN', label: 'Кухня'}
                                    ]"
                                    [masks] = "['','','','']"
                                    [values]="offerSquare"
                                    [width]="'43%'"
                                    (onChange)="parseArray($event, this.offerSquare)">
                                </ui-multiselect>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/offer_icon/balcony.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Лоджия:</span>
                                <ui-slidingMenu class="view-value edit-value"
                                    [options] = "YesNoOptions"
                                    [value]="offer.loggia"
                                    (onChange)="offer.loggia = ($event.selected.value == 'true')"
                                >
                                </ui-slidingMenu>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/offer_icon/balcony.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Балкон:</span>
                                <ui-slidingMenu class="view-value edit-value"
                                    [options] = "YesNoOptions"
                                    [value]="offer.balcony"
                                    (onChange)="offer.balcony =  ($event.selected.value == 'true')"
                                >
                                </ui-slidingMenu>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/offer_icon/toilet.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Санузел:</span>
                                <ui-slidingMenu class="view-value edit-value"
                                    [options] = "bathroomOptions"
                                    [value]="offer.bathroom"
                                    (onChange)="offer.bathroom = $event.selected.value"
                                >
                                </ui-slidingMenu>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/offer_icon/condition.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Состояние:</span>
                                <ui-slidingMenu class="view-value edit-value"
                                    [options] = "conditionOptions"
                                    [value]="offer.condition"
                                    (onChange)="offer.condition = $event.selected.value"
                                >
                                </ui-slidingMenu>
                            </div>
                            <hr>
                        </div>
                <div *ngIf="offer.typeCode == 'house' || offer.typeCode == 'townhouse' || offer.typeCode == 'cottage' || offer.typeCode == 'dacha' ">
                                <div class='view_icon' [style.background-image]="'url(assets/offer_icon/distance.png)'"></div>
                                <div class="view-group" style='overflow: hidden; position: relative; display: block;'>
                                    <ui-input-line [placeholder] = "'Удаленность:'" [value] = "offer.distance"
                                        [width] = "'225px'" (onChange)= "offer.distance = $event">
                                    </ui-input-line>
                                </div>
                                <hr>
                                <div class='view_icon' [style.background-image]="'url(assets/offer_icon/name.png)'"></div>
                                <div class="view-group" style='overflow: hidden; position: relative; display: block;'>
                                    <ui-input-line [placeholder] = "'Наименование поселения:'" [value] = "offer.settlement"
                                        [width] = "'225px'" (onChange)= "offer.settlement = $event">
                                    </ui-input-line>
                                </div>
                                <hr>
                                <div class='view_icon' [style.background-image]="'url(assets/user_icon/address.png)'"></div>
                                <div class="view-group multiply" style='height: 30px;'>
                                    <ui-input-line [placeholder] = "'Адрес объекта:'" [value] = "addressStr"
                                        [width] = "'225px'" (onChange)= "parseArray($event, offerAddress, true)" [queryTipe]="'address'" (clicked)="showMenu($event,true)">
                                    </ui-input-line>
                                    <div class='arrow' (click)="showMenu($event, true)" *ngIf="offerAddress[0] && offerAddress[0].value !== undefined"></div>
                                    <ui-multiselect class="view-value edit-value" style=""
                                        [options] = "[
                                            {value: 'KRAY', label: 'Регион'},
                                            {value: 'CITY', label: 'Нас. пункт'},
                                            {value: 'DISTRICT', label: 'Адм. район'},
                                            {value: 'STREET', label: 'Улица'},
                                            {value: 'HOUSE', label: 'Дом'},
                                            {value: 'HOUSING', label: 'Корпус'},
                                            {value: 'FLAT', label: 'Квартира'}
                                        ]"
                                        [masks] = "['','','','','','','']"
                                        [values]="offerAddress"
                                        [width]="'36%'"
                                        (onChange)="parseArray($event, offerAddress, true)">
                                    </ui-multiselect>
                                </div>
                                <hr>
                                <div class='view_icon' [style.background-image]="'url(assets/offer_icon/secure.png)'"></div>
                                <div class="view-group">
                                    <span class="view-label">Охрана:</span>
                                    <ui-slidingMenu class="view-value edit-value"
                                        [options] = "YesNoOptions"
                                        [value]="offer.guard"
                                        (onChange)="$event.selected.value"
                                    >
                                    </ui-slidingMenu>
                                </div>
                                <hr>
                                <div class='view_icon' [style.background-image]="'url(assets/offer_icon/year.png)'"></div>
                                <div class="view-group" style='overflow: hidden; position: relative; display: block;'>
                                    <ui-input-line [placeholder] = "'Год постройки:'" [value] = "offer.buildYear"
                                            [width] = "'225px'" (onChange)= "offer.buildYear = $event">
                                    </ui-input-line>
                                </div>
                                <hr>
                                <div class='view_icon' [style.background-image]="'url(assets/offer_icon/floor.png)'"></div>
                                <div class="view-group" style='overflow: hidden; position: relative; display: block;'>
                                    <ui-input-line [placeholder] = "'Количество этажей:'" [value] = "offer.floorsCount"
                                            [width] = "'225px'" (onChange)= "parseArray([{type: 'FLOORS', value: $event}], offerFloor)">
                                    </ui-input-line>
                                </div>
                                <hr>
                                <div class='view_icon' [style.background-image]="'url(assets/offer_icon/rooms.png)'"></div>
                                <div class="view-group" style='overflow: hidden; position: relative; display: block;'>
                                    <ui-input-line [placeholder] = "'Количество комнат:'" [value] = "offer.roomsCount"
                                        [width] = "'225px'" (onChange)= "offer.roomsCount = $event">
                                    </ui-input-line>
                                </div>
                                <hr>
                                <div class='view_icon' [style.background-image]="'url(assets/offer_icon/room_type.png)'"></div>
                                <div class="view-group">
                                    <span class="view-label">Тип комнат:</span>
                                    <ui-slidingMenu class="view-value edit-value"
                                        [options] = "roomSchemeOptions"
                                        [value]="offer.roomSchemeId"
                                        (onChange)="offer.roomSchemeId = $event.selected.value"
                                    >
                                    </ui-slidingMenu>
                                </div>
                                <hr>
                                <div class='view_icon' [style.background-image]="'url(assets/offer_icon/square.png)'"></div>
                                <div class="view-group multiply">
                                    <span class="view-label pull-left">Площадь дома:</span>
                                    <div class="show_value">{{" "}}</div>
                                    <div class='arrow' (click)="showMenu($event, true)"></div>
                                    <ui-multiselect class="view-value edit-value" style=""
                                        [options] = "[
                                            {value: 'TOTAL', label: 'Общая'},
                                            {value: 'LIVING', label: 'Жилая'},
                                            {value: 'KITCHEN', label: 'Кухня'}
                                        ]"
                                        [masks] = "['','','','']"
                                        [values]="offerSquare"
                                        [width]="'43%'"
                                        (onChange)="parseArray($event, this.offerSquare)">
                                    </ui-multiselect>
                                </div>
                                <hr>
                                <div class='view_icon' [style.background-image]="'url(assets/offer_icon/condition.png)'"></div>
                                <div class="view-group">
                                    <span class="view-label">Состояние:</span>
                                    <ui-slidingMenu class="view-value edit-value"
                                        [options] = "conditionOptions"
                                        [value]="offer.condition"
                                        (onChange)="offer.condition = $event.selected.value"
                                    >
                                    </ui-slidingMenu>
                                </div>
                                <hr>
                                <div class='view_icon' [style.background-image]="'url(assets/offer_icon/material.png)'"></div>
                                <div class="view-group" >
                                    <span class="view-label">Материал:</span>
                                    <ui-slidingMenu class="view-value edit-value"
                                        [options] = "houseTypeOptions"
                                        [value]="offer.houseTypeId"
                                        (onChange)="offer.houseTypeId = $event.selected.value"
                                    >
                                    </ui-slidingMenu>
                                </div>
                                <hr>
                                <div class='view_icon' [style.background-image]="'url(assets/offer_icon/balcony.png)'"></div>
                                <div class="view-group">
                                    <span class="view-label">Лоджия:</span>
                                    <ui-slidingMenu class="view-value edit-value"
                                        [options] = "YesNoOptions"
                                        [value]="offer.loggia"
                                        (onChange)="offer.loggia = ($event.selected.value == 'true')"
                                    >
                                    </ui-slidingMenu>
                                </div>
                                <hr>
                                <div class='view_icon' [style.background-image]="'url(assets/offer_icon/balcony.png)'"></div>
                                <div class="view-group">
                                    <span class="view-label">Балкон:</span>
                                    <ui-slidingMenu class="view-value edit-value"
                                        [options] = "YesNoOptions"
                                        [value]="offer.balcony"
                                        (onChange)="offer.balcony = ($event.selected.value == 'true')"
                                    >
                                    </ui-slidingMenu>
                                </div>
                                <hr>
                                <div class='view_icon' [style.background-image]="'url(assets/offer_icon/toilet.png)'"></div>
                                <div class="view-group">
                                    <span class="view-label">Санузел:</span>
                                    <ui-slidingMenu class="view-value edit-value"
                                        [options] = "bathroomOptions"
                                        [value]="offer.bathroom"
                                        (onChange)="offer.bathroom = $event.selected.value"
                                    >
                                    </ui-slidingMenu>
                                </div>
                                <hr>
                                <div class='view_icon' [style.background-image]="'url(assets/offer_icon/water.png)'"></div>
                                <div class="view-group">
                                    <span class="view-label">Водоснабжение:</span>
                                    <ui-slidingMenu class="view-value edit-value"
                                        [options] = "YesNoOptions"
                                        [value]="offer.waterSupply"
                                        (onChange)="offer.waterSupply = ($event.selected.value == 'true')"
                                    >
                                    </ui-slidingMenu>
                                </div>
                                <hr>
                                <div class='view_icon' [style.background-image]="'url(assets/offer_icon/gas.png)'"></div>
                                <div class="view-group">
                                        <span class="view-label">Газификация:</span>
                                    <ui-slidingMenu class="view-value edit-value"
                                        [options] = "YesNoOptions"
                                        [value]="offer.gasification"
                                        (onChange)="offer.gasification = ($event.selected.value == 'true')"
                                    >
                                    </ui-slidingMenu>
                                </div>
                                <hr>
                                <div class='view_icon' [style.background-image]="'url(assets/offer_icon/electrification.png)'"></div>
                                <div class="view-group">
                                    <span class="view-label">Электроснабжение:</span>
                                    <ui-slidingMenu class="view-value edit-value"
                                        [options] = "YesNoOptions"
                                        [value]="offer.electrification"
                                        (onChange)="offer.electrification = ($event.selected.value == 'true')"
                                    >
                                    </ui-slidingMenu>
                                </div>
                                <hr>
                                <div class='view_icon' [style.background-image]="'url(assets/offer_icon/sewerage.png)'"></div>
                                <div class="view-group">
                                    <span class="view-label">Канализация:</span>
                                    <ui-slidingMenu class="view-value edit-value"
                                        [options] = "YesNoOptions"
                                        [value]="offer.sewerage"
                                        (onChange)="offer.sewerage = ($event.selected.value == 'true')"
                                    >
                                    </ui-slidingMenu>
                                </div>
                                <hr>
                                <div class='view_icon' [style.background-image]="'url(assets/offer_icon/heating.png)'"></div>
                                <div class="view-group">
                                    <span class="view-label">Отопление:</span>
                                    <ui-slidingMenu class="view-value edit-value"
                                        [options] = "YesNoOptions"
                                        [value]="offer.centralHeating"
                                        (onChange)="offer.centralHeating = ($event.selected.value == 'true')"
                                    >
                                    </ui-slidingMenu>
                                </div>
                                <hr>
                                <div class='view_icon' [style.background-image]="'url(assets/offer_icon/square.png)'"></div>
                                <div class="view-group multiply">
                                    <span class="view-label pull-left">Площадь участка:</span>
                                    <div class="show_value">{{offer.squareLand}}</div>
                                    <div class='arrow' (click)="showMenu($event, true)"></div>
                                    <ui-multiselect class="view-value edit-value" style=""
                                        [options] = "[
                                            {value: '0', label: 'Сотки'},
                                            {value: '1', label: 'Гектары'}
                                        ]"
                                        [masks] = "['','']"
                                        [values]="landSquare"
                                        [width]="'43%'"
                                        (onChange)="parseArray($event, landSquare)">
                                    </ui-multiselect>
                                </div>
                                <hr>
                                <div class='view_icon' [style.background-image]="'url(assets/offer_icon/land.png)'"></div>
                                <div class="view-group">
                                    <span class="view-label">Назначение земель:</span>
                                    <ui-slidingMenu class="view-value edit-value"
                                        [options] = "landOption"
                                        [value]="offer.landPurpose"
                                        (onChange)="offer.landPurpose = $event.selected.value"
                                    >
                                    </ui-slidingMenu>
                                </div>
                                <hr>
                        </div>
                        <div *ngIf="offer.typeCode == 'land' || offer.typeCode == 'land1' || offer.typeCode == 'land2'">
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/distance.png)'"></div>
                                    <div class="view-group" style='overflow: hidden; position: relative; display: block;'>
                                        <ui-input-line [placeholder] = "'Удаленность:'" [value] = "offer.distance"
                                            [width] = "'225px'" (onChange)= "offer.distance = $event">
                                        </ui-input-line>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/name.png)'"></div>
                                    <div class="view-group" style='overflow: hidden; position: relative; display: block;'>
                                        <ui-input-line [placeholder] = "'Наименование поселения:'" [value] = "offer.settlement"
                                            [width] = "'225px'" (onChange)= "offer.settlement = $event">
                                        </ui-input-line>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/user_icon/address.png)'"></div>
                                    <div class="view-group multiply" style='height: 30px;'>
                                        <ui-input-line [placeholder] = "'Адрес участка:'" [value] = "addressStr"
                                            [width] = "'225px'" (onChange)= "parseArray($event, offerAddress, true)" [queryTipe]="'address'" (clicked)="showMenu($event,true)">
                                        </ui-input-line>
                                        <div class='arrow' (click)="showMenu($event, true)" *ngIf="offerAddress[0] && offerAddress[0].value !== undefined"></div>
                                        <ui-multiselect class="view-value edit-value" style=""
                                            [options] = "[
                                                {value: 'KRAY', label: 'Регион'},
                                                {value: 'CITY', label: 'Нас. пункт'},
                                                {value: 'DISTRICT', label: 'Адм. район'},
                                                {value: 'STREET', label: 'Улица'},
                                                {value: 'HOUSE', label: 'Дом'},
                                                {value: 'HOUSING', label: 'Корпус'},
                                                {value: 'FLAT', label: 'Квартира'}
                                            ]"
                                            [masks] = "['','','','','','','']"
                                            [values]="offerAddress"
                                            [width]="'36%'"
                                            (onChange)="parseArray($event, offerAddress, true)">
                                        </ui-multiselect>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/secure.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label">Охрана:</span>
                                        <ui-slidingMenu class="view-value edit-value"
                                            [options] = "YesNoOptions"
                                            [value]="offer.guard"
                                            (onChange)="offer.guard = $event.selected.value"
                                        >
                                        </ui-slidingMenu>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/land.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label">Назначение земель:</span>
                                        <ui-slidingMenu class="view-value edit-value"
                                            [options] = "landOption"
                                            [value]="offer.landPurpose"
                                            (onChange)="offer.landPurpose = $event.selected.value"
                                        >
                                        </ui-slidingMenu>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/square.png)'"></div>
                                    <div class="view-group multiply">
                                        <span class="view-label pull-left">Площадь участка:</span>
                                        <div class="show_value">{{offer.squareLand}}</div>
                                        <div class='arrow' (click)="showMenu($event, true)"></div>
                                        <ui-multiselect class="view-value edit-value" style=""
                                            [options] = "[
                                                {value: '0', label: 'Сотки'},
                                                {value: '1', label: 'Гектары'}
                                            ]"
                                            [masks] = "['','']"
                                            [values]="landSquare"
                                            [width]="'43%'"
                                            (onChange)="parseArray($event, landSquare)">
                                        </ui-multiselect>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/water.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label">Водоснабжение:</span>
                                        <ui-slidingMenu class="view-value edit-value"
                                            [options] = "YesNoOptions"
                                            [value]="offer.waterSupply"
                                            (onChange)="offer.waterSupply = ($event.selected.value == 'true')"
                                        >
                                        </ui-slidingMenu>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/gas.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label">Газификация:</span>
                                        <ui-slidingMenu class="view-value edit-value"
                                            [options] = "YesNoOptions"
                                            [value]="offer.gasification"
                                            (onChange)="offer.gasification = ($event.selected.value == 'true')"
                                        >
                                        </ui-slidingMenu>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/electrification.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label">Электроснабжение:</span>
                                        <ui-slidingMenu class="view-value edit-value"
                                            [options] = "YesNoOptions"
                                            [value]="offer.electrification"
                                            (onChange)="offer.electrification = ($event.selected.value == 'true')"
                                        >
                                        </ui-slidingMenu>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/sewerage.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label">Канализация:</span>
                                        <ui-slidingMenu class="view-value edit-value"
                                            [options] = "YesNoOptions"
                                            [value]="offer.sewerage"
                                            (onChange)="offer.sewerage =($event.selected.value == 'true')"
                                        >
                                    </ui-slidingMenu>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/heating.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label">Отопление:</span>
                                        <ui-slidingMenu class="view-value edit-value"
                                            [options] = "YesNoOptions"
                                            [value]="offer.centralHeating"
                                            (onChange)="offer.centralHeating = ($event.selected.value == 'true')"
                                        >
                                        </ui-slidingMenu>
                                    </div>
                                    <hr>
                        </div>

                        <div *ngIf="offer.typeCode == 'market_place' || offer.typeCode == 'production_place' || offer.typeCode == 'warehouse_place'
                                || offer.typeCode == 'service_place'|| offer.typeCode == 'gpurpose_place' || offer.typeCode == 'building'
                                || offer.typeCode == 'other' || offer.typeCode == 'office' || offer.typeCode == 'cosial_place'"
                        >
                                        <div class='view_icon' [style.background-image]="'url(assets/offer_icon/distance.png)'"></div>
                                        <div class="view-group" style='overflow: hidden; position: relative; display: block;'>
                                            <ui-input-line [placeholder] = "'Удаленность:'" [value] = "offer.distance"
                                                [width] = "'225px'" (onChange)= "offer.distance = $event">
                                            </ui-input-line>
                                        </div>
                                        <hr>
                                        <div class='view_icon' [style.background-image]="'url(assets/offer_icon/floor.png)'"></div>
                                        <div class="view-group" style='overflow: hidden; position: relative; display: block;'>
                                            <ui-input-line [placeholder] = "'Название:'" [value] = "offer.objectName"
                                                [width] = "'225px'" (onChange)= "offer.objectName = $event">
                                            </ui-input-line>
                                        </div>
                                        <hr>
                                        <div class='view_icon' [style.background-image]="'url(assets/user_icon/address.png)'"></div>
                                        <div class="view-group multiply" style='height: 30px;'>
                                            <ui-input-line [placeholder] = "'Адрес объекта:'" [value] = "addressStr"
                                                [width] = "'225px'" (onChange)= "parseArray($event, offerAddress, true)" [queryTipe]="'address'" (clicked)="showMenu($event,true)">
                                            </ui-input-line>
                                            <div class='arrow' (click)="showMenu($event, true)" *ngIf="offerAddress[0] && offerAddress[0].value !== undefined"></div>
                                            <ui-multiselect class="view-value edit-value" style=""
                                                [options] = "[
                                                    {value: 'KRAY', label: 'Регион'},
                                                    {value: 'CITY', label: 'Нас. пункт'},
                                                    {value: 'DISTRICT', label: 'Адм. район'},
                                                    {value: 'STREET', label: 'Улица'},
                                                    {value: 'HOUSE', label: 'Дом'},
                                                    {value: 'HOUSING', label: 'Корпус'},
                                                    {value: 'FLAT', label: 'Квартира'}
                                                ]"
                                                [masks] = "['','','','','','','']"
                                                [values]="offerAddress"
                                                [width]="'36%'"
                                                (onChange)="parseArray($event, offerAddress, true)">
                                            </ui-multiselect>
                                        </div>
                                        <hr>
                                        <div class='view_icon' [style.background-image]="'url(assets/offer_icon/state.png)'"></div>
                                        <div class="view-group" >
                                            <span class="view-label">Статус объекта:</span>
                                            <ui-slidingMenu class="view-value edit-value"
                                                [options] = "[
                                                    {value: 'true', label: 'Новостройка'},
                                                    {value: 'false', label: 'Вторичка'}
                                                ]"
                                                [value]="offer.newBuilding"
                                                (onChange)="offer.newBuilding = ($event.selected.value == 'true')"
                                            >
                                            </ui-slidingMenu>
                                        </div>
                                        <hr>
                                        <div *ngIf="offer.newBuilding" class='view_icon' [style.background-image]="'url(assets/offer_icon/stage.png)'"></div>
                                        <div *ngIf="offer.newBuilding" class="view-group" >
                                            <span class="view-label">Стадия объекта:</span>
                                            <ui-slidingMenu class="view-value edit-value"
                                                [options] = "[
                                                    {value: 'PROJECT', label: 'Проект'},
                                                    {value: 'BUILDING', label: 'Строящийся'},
                                                    {value: 'READY', label: 'Сдан'}
                                                ]"
                                                [value]="offer.objectStage"
                                                (onChange)="offer.objectStage = $event.selected.value"
                                            >
                                            </ui-slidingMenu>
                                        </div>
                                        <hr *ngIf="offer.newBuilding">
                                        <div class='view_icon' [style.background-image]="'url(assets/offer_icon/year.png)'"></div>
                                        <div class="view-group" style='overflow: hidden; position: relative; display: block;'>
                                            <ui-input-line [placeholder] = "'Год постройки:'" [value] = "offer.buildYear"
                                                    [width] = "'225px'" (onChange)= "offer.buildYear = $event">
                                            </ui-input-line>
                                        </div>
                                        <hr>
                                        <div class='view_icon' [style.background-image]="'url(assets/offer_icon/property_type.png)'"></div>
                                        <div class="view-group">
                                            <span class="view-label">Тип здания:</span>
                                            <ui-slidingMenu class="view-value edit-value"
                                                [options] = "getBuldingOptionsArray()"
                                                [value]="offer.buildingType"
                                                (onChange)="offer.buildingType = $event.selected.value"
                                            >
                                            </ui-slidingMenu>
                                        </div>
                                        <hr>
                                        <div class='view_icon' [style.background-image]="'url(assets/offer_icon/layout.png)'"></div>
                                        <div class="view-group">
                                            <span class="view-label">Класс здания:</span>
                                            <ui-slidingMenu class="view-value edit-value"
                                                [options] = "[
                                                    {value: '1', label: 'А'},
                                                    {value: '2W', label: 'А+'},
                                                    {value: 'T3', label: 'Б'},
                                                    {value: '4', label: 'Б+'},
                                                    {value: '5', label: 'С'},
                                                    {value: '6', label: 'С+'}
                                                ]"
                                                [value]="offer.buildingClass"
                                                (onChange)="offer.buildingClass = $event.selected.value"
                                            >
                                            </ui-slidingMenu>
                                        </div>
                                        <hr>
                                        <div class='view_icon' [style.background-image]="'url(assets/offer_icon/material.png)'"></div>
                                        <div class="view-group" >
                                            <span class="view-label">Материал:</span>
                                            <ui-slidingMenu class="view-value edit-value"
                                                [options] = "houseTypeOptions"
                                                [value]="offer.houseTypeId"
                                                (onChange)="offer.houseTypeId = $event.selected.value"
                                            >
                                            </ui-slidingMenu>
                                        </div>
                                        <hr>
                                        <div class='view_icon' [style.background-image]="'url(assets/offer_icon/floor.png)'"></div>
                                        <div class="view-group multiply">
                                            <span class="view-label pull-left">Этажи:</span>
                                            <div class="show_value">{{" "}}</div>
                                            <div class='arrow' (click)="showMenu($event, true)"></div>
                                            <ui-multiselect class="view-value edit-value" style=""
                                                [options] = "[
                                                    {value: 'FLOOR', label: 'Этаж'},
                                                    {value: 'FLOORS', label: 'Этажность'},
                                                    {value: 'LEVELS', label: 'Уровней'}
                                                ]"
                                                [masks] = "['','','']"
                                                [values]="offerFloor"
                                                [width]="'43%'"
                                                (onChange)="parseArray($event, offerFloor)">
                                            </ui-multiselect>
                                        </div>
                                        <hr>
                                        <div class='view_icon' [style.background-image]="'url(assets/offer_icon/water.png)'"></div>
                                        <div class="view-group">
                                            <span class="view-label">Водоснабжение:</span>
                                            <ui-slidingMenu class="view-value edit-value"
                                                [options] = "YesNoOptions"
                                                [value]="offer.waterSupply"
                                                (onChange)="offer.waterSupply = ($event.selected.value == 'true')"
                                            >
                                            </ui-slidingMenu>
                                        </div>
                                        <hr>
                                        <div class='view_icon' [style.background-image]="'url(assets/offer_icon/gas.png)'"></div>
                                        <div class="view-group">
                                            <span class="view-label">Газификация:</span>
                                            <ui-slidingMenu class="view-value edit-value"
                                                [options] = "YesNoOptions"
                                                [value]="offer.gasification"
                                                (onChange)="offer.gasification = ($event.selected.value == 'true')"
                                            >
                                            </ui-slidingMenu>
                                        </div>
                                        <hr>
                                        <div class='view_icon' [style.background-image]="'url(assets/offer_icon/electrification.png)'"></div>
                                        <div class="view-group">
                                            <span class="view-label">Электроснабжение:</span>
                                            <ui-slidingMenu class="view-value edit-value"
                                                [options] = "YesNoOptions"
                                                [value]="offer.electrification"
                                                (onChange)="offer.electrification = ($event.selected.value == 'true')"
                                            >
                                            </ui-slidingMenu>
                                        </div>
                                        <hr>
                                        <div class='view_icon' [style.background-image]="'url(assets/offer_icon/sewerage.png)'"></div>
                                        <div class="view-group">
                                            <span class="view-label">Канализация:</span>
                                            <ui-slidingMenu class="view-value edit-value"
                                                [options] = "YesNoOptions"
                                                [value]="offer.sewerage"
                                                (onChange)="offer.sewerage = ($event.selected.value == 'true')"
                                            >
                                            </ui-slidingMenu>
                                        </div>
                                        <hr>
                                        <div class='view_icon' [style.background-image]="'url(assets/offer_icon/heating.png)'"></div>
                                        <div class="view-group">
                                            <span class="view-label">Отопление:</span>
                                            <ui-slidingMenu class="view-value edit-value"
                                                [options] = "YesNoOptions"
                                                [value]="offer.centralHeating"
                                                (onChange)="offer.centralHeating = ($event.selected.value == 'true')"
                                            >
                                            </ui-slidingMenu>
                                        </div>
                                        <hr>
                                        <div class='view_icon' [style.background-image]="'url(assets/offer_icon/square.png)'"></div>
                                        <div class="view-group multiply">
                                            <span class="view-label pull-left">Площадь помещения:</span>
                                            <div class="show_value">{{" "}}</div>
                                            <div class='arrow' (click)="showMenu($event)"></div>
                                            <ui-multiselect class="view-value edit-value" style=""
                                                [options] = "[
                                                    {value: 'TOTAL', label: 'Общая'},
                                                    {value: 'LIVING', label: 'Жилая'},
                                                    {value: 'KITCHEN', label: 'Кухня'}
                                                ]"
                                                [masks] = "['','','','']"
                                                [values]="offerSquare"
                                                [width]="'43%'"
                                                (onChange)="parseArray($event, offerSquare)">
                                            </ui-multiselect>
                                        </div>
                                        <hr>
                                        <div class='view_icon' [style.background-image]="'url(assets/offer_icon/height.png)'"></div>
                                        <div class="view-group" style='overflow: hidden; position: relative; display: block;'>
                                            <ui-input-line [placeholder] = "'Высота потолков:'" [value] = "offer.ceilingHeight"
                                                [width] = "'225px'" (onChange)= "offer.ceilingHeight = $event">
                                            </ui-input-line>
                                        </div>
                                        <hr>
                                        <div class='view_icon' [style.background-image]="'url(assets/offer_icon/condition.png)'"></div>
                                        <div class="view-group">
                                            <span class="view-label">Состояние помещения:</span>
                                            <ui-slidingMenu class="view-value edit-value"
                                                [options] = "conditionOptions"
                                                [value]="offer.condition"
                                                (onChange)="offer.condition = $event.selected.value"
                                            >
                                            </ui-slidingMenu>
                                        </div>
                                        <hr>
                                        <div class='view_icon' [style.background-image]="'url(assets/offer_icon/secure.png)'"></div>
                                        <div class="view-group">
                                            <span class="view-label">Охрана:</span>
                                            <ui-slidingMenu class="view-value edit-value"
                                                [options] = "YesNoOptions"
                                                [value]="offer.guard"
                                                (onChange)="offer.guard = ($event.selected.value == 'true')"
                                            >
                                            </ui-slidingMenu>
                                        </div>
                                        <hr>
                                        <div class='view_icon' [style.background-image]="'url(assets/offer_icon/lift.png)'"></div>
                                        <div class="view-group">
                                            <span class="view-label">Лифт:</span>
                                            <ui-slidingMenu class="view-value edit-value"
                                                [options] = "YesNoOptions"
                                                [value]="offer.lift"
                                                (onChange)="offer.lift = ($event.selected.value == 'true')"
                                            >
                                            </ui-slidingMenu>
                                        </div>
                                        <hr>
                                        <div class='view_icon' [style.background-image]="'url(assets/offer_icon/parking.png)'"></div>
                                        <div class="view-group">
                                            <span class="view-label">Парковка:</span>
                                            <ui-slidingMenu class="view-value edit-value"
                                                [options] = "YesNoOptions"
                                                [value]="offer.parking"
                                                (onChange)="offer.parking = ($event.selected.value == 'true')"
                                            >
                                            </ui-slidingMenu>
                                        </div>
                                        <hr>
                                </div>
                            <div class='view_icon' [style.background-image]="'url(assets/offer_icon/cost.png)'"></div>
                            <div class="view-group" style='position: relative; display: block; height: 30px; width: 290px;
                                    margin-left: 50px; overflow: hidden;'>
                                <span class="view-label" style = 'float: left;'>Цена</span>
                                <div class="show_value">{{' '+(+(offer.ownerPrice || 0) + (offer.agencyPrice || 0))+ ' т.руб.'}}</div>
                                <div class='arrow' (click)="showMenu($event, true)"></div>
                                <ui-multiselect class="view-value edit-value" style=""
                                    [options] = "[
                                        {value: 'OWNER', label: 'Собственника'},
                                        {value: 'RUBLES', label: 'Коммисия (руб)'},
                                        {value: 'PERSENT', label: 'Коммисия (%)'}
                                    ]"
                                    [masks] = "['','',''    ]"
                                    [values]="offerPrice"
                                    [width]="'39%'"
                                    (onChange)="parseArray($event, offerPrice)">
                                </ui-multiselect>
                            </div>

                            <div class="header_col">Тэги</div>
                            <div style="margin: 0 0 20px 20px;">
                                <ui-tag-block
                                    [value] = "offer.tag"
                                    (valueChange) = "offer.tag = $event.value"
                                ></ui-tag-block>
                            </div>

                            <div class="header_col">Дополнительное описание</div>
                            <div class="view-group" style="flex-wrap: wrap; height: 90px; margin: 0 20px;">
                                <textarea class="text-value"
                                placeholder="" [(ngModel)]="offer.description"
                                style="text-align: left; width: 100%; height: 100%; font-size: 10pt; color: dimgrey;"></textarea>
                            </div>
                        </div>

                        <!-- РЕЖИМ РЕДАКТИРОВАНИЯ: ???? -->
                        <!-- РЕЖИМ ОТОБРАЖЕНИЯ: НАЧАЛО -->

                        <div class="view-block" [hidden]="editEnabled" style="margin: 10px 20px 50px 0px;">
                            <div class="header_col">Контактная информация:</div>
                            <div class='view_icon' [style.background-image]="'url(assets/person_icon/category.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">Тип:</span>
                                <ui-view-value
                                    [options] = "[
                                        {value: 'NOT', label: 'Не указан'},
                                        {value: 'client', label: 'Клиент'},
                                        {value: 'realtor', label: 'Конкурент'},
                                        {value: 'company', label: 'Наша компания'},
                                        {value: 'partner', label: 'Партнер'},
                                        {value: 'owner', label: 'Собственник'}
                                    ]"
                                    [value]="offer.person?.typeCode"
                                >
                                </ui-view-value>
                            </div>
                            <hr>
                            <div *ngIf='offer.person'>
                                <div class='view_icon' [style.background-image]="'url(assets/user_icon/user.png)'"></div>
                                <div class="view-group">
                                    <span class="view-label">ФИО:</span>
                                    <span class="view-value" [class.link] = "offer.person?.id" (click)="openPerson()">{{offer.person?.name  || 'Не указано'}}</span>
                                </div>
                            </div>
                            <div *ngIf='offer.person?.organisation'>
                                <div class='view_icon' [style.background-image]="'url(assets/user_icon/user.png)'"></div>
                                <div class="view-group">
                                    <span class="view-label">Название:</span>
                                    <span class="view-value">  {{ offer.person.organisation?.name }} </span>
                                </div>
                                <hr>
                                <div class='view_icon' [style.background-image]="'url(assets/user_icon/user.png)'"></div>
                                <div class="view-group">
                                    <span class="view-label">Контактное лицо:</span>
                                    <span class="view-value">{{ offer.person.organisation?.name }}</span>
                                </div>
                                <hr>
                                <div class='view_icon' [style.background-image]="'url(assets/user_icon/user.png)'"></div>
                                <div class="view-group">
                                    <span class="view-label">Должность:</span>
                                    <span class="view-value">{{ offer.person.organisation?.name }}</span>
                                </div>
                            </div>
                            <hr  *ngIf='offer.person || offer.person?.organisation'>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/phone.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Телефон:</span>
                                <span class="view-value">{{offer.person?.phoneBlock?.main || offer.person?.phoneBlock?.cellphone || offer.person?.phoneBlock?.office}}</span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/email.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">E-mail:</span>
                                <span class="view-value">{{offer.person?.emailBlock?.main || offer.person?.emailBlock?.work }}</span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/website.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Web-сайт:</span>
                                <span class="view-value">
                                    <span *ngIf="!offer.person?.webSite" class="view-value">Не указан</span>
                                    <a *ngIf="offer.person?.webSite" [href]="'http://'+offer.person.webSite" target="_blank">{{offer.person?.webSite}}</a>
                                </span>
                            </div>
                            <hr *ngIf="offer.person?.organisation">
                            <div  *ngIf="offer.person?.organisation" class='view_icon' [style.background-image]="'url(assets/user_icon/office.png)'"></div>
                            <div  *ngIf="offer.person?.organisation" class="view-group" >
                                <span class="view-label">Организация:</span>
                                <span class="view-value" [class.link] = "offer.person?.organisation?.id" (click)="openOrganisation()">
                                    {{offer.person?.organisation?.type}}{{ offer.person?.organisation?.name ? (' "' +offer.person?.organisation?.name+ '"') : 'Не указана'}}
                                </span>
                            </div>

                            <div class="header_col">Сопроводительная информация</div>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/user.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Ответственный:</span>
                                <span class="view-value" [class.link] = " offer.agent?.id" (click)="openUser()">{{ offer.agent?.name || 'Не указан'}}</span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/offer_icon/contract.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Договор:</span>
                                <span class="view-value"> {{offer.contractStr}} </span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/offer_icon/stage.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Стадия:</span>
                                <ui-view-value
                                    [options] = "stateCodeOptions"
                                    [value]="offer.stateCode"
                                >
                                </ui-view-value>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/person_icon/source.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">Источник:</span>
                                <span class="color-g1" *ngIf="offer.sourceUrl">
                                    <a href="{{offer.sourceUrl}}" target="_blank" class="a1">
                                        {{getSourceName()}}
                                    </a>
                                </span>
                                <ui-view-value *ngIf="!offer.sourceUrl"
                                    [options] = "sourceOptions"
                                    [value]="offer.sourceCode"
                                >
                                </ui-view-value>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/offer_icon/offer.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">Предложение:</span>
                                <ui-view-value
                                    [options] = "offerTypeCodeOptions"
                                    [value]="offer.offerTypeCode"
                                >
                                </ui-view-value>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/offer_icon/property_type.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">Категория:</span>
                                <ui-view-value
                                    [options] = "[
                                        {value: 'REZIDENTIAL', label: 'Жилая недвижимость'},
                                        {value: 'COMMERSIAL', label: 'Коммерческая недвижимость'},
                                        {value: 'LAND', label: 'Земельный участок'}
                                    ]"
                                    [value]="categoryOffer"
                                >
                                </ui-view-value>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/offer_icon/type.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">Тип объекта:</span>
                                <ui-view-value
                                    [options] = "typeCodeOptions"
                                    [value]="offer.typeCode"
                                >
                                </ui-view-value>
                            </div>

                            <div class = "header_col">Описание объекта:</div>
                            <div *ngIf="offer.typeCode == 'apartment' || offer.typeCode == 'room' || offer.typeCode == 'apartment_small' || offer.typeCode == 'apartment_small'">
                                    <div class='view_icon' [style.background-image]="'url(assets/user_icon/address.png)'"></div>
                                    <div class="view-group">
                                        <ui-view-line
                                            [placeholder]= "'Адрес объекта:'" [value]="addressStr"
                                        >
                                        </ui-view-line>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/state.png)'"></div>
                                    <div class="view-group" >
                                        <span class="view-label">Статус объекта:</span>
                                        <ui-view-value
                                            [options] = "[
                                                {value: 'true', label: 'Новостройка'},
                                                {value: 'false', label: 'Вторичка'}
                                            ]"
                                            [value]="offer.newBuilding"
                                        >
                                        </ui-view-value>
                                    </div>
                                    <hr>
                                    <div *ngIf="offer.newBuilding" class='view_icon' [style.background-image]="'url(assets/offer_icon/stage.png)'"></div>
                                    <div *ngIf="offer.newBuilding" class="view-group" >
                                        <span class="view-label">Стадия объекта:</span>
                                        <ui-view-value
                                            [options] = "[
                                                {value: 'PROJECT', label: 'Проект'},
                                                {value: 'BUILDING', label: 'Строящийся'},
                                                {value: 'READY', label: 'Сдан'}
                                            ]"
                                            [value]="offer.objectStage"
                                        >
                                        </ui-view-value>
                                    </div>
                                    <hr *ngIf="offer.newBuilding">
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/year.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Год постройки:</span>
                                        <span class="view-value"> {{ offer.buildYear }} </span>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/property_type.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Тип дома:</span>
                                        <ui-view-value
                                            [options] = "apSchemaOptions"
                                            [value]="offer.apSchemeId"
                                        >
                                        </ui-view-value>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/material.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Материал стен:</span>
                                        <ui-view-value
                                            [options] = "houseTypeOptions"
                                            [value]="offer.houseTypeId"
                                        >
                                        </ui-view-value>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/rooms.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Количество комнат:</span>
                                        <span class="view-value" style="font-size: 15px;"> {{ offer.roomsCount }} </span>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/room_type.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Тип комнат:</span>
                                        <ui-view-value
                                            [options] = "roomSchemeOptions"
                                            [value]="offer.roomSchemeId"
                                        >
                                        </ui-view-value>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/floor.png)'"></div>
                                    <div class="view-group">
                                    <span class="view-label pull-left" style="width: 113px">Этаж/Этажность:</span>
                                        <ui-multi-view
                                            [values] = "[
                                                {type:'Этаж' , value: offer.floor},
                                                {type:'Этажность' , value: offer.floorsCount},
                                                {type:'Уровень' , value: offer.levelsCount}
                                            ]"
                                        >
                                        </ui-multi-view>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/square.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Площадь:</span>
                                        <ui-multi-view
                                            [values] = "[
                                                {type:'Общая' , value: offer.squareTotal},
                                                {type:'Жилая' , value: offer.squareLiving},
                                                {type:'Кухня' , value: offer.squareKitchen}
                                            ]"
                                        >
                                        </ui-multi-view>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/balcony.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Лоджия:</span>
                                        <ui-view-value
                                            [options] = "YesNoOptions"
                                            [value]="offer.loggia"
                                        >
                                        </ui-view-value>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/balcony.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Балкон:</span>
                                        <ui-view-value
                                            [options] = "YesNoOptions"
                                            [value]="offer.balcony"
                                        >
                                        </ui-view-value>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/toilet.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Санузел:</span>
                                        <ui-view-value
                                            [options] = "bathroomOptions"
                                            [value]="offer.bathroom"
                                        >
                                        </ui-view-value>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/condition.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Состояние:</span>
                                        <ui-view-value
                                            [options] = "conditionOptions"
                                            [value]="offer.condition"
                                        >
                                        </ui-view-value>
                                    </div>
                                    <hr>
                                </div>
                                <div *ngIf="offer.typeCode == 'house' || offer.typeCode == 'townhouse' || offer.typeCode == 'cottage' || offer.typeCode == 'dacha' ">
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/distance.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Удаленность:</span>
                                        <span class="view-value"> {{ offer.distance }} </span>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/name.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Наименование поселения:</span>
                                        <span class="view-value"> {{ offer.settlement }} </span>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/user_icon/address.png)'"></div>
                                    <div class="view-group">
                                        <ui-view-line
                                            [placeholder]= "'Адрес объекта:'" [value]="addressStr"
                                        >
                                        </ui-view-line>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/secure.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Охрана:</span>
                                        <ui-view-value
                                            [options] = "YesNoOptions"
                                            [value]="offer.guard"
                                        >
                                        </ui-view-value>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/year.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Год постройки:</span>
                                        <span class="view-value"> {{ offer.buildYear }} </span>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/floor.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Этаж/Этажность:</span>
                                        <ui-multi-view
                                            [values] = "[
                                                {type:'Этаж' , value: offer.floor},
                                                {type:'Этажность' , value: offer.floorsCount},
                                                {type:'Уровень' , value: offer.levelsCount}
                                            ]"
                                        >
                                        </ui-multi-view>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/rooms.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Количество комнат:</span>
                                        <span class="view-value"  style="font-size: 15px;"> {{ offer.roomsCount }} </span>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/room_type.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Тип комнат:</span>
                                        <ui-view-value
                                            [options] = "roomSchemeOptions"
                                            [value]="offer.roomSchemeId"
                                        >
                                        </ui-view-value>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/square.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Площадь дома:</span>
                                        <ui-multi-view
                                            [values] = "[
                                                {type:'Общая' , value: offer.squareTotal},
                                                {type:'Жилая' , value: offer.squareLiving},
                                                {type:'Кухня' , value: offer.squareKitchen}
                                            ]"
                                        >
                                        </ui-multi-view>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/condition.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Состояние:</span>
                                        <ui-view-value
                                            [options] = "conditionOptions"
                                            [value]="offer.condition"
                                        >
                                        </ui-view-value>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/material.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Материал:</span>
                                        <ui-view-value
                                            [options] = "houseTypeOptions"
                                            [value]="offer.houseTypeId"
                                        >
                                        </ui-view-value>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/balcony.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Лоджия:</span>
                                        <ui-view-value
                                            [options] = "YesNoOptions"
                                            [value]="offer.loggia"
                                        >
                                        </ui-view-value>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/balcony.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Балкон:</span>
                                        <ui-view-value
                                            [options] = "YesNoOptions"
                                            [value]="offer.balcony"
                                        >
                                        </ui-view-value>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/toilet.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Санузел:</span>
                                        <ui-view-value
                                            [options] = "bathroomOptions"
                                            [value]="offer.bathroom"
                                        >
                                        </ui-view-value>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/water.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Водоснабжение:</span>
                                        <ui-view-value
                                            [options] = "YesNoOptions"
                                            [value]="offer.waterSupply"
                                        >
                                        </ui-view-value>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/gas.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Газификация:</span>
                                        <ui-view-value
                                            [options] = "YesNoOptions"
                                            [value]="offer.gasification"
                                        >
                                        </ui-view-value>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/electrification.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Электроснабжение:</span>
                                        <ui-view-value
                                            [options] = "YesNoOptions"
                                            [value]="offer.electrification"
                                        >
                                        </ui-view-value>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/sewerage.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Канализация:</span>
                                        <ui-view-value
                                            [options] = "YesNoOptions"
                                            [value]="offer.sewerage"
                                        >
                                        </ui-view-value>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/heating.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Отопление:</span>
                                        <ui-view-value
                                            [options] = "YesNoOptions"
                                            [value]="offer.centralHeating"
                                        >
                                        </ui-view-value>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/square.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Площадь участка:</span>
                                        <span class="view-value"> {{ offer.squareLand + " " + (offer.squareLandType == 0 ? "cот" : "га") }} </span>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/land.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Назначение земель:</span>
                                        <ui-view-value
                                            [options] = "landOption"
                                            [value]="offer.landPurpose"
                                        >
                                        </ui-view-value>
                                    </div>
                                </div>
                                <div *ngIf="offer.typeCode == 'land' || offer.typeCode == 'land1' || offer.typeCode == 'land2'">
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/distance.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Удаленность:</span>
                                        <span class="view-value"> {{ offer.distance }} </span>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/name.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Наименование поселения:</span>
                                        <span class="view-value"> {{ offer.settlement }} </span>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/user_icon/address.png)'"></div>
                                    <div class="view-group">
                                        <ui-view-line
                                            [placeholder]= "'Адрес участка:'" [value]="addressStr"
                                        >
                                        </ui-view-line>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/secure.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Охрана:</span>
                                        <ui-view-value
                                            [options] = "YesNoOptions"
                                            [value]="offer.guard"
                                        >
                                        </ui-view-value>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/land.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label">Назначение:</span>
                                        <ui-view-value
                                            [options] = "landOption"
                                            [value]="offer.landPurpose"
                                        >
                                        </ui-view-value>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/square.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Площадь участка:</span>
                                        <span class="view-value"> {{ offer.squareLand + " " + (offer.squareLandType == 0 ? "cот" : "га") }} </span>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/water.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Водоснабжение:</span>
                                        <ui-view-value
                                            [options] = "YesNoOptions"
                                            [value]="offer.waterSupply"
                                        >
                                        </ui-view-value>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/gas.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Газификация:</span>
                                        <ui-view-value
                                            [options] = "YesNoOptions"
                                            [value]="offer.gasification"
                                        >
                                        </ui-view-value>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/electrification.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Электроснабжение:</span>
                                        <ui-view-value
                                            [options] = "YesNoOptions"
                                            [value]="offer.electrification"
                                        >
                                        </ui-view-value>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/sewerage.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Канализация:</span>
                                        <ui-view-value
                                            [options] = "YesNoOptions"
                                            [value]="offer.sewerage"
                                        >
                                        </ui-view-value>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/heating.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Отопление:</span>
                                        <ui-view-value
                                            [options] = "YesNoOptions"
                                            [value]="offer.centralHeating"
                                        >
                                        </ui-view-value>
                                    </div>
                                </div>
                                <div *ngIf="offer.typeCode == 'market_place' || offer.typeCode == 'production_place' || offer.typeCode == 'warehouse_place'
                                        || offer.typeCode == 'service_place'|| offer.typeCode == 'gpurpose_place' || offer.typeCode == 'building'
                                        || offer.typeCode == 'other' || offer.typeCode == 'office' || offer.typeCode == 'cosial_place'"
                                >
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/distance.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Удаленность:</span>
                                        <span class="view-value"> {{ offer.distance }} </span>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/agent_icon/live_place.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Название:</span>
                                        <span class="view-value"> {{ offer.objectName }} </span>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/user_icon/address.png)'"></div>
                                    <div class="view-group">
                                        <ui-view-line
                                            [placeholder]= "'Адрес объекта:'" [value]="addressStr"
                                        >
                                        </ui-view-line>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/state.png)'"></div>
                                    <div class="view-group" >
                                        <span class="view-label">Статус объекта:</span>
                                        <ui-view-value
                                            [options] = "[
                                                {value: 'true', label: 'Новостройка'},
                                                {value: 'false', label: 'Вторичка'}
                                            ]"
                                            [value]="offer.newBuilding"
                                        >
                                        </ui-view-value>
                                    </div>
                                    <hr>
                                    <div *ngIf="offer.newBuilding" class='view_icon' [style.background-image]="'url(assets/offer_icon/stage.png)'"></div>
                                    <div *ngIf="offer.newBuilding" class="view-group" >
                                        <span class="view-label">Стадия объекта:</span>
                                        <ui-view-value
                                            [options] = "[
                                                {value: 'PROJECT', label: 'Проект'},
                                                {value: 'BUILDING', label: 'Строящийся'},
                                                {value: 'READY', label: 'Сдан'}
                                            ]"
                                            [value]="offer.objectStage"
                                        >
                                        </ui-view-value>
                                    </div>
                                    <hr *ngIf="offer.newBuilding">
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/year.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Год постройки:</span>
                                        <span class="view-value"> {{ offer.buildYear }} </span>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/property_type.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Тип здания:</span>
                                        <ui-view-value
                                            [options] = "getBuldingOptionsArray()"
                                            [value]="offer.buildingType"
                                        >
                                        </ui-view-value>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/material.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Класс здания:</span>
                                        <ui-view-value
                                        [options] = "[
                                            {value: '1', label: 'А'},
                                            {value: '2W', label: 'А+'},
                                            {value: 'T3', label: 'Б'},
                                            {value: '4', label: 'Б+'},
                                            {value: '5', label: 'С'},
                                            {value: '6', label: 'С+'}
                                        ]"
                                        [value]="'2W'"
                                        >
                                        </ui-view-value>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/material.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Материал здания:</span>
                                        <ui-view-value
                                            [options] = "houseTypeOptions"
                                            [value]="offer.houseTypeId"
                                        >
                                        </ui-view-value>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/floor.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Этаж/Этажность:</span>
                                        <ui-multi-view
                                            [values] = "[
                                                {type:'Этаж' , value: offer.floor},
                                                {type:'Этажность' , value: offer.floorsCount},
                                                {type:'Уровень' , value: offer.levelsCount}
                                            ]"
                                        >
                                        </ui-multi-view>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/water.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Водоснабжение:</span>
                                        <ui-view-value
                                            [options] = "YesNoOptions"
                                            [value]="offer.waterSupply"
                                        >
                                        </ui-view-value>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/gas.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Газификация:</span>
                                        <ui-view-value
                                            [options] = "YesNoOptions"
                                            [value]="offer.gasification"
                                        >
                                        </ui-view-value>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/electrification.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Электроснабжение:</span>
                                        <ui-view-value
                                            [options] = "YesNoOptions"
                                            [value]="offer.electrification"
                                        >
                                        </ui-view-value>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/sewerage.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Канализация:</span>
                                        <ui-view-value
                                            [options] = "YesNoOptions"
                                            [value]="offer.sewerage"
                                        >
                                        </ui-view-value>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/heating.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Отопление:</span>
                                        <ui-view-value
                                            [options] = "YesNoOptions"
                                            [value]="offer.centralHeating"
                                        >
                                        </ui-view-value>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/square.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Площадь помещения:</span>
                                        <span class="view-value"> {{ offer.squareTotal }} </span>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/height.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Высота потолков:</span>
                                        <span class="view-value"> {{ offer.ceilingHeight }} </span>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/condition.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Состояние:</span>
                                        <ui-view-value
                                            [options] = "conditionOptions"
                                            [value]="offer.condition"
                                        >
                                        </ui-view-value>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/secure.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Охрана:</span>
                                        <ui-view-value
                                            [options] = "YesNoOptions"
                                            [value]="offer.guard"
                                        >
                                        </ui-view-value>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/lift.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Лифт:</span>
                                        <ui-view-value
                                            [options] = "YesNoOptions"
                                            [value]="offer.lift"
                                        >
                                        </ui-view-value>
                                    </div>
                                    <hr>
                                    <div class='view_icon' [style.background-image]="'url(assets/offer_icon/parking.png)'"></div>
                                    <div class="view-group">
                                        <span class="view-label pull-left">Парковка:</span>
                                        <ui-view-value
                                            [options] = "YesNoOptions"
                                            [value]="offer.parking"
                                        >
                                        </ui-view-value>
                                    </div>
                                    <hr>
                                </div>

                            <div class='view_icon' [style.background-image]="'url(assets/offer_icon/cost.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left" style="flex: 0 0 50px;">Цена:</span>
                                <ui-multi-view
                                    [values] = "[
                                        {type:'Владельца' , value: offer.ownerPrice},
                                        {type:'Коммисия(руб)' , value: offer.comission},
                                        {type:'Коммисия(%)' , value: offer.comissionPerc}
                                    ]"
                                >
                                </ui-multi-view>
                            </div>

                            <div class="header_col">Тэги</div>
                            <div style="margin: 0 0 20px 20px;">
                                <ui-tag-block
                                    [value] = "offer.tag"
                                    (valueChange) = "offer.tag = $event.value"
                                ></ui-tag-block>
                            </div>

                            <div class = "header_col">Дополнительное описание</div>
                            <div style="margin-left: 20px;">
                                <span class="view-value" style="height: initial; white-space: normal;"> {{ offer.description }} </span>
                            </div>
                        </div>

                        <!-- РЕЖИМ ОТОБРАЖЕНИЯ: КОНЕЦ -->
                    </div>
                </div>
            </div>

            <!-- ПРАВАЯ СТВОРКА: КОНЕЦ -->
            <!-- РАБОЧАЯ ОБЛАСТЬ: НАЧАЛО -->

            <div class="work-area" [style.width.px]="mapWidth">
                <ui-tabs
                    [headerMode]="!paneHidden"
                    [iconUrls]="['assets/main_offers.png', 'assets/analitic.png', 'assets/history.png']"
                >
                    <ui-tab
                        [title]="'Главная'"
                    >
                        <div class = "gm_container">
                            <div *ngIf="selectMapMenu == 1" style="width: 100%;border-top: 1px solid silver; position: relative; overflow: hidden;">
                                <div style="width: 100%; position: absolute; z-index: 1; height: 100%; filter: blur(20px);"
                                        [style.background-image]="'url(' + offer.photoUrl[currentPhoto]+ ')'" *ngIf="!editEnabled">
                                </div>
                                <div [style.background-image]="'url(' + offer.photoUrl[currentPhoto]+ ')'"
                                    style=" width: calc(100% - 78px);height: 100%;background-repeat: no-repeat;background-size: contain; float: left;
                                            z-index: 10;position: relative; background-position: center;" *ngIf="!editEnabled"
                                > </div>
                                <div style="width: calc(100% - 78px); height: 100%; float: left;" *ngIf="editEnabled">
                                    <ui-upload-file [activeColor]="'orangered'" [baseColor]="'lightgray'" [type]="'image'"></ui-upload-file>
                                </div>
                                <hr style="margin: 0; width: 3px; height: 500px; float: left; z-index: 10; display: block;
                                    position: relative; background-color: #f7f7f7;"
                                >
                                <ui-carousel
                                    [photos] = "offer.photoUrl"
                                    (getIndex) = "currentPhoto = $event"
                                    style="z-index: 10;position: relative; display: block; float: right;"
                                >
                                </ui-carousel>

                            </div>
                            <google-map [latitude]="lat" [longitude]="lon" [zoom]="zoom" *ngIf="!sameObject && selectMapMenu != 1"
                                style="width:100%;height: 105%;border-top: 1px solid silver;" [place]="mapQuery"
                            >
                                <google-map-marker
                                    *ngIf="offer.locationLat"
                                    (markerClick)="markerClick(offer)"
                                    [latitude]="offer.locationLat"
                                    [longitude]="offer.locationLon"
                                    [info_str]=""
                                >
                                </google-map-marker>
                            </google-map>
                            <google-map [latitude]="lat" [longitude]="lon" [zoom]="zoom" [objects]="similarOffers" *ngIf="sameObject && selectMapMenu != 1"
                                style="width: 100%;border-top: 1px solid silver;"
                            >
                                <google-map-marker
                                    *ngIf="offer.locationLat"
                                    (markerClick)="markerClick(offer)"
                                    [latitude]="offer.locationLat"
                                    [longitude]="offer.locationLon"
                                    [info_str]=""
                                >
                                </google-map-marker>
                            </google-map>
                            <div class="map_menu">
                                <div [class.active_map_menu]="selectMapMenu == 1" (click)="setMenu(1)" style="margin-top: 1px;">Фото</div>
                                <div [class.active_map_menu]="selectMapMenu == 2" (click)="setMenu(2)">Карта</div>
                                <div [class.active_map_menu]="selectMapMenu == 3" (click)="setMenu(3)">Понорама</div>
                                <div [class.active_map_menu]="selectMapMenu == 4" (click)="setMenu(4)">Маршруты</div>
                                <div [class.active_map_menu]="selectMapMenu == 5" (click)="similarObjSelected()">Похожие</div>
                                <div [class.active_map_menu]="selectMapMenu == 6" (click)="requestsSelected()">Заявки</div>
                                <div [class.active_map_menu]="selectMapMenu == 7" (click)="setMenu(7)">Реклама</div>
                                <div [class.active_map_menu]="selectMapMenu == 8" (click)="setMenu(8)">Документы</div>
                                <div [class.active_map_menu]="selectMapMenu == 9" (click)="setMapQuery('Образование', 9)">Образование</div>
                                <div [class.active_map_menu]="selectMapMenu == 10" (click)="setMapQuery('магазины', 10)">Продукты</div>
                                <div [class.active_map_menu]="selectMapMenu == 11" (click)="setMapQuery('спортзал', 11)">Спорт клубы</div>
                                <div [class.active_map_menu]="selectMapMenu == 12" (click)="setMapQuery('больница', 12)">Здоровье</div>
                                <div [class.active_map_menu]="selectMapMenu == 13" (click)="setMapQuery('музей', 13)">Культура</div>
                                <div [class.active_map_menu]="selectMapMenu == 14" (click)="setMapQuery('кинотеатр', 14)">Досуг</div>
                                <div [class.active_map_menu]="selectMapMenu == 15" (click)="setMapQuery('кафе', 15)">Общепит</div>
                            </div>
                            <div style="position: absolute;z-index: 1;border-left: 1px solid rgb(204, 204, 204);right: 1px;
                                    height: 500px; overflow: hidden;"
                                [style.right]="_hubService.shared_var['nb_width']"
                                *ngIf="sameObject && selectMapMenu == 5"
                            >
                                <div style="width: 369px; background-color: #fff;">
                                    <div class="head">
                                        <input type="text" style="width: 319px; margin-left: 10px; border: none; margin-top: 10px;"
                                            (keydown)="simSearchKeydown($event)"
                                        >
                                        <span class="icon-search" style="margin-left: 10px; cursor: pointer;"
                                            (click)="simSearch()"
                                        ></span>
                                    </div>
                                    <div class="" style="width: 100%; overflow-y: scroll; height: 425px;">
                                        <div *ngFor="let offer of similarOffers">
                                            <digest-offer
                                                [offer]="offer"
                                                [compact]="true"
                                            >
                                            </digest-offer>
                                            <hr style="margin: 0;">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style="position: absolute;z-index: 1;border-left: 1px solid rgb(204, 204, 204);right: 1px;
                                    height: 500px; overflow: hidden;"
                                [style.right]="_hubService.shared_var['nb_width']"
                                *ngIf="!sameObject && selectMapMenu == 6"
                            >
                                <div class="head">
                                    <input type="text" style="width: 319px; margin-left: 10px; border: none; margin-top: 10px;"
                                    >
                                    <span class="icon-search" style="margin-left: 10px; cursor: pointer;"
                                        (click)="simSearch()"
                                    ></span>
                                </div>
                                <div class="" style="width: 369px; background-color: #fff; overflow-y: scroll; height: 500px">
                                    <digest-request *ngFor="let request of requests"
                                        [request]="request"
                                        [compact]="true"
                                        [color]="'#0e60c5'"
                                    >
                                    </digest-request>
                                </div>
                            </div>

                            <div style="position: absolute;z-index: 1;border-left: 1px solid rgb(204, 204, 204);right: 1px;
                                    height: 500px; width: 370px; overflow: hidden;"
                                *ngIf="selectMapMenu == 8"
                            >
                                <div style="width: 100%;height: 70px;" *ngIf="editEnabled">
                                    <ui-upload-file [activeColor]="'orangered'"
                                                    [baseColor]="'lightgray'"
                                                    [type]="'document'"
                                                    (fileChange)="documents.push($event)"
                                    ></ui-upload-file>
                                </div>
                                <div style="display: flex;flex-wrap: wrap;justify-content: space-around;">
                                    <ui-document *ngFor='let doc of documents' [doc]="doc"></ui-document>
                                </div>
                            </div>
                            <div style="position: absolute;z-index: 1;right: 1px;
                                    height: 833px; width: 370px; overflow: scroll;"
                                *ngIf="selectMapMenu == 7"
                            >
                                <div class="head">
                                    <input type="text" style="width: 319px; margin-left: 10px; border: none; margin-top: 10px;"
                                        (keydown)="console.log($event)"
                                    >
                                    <span class="icon-search" style="margin-left: 10px; cursor: pointer;"
                                        (click)="simSearch()"
                                    ></span>
                                </div>
                                <ui-advertising>    </ui-advertising>
                            </div>

                        </div>

                        <div class="star_container">
                            <div class='statistic'>
                                <div on-mouseenter='inRate($event)' on-mouseleave='outRate($event)'>
                                    <div>ОБЩИЙ РЕЙТИНГ:</div>
                                    <div style="font-size: 8pt; color: #5b5b5b; margin: 6px 0;">Разбивка по категориям</div>
                                    <div class="rate_line" *ngFor="let rat of rate; let i = index">
                                        <div on-mousemove ='inRate($event, i)' on-mouseout='outRate($event, i)' on-click='estimate($event,i)'><div [ngStyle]="{'width': rat.persent+'%'}"></div></div>
                                        <div>{{rat.text}}</div>
                                    </div>
                                </div>
                                <div on-mouseenter='inRate($event)' on-mouseleave='outRate($event)' style="margin-right: 125px; margin-left: auto;">
                                    <div style="margin: 0px 0 0 12px; height: 7px;">{{' '}}</div>
                                    <div style="font-size: 8pt; color: #5b5b5b; margin: 7px 0 5px 13px;">Расскажите, что вы думаете об этом районе, используя оценки категорий.</div>
                                    <div class="rate_line" *ngFor="let rat of rate1; let i = index">
                                        <div style="order: 2; margin-right: 0;margin-left: auto;"
                                            on-mousemove ='inRate($event, i)' on-mouseout='outRate($event, i)' on-click='estimate($event,i)'>
                                            <div [ngStyle]="{'width': rat.persent+'%'}"></div>
                                        </div>
                                        <div style="order: 1;">{{rat.text}}</div>
                                    </div>
                                </div>
                            </div>
                             <div class="graph" *ngIf="sameObject">
                                <div class ='price'>
                                    <div *ngIf = "max"  style="margin-top: 4px;">МАКС : {{split_number(max)}}</div>
                                    <div *ngIf = "min" >МИН  : {{split_number(min)}}</div>
                                </div>
                                <div *ngIf = "average" class ='price'
                                        style="top: 172px; left: 146px; width: 110px;t ext-align: center; background-color: transparent;"
                                >
                                    Средняя:<br>{{split_number(average)}}
                                </div>
                                <div id={{chartID}}
                                    [data]="pie_ChartData"
                                    [chartOptions] = "pie_ChartOptions"
                                    chartType="PieChart" GoogleChart
                                    style="margin: 96px 0 0px 86px;"
                                    >
                                </div>
                            </div>
                        </div>
                    </ui-tab>

                    <!--<ui-tab
                        [title]="'Заявки'"
                        (tabSelect)="requestsSelected()"
                    >
                        <div class="" style="max-width: 910px; overflow-y: scroll;" [style.height]="paneHeight">
                            <digest-request *ngFor="let request of requests"
                                [request]="request"
                            >
                            </digest-request>
                        </div>
                    </ui-tab>-->
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
    `,
    providers: [OfferService]
})

export class TabOfferComponent implements OnInit {
    public tab: Tab;
    public offer: Offer;
    public photos: Photo[];

    sgList: string[] = [];
    selectMapMenu: number = 0;
    agentOpts: any[] = [];
    documents: any[] =[];
    personOpts: any[] = [];

    similarOffers: Offer[];
    requests: Request[];
    historyRecs: HistoryRecord[];

    paneHidden: boolean = false;
    paneHeight: number;
    paneWidth: number;
    mapWidth: number;

    editEnabled: boolean = false;

    mapQuery: string;

    lat: number;
    lon: number;
    zoom: number;

    uploadPhoto: any;

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

    currentPhoto: number = 0;

    offerFloor: any[]=[];
    offerSquare: any[]=[];
    offerPrice: any[]=[];
    offerAddress: any[]=[];
    landSquare: any[]=[];

    offerTypeCodeOptions = [
        {value: 'sale', label: 'Продажа'},
        {value: 'rent', label: 'Аренда'}
    ];

    stateCodeOptions = [
        {value: 'raw', label: 'Не активно'},
        {value: 'active', label: 'Активно'},
        {value: 'work', label: 'Прайс'},
        {value: 'ok', label: 'Сделка'},
        {value: 'suspended', label: 'Приостановленно'},
        {value: 'archive', label: 'Архив'}
    ];

    sourceOptions = [
        {value: 'input', label: 'Входящий звонок'},
        {value: 'internet', label: 'Интернет'},
        {value: 'print', label: 'Печатное издание'},
        {value: 'spam', label: 'Рассылка'},
        {value: 'reccomend_cl', label: 'Рекомендация клиента'},
        {value: 'reccomend_pt', label: 'Рекомендация парнера'},
        {value: 'social', label: 'Социальные сети'},
        {value: 'excelent', label: 'Успешный опыт сотрудничества'},
        {value: 'cold', label: 'Холодная база'}
    ];

    stageCodeOptions = [
        {value: 'contact', label: 'Первичный контакт'},
        {value: 'pre_deal', label: 'Заключение договора'},
        {value: 'show', label: 'Показ'},
        {value: 'prep_deal', label: 'Подготовка договора'},
        {value: 'decision', label: 'Принятие решения'},
        {value: 'negs', label: 'Переговоры'},
        {value: 'deal', label: 'Сделка'}
    ];

    typeCodeOptions = [
        {value: 'other', label: 'Не указано'},

        {value: 'room', label: 'Комната'},
        {value: 'apartment', label: 'Квартира'},
        {value: 'house', label: 'Дом/Коттедж'},

        {value: 'land', label: 'Садовый земельный участок'},
        {value: 'land1', label: 'Огородный земельный участок'},
        {value: 'land2', label: 'Дачный земельный участок'},

        {value: 'gpurpose_place', label: 'Свободного назначения'},
        {value: 'market_place', label: 'Розничная торговля'},
        {value: 'office', label: 'Офисная'},
        {value: 'production_place', label: 'Индустриальная'},
        {value: 'building', label: 'Аппартаменты'},
        {value: 'cosial_place', label: 'Социальная'}
    ];

    apSchemaOptions = [
        {value: 0, label: 'Не указан'},
        {value: 1, label: 'Элиткласс'},
        {value: 2, label: 'Бизнес класс'},
        {value: 12, label: 'Эконом класс'},
        {value: 3, label: 'Улучшенная'},
        {value: 5, label: 'Брежневка'},
        {value: 6, label: 'Хрущевка'},
        {value: 4, label: 'Сталинка'},
        {value: 11, label: 'Старый фонд'},
        {value: 8, label: 'Малосемейка'},
        {value: 10, label: 'Общежитие'},
        {value: 7, label: 'Таунхаус'}
    ];

    roomSchemeOptions = [
        {value: 0, label: 'Не указано'},
        {value: 3, label: 'Раздельные'},
        {value: 5, label: 'Смежные'},
        {value: 4, label: 'Смежно-раздельные'},
        {value: 6, label: 'Студия'},
        {value: 1, label: 'Свободная'},
        {value: 2, label: 'Другое'}
    ];

    houseTypeOptions = [
        {value: 0, label: 'Не указан'},
        {value: 4, label: 'Кирпичный'},
        {value: 1, label: 'Панель'},
        {value: 5, label: 'Монолит'},
        {value: 6, label: 'Кирпично-монолитный'},
        {value: 7, label: 'Блочный'},
        {value: 2, label: 'Деревянный'},
        {value: 3, label: 'Шлакоблочный'}

    ];

    YesNoOptions = [
        {value: 'false', label: 'Нет'},
        {value: 'true', label: 'Да'}
    ];

    conditionOptions = [
        {value: "0", label: 'Не указано'},
        {value: "6", label: 'После строителей'},
        {value: "1", label: 'Социальный ремонт'},
        {value: "2", label: 'Сделан ремонт'},
        {value: "7", label: 'Евроремонт'},
        {value: "3", label: 'Дизайнерский ремонт'},
        {value: "4", label: 'Требуется ремонт'}
    ];

    bathroomOptions = [
        {value: "NO", label: 'Нет'},
        {value: "SPLITED", label: 'Раздельный'},
        {value: "COMBINED", label: 'Совмещенный'}
    ];

    landOption = [
        {value: 'NO', label: 'Не указано'},
        {value: 'IGS', label: 'Земли сельскохозяйственного назначения'},
        {value: 'GARDEN', label: 'Земли населённых пунктов'},
        {value: 'PROM_LAND', label: 'Земли промышленного назначения'},
        {value: 'FARM_COMN', label: 'Земли охраняемых территорий'},
        {value: 'GARDEN_COMN', label: 'Земли лесного фонда'},
        {value: 'WH_KAND', label: 'Земли водного фонда'},
        {value: 'SH_LAND', label: 'Земли запаса'}
    ];

    buildingOption = [
        {value: 'NO', label: 'Не выбрано'},
        //свободного назначечение
        {value: 'HOTEL', label: 'Отель'},
        {value: 'RESTAURANT', label: 'Ресторан'},
        {value: 'KAFE', label: 'Кафе'},
        {value: 'SPORT_BUILDING', label: 'Спортивное сооружение'},
        //розничная торговля
        {value: 'SHOP', label: 'Магазин'},
        {value: 'SHOPS_CENTER', label: 'Торговый центр'},
        {value: 'SHOP_ENTERTAINMENT', label: 'Торгово-развлекательный комплекс'},
        //Офисная
        {value: 'CABINET', label: 'Кабинет'},
        {value: 'OFFICE_SPACE', label: 'Офисное помещение'},
        {value: 'OFFICE_BUILDING', label: 'Офисное здание'},
        {value: 'BUSINESS_CENTER', label: 'Бизнес-центр'},
        //Индустриальная
        {value: 'MANUFACTURE_BUILDING', label: 'Производственное здание'},
        {value: 'WAREHOUSE_SPACE', label: 'Складское помещение'},
        {value: 'INDUSTRIAL_ENTERPRICE', label: 'Промышленное предприятие'},
        //Аппартаменты
        {value: 'APARTMENT_HOUSE', label: 'Многоквартирный дом'},
        //Социальное
        {value: 'MEDICAL_CENTER', label: 'Медицинский центр'},
        {value: 'POOL', label: 'Бассейн'},
        {value: 'GOLF_CLUB', label: 'Гольф-клуб'},
        {value: 'BOWLING_CENTER', label: 'Боулинг-центр'},
        {value: 'AIRPORT', label: 'Аэропорт'}
    ];

    addressStr: string = '';
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

    rate1 = [
        {persent: 10, text: "Удаленность от центра", isRated: false},
        {persent: 25, text: "Престижность района", isRated: true},
        {persent: 50, text: "Оформление придомовой территории", isRated: false},
        {persent: 55, text: "Наличие парковки", isRated: false},
        {persent: 45, text: "Отделка помещения общего пользования", isRated: false},
        {persent: 40, text: "Вид из окон", isRated: false},
        {persent: 75, text: "Наличие системы безопасности", isRated: false},
        {persent: 90, text: "Социальная однородность дома", isRated: false},
        {persent: 65, text: "Транспортная доступность", isRated: false},
    ];
    mediator = 'NO';
    mainRate=this.countMainRate();

    categoryOffer: string = "REZIDENTIAL";
    categoryOwner: string = "CLIENT";

    sameObject: boolean = false;

    pie_ChartData = [
        ['', ''],
        ['Нет объектов', 0]
    ];

    pie_ChartOptions  = {
        width: 216,
        height: 216,
        pieHole: 0.6,
        legend: 'none',
        chartArea: {left:8,top:8,width:200,height:200}
    };

    max : number;
    min: number;
    average: number;

    chartID: string = "Chart"+Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

    constructor(private _hubService: HubService,
                private _configService: ConfigService,
                private _offerService: OfferService,
                private _requestService: RequestService,
                private _taskService: TaskService,
                private _analysisService: AnalysisService,
                private _historyService: HistoryService,
                private _photoService: PhotoService,
                private _userService: UserService,
                private _personService: PersonService,
                private _uploadService: UploadService,
                private _suggestionService: SuggestionService,
                private _sessionService: SessionService
            ) {
        setTimeout(() => {
            if (this.offer.id) {
                this.tab.header = 'Предложение ';
            } else {
                this.tab.header = 'Новый Объект';
            }
        });

        this._userService.list(null, null, "").subscribe(agents => {
            for (let i = 0; i < agents.length; i++) {
                var a = agents[i];
                this.agentOpts.push({
                    value: a.id,
                    label: a.name
                });
            }
        });

        this._personService.list(null, null, "").subscribe(persons => {
            for (let i = 0; i < persons.length; i++) {
                var p = persons[i];
                this.personOpts.push({
                    value: p.id,
                    label: p.name
                });
            }
        });
    }

    ngOnInit() {
        this.offer = this.tab.args.offer;

        this.offer.openDate = Math.round((Date.now() / 1000));

        var c = this._configService.getConfig();
        let loc = this._sessionService.getAccount().location;

        this.offerFloor=[
            {type: 'FLOOR', value: this.offer.floor},
            {type: 'FLOORS', value: this.offer.floorsCount},
            {type: 'LEVELS', value: this.offer.levelsCount}
        ];

        this.offerSquare=[
            {type: 'TOTAL', value: this.offer.squareTotal},
            {type: 'LIVING', value: this.offer.squareLiving},
            {type: 'KITCHEN', value: this.offer.squareKitchen}
        ];

        this.offerPrice=[
            {type: 'OWNER', value: this.offer.ownerPrice},
            {type: 'RUBLES', value: this.offer.comission},
            {type: 'PERSENT', value: this.offer.comissionPerc}
        ];

        this.offerAddress=[
            {type: 'KRAY', value: this.offer.fullAddress.region},
            {type: 'CITY', value: this.offer.fullAddress.city},
            {type: 'DISTRICT', value: this.offer.fullAddress.admArea},
            {type: 'STREET', value: this.offer.fullAddress.street},
            {type: 'HOUSE', value: this.offer.fullAddress.house},
            {type: 'HOUSING', value: this.offer.fullAddress.housing},
            {type: 'FLAT', value: this.offer.fullAddress.apartment}
        ];

        this.landSquare=[
            {type: this.offer.squareLandType, value: this.offer.squareLand}
        ];

        if (this.offer.locationLat) {
            this.lat = this.offer.locationLat;
            this.lon = this.offer.locationLon;
            this.zoom = 14;
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

        if (this.offer.id == null && this.offer.sourceUrl == null) {
            this.offer = new Offer();

            if (this.tab.args.person) {
                this.offer.personId = this.tab.args.person.id;
            }

            this.editEnabled = true;
        }
        let num = 0;
        for(let i = 0; i< this.typeCodeOptions.length; i++){
            if (this.offer.typeCode == this.typeCodeOptions[i].value) {
                num = i;
            }
        }

        if(num > 1 && num < 4)
            this.categoryOffer = 'REZIDENTIAL';
        else if(num >= 4 && num < 6)
            this.categoryOffer = 'LAND';
        else
            this.categoryOffer = 'COMMERSIAL';
        this.calcSize();
    }

    select(itm) {
        this.addressStr = itm;
        this.sgList = [];
    }

    docClick() {
        this.sgList = [];
    }

    addrChanged() {
        this.sgList = [];
        if (this.addressStr.length > 0) {

            // запросить варианты

            this._suggestionService.list(this.addressStr).subscribe(sgs => {
                sgs.forEach(e => {
                    this.sgList.push(e);
                })
            })
        }
    }

    photoChanges(event) {
        let file = event.srcElement.files;
        let postData = {field1:"field1", field2:"field2"}; // Put your form data variable. This is only example.

        /*this._uploadService.uploadPhoto(postData, file).then(result => {
            console.log(result);
        });*/
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
        this.mapWidth = document.body.clientWidth - (16 * 2) - this.paneWidth;
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
        this.offer.agentId = e.selected.value;
        if (this.offer.agentId != null) {
            this._userService.get(this.offer.agentId).subscribe(agent => {
                this.offer.agent = agent;
            });
        }
    }

    personChanged(e) {
        this.offer.personId = e.selected.value;
        if (this.offer.personId != null) {
            this._personService.get(this.offer.personId).subscribe(person => {
                this.offer.person = person;
            });
        }
    }

    save() {

        let tem = this.getIndex(this.offerSquare, "TOTAL");
        this.offer.squareTotal =  tem > -1 ? parseInt(this.offerSquare[tem].value) : null;
        tem =  this.getIndex(this.offerSquare, "KITCHEN");
        this.offer.squareKitchen =  tem > -1 ? parseInt(this.offerSquare[tem].value) : null;
        tem = this.getIndex(this.offerSquare, "LIVING");
        this.offer.squareLiving =  tem > -1 ? parseInt(this.offerSquare[tem].value) : null;

        tem = this.getIndex(this.offerAddress, "KRAY");
        this.offer.fullAddress.region =  tem > -1 ? this.offerAddress[tem].value : null;
        tem = this.getIndex(this.offerAddress, "CITY");
        this.offer.fullAddress.city =  tem > -1 ? this.offerAddress[tem].value : null;
        tem = this.getIndex(this.offerAddress, "DISTRICT");
        this.offer.fullAddress.admArea =  tem > -1 ? this.offerAddress[tem].value : null;
        tem = this.getIndex(this.offerAddress, "STREET");
        this.offer.fullAddress.street =  tem > -1 ? this.offerAddress[tem].value : null;
        tem = this.getIndex(this.offerAddress, "HOUSE");
        this.offer.fullAddress.house =  tem > -1 ? this.offerAddress[tem].value : null;
        tem = this.getIndex(this.offerAddress, "HOUSING");
        this.offer.fullAddress.housing =  tem > -1 ? this.offerAddress[tem].value : null;
        tem = this.getIndex(this.offerAddress, "FLAT");
        this.offer.fullAddress.apartment =  tem > -1 ? this.offerAddress[tem].value : null;

        tem = this.getIndex(this.offerFloor, "FLOOR");
        this.offer.floor =  tem > -1 ? parseInt(this.offerFloor[tem].value) : null;
        tem =  this.getIndex(this.offerFloor, "FLOORS");
        this.offer.floorsCount =  tem > -1 ? parseInt(this.offerFloor[tem].value) : null;
        tem = this.getIndex(this.offerFloor, "LEVELS");
        this.offer.levelsCount =  tem > -1 ? parseInt(this.offerFloor[tem].value) : null;

        tem = this.getIndex(this.offerPrice, "OWNER");
        this.offer.ownerPrice =  tem > -1 ? parseInt(this.offerPrice[tem].value) : null;
        tem =  this.getIndex(this.offerPrice, "RUBLES");
        this.offer.comission =  tem > -1 ? parseInt(this.offerPrice[tem].value) : null;
        tem = this.getIndex(this.offerPrice, "PERSENT");
        this.offer.comissionPerc =  tem > -1 ? parseInt(this.offerPrice[tem].value) : null;


        this.offer.squareLand = this.landSquare[0] ? this.landSquare[0].value : null;
        this.offer.squareLandType = this.landSquare[0] ? this.ParseInt(this.landSquare[0].type) :  null;
        this.offer.person = this.offer.person || null;
        this.offer.personId = this.offer.person.id || null;

        this._offerService.save(this.offer).subscribe(offer => {
            setTimeout(() => {
                this.offer = offer;
            });
            this.toggleEdit();
        });
    }

    similarObjSelected() {
        this.sameObject = !this.sameObject;
        if(this.sameObject){
            this.getSimilarOffers(0, 16);
        }
        this.mapQuery = null;
        this.selectMapMenu = 5;

    }

    requestsSelected() {
        this.sameObject = !this.sameObject;
        this._requestService.listForOffer(this.offer).subscribe(
            data => {
                this.requests = data;
                this.setDonutData('requests');
            }
        )
        this.selectMapMenu = 6;
        this.mapQuery = null;
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

    getSimilarOffers(page, per_page) {
            this._offerService.getSimilar(this.offer, page, per_page).subscribe(
                data => {
                    this.similarOffers = data.list;
                    this.setDonutData('similar');
                },
                err => console.log(err)
            );
    }

    markerClick(o: Offer) {
        //r.selected = !r.selected;
        // scroll to object ???
    }

    openPerson() {
        if(this.offer.person.id){
            var tab_sys = this._hubService.getProperty('tab_sys');
            tab_sys.addTab('person', {person: this.offer.person});
        }
    }

    openUser() {
        if(this.offer.agent.id){
            var tab_sys = this._hubService.getProperty('tab_sys');
            tab_sys.addTab('user', {user: this.offer.agent});
        }
    }

    openOrganisation(){
        if(this.offer.person.organisation.id){
            var tab_sys = this._hubService.getProperty('tab_sys');
            tab_sys.addTab('organisation', {organisation: this.offer.person.organisation});
        }
    }

    countMainRate(){
        var temp=0;
        for(var i=0; i<this.rate.length; i++){
            temp+=this.rate[i].persent;
        }
        return Math.round(temp/this.rate.length*100)/100;
    }

    showMenu(event, up?){
        let parent: HTMLElement;
        if (up)
            parent = (<HTMLElement>event.currentTarget).parentElement;
        else
            parent = (<HTMLElement>event.currentTarget).parentElement.parentElement;
        let height: number = parent.getElementsByTagName('input').length * 35;
        if(parent.offsetHeight == 30){
            parent.style.setProperty('height', ""+(height+60)+'px');
            parent.style.setProperty('overflow','visible');
             (<HTMLElement>event.currentTarget).style.setProperty('transform', 'rotate(180deg)');
        }
        else{
             parent.style.setProperty('height', "30px");
             parent.style.setProperty('overflow', "hidden");
              (<HTMLElement>event.currentTarget).style.setProperty('transform', 'rotate(0deg)')
        }
    }

    setDonutData(data: string){
        this.pie_ChartData = [
            ['', ''],
            ['Нет объектов', 0]
        ];
        if(data == 'similar'){
            if(this.similarOffers.length == 1){
                    this.pie_ChartData.push(["–Ю–±—К–µ–Ї—В–Њ–≤:", 1]);
                    this.max = this.min = this.average = this.similarOffers[0].ownerPrice * 1000;
            } else if(this.similarOffers.length > 1){
                let arr :number[] = [];
                for(var i=0 ; i< this.similarOffers.length; ++i)
                    if(this.similarOffers[i].ownerPrice)
                        arr.push(this.similarOffers[i].ownerPrice);
                arr.sort(this.compareNumeric);
                this.max = arr[arr.length-1] * 1000;
                this.min = arr[0] * 1000;
                this.average = (this.max + this.min)/2;
                arr[arr.length-1]+=1;
                let lent: number = (arr[arr.length -1] - arr[0])/4;
                for(var i=arr[0]; i< arr[arr.length -1]; i+=lent){
                    this.pie_ChartData.push(this.getCount(i,i+lent));
                }
            }
        } else if(data == 'similar'){
            if(this.requests.length == 1){
                    this.pie_ChartData.push(["–Ч–∞—П–≤–Њ–Ї:", 1]);
                    this.max = this.min = this.average = this.similarOffers[0].ownerPrice * 1000;
            } else if(this.similarOffers.length > 1){
                let arr :number[] = [];
                for(var i=0 ; i< this.similarOffers.length; ++i)
                    if(this.similarOffers[i].ownerPrice)
                        arr.push(this.similarOffers[i].ownerPrice);
                arr.sort(this.compareNumeric);
                this.max = arr[arr.length-1] * 1000;
                this.min = arr[0] * 1000;
                this.average = (this.max + this.min)/2;
                arr[arr.length-1]+=1;
                let lent: number = (arr[arr.length -1] - arr[0])/4;
                for(var i=arr[0]; i< arr[arr.length -1]; i+=lent){
                    this.pie_ChartData.push(this.getCount(i,i+lent));
                }
            }
        }
    }

    split_number(n): string {
        n += "";
        n = new Array(4 - n.length % 3).join("U") + n;
        return n.replace(/([0-9U]{3})/g, "$1 ").replace(/U/g, "");
    }

    compareNumeric(a, b) {
        if (a > b) return 1;
        if (a < b) return -1;
    }

    getCount(min:number, max: number): Array<any>{
        let count: number=0;
        for(var i = 0 ; i< this.similarOffers.length; ++i){
            if(this.similarOffers[i].ownerPrice >= min && this.similarOffers[i].ownerPrice<max)
                count++;
        }
        return ["от "+Math.round(min)+" т.руб. до "+ Math.round(max)+ " т.руб.", count];
    }

    getTypeCodeArray(): Array<any>{
        let temp;
        switch(this.categoryOffer){
            case "REZIDENTIAL": {
                temp = this.typeCodeOptions.slice(1, 4);
                temp.unshift(this.typeCodeOptions[0]);
                return temp;
            }
            case "COMMERSIAL": {
                temp = this.typeCodeOptions.slice(7,13);
                temp.unshift(this.typeCodeOptions[0]);
                return temp;
            }
            case "LAND": {
                temp = this.typeCodeOptions.slice(4, 7);
                temp.unshift(this.typeCodeOptions[0]);
                return temp;
            }
        }
    }

    getBuldingOptionsArray(): Array<any>{
        let temp;
        switch(this.offer.typeCode){
            case "gpurpose_place": {
                temp = this.buildingOption.slice(1, 5);
                temp.unshift(this.buildingOption[0]);
                return temp;
            }
            case "market_place": {
                temp = this.buildingOption.slice(5,8);
                temp.unshift(this.buildingOption[0]);
                return temp;
            }
            case "office": {
                temp = this.buildingOption.slice(8, 12);
                temp.unshift(this.buildingOption[0]);
                return temp;
            }
            case "production_place": {
                temp = this.buildingOption.slice(12, 15);
                temp.unshift(this.buildingOption[0]);
                return temp;
            }
            case "building": {
                temp = this.buildingOption.slice(15, 16);
                temp.unshift(this.buildingOption[0]);
                return temp;
            }
            case "cosial_place": {
                temp = this.buildingOption.slice(16, 21);
                temp.unshift(this.buildingOption[0]);
                return temp;
            }
            default:
                return [this.buildingOption[0]];

        }
    }


    setMapQuery(qw: string, num: number){
        this.mapQuery = qw;
        this.selectMapMenu = num;
    }
    setMenu(num:number){
        this.selectMapMenu = num;
        this.mapQuery = null;
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

    getAddressStr(){
        this.addressStr = this.offer.fullAddress.city !== undefined ? "" + this.offer.fullAddress.city : '';
        this.addressStr += this.offer.fullAddress.street !== undefined ? ", " + this.offer.fullAddress.street : '';
        this.addressStr += this.offer.fullAddress.house !== undefined ? ", " + this.offer.fullAddress.house : '';
    }

    getIndex(array: Array<any>, str: string){
        for(let i =0; i<array.length; ++i){
            if(array[i].type == str)
                return i;
        }
        return -1;
    }

    ParseInt(val){
        if(isNaN(parseInt(val,10)))
            return null;
        else
            return parseInt(val,10);
    }

    getSourceName(): string{
        return this.offer.sourceUrl.match(/www\.(.{1,10})\..{1,5}/i)[1];
    }

    simSearchKeydown(e) {

    }

    simSearch() {

    }

    inRate(sd,ad){

    }

    outRate(sd,ad){

    }

    estimate(sd,ad){

    }
}
