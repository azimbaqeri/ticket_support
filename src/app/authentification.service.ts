import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  
  utilisateur_id?: string;
  utilisateur_firstname?: string;
  utilisateur_lastname?: string;
  role_name?: string;


  connexion() {
    const jwt = localStorage.getItem('jwt');

    if(jwt!= null) {
      
      const partiesJwt = jwt.split('.');
      const jwtBodyBase64 = partiesJwt[1];
      const jsonBody = window.atob(jwtBodyBase64);
      const body = JSON.parse(jsonBody);
      this.role_name = body.role_name;
      this.utilisateur_id = body.utilisateur_id;
      this.utilisateur_firstname = body.utilisateur_firstname;
      this.utilisateur_lastname = body.utilisateur_lastname;

    } else {
      this.role_name =  undefined;
      this.utilisateur_id = undefined;
      this.utilisateur_firstname = undefined;
      this.utilisateur_lastname = undefined;
    }

  }

  deconnexion() {
    localStorage.removeItem('jwt');

    this.role_name = undefined;
    this.utilisateur_id = undefined;
    this.utilisateur_firstname = undefined;
    this.utilisateur_lastname = undefined;
  }










  constructor() { }
}
