import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'
import { Game } from './../../models/game';
import { PlayerComponent } from './../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from './../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from './../game-info/game-info.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    PlayerComponent,
    MatButtonModule,
    MatIconModule,
    GameInfoComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent {
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game;

  baseHref = '/angular-projects/ring-of-fire/';
  scream_sound_Alex = new Audio(`./../../${this.baseHref}assets/audio/alexViking.mp3`);
  scream_sound_Marko = new Audio(`./../../${this.baseHref}assets/audio/markoViking.mp3`);

  constructor(public dialog: MatDialog) {
    this.game = new Game();
  }

  takeCard() {
    let indexOfAlex = this.game.players.indexOf('Alex');
    let indexOfMarko = this.game.players.indexOf('Marko');
    if (indexOfAlex == 0) {
      indexOfAlex = this.game.players.length;
    } else if (indexOfMarko == 0) {
      indexOfMarko = this.game.players.length;
    }
    if (this.game.players.length == 0) {
      this.openDialog();
    } else if (!this.pickCardAnimation) {
      if (indexOfAlex - 1 == this.game.currentPlayer) {
        this.scream_sound_Alex.play();
      }
      if (indexOfMarko - 1 == this.game.currentPlayer) {
        this.scream_sound_Marko.play();
      }
      this.currentCard = this.game.stack.pop()!;
      this.pickCardAnimation = true;

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}
