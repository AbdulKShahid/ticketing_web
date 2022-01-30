import { Injectable } from '@angular/core';

interface Field {
  name: string,
  key: string,
  type: string,
}
@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  getInfoFields(): Field[] {
    const infoFieldsList: Field[] = [
      {
        name: 'Technician name',
        key: 'technicianName',
        type: 'string'
      },
      {
        name: 'Ticket number',
        key: 'ticketNumber',
        type: 'string'
      },

    ];
    return infoFieldsList;
  }
}
