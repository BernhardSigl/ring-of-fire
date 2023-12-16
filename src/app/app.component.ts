import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { GameComponent } from './game/game.component';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    StartScreenComponent,
    GameComponent,
    // MatButtonModule,
    // MatIconModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

// export class AppModule { }

export class AppComponent {
  title = 'ringOfFire';
}
