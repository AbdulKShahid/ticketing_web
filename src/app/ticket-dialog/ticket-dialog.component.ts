import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Ticket} from "../ticket/ticket";

export interface TicketDialogData {
  ticket: Partial<Ticket>;
  enableDelete: boolean;
}

export interface TicketDialogResult {
  ticket: Ticket;
  delete?: boolean;
}

@Component({
  selector: 'app-ticket-dialog',
  templateUrl: './ticket-dialog.component.html',
  styleUrls: ['./ticket-dialog.component.css']
})
export class TicketDialogComponent {
  private backupTicket: Partial<Ticket> = { ...this.data.ticket };

  constructor(
    public dialogRef: MatDialogRef<TicketDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TicketDialogData
  ) {}

  cancel(): void {
    this.data.ticket.title = this.backupTicket.title;
    this.data.ticket.description = this.backupTicket.description;
    this.dialogRef.close(this.data);
  }
}
