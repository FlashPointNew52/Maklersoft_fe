import {FullAddress} from "../class/fullAddress";
import {User} from "./user";
import {Requisites} from "../class/requisites";
import {PhoneBlock} from "../class/phoneBlock";
import {EmailBlock} from "../class/emailBlock";
import {Person} from "./person";

export class Organisation {

    id: number;
    accountId: number;

    type: string;
    name: string;

    description: string;

    addDate: number;
    changeDate: number;

    typeCode: string;

    area: string;

    fullAddress: FullAddress;

    phoneBlock: PhoneBlock;

    emailBlock: EmailBlock;

    webSite: string;

    requisites: Requisites;


    head: Person;
    contact: Person;


    headId: number;

    contactId: number;

    contract: string;

    stateCode: string;

    sourceCode: string;

    agent: User;

    agentId: number;


    constructor () {

        this.fullAddress = new FullAddress();
        this.phoneBlock = new PhoneBlock();
        this.emailBlock = new EmailBlock();
        this.requisites = new Requisites();
    }

    public copyFields(org: Organisation){

        this.id = org.id;
        this.accountId = org.accountId;

        this.name = org.name;

        this.description = org.description;

        this.addDate = org.addDate;
        this.changeDate = org.changeDate;

        this.typeCode = org.typeCode;

        this.area = org.area;

        this.fullAddress = org.fullAddress;

        this.phoneBlock = org.phoneBlock;

        this.emailBlock = org.emailBlock;

        this.webSite = org.webSite;

        this.requisites = org.requisites;

        /*
        head: Person;
        contact: Person;
        */

        this.headId = org.headId;
        this.contactId = org.contactId;


        this.contract = org.contract;

        this.stateCode = org.stateCode;

        this.sourceCode = org.sourceCode;

        this.agent = org.agent;

        this.agentId = org.agentId;
    }

}
