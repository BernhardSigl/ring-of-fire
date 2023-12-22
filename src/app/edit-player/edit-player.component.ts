import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-edit-player',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.scss'
})
export class EditPlayerComponent {

  constructor(public dialogRef: MatDialogRef<DialogAddPlayerComponent>) { }

  allProfilePictures = ['avatar0.png', 'avatar1.png', 'avatar2.png', 'avatar3.png', 'avatar4.png'];
}
