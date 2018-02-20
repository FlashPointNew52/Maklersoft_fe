import {Component} from '@angular/core';
import {Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'ui-tag-block',
  inputs: ['value'],
  template: `
    <div class="ui-tag-block">
      <div *ngFor="let tag of tags" class="tag" 
        [style.background-color]="tag.color"
        [style.border-color]="getBorderColor(tag)"
        (click)="select(tag)"
      >
      </div>
    </div>
  `,
  styles: [`
    .ui-tag-block {
      overflow: hidden;
    }
    .tag {
      height: 14px;
      width: 14px;
      border-radius: 14px;
      margin-right: 5px;
      float: left;
      border: 2px solid #fff;
    }
  `]
})

export class UITagBlock {
  tags: Array<any> = [
    { id: 1, color: 'rgb(253, 123, 126)', selected_color: 'rgb(203, 73, 76)' },
    { id: 2, color: 'rgb(254, 188, 70)', selected_color: 'rgb(204, 138, 20)' },
    { id: 3, color: 'rgb(244, 229, 77)', selected_color: 'rgb(194, 179, 27)' },
    { id: 4, color: 'rgb(180, 224, 66)', selected_color: 'rgb(130, 174, 16)' },
    { id: 5, color: 'rgb(131, 201, 252)', selected_color: 'rgb(81, 151, 202)' },
    { id: 6, color: 'rgb(228, 166, 252)', selected_color: 'rgb(178, 116, 202)' },
    { id: 7, color: 'rgb(200, 200, 200)', selected_color: 'rgb(150, 150, 150)' }
  ];
  public value: number;
  public selected: any;

  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    for (var i = 0; i < this.tags.length; i++) {
      if (this.tags[i].id == this.value) {
        this.selected = this.tags[i];
        return;
      }
    }
  }

  getBorderColor(tag) {
    var val = 'rgb(255,255,255)';
    if (this.selected == tag) {
      val = tag.selected_color;
    }
    return val;
  }

  select(tag: any) {
    var val = null;
    if (this.selected == tag) {
      this.selected = null;
    } else {
      this.selected = tag;
      val = tag.id;
    }
    this.valueChange.emit({ value: val });    // из за этого эмита не срабатывает [class.selected]="v === value"
  }

}
