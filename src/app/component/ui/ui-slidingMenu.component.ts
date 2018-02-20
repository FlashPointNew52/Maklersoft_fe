import {Component, OnInit, OnChanges} from '@angular/core';
import {Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'ui-slidingMenu',
    inputs: ['options', 'config', 'value', 'isUndependent', 'toggle_style'],
    template: `
        <div class="ui-select">
            <div class="dropdown-toggle" [ngStyle]="toggle_style"

            >
                <span *ngIf="config?.icon" class="{{ config?.icon }}"></span>
                <span class = 'label'>{{ selected?.label }}</span>
                <div class='arrow' (click)="toggleHidden($event)"
                (offClick)="clickedOutside($event)"></div>
                <span *ngIf="config?.drawArrow" class="icon-triangle-down"></span>
            </div>
            <ul class="dropdown-menu pull-right" [hidden]="hidden">
                <li *ngFor="let opt of options"
                    [class.selected]="opt.value == selected?.value"
                    (click)="select(opt, $event)"
                >
                    <label><span *ngIf="opt?.icon" class="{{ opt?.icon }}"></span> {{ opt.label }} </label>
                </li>
            </ul>
        </div>
    `,
    styles: [`
        .label{
            margin-right: 30px;
            width: 143px;
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .ui-select {
            position: relative;
        }

        .dropdown-menu {
            position: absolute;
            top: 100%;
            left: 0;
            z-index: 1000;
            float: left;
            min-width: 160px;
            padding: 5px 0;
            margin: 5px 0 0;
            font-size: 14px;
            list-style: none;
            background-clip: padding-box;
        }

        .dropdown-menu.pull-right {
            right: 0;
            left: auto;
            width: 345px;
        }

        .dropdown-toggle {
            display: inline-block;
            width: 100%;
            height: 100%;
            max-width: 200px;
            white-space: nowrap;
            overflow: hidden;
            text-align: right;
            background: #fff;
            cursor: pointer;
        }

        .dropdown-menu>li>label {
            display: block;
            padding: 3px 20px;
            clear: both;
            font-weight: 400;
            line-height: 1.42857143;
            color: #0575b5;
            white-space: nowrap;
        }

        .dropdown-menu>li:hover {
            background-color: #efefef;
        }

        .dropdown-menu>li.selected>label {
            background-color: #3366CC;
            color: #fff;
        }

        .inline {
            width: 120px;
            display: inline-block;
        }

        .inline > .dropdown-toggle {
            font-weight: 200;
            font-size: 14px;
        }

        .arrow{
            background-image: url(assets/arrow.png);
            width: 18px;
            height: 10px;
            background-size: cover;
            margin: 0 10px;
            background-position: center;
            flex: 0 0 23px;
            position: absolute;
            top: 5px;
            right: -10px;
        }
    `]
})


export class UISlidingMenu implements OnInit, OnChanges {
    public options: Array<UISelectOption>;
    public config: UISelectConfig;
    public value: any;

    selected: UISelectOption;

    hidden: boolean = true;

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    toggleHidden(e: MouseEvent) {
        this.hidden = !this.hidden;
        let parent: HTMLElement = (<HTMLElement>event.target).parentElement.parentElement.parentElement.parentElement;
        if(parent.offsetHeight == 30 || !parent.style.height){
            parent.style.setProperty('height', ''+(this.options.length*26+30)+'px');
        }
        else parent.style.height = '';

    }

    clickedOutside() {
        //this.closePanel();
        //this.hidden = true;

    }

    select(opt: UISelectOption, event) {
        this.value = opt.value;
        this.selected = opt;
        this.hidden = true;
        this.onChange.emit({selected: opt});
        let parent: HTMLElement = (<HTMLElement>event.target).parentElement.parentElement.parentElement.parentElement.parentElement;
        if(parent.offsetHeight == 30 || !parent.style.height){
            parent.style.setProperty('height', '80px');
        }
        else parent.style.height = '';
    }

    ngOnChanges() {
        let con = true;
        for (let o of this.options) {
            if (this.value == o.value) {
                this.selected = o;
                con = false;
            }
        }
        if ((this.selected == null && this.options.length > 0) || con) {
            this.selected = this.options[0];
        }
    }

}

export interface UISelectOption {
    label: string,
    value: any,
    icon: string,
}

export interface UISelectConfig {
    icon: string,
    drawArrow: boolean
}
