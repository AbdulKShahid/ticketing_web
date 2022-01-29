import { Component } from '@angular/core';
import {Ticket} from "./ticket/ticket";
import {CdkDragDrop, transferArrayItem} from "@angular/cdk/drag-drop";
import {MatDialog} from "@angular/material/dialog";
import {TicketDialogComponent, TicketDialogResult} from "./ticket-dialog/ticket-dialog.component";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cpb';
  todo = this.store.collection('todo').valueChanges({ idField: 'id' }) as Observable<Ticket[]>;
  inProgress = this.store.collection('inProgress').valueChanges({ idField: 'id' }) as Observable<Ticket[]>;
  done = this.store.collection('done').valueChanges({ idField: 'id' }) as Observable<Ticket[]>;


  constructor(private dialog: MatDialog, private store: AngularFirestore) {}

  drop(event: any): void {
    if (event.previousContainer === event.container) {
      return;
    }
    const item = event.previousContainer.data[event.previousIndex];
    this.store.firestore.runTransaction(() => {
      const promise = Promise.all([
        this.store.collection(event.previousContainer.id).doc(item.id).delete(),
        this.store.collection(event.container.id).add(item),
      ]);
      return promise;
    });
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
        this.store.collection('todo').add(result.ticket);
      });
  }

  editTicket(list: 'done' | 'todo' | 'inProgress', ticket: Ticket): void {
    const dialogRef = this.dialog.open(TicketDialogComponent, {
      width: '270px',
      data: {
        ticket: ticket,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: TicketDialogResult|undefined) => {
      if (!result) {
        return;
      }
      if (result.delete) {
        this.store.collection(list).doc(ticket.id).delete();
      } else {
        this.store.collection(list).doc(ticket.id).update(ticket);
      }
    });
  }
}
