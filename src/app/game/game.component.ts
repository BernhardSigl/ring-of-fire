import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common'
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
  // currentCard: string = ''; werden beide verschoben damit synchron mit mitspieler
  game!: Game;
  normalGame: Game[] = [];
  gameId!: string;

  firestore: Firestore = inject(Firestore);

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private location: Location) { }

  // #1
  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
      this.subGamesRef();
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
    const q = this.getSingleDocRef(this.gameId);
    return onSnapshot(q, (element) => {
      let gameData = element.data();
      // console.log('game update', gameData);
      this.game.currentPlayer = gameData!['currentPlayer'];
      this.game.playedCards = gameData!['playedCards'];
      this.game.players = gameData!['players'];
      this.game.stack = gameData!['stack'];
      this.game.pickCardAnimation = gameData!['pickCardAnimation'];
      this.game.currentCard = gameData!['currentCard'];
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
    // this.unsubGamesRef();
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

  copyToClipboard() {
    const currentUrl = window.location.href;
    const dummyElement = document.createElement('textarea');
    document.body.appendChild(dummyElement);
    dummyElement.value = currentUrl;
    dummyElement.select();
    try {
      document.execCommand('copy');
      // console.log('URL wurde in die Zwischenablage kopiert');
      const inviteLinkElement = document.getElementById('inviteLinkId');
      if (inviteLinkElement) {
        const linkTextElement = inviteLinkElement.querySelector('.linkText');
        if (linkTextElement) {
          linkTextElement.classList.add('linkTextCopied');
          linkTextElement.textContent = 'Link copied';
          setTimeout(() => {
            linkTextElement.classList.remove('linkTextCopied');
            linkTextElement.textContent = 'Invite friend';
          }, 2000);
        }
      }
    } catch (err) {
      console.error('Fehler beim Kopieren in die Zwischenablage', err);
    } finally {
      document.body.removeChild(dummyElement);
    }
  }

}
