import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
})
export class ChildComponent implements OnInit, OnChanges {
  constructor() {
    this.sub = new BehaviorSubject<string>('0');
    this.obs = this.sub.asObservable();
  }

  @Input() name!: string;

  changeMessages: string[] = [];

  ngOnInit() {
    this.sub.next('somethign');
    this.changeMessages.push('on init');
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      const chng = changes[propName];
      const cur = JSON.stringify(chng.currentValue);
      const prev = JSON.stringify(chng.previousValue);
      this.sub.next(
        `${propName}: currentValue = ${cur}, previousValue = ${prev}`
      );
      this.changeMessages.push(
        `${propName}: currentValue = ${cur}, previousValue = ${prev}`
      );
    }
  }

  sub: BehaviorSubject<string>;
  obs: Observable<string>;
}
