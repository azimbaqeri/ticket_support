import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthentificationService } from './authentification.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const administrateurGuard: CanActivateFn = (route, state) => {

  const authentification = inject(AuthentificationService);
  const router = inject(Router)
  const snackBar:MatSnackBar = inject(MatSnackBar)


  if (authentification.role_name == 'Administrateur'){
    return true
  } else {
    snackBar.open("Vous n'avez pas accès à cette page veuillez vous connecter en tant qu'administrateur", undefined, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: 'snack-bar-success',
    });

    return router.createUrlTree(['/connexion']);
  }

};
