
import {GeoPoint} from "../class/geoPoint";
import {FullAddress} from "../class/fullAddress";
import {User} from "./user";
import {Person} from "./person";
import {Organisation} from "./organisation";
import {Rating} from "../class/rating";


export class Offer {

    id: number;
    accountId: number;

    stateCode: string;
    stageCode: string;

    fullAddress: FullAddress;

    district: string;
    poi: string;

    houseTypeId: number;
    apSchemeId: number;
    roomSchemeId: number;
    conditionId: number;
    balconyId: number;
    bathroomId: number;

    roomsOfferCount: number;

    price: number;
    ownerPrice: number;
    agencyPrice: number;
    leaseDepositL: number;
    comission: number;
    comissionPerc: number;

    workInfo: string;
    description: string;
    sourceMedia: string;
    sourceUrl: string;
    sourceMediaText: string;

    addDate: number;
    openDate: number;
    changeDate: number;
    assignDate: number;
    deleteDate: number;
    lastSeenDate: number;

    multylisting: boolean;
    mlsPriceType: string;
    mlsPrice: number;

    agentId: number;
    agent: User;

    personId: number;
    person: Person;

    companyId: number;
    company: Organisation;

    locationLat: number;
    locationLon: number;

    photoUrl: string[];


    sourceCode: string;

    offerTypeCode: string;

    typeCode: string;

    settlement: string;

    newBuilding: boolean;

    objectStage: string;

    buildYear: string;

    houseType: string;
    houseMaterial: string;
    roomsCount: number;

    roomsType: string;

    floor: number;
    floorsCount: number;
    levelsCount: number;

    squareTotal: number;
    squareLiving: number;
    squareKitchen: number;
    squareLand: number;
    squareLandType: number;

    balcony: boolean;
    loggia: boolean;

    bathroom: string;

    condition: string;

    distance: number;

    guard: boolean;

    waterSupply: boolean;

    gasification: boolean;
    electrification: boolean;
    sewerage: boolean;
    centralHeating: boolean;
    lift: boolean;
    parking: boolean;

    landPurpose: string;
    objectName: string;
    buildingType: string;
    buildingClass: string;

    сeilingHeight: number;

    contractStr: string;

    // ratings
    locRating: Rating;
    offerRaiting: Rating;

    tag: string;

    ceilingHeight: number;

    media_info_saller: string;
    phones_import: string[];

    constructor () {
        // set default vals
        this.stateCode = 'raw';
        this.stageCode = 'contact';
        this.offerTypeCode = 'sale';
        this.typeCode = 'apartment';

        this.fullAddress = new FullAddress();
    }

    public static getDigest(o: Offer) {
        var digest = [];

        digest.push('<strong>' + o.typeCode + '</strong>');
        if (o.roomsCount) digest.push(o.roomsCount + 'к');
        if (o.floor && o.floorsCount) {
            digest.push(o.floor + '/' + o.floorsCount + ' эт.')
        } else if (o.floor || o.floorsCount) {
            digest.push((o.floor || o.floorsCount) + ' эт.');
        }
        {
            var squares = [];
            if (o.squareTotal) squares.push(o.squareTotal);
            if (o.squareLiving) squares.push(o.squareLiving);
            if (o.squareKitchen) squares.push(o.squareKitchen);
            if (squares.length) digest.push(squares.join('/') + ' кв. м.');
        }
        digest.push('<br>');
        if (o.apSchemeId) digest.push(o.apSchemeId);
        if (o.houseTypeId) digest.push(o.houseTypeId);
        if (o.roomSchemeId) digest.push(o.roomSchemeId);
        if (o.conditionId) digest.push(o.conditionId);
        if (o.balconyId) digest.push(o.balconyId);
        if (o.bathroomId) digest.push(o.bathroomId);
        if (o.squareLand) digest.push(o.squareLand + ' га');
        if (o.description) {
            digest.push(o.description);
        }
        digest.push('<br>');
        if (o.ownerPrice) digest.push('<span class="text-primary">' + o.ownerPrice + ' тыс. руб.' + '</span>');

        return digest.join(' ');
    }

    public static parseAddress(itm: string){
        let fullAddress: Array<any> = [];
        let address: Array<string> = itm.split(',');
        for(var i=0; i< address.length; ++i)
            address[i] = address[i].trim();
        if(parseInt(address[1]) > 0) {
            fullAddress.push({type:"HOUSE", value: address[1]});
            fullAddress.push({type:"STREET", value: address[0]});
            if(address.length == 5){
                if(address[4].indexOf("Москва") != -1){
                    fullAddress.push({type:"DISTRICT", value: address[2]});
                    fullAddress.push({type:"CITY", value: address[4]});
                }
                else if(address[3].indexOf("р-н") != -1){
                    fullAddress.push({type:"CITY", value: address[2]});
                    fullAddress.push({type:"DISTRICT", value: address[3].split(" ")[0]});
                    fullAddress.push({type:"KRAY", value: address[4]});
                } else{
                    fullAddress.push({type:"CITY", value: address[3]});
                    fullAddress.push({type:"KRAY", value: address[4]});
                }

            } else if(address.length == 4 && address[3].indexOf("Санкт-Петербург") != -1){
                fullAddress.push({type:"CITY", value: address[3].split(" ")[1]});
            } else if(address.length == 4){
                fullAddress.push({type:"CITY", value: address[2]});
                fullAddress.push({type:"KRAY", value: address[3]});
            }
        }
        else if(address.length == 4){
            fullAddress.push({type:"STREET", value: address[0]});
            if(address[3].indexOf("Москва") != -1){
                fullAddress.push({type:"DISTRICT", value: address[1]});
                fullAddress.push({type:"CITY", value: address[3]});
            } else{
                fullAddress.push({type:"CITY", value: address[1]});
                if(address[2].indexOf("р-н") != -1)
                    fullAddress.push({type:"DISTRICT", value: address[2]});
                fullAddress.push({type:"KRAY", value: address[3]});
            }

        } else if(address.length == 3){
            if(address[1].indexOf("р-н") != -1){
                fullAddress.push({type:"CITY", value: address[0]});
                fullAddress.push({type:"DISTRICT", value: address[1]});
                fullAddress.push({type:"KRAY", value: address[2]});
            } else if(address[2].indexOf("Санкт-Петербург") != -1){
                fullAddress.push({type:"STREET", value: address[0]});
                fullAddress.push({type:"CITY", value: address[2].split(" ")[1]});
            }
            else{
                fullAddress.push({type:"STREET", value: address[0]});
                fullAddress.push({type:"CITY", value: address[1]});
                fullAddress.push({type:"KRAY", value: address[2]});
            }
        }
        return fullAddress;
    }
}
