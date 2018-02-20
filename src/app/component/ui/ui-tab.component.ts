import {Component, SimpleChange} from '@angular/core';
import {Output, EventEmitter} from '@angular/core';


@Component({
    selector: 'ui-tab',
    inputs: [
        'title',
        'active'
    ],
    styles: [``],
    template: `
        <div [hidden]="!active" style="position: relative;
    overflow: scroll;
    height: calc(100% - 114px);">
            <ng-content></ng-content>
        </div>
    `
})

export class UITab {
    title: string;
    active: boolean = false;

    @Output() tabSelect: EventEmitter<any> = new EventEmitter();

    selectTab() {
        this.tabSelect.emit({bla: "bla"});
        this.active = true;
    }
}
