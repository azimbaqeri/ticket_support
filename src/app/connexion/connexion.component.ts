import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthentificationService } from '../authentification.service';


@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, HttpClientModule, HttpClientJsonpModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss'
})
export class ConnexionComponent {
  generateurFormulaire: FormBuilder = inject(FormBuilder);

  formulaire: FormGroup = this.generateurFormulaire.group({
    utilisateur_email: ['root@mns.fr', [Validators.required, Validators.email]],
    utilisateur_password: ['root', [Validators.required]]
  })
  resultat: string[] = [];
  welcome: string = "";
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);
  snackBar: MatSnackBar = inject(MatSnackBar);
  authentification = inject(AuthentificationService);

  onConnexion() {
    if (this.formulaire.valid) {

      this.http.post<any>('http://localhost/back_angular/ticket_back/login.php', this.formulaire.value)
        .subscribe(data => {
          localStorage.setItem('jwt', data.jwt);
          
          this.authentification.connexion();

          this.router.navigate(['/home']);
          this.snackBar.open("Vous vous êtes connecté avec succès", undefined, {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: 'snack-bar-success',
          });

        })


      //   this.http.get('http://localhost/back_angular/login.php?email='+this.formulaire.value.email+'&password='+this.formulaire.value.password)
      // .subscribe(data =>{
      //   console.log(Object.values(data));

      //   for (let item of Object.values(data)) {
      //     this.resultat.push(item);
      //     console.log(this.resultat);
      //   }
      //   if(this.resultat[0] == "true"){
      //     // this.resultat = "Connexion reussie";
      //     this.router.navigate(['/accueil'], {
      //       queryParams: {
      //         welcome: this.resultat[1],
      //         id: this.resultat[2]
      //       }
      //     });

      //   }
      // });

    }
  }

}
