import { Component, OnInit } from '@angular/core';
import { EventService } from './../services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  eventsData = [];
  isTrue = true;
  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.getEventsData();
  }

  getEventsData() {
    this.eventService
      .getEvents()
      .subscribe(
        result => (this.eventsData = result),
        error => console.log(error)
      );
  }
}
