import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Ticket} from "./ticket";

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  @Input() ticket: Ticket | null = null;
  @Output() edit = new EventEmitter<Ticket>();

  ngOnInit(): void {
  }

  getDate(timeStamp: any) {
    let returnValue;
    if (!timeStamp || timeStamp === undefined) {
      return new Date();
    }
    if (timeStamp?.seconds) {
      if (timeStamp.seconds === 1630168440) {
        returnValue = new Date();
      } else {
        returnValue = new Date(timeStamp.seconds);
      }
    } else {
      returnValue =  new Date(timeStamp);
    }
    return returnValue;
  }

}
