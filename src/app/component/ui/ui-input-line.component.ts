import {Component, OnInit, OnChanges} from '@angular/core';
import {Output,Input, EventEmitter} from '@angular/core';
import {SuggestionService} from "../../service/suggestion.service";
import {PersonService} from "../../service/person.service";
import {SessionService} from "../../service/session.service";
import {OrganisationService} from '../../service/organisation.service';
import {HubService} from '../../service/hub.service';
import {Offer} from '../../entity/offer';
import {Tab} from '../../class/tab';
import {Person} from '../../entity/person';
import {Organisation} from '../../entity/organisation';

@Component({
    selector: 'ui-input-line',
    inputs: ['placeholder', 'width' , 'queryTipe', 'type', 'on_enter_save', 'input_style', 'label_style'],
    template: `
        <div class="ui-input-line">
            <span class="label" [style.opacity]="getOpacity()" [ngStyle]="label_style">{{placeholder}}</span>
            <input type="{{type}}" value = "{{ value }}" style = "width: {{width}}" class = "input_line" [(ngModel)]="searchQuery"
                (keydown) = "setOpacity()" (keyup) = "editOpacity($event)" placeholder = "{{placeholder}}"
                (click) ="isClick1($event)" [class.short_field]="queryTipe" [ngStyle]="input_style"
            >

            <div class="suggestions" (document:click)="docClick()" *ngIf="sgList.length > 0 && queryTipe ">
                <ul *ngFor="let item of sgList" >
                    <li >
                        <a (click)="select(item, $event)" *ngIf="this.queryTipe == 'address'">{{item}}</a>
                        <a (click)="select(item, $event)" *ngIf="this.queryTipe == 'organisation'">{{item.name}}</a>
                        <a (click)="select(item, $event)" *ngIf="this.queryTipe == 'person'">{{item.name}}</a>
                    </li>
                </ul>
                <div class="add_button" (click)="addPerson()" *ngIf="this.queryTipe == 'person'">Добавить в контакты</div>
                <div class="add_button" (click)="addOrganisation()" *ngIf="this.queryTipe == 'organisation'">Добавить в контрагенты</div>
            </div>
        </div>
    `,
    styles: [`
        .short_field{
            width: 250px;
        }
        .input_line{
            border: 0;
            margin-top: 0px;
            height: 19px;
            color: dimgrey;
            text-overflow: ellipsis;
            background-color: transparent;
        }
        .label{
            font-size: 8pt;
        }

        .ui-input-line {
            display: flex;
            flex-direction: column;
            height: inherit;
            margin-top: -3px;
        }

        .option_field{
            height: 25px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid silver;
            margin-bottom: 10px;
            align-items: center;
        }
        .suggestions{
            position: absolute;
            z-index: 100;
            background-color: white;
            left: -57px;
            width: 370px;
            margin-top: 35px;
            border-bottom: 1px solid silver;
            font-size: 10pt;
        }

        .suggestions ul{
            list-style-type: none;
            padding: 0 15px;
            text-align: left;
            margin: 0 0 10px 0;
        }

        .suggestions ul li{
            cursor: default;
        }
        .suggestions  ul:hover {
            background: #f7f7f7;
            cursor: default;
        }
        .finder{
            height: 28px;
            position: relative;
            left: -45px;
            width: 125%;
            background-color: rgb(247, 247, 247);
            border: 1px solid rgba(204, 204, 204, 0.47);
            font-size: 10pt;
        }

        .add_button{
            height: 30px;
            width: calc(100% - 30px);
            background-color: #0b9700;
            color: white;
            line-height: 30px;
            text-align: center;
            margin: auto;
            margin-bottom: 10px;
        }
    `]
})


export class UIInputLine implements OnInit, OnChanges{
    public placeholder: string;
    @Input() value: string;
    public width: string;
    public on_enter_save: boolean;
    public queryTipe: string;
    public type: string = "text";
    searchQuery: string ;
    sgList: any[] = [];
    person: any;
    organisation: any;
    opacity = 1;
    @Output() onChange: EventEmitter<any> = new EventEmitter();

    constructor(private _suggestionService: SuggestionService,
                private _personService: PersonService,
                private _sessionService: SessionService,
                private _organisationService: OrganisationService,
                private _hubService: HubService,
    ){

    }

    isClick(event){
        if(this.queryTipe && this.queryTipe == "address"){
            let parent: HTMLElement = (<HTMLElement>event.currentTarget).parentElement;
            while(parent.className.indexOf('view-group')== -1 && parent.className !== null){
                parent = parent.parentElement;
            }
            let field: HTMLElement = <HTMLElement>parent.getElementsByTagName('ui-multiselect').item(0);
            if(field.style.getPropertyValue('visibility') == 'hidden'){
                field.style.setProperty('visibility','visible');
            } else if(field.style.getPropertyValue('visibility') == ''){
                field.style.setProperty('visibility','hidden');
            }
            let height: number;
            if(parent.getElementsByTagName('input').length > 0)
                height = parent.getElementsByTagName('input').length * 35;
            else
                height = (parent.getElementsByTagName('input').length - 1) * 35;
            if(parent.offsetHeight == 30){
                //parent.style.setProperty('height', ""+(height+15)+'px');
                parent.style.setProperty('overflow', "visible");
            }
        }
    }

