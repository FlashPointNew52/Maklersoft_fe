import {Organisation} from "./organisation";
import {User} from "./user";
import {FullAddress} from "../class/fullAddress";
import {EmailBlock} from "../class/emailBlock";
import {PhoneBlock} from "../class/phoneBlock";

export class Person {

    id: number;
    accountId: number;

    name: string;
    description: string;

    addDate: number;
    changeDate: number;

    organisationId: number;
    organisation: Organisation;

    userId: number;
    user: User;

    typeCode: string;

    area: string;

    fullAddress: FullAddress;

    phoneBlock: PhoneBlock;

    emailBlock: EmailBlock;

    webSite: string;

    positionCode: string;

    agentId: number;
    agent: User;

    contract: string;

    stateCode: string;

    sourceCode: string;


    constructor () {

        this.fullAddress = new FullAddress();
        this.phoneBlock = new PhoneBlock();
        this.emailBlock = new EmailBlock();
    }

    public copyFields(person: Person){

        this.id = person.id;
        this.accountId = person.accountId;

        this.name = person.name;
        this.description = person.description;

        this.addDate = person.addDate;
        this.changeDate = person.changeDate;

        this.organisationId = person.organisationId;
        this.organisation = person.organisation;

        this.userId = person.userId;
        this.user = person.user;

        this.typeCode = person.typeCode;

        this.area = person.area;

        this.fullAddress = person.fullAddress;

        this.phoneBlock = person.phoneBlock;

        this.emailBlock = person.emailBlock;

        this.webSite = person.webSite;

        this.positionCode = person.positionCode;

        this.agentId = person.agentId;
        this.agent = person.agent;

        this.contract = person.contract;

        this.stateCode = person.stateCode;

        this.sourceCode = person.sourceCode;
    }
}
