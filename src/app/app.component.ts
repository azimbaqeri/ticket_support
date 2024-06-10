import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthentificationService } from './authentification.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive
    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  snackBar: MatSnackBar = inject(MatSnackBar);
  router: Router = inject(Router);
  authentification = inject(AuthentificationService);

  ngOnInit(): void {

    this.authentification.connexion();
  }
  
  
  onDeconnexion() {

    this.authentification.deconnexion();
    this.router.navigate(['/home']);
    this.snackBar.open("Vous vous êtes deconnecté avec succès", undefined, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: 'snack-bar-success',
    });
  }

}
