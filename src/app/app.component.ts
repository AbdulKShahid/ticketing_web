import { Component } from '@angular/core';
import {Ticket} from "./ticket/ticket";
import {CdkDragDrop, transferArrayItem} from "@angular/cdk/drag-drop";
import {MatDialog} from "@angular/material/dialog";
import {TicketDialogComponent, TicketDialogResult} from "./ticket-dialog/ticket-dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cpb';
  todo: Ticket[] = [
    {
      title: 'Buy milk',
      description: 'Go to the store and buy milk'
    },
    {
      title: 'Create a Kanban app',
      description: 'Using Firebase and Angular create a Kanban app!'
    }
  ];
  inProgress: Ticket[] = [];
  done: Ticket[] = [];

  constructor(private dialog: MatDialog) {}

  editTicket(list: string, ticket: Ticket): void {}

  drop(event: CdkDragDrop<Ticket[]>): void {
    if (event.previousContainer === event.container) {
      return;
    }
    if (!event.container.data || !event.previousContainer.data) {
      return;
    }
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  newTicket(): void {
    const dialogRef = this.dialog.open(TicketDialogComponent, {
      width: '270px',
      data: {
        ticket: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: TicketDialogResult|undefined) => {
        if (!result) {
          return;
        }
        this.todo.push(result.ticket);
      });
  }

}
