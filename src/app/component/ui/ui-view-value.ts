/**
 * Created by Aleksandr on 23.11.16.
 */

import {Component, OnInit, OnChanges} from '@angular/core';
import {UISelectOption} from "./ui-select.component";

@Component({
    selector: 'ui-view-value',
    inputs: ['options', 'value', 'Style'],
    template: `
        <div class="ui-view-value" [ngStyle]="Style">
                {{ selected?.label }}
        </div>
    `,
    styles: [`
        .ui-view-value{
            width: 170px;
            text-align: right;
            color: #696969;
            font-size: 10pt;
            margin-top: 5px;
            height: 19px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
    `]
})


export class UIViewValue implements OnInit {
    public options: Array<UISelectOption>;
    public value: any;
    public Style: any;

    selected: UISelectOption;

    ngOnInit() {
        for (let o of this.options) {
            if (this.value == o.value) {
                this.selected = o;
            }
        }
        if (this.selected == null && this.options.length > 0) {
            this.selected = this.options[0];
        }
    }

    ngOnChanges() {
        this.ngOnInit();
    }

    getStyle(){
        if(this.Style)
            return this.Style;
        else return "";
    }
}
