import {FullAddress} from "../class/fullAddress";
import {PhoneBlock} from "../class/phoneBlock";
import {EmailBlock} from "../class/emailBlock";

export class User {

    id: number;
    accountId: number;

    login: string;

    password: string;

    role: string;

    name: string;

    superiorId: number;

    addDate: number;
    changeDate: number;

    area: string;

    fullAddress: FullAddress;

    phoneBlock: PhoneBlock;

    emailBlock: EmailBlock;

    webSite: string;

    contract: string;

    recruitmentDate: number;
    dismissalDate: number;

    statusCode: string;

    positionCode: string;

    departmentCode: string;

    office: string;

    info: string;


    constructor () {
        this.role = 'AGENT';

        this.fullAddress = new FullAddress();
        this.phoneBlock = new PhoneBlock();
        this.emailBlock = new EmailBlock();
    }

    public static getData(arr: Array<any>) : any{
        for(let item of arr){
            if(item.value !== null)
                return item;
        }
        return {type: "", value: "Не указан"};
    }
}
