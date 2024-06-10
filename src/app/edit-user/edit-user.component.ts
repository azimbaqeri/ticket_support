import { HttpClient,} from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators,  } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { Utilisateur } from '../models/Utilisateur.type';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent {

  roleLists: string[] = ["Administrateur", "Etudiant", "Intervenant"];
  button_text: string = "Ajouter";
  formBuilder: FormBuilder = inject(FormBuilder);
  snackBar: MatSnackBar = inject(MatSnackBar);
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);
  idUtilisateur?: number;

  formulaire: FormGroup = this.formBuilder.group({
    utilisateur_email: ["", [Validators.required, Validators.email, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),]],
    utilisateur_password: ["", [Validators.required]],
    utilisateur_firstname: ["", [Validators.required]],
    utilisateur_lastname: ["", [Validators.required]],
    role_name: ["Etudiant", [Validators.required]],
  });


  ngOnInit(): void {

    this.route.params.subscribe(paramsUrl => {

      // si il y a un param et que c'est un nombre
      if (paramsUrl['id'] && !isNaN(paramsUrl['id'])) {

        this.formulaire.get("utilisateur_password")?.removeValidators([Validators.required]);

        this.button_text = "Mettre à jour";
        this.http.get<Utilisateur>("http://localhost/back_angular/ticket_back/get_user.php?utilisateur_id=" + paramsUrl['id'])
          .subscribe({
            next: (user: Utilisateur) => {
              
              this.idUtilisateur = user.utilisateur_id;
              
              this.formulaire.patchValue(user);

            },
            error: (error) => {
              console.log(error);
            }
          });

      }
    });

  }



  onSumit() {
    if (this.formulaire.valid) {

      const url: string =
        this.idUtilisateur == null
          ? 'http://localhost/back_angular/ticket_back/add_user.php'
          : 'http://localhost/back_angular/ticket_back/edit_user.php?utilisateur_id=' +
          this.idUtilisateur;

      this.http
        .post(url, this.formulaire.value
        )
        .subscribe({
          next: (resultat) => {
            this.snackBar.open("L'utilisateur a bien été ajouté", undefined, {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: 'snack-bar-success',
            });

            this.router.navigateByUrl('/manage-user');
          },
          error: (resultat) =>
            alert('Erreur inconnue contactez votre administrateur'),
        });
    }

  }










  //   this.route.params.subscribe(paramsUrl => {

  //     if (this.formulaire.valid) {
  //     // si il y a un param et que c'est un nombre
  //     if (paramsUrl['id'] && !isNaN(paramsUrl['id'])) {



  //       this.http.post("http://localhost/back_angular/ticket_back/edit_user.php?utilisateur_id=" + paramsUrl['id'], this.formulaire.value)
  //         .subscribe({
  //           next: (resulta) => {
  //             this.snackBar.open("Utilisateur mis à jour avec succès", undefined, {
  //               duration: 3000,
  //               panelClass: 'snack-bar-success',
  //             });

  //             this.router.navigate(['/manage-user']);
  //           },
  //           error: (error) => {
  //             console.log(error);
  //           }
  //         });

  //     } else {

  //       this.http.post("http://localhost/back_angular/ticket_back/add_user.php", this.formulaire.value)
  //         .subscribe({
  //           next: (resulta) => {
  //             this.snackBar.open("Utilisateur été ajouté avec succès", undefined, {
  //               duration: 3000,
  //               panelClass: 'snack-bar-success',
  //             });

  //             this.router.navigate(['/manage-user']);
  //           },
  //           error: (error) => {
  //             console.log(error);
  //           }
  //         })

  //     }
  //   }
  //   });




  // }

}
