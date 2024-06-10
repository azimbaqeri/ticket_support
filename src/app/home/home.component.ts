import { Component, inject } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    //HttpClientModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  authentification = inject(AuthentificationService);
  tabletd: string[] = ['Ticket ID', 'Title', 'Date', 'Date_fermeture', 'status'];
  list_tickets: any[] = [];
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);
  total_tickets: number = 0;
  ticket_en_cours: number = 0;
  ticket_ferme: number = 0;

  ngOnInit(): void {
    this.page_reload()
    this.authentification.connexion();
    
    
  }


  page_reload() {
    let url: string;
    if (this.authentification.role_name == "Administrateur") {
    url = "http://localhost/back_angular/ticket_back/list_tickets.php";
    }else  {
        url= "http://localhost/back_angular/ticket_back/list_tickets.php?utilisateur_id=" + this.authentification.utilisateur_id;
    }
    this.http.get<any[]>(url)
      .subscribe(resulta => {

        this.list_tickets = resulta;
        console.log(this.list_tickets);

        this.total_tickets = this.list_tickets.length;

        for (let ticket of this.list_tickets) {
          if (ticket.ticket_status == 1) {
            this.ticket_en_cours++;
          } else if (ticket.ticket_status == 0) {
            this.ticket_ferme++;
          }
        }
        
      });

    
  }
  onTableClick(row: any) {
    console.log(row.ticket_id);
    this.router.navigate(['/ticket', row.ticket_id]);
  }

}