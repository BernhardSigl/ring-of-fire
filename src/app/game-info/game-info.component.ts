import { Component, OnInit, Input, OnChanges } from '@angular/core';
// import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-game-info',
  standalone: true,
  imports: [
    MatCardModule,
    // CommonModule,
  ],
  templateUrl: './game-info.component.html',
  styleUrl: './game-info.component.scss'
})
export class GameInfoComponent implements OnInit, OnChanges {
  cardAction = [
    {
      title: "Wasserfall",
      description: "Alle beginnen gleichzeitig zu trinken, und niemand kann aufhören, bis die Person rechts von ihnen aufhört."
    },
    {
      title: "Thumb Master",
      description: "Du bist der Daumen-Meister. Jedes Mal, wenn du deinen Daumen auf den Tisch legst, müssen alle folgen. Die letzte Person, die es tut, trinkt."
    },
    {
      title: "Rule Master",
      description: "Du wirst der Regel-Meister. Erstelle eine Regel, der alle folgen müssen, bis der nächste Regel-Meister gewählt wird. Das Brechen der Regel führt zu einem Schluck."
    },
    {
      title: "Kategorien",
      description: "Wähle eine Kategorie (z. B. Filme, Tiere). Die Spieler müssen reihum etwas aus dieser Kategorie sagen. Die erste Person, die sich nichts ausdenken kann, trinkt."
    },
    {
      title: "Reimzeit",
      description: "Du sagst ein Wort, und die Person rechts von dir muss ein Wort sagen, das sich reimt. Dies geht im Kreis weiter, und die erste Person, die sich keinen Reim einfallen lässt, trinkt."
    },
    {
      title: "Ich habe noch nie",
      description: "Jeder hebt drei Finger. Jeder sagt abwechselnd etwas, das er noch nie getan hat. Wenn jemand es getan hat, senkt er einen Finger. Die erste Person ohne Finger trinkt."
    },
    {
      title: "Stelle eine Regel auf",
      description: "Du darfst eine Regel aufstellen, die bis zum Ende des Spiels gilt. Jeder, der die Regel bricht, trinkt."
    },
    {
      title: "Zwei Wahrheiten und eine Lüge",
      description: "Sage zwei wahre Aussagen und eine falsche Aussage. Die Gruppe stimmt darüber ab, welche Aussage die Lüge ist. Wenn du bei einer Lüge erwischt wirst, trinkst du."
    },
    {
      title: "Nur Fragen",
      description: "Die Spieler müssen sich durch Fragen miteinander verständigen. Die erste Person, die mit einer Aussage antwortet, trinkt."
    },
    {
      title: "Elch",
      description: "Immer wenn du jemanden siehst, der beide Hände wie Elchgeweihe auf den Kopf legt, musst du dasselbe tun. Die letzte Person, die es tut, trinkt."
    },
    {
      title: "Königsbecher",
      description: "Gieße eine kleine Menge deines Getränks in einen 'Königsbecher' in der Mitte. Die Person, die die letzte Karte mit dem König zieht, muss den Inhalt des Königsbechers trinken."
    },
    {
      title: "Gemeinschaftstrinken",
      description: "Alle trinken zusammen. Prost!"
    },
    {
      title: "Tanzwettbewerb",
      description: "Starte einen Tanzwettbewerb. Die beiden schlechtesten Tänzer trinken."
    }
  ]

  title = '';
  description = '';
  @Input() card!: string;

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    if (this.card) {
      let cardNumber = +this.card.split('_')[1];
      this.title = this.cardAction[cardNumber - 1].title;
      this.description = this.cardAction[cardNumber - 1].description;
    }
  }
}