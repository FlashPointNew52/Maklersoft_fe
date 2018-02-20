import {Component} from '@angular/core';
import {Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'ui-tag',
  inputs: ['value'],
  template: `
    <div class="tag" 
        [style.background-color]="getColor(value)"
    >
    </div>
  `,
  styles: [`
    .tag {
      height: 14px;
      width: 14px;
      border-radius: 14px;
      margin-right: 5px;
      float: left;
      border: 0px solid #fff;
    }
  `]
})

export class UITag {
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

  getColor(id: number) {
    for (var i = 0; i < this.tags.length; i++) {
      if (this.tags[i].id == id) {
        return this.tags[i].color;
      }
    }
    return 'rgba(255, 255, 255, 0)';
  }
}
