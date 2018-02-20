import {Component, OnInit, OnChanges, DoCheck} from '@angular/core';
import {Output, Input, EventEmitter} from '@angular/core';

@Component({
    selector: 'ui-multiselect',
    inputs: ['options', 'values', 'masks', 'width'],
    template: `
        <div class="ui-multiselect">
            <div class="option_field" *ngFor="let value of values; let i = index" >
                <ui-select class="value" [style.width] = "width"
                    [options] = "options"
                    [value]="value.type"
                    [config] = "{icon: 'select_arrow', drawArrow: false}"
                    (onChange)="value.type = $event.selected.value">
                </ui-select>
                <input class = "input_field" type="text" (keyup)="changed($event, value, i)"
                    placeholder="{{getPlaceholder(values[i])}}" value="{{value.value}}">
                <div class="remove" (click)="delete($event, i)"></div>
            </div>
            <div class="add_button" (click)="add_field($event)" style="color: #3bb24b;
                text-align: left;
                cursor: pointer;">Добавить</div>
        </div>
    `,
    styles: [`
        .remove{
            background-image: url(assets/cross.png);
            background-size: contain;
            width: 15px;
            height: 15px;
        }

        .input_field{
            width: 130px;
            border: 0;
            color: #505050;
        }
        .label{
            margin-right: 30px;
        }

        .ui-multiselect {
            position: relative;
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

        .value{
            width: 40%;
            height: 20px;
            padding-right: 10px;
            border-right: 1px solid silver;
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
            //background-color: #fff;
            //border: 1px solid #ccc;
            //border: 1px solid rgba(0,0,0,0.15);
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
            margin-top: 5px;
        }

        .dropdown-menu>li>label {
            display: block;
            padding: 3px 20px;
            clear: both;
            font-weight: 400;
            line-height: 1.42857143;
            color: #333;
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
            width: 23px;
            height: 15px;
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


export class UIMultiSelect implements OnChanges, OnInit, DoCheck {
    public options: Array<UISelectOption>;
    public masks: Array<String>;
    public values: Array<UIValuetOption>;

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    ngOnInit() {

        for(let i=0; i< this.values.length; ++i){
            if(!this.values[i].value || this.values[i].value == "" || this.values[i].value === undefined || this.values[i].value.length == 0){
                this.values.splice(i,1);
                i--;
            }

        }
        if(this.values.length == 1 && this.values[0].value === undefined){
            this.values.pop();
        }
    }

    ngOnChanges() {
        this.ngOnInit();
    }

    ngDoCheck(){
        this.ngOnInit();
    }


    add_field(event){
        let parent: HTMLElement =  event.target.parentElement.parentElement.parentElement;
        let height: number = parent.getElementsByClassName('input_field').length*36;
        parent.style.setProperty('height', ""+(height+90)+'px');
        this.values.push({type: this.options[0].value, value:' '});
    }

    //Array.prototype.forEach.call(document.body.querySelectorAll("*[data-mask]"), applyDataMask);

    selectValue(event,i ){

        //event.selected.value + '&' +
    }
    changed(event, mas, i) {
        var field = <HTMLInputElement>event.target;
        if(this.masks[i] != ''){
            var mask = this.masks[i].split('');
            var oldStart = field.selectionStart;
            var oldEnd = field.selectionEnd;
            field.value = this.applyMask(this.stripMask(field.value), mask);
            field.selectionStart = oldStart;
            field.selectionEnd = oldEnd;
            field.setSelectionRange(field.value.length,field.value.length);
            field.focus();
            //this.values[i] = +field.value;
        }
        this.values[this.values.indexOf(mas)].value = field.value;
        this.onChange.emit(this.values);
    }


     applyMask(data, mask) {
        return mask.map(function(char) {
            if (char != '_') return char;
            if (data.length == 0) return char;
            return data.shift();
        }).join('')
    }

     stripMask(maskedData) {
        function isDigit(char) {
            return /\d/.test(char);
        }
        return maskedData.split('').filter(isDigit);
    }

    delete(event, i){
        if (i >= 0) {
            this.values[i].value = null;
            this.onChange.emit(this.values);
            this.values.splice(i, 1);
        }
        this.resize_min(event);
    }

    getValue(temp: string): string{

        if(temp.indexOf(":") > -1)
            return temp.split(":")[1];
        else
            return temp;
    }

    getPlaceholder(val): String{
        return this.masks[0];
        //masks[values[i].split('.')[0]]
    }

    resize_min(event){
        let parent: HTMLElement = (<HTMLElement>event.currentTarget).parentElement.parentElement.parentElement.parentElement;;
        let height: number = parent.getElementsByClassName('input_field').length * 35;
        let arrow = parent.getElementsByClassName('arrow').length;
        if(arrow > 0 && this.values.length == 0){
            (<HTMLInputElement>parent.getElementsByClassName('input_line').item(0)).value = "";
            parent.style.setProperty('height', ""+(height)+'px');
            let field: HTMLElement = <HTMLElement>parent.getElementsByTagName('ui-multiselect').item(0);
            let inputs  = field.getElementsByTagName('input');
            if(inputs.length == 1){
                    field.style.setProperty('visibility','hidden');
            }
        } else{
            parent.style.setProperty('height', ""+(height+18)+'px');

        }
        parent.style.setProperty('overflow', "visible");
    }

    resize_max(event){
        let parent: HTMLElement = (<HTMLElement>event.currentTarget).parentElement.parentElement.parentElement.parentElement;;
        let height: number = parent.getElementsByClassName('input_field').length * 35;
        parent.style.setProperty('height', ""+(height+18)+'px');
        parent.style.setProperty('overflow', "visible");
    }

}

export interface UISelectOption {
    label: string,
    value: any,
    icon: string,
}

export interface UIValuetOption {
    type: string,
    value: string
}
