import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'
import { Game } from './../../models/game';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {
  @Input() name!: string;
  @Input() i!: number;
  @Input() playerActive: boolean = false;
  game: Game;

  constructor() {
    this.game = new Game();
  }

}
