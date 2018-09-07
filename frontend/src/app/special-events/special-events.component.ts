import { Component, OnInit } from '@angular/core';
import { EventService } from './../services/event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.scss']
})
export class SpecialEventsComponent implements OnInit {
  specialEventsData = [];
  isTrue = true;

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit() {
    this.getSpecialEventsData();
  }

  getSpecialEventsData() {
    this.eventService.getSpecialEvents().subscribe(
      result => (this.specialEventsData = result),
      error => {
        console.log(error);
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.router.navigate(['/login']);
          }
        }
      }
    );
  }
}
