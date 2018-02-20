import {Component, Output, OnInit, EventEmitter} from '@angular/core';

import {HubService} from '../service/hub.service';
import {NotebookTask} from './notebook/notebook-task.component';
import {NotebookService} from '../service/notebook.service';
import { Subscription }   from 'rxjs/Subscription';

@Component({
    selector: 'notebook',
    styles: [`
        .notebook {
          position: absolute;
          top: 0px;
          right: 0px;
          height: 100%;
          background-color: #eeeeee;
          z-index: 1000;
        }
        .head {
            width: 100%;
            height: 0;

        }
        .notebook > .border-stripe {
            width: 30px;
            height: 100%;
            background-color: #ccc;
            float: right;
        }
        .notebook > .main-tab {
            width: 370px;
            height: 100%;
            float: right;
        }

        .notebook > .main-tab > .main_menu {
            display: flex;
            justify-content: center;
            padding: 0;
            margin: 25px 10 0;
            border: 1px solid #0e60c5;
        }

        .notebook > .main-tab > .main_menu > li {
            display: inline-block;
            padding: 2px 10px;
            color: rgb(14, 96, 197);
            border-left: 1px solid #0e60c5;
            flex-grow: 2;
            font-size: 12px;
            text-align: center;
        }

        .notebook > .main-tab > .main_menu > .menu_active {
            color: #fff;
            background-color: #0e60c5;
            border: 0;
        }

        .notebook > .event-tab {
            width: 370px;
            height: 100%;
            float: right;
            border-left: 1px solid #ccc;
        }
        .tab-button {
            width: 58px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            font-size: 14px !important;
            cursor: pointer;
            color: #12195C;
            position: absolute;
            left: 15px;
            top: 10px;
        }

        notebook-task{
           display: flex;
           flex-wrap: wrap;
        }

        .forever_menu{
            width: 35px;
            height: 150px;
            position: absolute;
            background-color: #0b9700;
            top: calc(50% - 75px);
            right: 0;
            display: flex;
            flex-wrap: wrap;
            align-content: space-around;
            justify-content: center;
            z-index: 999;
        }
        .forever_menu > div{
            width: 35px;
            height: 35px;
            background-size: 70% 70%;
            background-repeat: no-repeat;
            background-position: center;
        }

        .forever_menu > div:hover {
            background-color: #127d0a;
        }

        .forever_menu > hr{
            width: 35px;
            margin: 0;
            border-color: #4aa24a;

        }
    `],
    template: `
        <div class='forever_menu' (click)="toggleNotebook()"    >
            <div (click) = "selectMenu(0)" style="background-image: url(assets/task.png);"></div>
             <hr>
            <div (click) = "selectMenu(1)" style="background-image: url(assets/notes.png);"></div>
             <hr>
            <div (click) = "selectMenu(2)" style="background-image: url(assets/phone.png);"></div>
             <hr>
            <div (click) = "selectMenu(3)" style="background-image: url(assets/chat.png);"></div>
        </div>
        <div class="notebook">
            <div class="head">
                <div class="tab-button" (click)="toggleNotebook()">Закрыть</div>
            </div>
            <div class="event-tab" *ngIf="show==1 || show==2">
                <div class="head"></div>
                <notebook-task-describe [task] = "data" [mode]="state" (update) = "update_tab_daily($event)"></notebook-task-describe>
            </div>
            <div class="main-tab" (click)="toggleEvent()" *ngIf="show==0 || show==2">
                <ul class = "main_menu">
                  <li (click) = "selectMenu(0)" [class.menu_active] = "menuNumber == 0">Задачи</li>
                  <li (click) = "selectMenu(1)" [class.menu_active] = "menuNumber == 1">Заметки</li>
                  <li (click) = "selectMenu(2)" [class.menu_active] = "menuNumber == 2">IP-телефония</li>
                  <li (click) = "selectMenu(3)" [class.menu_active] = "menuNumber == 3">Чат</li>
                </ul>
                <notebook-task *ngIf="menuNumber == 0">  </notebook-task>
            </div>
        </div>
    `
})

export class NotebookComponent implements OnInit{
    hidden = true;
    eventHidden = true;
    menuNumber: number = 0;
    subscription: Subscription;
    show: number = null;
    type: string;
    data: any;
    state: string;
    @Output() widthChange: EventEmitter<any> = new EventEmitter();

    constructor(private _hubService: HubService, private _notebookService: NotebookService) {
        this._hubService.shared_var['nb_width'] = 1;
        this.subscription = _notebookService.get().subscribe(message => {
            this.show = message.show;
            this.data = message.data;
            this.state = message.state;
        });
    }

    ngOnInit(){

    }

    toggleNotebook() {
        this.show = 0;
        this.hidden = !this.hidden;
        this.emitWidth();
    }

    toggleEvent() {
        this.eventHidden = !this.eventHidden;
        this.emitWidth();
    }

    emitWidth() {
        var w = 1;
        if (!this.hidden) {
            // TODO: wtf 371?!
            w += 371;
            if (!this.eventHidden) {
                w += 371;
            }
        }
        this._hubService.shared_var['nb_width'] = w;
        this.widthChange.emit({value: w});
    }

    selectMenu(num: number){
       this.menuNumber = num;
       this.show = 2;
    }

    update_tab_daily(event){
        this._notebookService.update_field(event);
    }
}
