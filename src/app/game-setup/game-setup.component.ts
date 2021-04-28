import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-setup',
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.css']
})
export class GameSetupComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  players: number = 2;

  playerName1;
  playerName2;
  playerName3;
  playerName4;

  player1Sign: string = "ex-sign";
  player2Sign: string = "ex-sign";
  player3Sign: string = "ex-sign";
  player4Sign: string = "ex-sign";

  signs: number = 3;
  size: number = 5;

  boardSize = [
    { name: "5x5", value: 5 },
    { name: "6x6", value: 6 },
    { name: "7x7", value: 7 },
    { name: "8x8", value: 8 },
    { name: "9x9", value: 9 },
    { name: "10x10", value: 10 }
  ]

  numberOfPlayers = [
    { name: "2", value: 2 },
    { name: "3", value: 3 },
    { name: "4", value: 4 },
  ]

  signsInARow = [
    { name: "3", value: 3 },
    { name: "4", value: 4 },
    { name: "5", value: 5 },
  ]

  signsToChoose = [
    { name: "Iksz", value: "ex-sign" },
    { name: "Kör", value: "circle-sign" },
    { name: "Négyzet", value: "square-sign" },
    { name: "Háromszög", value: "triangle-sign" },
  ]

  selectBoardSize(value: number) {
    this.size = value;
  }

  selectNumOfPlayers(value: number) {
    this.players = value;
  }

  selectPlayer1Sign(value: string) {
    this.player1Sign = value;
  }

  selectPlayer2Sign(value: string) {
    this.player2Sign = value;
  }

  selectPlayer3Sign(value: string) {
    this.player3Sign = value;
  }

  selectPlayer4Sign(value: string) {
    this.player4Sign = value;
  }

  selectSignsInARow(value: number) {
    this.signs = value;
  }


  assignNames() {
    var players = [this.playerName1, this.playerName2, this.playerName3, this.playerName4];
    for (let index = 0; index < players.length; index++) {
      const element = players[index];
      let number = index+1;
      if (element == undefined) {
        localStorage.setItem("PlayerName"+number, "Játékos "+number);
      }
      else {
        localStorage.setItem("PlayerName"+number, element);
      }
    }
  }

  storeData() {
    localStorage.setItem("Player1Sign", this.player1Sign.toString());
    localStorage.setItem("Player2Sign", this.player2Sign.toString());
    localStorage.setItem("Player3Sign", this.player3Sign.toString());
    localStorage.setItem("Player4Sign", this.player4Sign.toString());
    localStorage.setItem("Player1Sscore", "0");
    localStorage.setItem("Player2Sscore", "0");
    localStorage.setItem("Player3Sscore", "0");
    localStorage.setItem("Player4Sscore", "0");
    localStorage.setItem("Size", this.size.toString());
    localStorage.setItem("Signs", this.signs.toString());
    localStorage.setItem("Players", this.players.toString());
  }

  start() {
    this.assignNames();
    this.storeData();
    this.router.navigate(["/game-play"]);
  }
}
