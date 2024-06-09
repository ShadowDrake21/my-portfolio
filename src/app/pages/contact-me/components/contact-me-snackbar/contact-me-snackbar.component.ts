// angular stuff
import { Component, Inject, inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-contact-me-snackbar',
  standalone: true,
  imports: [
    MatSnackBarLabel,
    MatSnackBarActions,
    MatSnackBarAction,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './contact-me-snackbar.component.html',
  styleUrl: './contact-me-snackbar.component.css',
})
export class ContactMeSnackbarComponent {
  snackBarRef = inject(MatSnackBarRef);

  constructor(@Inject(MAT_SNACK_BAR_DATA) public message: string) {}
}
