import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Ticket} from "../ticket/ticket";
import {FormService} from "../services/form.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

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
export class TicketDialogComponent implements OnInit, AfterViewInit {
  fieldsForm: FormGroup;
  backupTicket: Partial<Ticket> = { ...this.data.ticket };
  fields: any = [];
  constructor(
    public dialogRef: MatDialogRef<TicketDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TicketDialogData,
    private formService: FormService,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.getFields();
    this.buildForm(this.data?.ticket);

    this.cdRef.markForCheck();
  }

  ngAfterViewInit() {

  }

  valueChangeCheck() {
    this.fields.forEach((field:any, index: number) => {
      let elementId = 'editor' + index;
      let value = < HTMLImageElement > document.getElementById(elementId);
      if(!value) {
        return;
      }
      this.fieldsForm.value[field.key] = value.textContent;

    })
  }

  cancel(): void {
    this.data.ticket = this.backupTicket;
    this.dialogRef.close(this.data);
  }

  getFields() {
    this.fields = this.formService.getFields();
    this.fields = [...this.fields];
  }

  buildForm(ticket: any) {
    let controls: any = {};
    this.fields?.forEach((field: any) => {
      if (field.type === 'checkbox') {
        controls[field.key] = [ticket?.hasOwnProperty(field.key) ? ticket[field.key] : false];
      } else if (field.type === 'dateTime'){
        controls[field.key] = [ticket?.hasOwnProperty(field.key) ? new Date(ticket[field.key]) : new Date()];
      }  else if (field.type === 'dropdown'){
        controls[field.key] = [ticket?.hasOwnProperty(field.key) && ticket[field.key] ? ticket[field.key] : field.options[0].key];
      } else {
        controls[field.key] = [ticket?.hasOwnProperty(field.key) ? ticket[field.key] : ''];
      }

    });
    this.fieldsForm = this.fb.group(controls);
  }

  setChangeListener (div: any, listener:any ) {

    div.addEventListener("blur", listener);
    div.addEventListener("keyup", listener);
    div.addEventListener("paste", listener);
    div.addEventListener("copy", listener);
    div.addEventListener("cut", listener);
    div.addEventListener("delete", listener);
    div.addEventListener("mouseup", listener);

  }


  submit() {

    this.valueChangeCheck();
    let res = JSON.parse(JSON.stringify(this.fieldsForm.value));
/*    this.fields.forEach(field => {
      res[field.key] = '';
    });*/
    this.dialogRef.close({ ticket: res });
  }

  exportAsPDF(divId: any)
  {
    let data:any = document.getElementById('divId');
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')  // 'image/jpeg' for lower quality output.
      let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
       //let pdf = new jspdf('p', 'cm', 'a4'); //Generates PDF in portrait mode
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 27.7, 20.0);
      const fileName = this.data?.ticket?.ticketNumber + '.pdf';
      pdf.save(fileName);
    });
  }

}
