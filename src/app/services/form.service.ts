import { Injectable } from '@angular/core';

interface Field {
  name: string,
  key: string,
  type: string,
  kind?:string,
}
@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  getFields(): Field[] {
    return [...this.getInfoFields(), ...this.getWorkFields()];
  }

  getInfoFields(): Field[] {
    let infoFieldsList: Field[] = [
      {
        name: 'Nom du technician',
        key: 'technicianName',
        type: 'string',
        kind: 'info'
      },
      {
        name: 'N. d\'intervention',
        key: 'ticketNumber',
        type: 'string',
        kind: 'info'
      },{
        name: 'Date d\'intervention',
        key: 'ticketDate',
        type: 'string',
        kind: 'info'
      },
      {
        name: 'Adress',
        key: 'address',
        type: 'string',
        kind: 'info'
      },
      {
        name: 'Ville',
        key: 'ville',
        type: 'string',
        kind: 'info'
      },{
        name: 'Code postal',
        key: 'codePostal',
        type: 'string',
        kind: 'info'
      },{
        name: 'Statut',
        key: 'status',
        type: 'string',
        kind: 'info'
      },{
        name: 'Heure d\'appel',
        key: 'callTime',
        type: 'string',
        kind: 'info'
      },{
        name: 'Heure d\'arrivé',
        key: 'arrivalTime',
        type: 'string',
        kind: 'info'
      },{
        name: 'Heure de depart',
        key: 'departureTime',
        type: 'string',
        kind: 'info'
      },{
        name: 'Batiment',
        key: 'building',
        type: 'string',
        kind: 'info'
      },{
        name: 'Etage',
        key: 'floorNo',
        type: 'string',
        kind: 'info'
      },{
        name: 'Escalier',
        key: 'escalier',
        type: 'string',
        kind: 'info'
      },{
        name: 'Apartment',
        key: 'apartment',
        type: 'string',
        kind: 'info'
      },{
        name: 'Nom du locator',
        key: 'locatorName',
        type: 'string',
        kind: 'info'
      },{
        name: 'Telephone',
        key: 'telephone',
        type: 'string',
        kind: 'info'
      },{
        name: 'Partie commune',
        key: 'commonArea',
        type: 'string',
        kind: 'info'
      },{
        name: 'Logement',
        key: 'logement',
        type: 'string',
        kind: 'info'
      },{
        name: 'Panne électrique',
        key: 'blackOut',
        type: 'string',
        kind: 'info'
      },{
        name: 'Fuite d\'eau',
        key: 'waterLeak',
        type: 'string',
        kind: 'info'
      },{
        name: 'Porte bloquée',
        key: 'doorBlock',
        type: 'string',
        kind: 'info'
      },

    ];

    return infoFieldsList;
  }

  getWorkFields(): Field[] {
    let workFieldsList: Field[] = [
      {
        name: 'Un technician',
        key: 'isOneTechnician',
        type: 'string',
        kind: 'work'
      },
      {
        name: 'Deux technicians',
        key: 'isTwoTechnician',
        type: 'string',
        kind: 'work'
      },
      {
        name: 'Mise en securité',
        key: 'putInSecurity',
        type: 'string',
        kind: 'work'
      },
      {
        name: 'Verification d\'equipments',
        key: 'equipmentVerification',
        type: 'string',
        kind: 'work'
      },
      {
        name: 'Nom conducteur de travaux',
        key: 'conductorName',
        type: 'string',
        kind: 'work'
      },
      {
        name: 'N. Gardien',
        key: 'numberOfGardien',
        type: 'string',
        kind: 'work'
      },
      {
        name: 'Nom/prénom du gardien',
        key: 'nameOfGardien',
        type: 'string',
        kind: 'work'
      },
      {
        name: 'Réparation à prévoir commentaire',
        key: 'reparationPreviewedCmt',
        type: 'string',
        kind: 'work'
      },
      {
        name: 'Recherche de fuite commentaire',
        key: 'waterLeakSearchCmt',
        type: 'string',
        kind: 'work'
      },
      {
        name: 'Recherche de panne commentaire',
        key: 'panneSearchCmt',
        type: 'string',
        kind: 'work'
      },{
        name: 'Reparation commentaire',
        key: 'reparationCmt',
        type: 'string',
        kind: 'work'
      },{
        name: 'Observation',
        key: 'observation',
        type: 'string',
        kind: 'work'
      },{
        name: 'Appartment et étage',
        key: 'apptEtage',
        type: 'string',
        kind: 'work'
      },

    ];
    workFieldsList.forEach(field => field['kind'] = 'work');


    return workFieldsList;
  }

}
