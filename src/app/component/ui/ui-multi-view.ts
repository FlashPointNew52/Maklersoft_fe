import {Component, OnInit, OnChanges} from '@angular/core';

@Component({
    selector: 'ui-multi-view',
    inputs: ['values' , 'options'],
    template: `
            <div style= "margin-top: -6px;"><div class="total" *ngFor="let val of values">
                <span *ngIf="val.value && !options">{{ val.type }}</span>
                <span *ngIf="val.value && options">{{ type }}</span>

            </div></div>
    `,
    styles: [`

        .total{
            display: flex;
            flex-direction: column;
            height: 32px;
            margin-right: 15px;
            color: dimgrey;
            float: left;
            align-items: flex-end;
        }

        div>span:last-child{
            margin-right: 0;
            font-size: 9pt;
            margin-top: -3px;
        }

        .total span:first-child{
            font-size: 8pt;
            color: #c0c0c0;
            display: block;
        }

        .total:last-child{
            margin-right: 0;
        }
        .empty{
            margin-top: 10px !important;
            font-size: 10pt !important;
        }
    `]
})


export class UIMultiView implements OnInit {
    public values: Array<Value>;
    public options: Array<any>;
    type: string;
    isNull: boolean;
    ngOnInit() {
        let temp=[];
        for(let val of this.values){
            if(val.value)
                temp.push(val);
        }
        this.values = temp;
        if(this.options){
            for(let opt of this.options){
                if(opt.value == this.values[0].type){
                    this.type = opt.label;
                }
            }
        }
    }

    ngOnChanges(){
        this.ngOnInit();
    }
}

export interface Value {
    type: string,
    value: string
}
