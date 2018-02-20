
import {Component, OnInit, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import {UISelectOption} from "./ui-select.component";

@Component({
    selector: 'ui-switch-button',
    inputs: ['value'],
    template: `
        <div class="ui-switch" (click)="reverse()" [class.on]='value'>
            <div [class.reverse]='value'>   </div>
        </div>

    `,
    styles: [`
        .ui-switch{
            width: 41px;
            height: 20px;
            background-color: silver;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.5s;
        }
        
        .ui-switch > div{
            width: 17px;
            height: 17px;
            background-color: white;
            border-radius: 20px;
            position: relative;
            top: 1px;
            transform: translate(10%, 0);
            transition: all 0.5s;
        }

        .ui-switch > .reverse{
            position: relative;
            transform: translate(133%, 0);
        }
        .on{
            background-color: #3d9be9;
            transition: all 0.5s;
        }
    `]
})


export class UISwitchButton implements OnInit, OnChanges {
    value: boolean = false;
    @Output() newValue: EventEmitter<any> = new EventEmitter();

    ngOnInit() {

    }

    ngOnChanges() {
    }

    reverse(){
        this.value = !this.value;
        this.newValue.emit(this.value);
    }

}
