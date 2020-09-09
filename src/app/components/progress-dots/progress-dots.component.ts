import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-dots',
  templateUrl: './progress-dots.component.html',
  styleUrls: ['./progress-dots.component.scss'],
})
export class ProgressDotsComponent implements OnInit {
  @Input() total: string;
  @Input() current: string;
  dots: any[];
  constructor() {}
  ngOnInit(): void {
    this.dots = new Array(parseInt(this.total, 10)).map((x) => ({}));
  }
}
