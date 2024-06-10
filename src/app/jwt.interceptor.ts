import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const jwt = localStorage.getItem('jwt');

  if(jwt != null) {

  const nouvelleRequete = req.clone({setHeaders: {Authorization: jwt}});
    return next(nouvelleRequete);
  }

  throw Error ("Vous devez être connecté pour accéder à cette page");
  

};
