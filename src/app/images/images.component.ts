import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {tick} from "@angular/core/testing";

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  @Input() ticket: any;
  images:any = [];

  constructor(
    private store: AngularFirestore,
    private cdRef: ChangeDetectorRef,

  ) { }

  ngOnInit(): void {
    this.getMarkers();
    this.cdRef.markForCheck();
    //this.getImages();
  }



  async getMarkers() {
    const events = await this.store.collection('tickets').doc(this.ticket.id).collection('images').ref;
    events.get().then((querySnapshot) => {
      const tempDoc = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() }
      })
      this.images = tempDoc;
      this.images = [...this.images];
      console.log(this.images);
      this.cdRef.markForCheck();
      return tempDoc;
    })
  }

  getImages() {
      // you can use either:
      // .valueChanges()
      // or .snapshotChanges()

    this.store.collection('tickets').doc(this.ticket.id).collection('images').ref.get().then((doc) => {
      if (doc) {
        console.log(doc);
        return 'Doc does not exits';

      } else {
        return 'Doc does not exits';
      }
    }).catch((err) => {
      console.error(err);
    });


  }

}
