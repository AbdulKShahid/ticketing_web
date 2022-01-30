import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Ticket} from "../ticket/ticket";
import {FormService} from "../services/form.service";
import {FormBuilder, FormGroup} from "@angular/forms";

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
export class TicketDialogComponent implements OnInit {
  fieldsForm: FormGroup;
  private backupTicket: Partial<Ticket> = { ...this.data.ticket };
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
        controls[field.key] = [ticket?.hasOwnProperty(field.key) ? (ticket[field.key]).toDate() : new Date()];
      } else {
        controls[field.key] = [ticket?.hasOwnProperty(field.key) ? ticket[field.key] : ''];
      }

    });
    this.fieldsForm = this.fb.group(controls);
  }

  submit() {
    let res = JSON.parse(JSON.stringify(this.fieldsForm.value));
/*    this.fields.forEach(field => {
      res[field.key] = '';
    });*/
    this.dialogRef.close({ ticket: res });
  }
}
