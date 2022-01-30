import { Component } from '@angular/core';
import {Ticket} from "./ticket/ticket";
import {CdkDragDrop, transferArrayItem} from "@angular/cdk/drag-drop";
import {MatDialog} from "@angular/material/dialog";
import {TicketDialogComponent, TicketDialogResult} from "./ticket-dialog/ticket-dialog.component";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {BehaviorSubject, Observable} from "rxjs";

const getObservable = (collection: AngularFirestoreCollection<Ticket>) => {
  const subject = new BehaviorSubject<Ticket[]>([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Ticket[]) => {
    subject.next(val);
  });
  return subject;
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cpb';
  todo = getObservable(this.store.collection('todo')) as Observable<Ticket[]>;
  inProgress = getObservable(this.store.collection('inProgress')) as Observable<Ticket[]>;
  done = getObservable(this.store.collection('done')) as Observable<Ticket[]>;
  tickets = getObservable(this.store.collection('tickets')) as Observable<Ticket[]>;
  listView = true;

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
      width: '80vw',
      height: '80vh',
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
        this.store.collection('tickets').add(result.ticket);
      });
  }

  editTicket(list: 'done' | 'todo' | 'inProgress' | 'tickets' , ticket: Ticket): void {
    const dialogRef = this.dialog.open(TicketDialogComponent, {
      width: '80vw',
      height: '80vh',
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
        this.store.collection(list).doc(ticket.id).update(result.ticket);
      }
    });
  }
}
