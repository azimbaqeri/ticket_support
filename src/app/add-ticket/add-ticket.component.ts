import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldControl, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-ticket',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatFormFieldModule,
    MatLabel,
    MatInputModule
  ],
  templateUrl: './add-ticket.component.html',
  styleUrl: './add-ticket.component.scss'
})
export class AddTicketComponent {

  formBuilder: FormBuilder = inject(FormBuilder);
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);
  snackBar: MatSnackBar = inject(MatSnackBar);

  addTicket: FormGroup = this.formBuilder.group({
    ticket_title: ["", [Validators.required]],
    ticket_description: ["", [Validators.required]],
  })


  onSubmit() {
    if (this.addTicket.valid) {
      this.http.post("http://localhost/back_angular/ticket_back/add_ticket.php", this.addTicket.value)
        .subscribe({
          next: (result) => {
            console.log(result);
            this.router.navigate(['/home']);
            this.snackBar.open("Le ticket a bien été ajouté", undefined, {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: 'snack-bar-success',
            });
          },
          error: (error) => {
            console.log(error);
          }
        })
      
      
    }
  }

}
