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

}
