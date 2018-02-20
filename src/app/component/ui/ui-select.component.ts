import {Component, OnInit, OnChanges} from '@angular/core';
import {Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'ui-select',
    inputs: ['options', 'config', 'value'],
    template: `
        <div class="ui-select">
            <div class="dropdown-toggle"
                (click)="toggleHidden($event)"
                (offClick)="clickedOutside($event)"
            >
                <span *ngIf="config?.icon" class="{{ config?.icon }}"></span>
                {{ selected?.label }}
                <span *ngIf="config?.drawArrow" class="icon-triangle-down"></span>
            </div>
            <ul class="dropdown-menu pull-right" [hidden]="hidden">
                <li *ngFor="let opt of options"
                    [class.bold]="opt.bold == true"
                    [class.selected]="opt.value == selected?.value"
                    (click)="select(opt)"
                >
                    <label><span *ngIf="opt?.icon" class="{{ opt?.icon }}"></span> {{ opt.label }} </label>
                </li>
            </ul>
        </div>
    `,
    styles: [`

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
            margin: 2px 0 0;
            font-size: 14px;
            list-style: none;
            background-color: #fff;
            border: 1px solid #ccc;
            border: 1px solid rgba(0,0,0,0.15);
            background-clip: padding-box;
        }

        .dropdown-menu.pull-right {
            right: 0;
            left: auto;
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
            color: #78797a;
            font-size: 11px;
        }

        .bold>label {
            font-weight: 600 !important;
        }

        .dropdown-menu>li>label {
            display: block;
            padding: 3px 20px;
            clear: both;
            font-weight: 400;
            line-height: 1.42857143;
            color: #333;
            white-space: nowrap;
            font-size: 12px;
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

    `]
})


export class UISelect implements OnInit, OnChanges {
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
    }

    clickedOutside() {
        this.hidden = true;
    }

    select(opt: UISelectOption) {
        this.value = opt.value;
        this.selected = opt;
        this.hidden = true;

        this.onChange.emit({selected: opt});
    }

    ngOnChanges() {
        for (let o of this.options) {
            if (this.value == o.value) {
                this.selected = o;
            }
        }
        if (this.selected == null && this.options.length > 0) {
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
