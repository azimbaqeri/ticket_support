import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [
    FormsModule,
    //HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink

  ],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss'
})
export class TicketComponent {

  http: HttpClient = inject(HttpClient);
  list_tickets: any[] = [];
  authentification = inject(AuthentificationService);
  router: Router = inject(Router);
  snackBar: MatSnackBar = inject(MatSnackBar);

  formBuilder: FormBuilder = inject(FormBuilder);

  message_form: FormGroup = this.formBuilder.group({
    message_text: ["", [Validators.required]],
  });

  route: ActivatedRoute = inject(ActivatedRoute);
  ticket_id: string = this.route.snapshot.paramMap.get('ticket_id') || "";



  ngOnInit(): void {
    this.authentification.connexion();
    this.page_reload()
    
  }

  onSubmit() {
    if(this.message_form.valid){
    const formdata = {
      ...this.message_form.value,
      ticket_id : this.ticket_id
    }
    
    this.http.post("http://localhost/back_angular/ticket_back/add_message.php", formdata)
      .subscribe(result => {
        console.log(result);
        this.page_reload();
        this.message_form.reset();
        this.message_form.get("message_text")?.setErrors(null);

      });
    }
  }

  fermer_ticket() {
    this.http.get("http://localhost/back_angular/ticket_back/close_ticket.php?ticket_id=" + this.ticket_id)
      .subscribe(result => {
        console.log(result);
        this.page_reload();
      });
  }
  suprimer_ticket() {
    this.http.get("http://localhost/back_angular/ticket_back/del_ticket.php?ticket_id=" + this.ticket_id)
      .subscribe(result => {
        console.log(result);
        this.router.navigate(['/home']);
        this.snackBar.open("Le ticket a bien ete suprime", undefined, {
          duration: 3000,
          panelClass: 'snack-bar-success',
        });
      });
  }
  
  page_reload() {
    this.http.get<any[]>("http://localhost/back_angular/ticket_back/get_tickets.php?ticket_id=" + this.ticket_id)
      .subscribe(resulta => {
        if(resulta.length == 0){
          this.router.navigate(['/home']);
          this.snackBar.open("Vous n'avez pas le droit de voir ce ticket", undefined, {
            duration: 3000,
            panelClass: 'snack-bar-success',
          });
        }
        this.list_tickets = resulta;
        console.log(this.list_tickets);
        if(this.list_tickets[0].ticket_status == "0"){
          this.message_form.get("message_text")?.disable();
          this.message_form.get("message_button")?.disable();
        }
      });

    }
  }
