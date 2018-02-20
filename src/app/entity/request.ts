import {GeoPoint} from "../class/geoPoint";
export class Request {

    id: number;
    accountId: number;

    agentId: number;
    personId: number;

    stateCode: string;
    stageCode: string;
    offerTypeCode: string;

    request: string;

    addDate: number;
    changeDate: number;

    searchArea: GeoPoint[];

    info: string;

    constructor () {
        // set default vals
        this.offerTypeCode = 'sale';
        this.searchArea = [];
        this.request = '';
    }
}
