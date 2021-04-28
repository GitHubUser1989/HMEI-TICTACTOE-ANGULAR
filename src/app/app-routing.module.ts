import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameSetupComponent } from './game-setup/game-setup.component';
import { GamePlayComponent } from './game-play/game-play.component';

const routes: Routes=[
  {path: "", redirectTo: "game-setup", pathMatch: 'full'},
  {path: "game-setup", component: GameSetupComponent},
  {path: "game-play", component: GamePlayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
