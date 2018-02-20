import {Component, OnInit} from '@angular/core';

import {HubService} from '../../service/hub.service'

import {Offer} from '../../entity/offer';



@Component({
    selector: 'digest-offer',
    inputs: ['offer', 'compact'],
    styles: [`

        .billet {
            background-color: white;
            color: #696969;
            font-weight: 200;
            font-size: 14px;
            height: 70px;
            position: relative;
            margin: 3px 0;
            padding: 5px 0;
        }

        .billet:hover {
            background-color: #f5f3f3;
            cursor: hand;
        }

        .billet > div {
            width: 100%;
        }

        .describe{
            color: black;
            font-size: 13px;
            line-height: 15px;
        }

        .healthbar {
            height: 1px;
            width: 95%;
            margin: 5px 0 0 5px;
            background: #ccc;
            position: relative;
        }

        .healthbar > .health {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 0%;
            background-color: red;
        }

        .timestamp {
            position: absolute;
            top: 6px; right: 9px;
            font-size: 11px;
            color: #bbb;
        }

        .compact_owner {
            color: #bfbcbb !important;
        }

        .tag-mark {
            position: absolute;
            right: 10px;
            top: 40%;
        }

        .compact{
            height: 68px;
            background-color: inherit;
        }

    `],
    template: `
        <div class="billet" data-id="r{{offer._id}}" id="r{{offer.id}}" [class.compact] = "compact">
            <div>
                <div class="timestamp" *ngIf="offer.changeDate"> {{ (offer.changeDate | formatDate).toString().split(" ")[0] }} </div>
                <div class="tag-mark">
                    <ui-tag
                        [value]="offer.tag"
                    >
                    </ui-tag>
                </div>
                <!--<img *ngIf="!compact" src="{{ offer.photoUrl?offer.photoUrl[0]:'assets/no_photo.png' }}"
                    style="height: 56px;width: 74px;float: left;margin: 0 10px;"
                > -->
                <div class="describe" style="min-height: 70px; margin-left: 10px;">
                    <span style="font-style: italic;  font-size: 9pt; color: #002E5D;"
                        *ngIf ="offer.typeCode"
                    >{{ typeCodeOptions[offer.typeCode].split(" ")[0] }}
                    </span>
                    {{ offer.fullAddress.city === undefined ? " " : ", " + offer.fullAddress.city }}<br>
                    <div style="width: 220px; height: 17px; text-overflow: ellipsis;white-space: nowrap;overflow: hidden;
                            float: left;margin-right: 30px;">
                            {{ offer.fullAddress.street === undefined ? "" : offer.fullAddress.street }}
                            {{ offer.fullAddress.house === undefined ? "" : (", " + offer.fullAddress.house) }}
                            {{ offer.roomsCount  === undefined ? "" : ", "+ offer.roomsCount+"ком."}}
                            {{ offer.squareTotal  === undefined ? "" : ", "+ offer.squareTotal+"м." }}
                            {{ offer.floor  === undefined ? "" : ", "+ offer.floor+"/"}}
                            {{ offer.floorsCount  === undefined ? "" : ""+ offer.floorsCount}}</div><br>

                    <div class="text-primary" style = "color: #8B0000;">Цена: {{ offer.ownerPrice }} тыс. руб.</div>
                    <span *ngIf="!(offer.locality || ' ').split(',')[1] && !compact" style="height: 10px;display: block;"></span>
                    <span style="font-size: 9pt; color: #a9a8a8;" [class.compact_owner]="compact">
                        Ответственный:
                    </span>
                    <span  [class.compact_owner]="compact"> {{offer.agent?.name}} </span>
                </div>
            </div>
        </div>
    `
})

export class DigestOfferComponent {

    public offer: Offer;
    public compact: boolean = false;

    private to: any;

    typeCodeOptions = {
        room: 'Комната',
        apartment: 'Квартира',
        apartment_small: 'Малосемейка',
        apartment_new: 'Новостройка',

        house: 'Дом',
        dacha: 'Дача',
        cottage: 'Коттедж',

        townhouse: 'Таунхаус',

        other: 'Другое',
        land: 'Земля',

        building: 'здание',
        office_place: 'офис',
        office: 'офис',
        market_place: 'торговая площадь',
        production_place: 'производственное помещение',
        gpurpose_place: 'помещение общего назначения',
        autoservice_place: 'автосервис',
        service_place: 'помещение под сферу услуг',
        warehouse_place: 'склад база',
        garage: 'гараж'

    };

    constructor(private _hubService: HubService) { };


    open() {
        var tabSys = this._hubService.getProperty('tab_sys');
        tabSys.addTab('offer', {offer: this.offer});
    }

    compactHeight(){
        if(this.compact)
            return '68px';
        else return '85px';
    }

}
