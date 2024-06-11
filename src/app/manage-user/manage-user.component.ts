import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { Utilisateur } from '../models/Utilisateur.type';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AuthentificationService } from '../authentification.service';


@Component({
  selector: 'app-manage-user',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterLink,
    //HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule, 
    
  ],
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.scss'
})
export class ManageUserComponent {

  tabletd: string[] = ['email', 'Prenom', 'Nom', 'Role', 'Actions'];

  http: HttpClient = inject(HttpClient);
  snackBar: MatSnackBar = inject(MatSnackBar);
  list_utilisateurs: Utilisateur[] = [];
  authentification: AuthentificationService = inject(AuthentificationService);


  ngOnInit(): void {

    this.page_reload();
    if(this.authentification.role_name != "Administrateur") {
      this.tabletd = ['email', 'Prenom', 'Nom', 'Role'];
    }

  }

  onSupprimerUtilisateur(utilisateur_id: number) {
    this.http.get<Utilisateur[]>("http://localhost/back_angular/ticket_back/del_user.php?utilisateur_id=" + utilisateur_id)
      .subscribe({
        next: (resulta) => {
          this.page_reload();

          this.snackBar.open("Utilisateur supprimé avec succès", undefined, {
            duration: 3000,
            panelClass: 'snack-bar-success',
          });

        },
        error: (error) => {
          
          this.snackBar.open(error.error.message, undefined, {
            duration: 3000,
            panelClass: 'snack-bar-success',
          });
        }
      })
  }
  

  page_reload () {
      this.http.get<Utilisateur[]>("http://localhost/back_angular/ticket_back/list_users.php")
        .subscribe(resulta => {

          this.list_utilisateurs = resulta;
        });
    }
    
    



}
