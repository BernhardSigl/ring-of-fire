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
      title: 'Waterfall',
      description: 'Everyone begins drinking at the same time, and no one can stop until the person to their right stops.'
    },
    {
      title: 'Thumb Master',
      description: 'You are the Thumb Master. Whenever you put your thumb on the table, everyone must follow. The last person to do so drinks.'
    },
    {
      title: 'Rule Master',
      description: 'You become the Rule Master. Create a rule that everyone must follow until the next Rule Master is chosen. Breaking the rule results in drinking.'
    },
    {
      title: 'Categories',
      description: `Choose a category (e.g., movies, animals). Players must go around and say something from that category. The first person who can't think of something drinks.`
    },
    {
      title: 'Rhyme Time',
      description: `You say a word, and the person to your right must say a word that rhymes. This continues around the circle, and the first person who can't think of a rhyme drinks.`
    },
    {
      title: 'Never Have I Ever',
      description: `Everyone puts up three fingers. Take turns saying something you've never done. If someone has done it, they put a finger down. The first person with no fingers up drinks.`
    },
    {
      title: 'Make a Rule',
      description: 'You get to make a rule that lasts until the end of the game. Anyone who breaks the rule drinks.'
    },
    {
      title: 'Two Truths and a Lie',
      description: 'Say two true statements and one false statement. The group votes on which statement is the lie. If you are caught in a lie, you drink.'
    },
    {
      title: 'Questions Only',
      description: 'Players must communicate by asking each other questions. The first person to respond with a statement drinks.'
    },
    { title: 'Moose', description: 'Whenever you see someone put both hands on their head like moose antlers, you must do the same. The last person to do so drinks.' },
    {
      title: `King's Cup`,
      description: `Pour a small amount of your drink into a "King's Cup" in the center. The person who draws the last king card must drink the contents of the King's Cup.`
    },
    {
      title: 'Social',
      description: 'Everyone drinks together. Cheers!'
    },
    {
      title: 'Dance Off',
      description: 'Start a dance-off. The two worst dancers drink.'
    },
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