import { Component, Input, OnInit } from '@angular/core';
import { Event } from '@oveda/oveda-api';

@Component({
  selector: 'app-warning-pills',
  templateUrl: './warning-pills.component.html',
  styleUrls: ['./warning-pills.component.css'],
})
export class WarningPillsComponent implements OnInit {
  @Input() event?: Event;
  public statusEnum = Event.StatusEnum;

  constructor() {}

  ngOnInit(): void {}
}
