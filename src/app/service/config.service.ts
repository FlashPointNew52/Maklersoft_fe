import {Injectable} from '@angular/core';

import {Config} from '../class/config';


@Injectable()
export class ConfigService {
    getConfig() {
        return CONFIG;
    }
}

var CONFIG: Config = {
    version: "b17.9",
    map: {
        default: {
            lat: 55.755505, lon: 37.617270, zoom: 14
        },
        khv: {
            lat: 48.480228, lon: 135.071921, zoom: 14
        },
        msk: {
            lat: 55.755505, lon: 37.617270, zoom: 14
        },
        kja: {
            lat: 56.014039, lon: 92.892053, zoom: 14
        },
        vld: {
            lat: 43.119348, lon: 131.886965, zoom: 14
        },
        irkutsk: {
            lat: 52.286450, lon: 104.304856, zoom: 14
        },
        tver: {
            lat: 56.858507, lon: 35.917521, zoom: 14
        },
        rzn: {
            lat: 54.609215, lon: 39.712564, zoom: 14
        },
        kms: {
            lat: 50.546913, lon: 137.011227, zoom: 14
        },
        nahodka: {
            lat: 42.820431, lon: 132.883842, zoom: 14
        },

        p_posad: {
            lat: 55.773481, lon: 38.653316, zoom: 14
        },
        stupino: {
            lat: 54.903123, lon: 38.080785, zoom: 14
        },
        voskresensk: {
            lat: 55.322338, lon: 38.681782, zoom: 14
        },
        o_zuevo : {
            lat: 55.802349, lon: 38.966713, zoom: 14
        },
        jaroslavl: {
            lat: 57.622242, lon: 39.884425, zoom: 14
        },
        el_gorsk: {
            lat: 55.875938, lon: 38.780314, zoom: 14
        },
        el_stal: {
            lat: 55.782371, lon: 38.453338, zoom: 14
        },
        el_ugli: {
            lat: 55.714968, lon: 38.209223, zoom: 14
        },
        noginsk: {
            lat: 55.874205, lon: 38.466371, zoom: 14
        },
        surgut: {
            lat: 61.254298, lon: 73.385749, zoom: 14
        },
        pushkino: {
            lat: 55.986301, lon: 37.841615, zoom: 14
        },
        mitishi: {
            lat: 55.918564, lon: 37.764960, zoom: 14
        },
        jukovski: {
            lat: 55.595562, lon: 38.112581, zoom: 14
        },
        ramenskoe: {
            lat: 55.567335, lon: 38.221941, zoom: 14
        },
        chekhov: {
            lat: 55.151720, lon: 37.460746, zoom: 14
        },
        dmitov: {
            lat: 56.341870, lon: 37.528703, zoom: 14
        },
        balachikha: {
            lat: 55.795506, lon: 37.968072, zoom: 14
        },
        sochi: {
            lat: 43.602402, lon: 39.734203, zoom: 14
        },
        orenburg: {
            lat: 51.762391, lon: 55.098985, zoom: 14
        },
        belgorod: {
            lat: 50.598446, lon: 36.598028, zoom: 14
        },
        chimki: {
            lat: 55.893240, lon: 37.444119, zoom: 14
        },
        shelkovo: {
            lat: 55.915040, lon: 38.036131, zoom: 14
        },
        narofominsk: {
            lat: 55.390574, lon: 36.725892, zoom: 14
        },
        kolomna: {
            lat: 55.092485, lon: 38.768343, zoom: 14
        },
        u_sakhalinsk: {
            lat: 46.961504, lon: 142.734414, zoom: 14
        },
        anapa: {
            lat: 44.884441, lon: 37.320182, zoom: 14
        },
        v_novgorod: {
            lat: 58.522177, lon: 31.273314, zoom: 14
        },
        spb: {
            lat: 59.925408, lon: 30.331908, zoom: 14
        }
    },
    RESTServer: "http://maklersoft.com:4567",
    //RESTServer: "http://localhost:4567",
}
