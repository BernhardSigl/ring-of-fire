import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'
import { Game } from './../../models/game';
import { PlayerComponent } from './../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from './../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from './../game-info/game-info.component';
import { Firestore, collection, addDoc, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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

export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game!: Game;
  item: any;

  // new:
  firestore: Firestore = inject(Firestore);
  currentParams: any; // obj??

  constructor(private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    // this.addGame();

    this.route.params.subscribe((params) => {
      this.currentParams = params['id'];
      this.subGameList();
    })
  }

  // new:
  async addGame() {
    const docRef = await addDoc(collection(this.getGamesRef(), "cities"), {
      name: "Tokyo",
      country: "Japan"
    });
    console.log("Document written with ID: ", docRef.id);
  }

  ngOnDestroy() {
    // this.unsubGameList();
  }



  // new:
  subGameList() {
    return onSnapshot(this.getGamesRef(), (list) => {
      list.forEach(element => {
        if (element.id == this.currentParams) {
          console.log('game update: ', this.game);
          console.log('element.id', element.id + ' & currentParams', this.currentParams);

          this.game.currentPlayer = element.data()['currentPlayer'];
          this.game.playedCards = element.data()['playedCards'];
          this.game.players = element.data()['players'];
          this.game.stack = element.data()['stack'];
        }
      });
    });
  }

  setGameObj(obj: any) {
    return {
      currentPlayer: obj?.currentPlayer || "",
      playedCards: obj?.playedCards || "",
      players: obj?.players || "",
      stack: obj?.stack || "",
    }
  }

  getGamesRef() {
    return collection(this.firestore, 'games');
  }

  takeCard() {
    if (this.game.players.length == 0) {
      this.openDialog();
    } else if (!this.pickCardAnimation) {
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
