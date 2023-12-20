import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'
import { Game } from './../../models/game';
import { PlayerComponent } from './../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from './../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from './../game-info/game-info.component';
import { Firestore, collection, addDoc, onSnapshot, query, getDocs, doc, updateDoc } from '@angular/fire/firestore';
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

export class GameComponent {
  // pickCardAnimation = false; 
  // currentCard: string = ''; werden beide verschoben damit synchron mit mitspieler
  game!: Game;
  normalGame: Game[] = [];
  gameId!: string;

  firestore: Firestore = inject(Firestore);

  constructor(private route: ActivatedRoute, public dialog: MatDialog) { }

  // #1
  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
      console.log('params.id', this.gameId);
      this.subGamesRef();
      this.getSingleDocRef(this.gameId);
    })
  }

  // #2 wird nicht mehr benötigt, da auf start screen btn eingefügt
  newGame() {
    this.game = new Game();
    // this.addGame(); // ausblenden zum testen
  }

  // #3
  // add game json to fs
  async addGame() {
    await addDoc(this.getGamesRef(), this.game.toJson());
  }

  // #4
  // änderungen von fs auf website übertragen
  async subGamesRef() {
    const q = query(this.getGamesRef());
    return onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach(element => {
        console.log('game update', element.data());
        // console.log(element.id);
        this.game.currentPlayer = element.data()['currentPlayer'];
        this.game.playedCards = element.data()['playedCards'];
        this.game.players = element.data()['players'];
        this.game.stack = element.data()['stack'];
        this.game.pickCardAnimation = element.data()['pickCardAnimation'];
        this.game.currentCard = element.data()['currentCard'];
      });
    });
  }

  // #5
  getGamesRef() {
    // firebase verbindung
    return collection(this.firestore, 'games');
  }

  // #6
  // spezifische url
  getSingleDocRef(docId: string) {
    return doc((this.getGamesRef()), docId);
  }

  // #7
  async saveGame() {
    let docRef = this.getSingleDocRef(this.gameId);
    await updateDoc(docRef, this.game.toJson());
  }

  ngOnDestroy() {
  }

  takeCard() {
    if (this.game.players.length == 0) {
      this.openDialog();
    } else if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop()!;
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }
}