    isClick1(event){
        console.log("fsdf");
        if(this.queryTipe && this.queryTipe == "address"){
            let parent: HTMLElement = (<HTMLElement>event.currentTarget).parentElement;
            while(parent.className.indexOf('view-group')== -1 && parent.className !== null){
                parent = parent.parentElement;
            }
            let field: HTMLElement = <HTMLElement>parent.getElementsByTagName('ui-multiselect').item(0);
            let inputs  = field.getElementsByTagName('input');
            if(inputs.length < 1){
                if(field.style.getPropertyValue('visibility') == ''){
                    field.style.setProperty('visibility','hidden');
                }
                let height: number;

                if(parent.getElementsByTagName('input').length > 0)
                    height = parent.getElementsByTagName('input').length * 35;
                    else
                    height = (parent.getElementsByTagName('input').length - 1) * 35;
                    if(parent.offsetHeight == 30){
                        //parent.style.setProperty('height', ""+(height+15)+'px');
                        parent.style.setProperty('overflow', "visible");
                    }
            }
        }
    }

    ngOnInit() {
        if(this.value)
            this.opacity = 1;
        else this.opacity = 0;
        this.searchQuery = this.value;
    }

    getOpacity() {
        return this.opacity;
    }

    setOpacity() {
        this.opacity = 1;
    }

    editOpacity(event) {
        if(this.queryTipe){
            this.searchParamChanged(event);
        }
        if(event.target.value == "")
            this.opacity = 0;
        else if(!this.queryTipe){
            if((<KeyboardEvent>event).keyCode == 13 && this.on_enter_save || !this.on_enter_save)
                this.onChange.emit(event.target.value);
        }
    }

    ngOnChanges() {
        this.searchQuery = this.value;
    }

    docClick(){
        this.sgList = [];
    }

    searchParamChanged(e) {
        if (this.searchQuery && this.searchQuery.length > 0) {
            let sq = this.searchQuery.split(" ");
            let lp = sq.pop()
            let q = sq.join(" ");
            this.sgList = [];
            if (lp.length > 0) {
                if(this.queryTipe == "address"){
                    this._suggestionService.list(this.searchQuery).subscribe(sgs => {
                        sgs.forEach(e => {
                            this.sgList.push(e);
                        })
                    });
                } else if(this.queryTipe == "person"){
                    this._personService.list(this._sessionService.getUser(), null, this.searchQuery).subscribe(sgs => {
                        sgs.forEach(e => {
                            this.sgList.push(e);
                        })
                    });
                } else if(this.queryTipe == "organisation"){
                    this._organisationService.list(this.searchQuery).subscribe(sgs => {
                        sgs.forEach(e => {
                            this.sgList.push(e);
                        })
                    });
                }
            }
        } else if(this.queryTipe == "address"){
            let nullAddress=[
                {type: 'KRAY', value: null},
                {type: 'CITY', value: null},
                {type: 'DISTRICT', value: null},
                {type: 'STREET', value: null},
                {type: 'HOUSE', value: null},
                {type: 'HOUSING', value: null},
                {type: 'FLAT', value: null}
            ];
            this.onChange.emit(nullAddress);
            let parent: HTMLElement =  (<HTMLElement>event.target).parentElement.parentElement.parentElement;
            parent.style.setProperty('height', ""+(35)+'px');
            let field: HTMLElement = <HTMLElement>parent.getElementsByTagName('ui-multiselect').item(0);
            field.style.setProperty('visibility','hidden');
            parent.style.setProperty('overflow', "visible");
        }
    }

    select(itm: any, event) {
        this.searchQuery = itm;
        if(this.queryTipe && this.queryTipe == "address"){
            this.isClick(event);
            let fullAddress =  Offer.parseAddress(itm);
            this.onChange.emit(fullAddress.reverse());
            let parent: HTMLElement =  event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
            let height: number = fullAddress.length*36;
            parent.style.setProperty('height', ""+(height+56)+'px');
        } else if(this.queryTipe && this.queryTipe == "person"){
            this.onChange.emit(itm);
        } else if(this.queryTipe && this.queryTipe == "organisation"){
            this.onChange.emit(itm);
        }
        this.sgList = [];
    }

    addPerson() {
        var tab_sys = this._hubService.getProperty('tab_sys');
        this.person = new Person();
        tab_sys.addTab('person', {person: this.person});
        setTimeout(() =>{
            this.onChange.emit(this.person);
        }, 10000)

    }

    addOrganisation(){
        var tab_sys = this._hubService.getProperty('tab_sys');
        this.organisation = new Organisation();
        tab_sys.addTab('organisation', {organisation: this.organisation});
        setTimeout(() =>{
            this.onChange.emit(this.organisation);
        }, 10000)
    }


}
