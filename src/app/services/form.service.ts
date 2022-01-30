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
        name: 'Nom du technician',
        key: 'technicianName',
        type: 'string'
      },
      {
        name: 'N. d\'intervention',
        key: 'ticketNumber',
        type: 'string'
      },
      {
        name: 'Adress',
        key: 'address',
        type: 'string'
      },
      {
        name: 'Ville',
        key: 'ville',
        type: 'string'
      },{
        name: 'Code postal',
        key: 'codePostal',
        type: 'string'
      },{
        name: 'Batiment',
        key: 'building',
        type: 'string'
      },{
        name: 'Etage',
        key: 'floorNo',
        type: 'string'
      },{
        name: 'Escalier',
        key: 'escalier',
        type: 'string'
      },{
        name: 'Apartment',
        key: 'apartment',
        type: 'string'
      },

    ];
    return infoFieldsList;
  }
}
