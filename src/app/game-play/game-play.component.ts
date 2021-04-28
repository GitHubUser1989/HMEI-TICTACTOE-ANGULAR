import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.css']
})
export class GamePlayComponent implements OnInit {

  constructor(private router: Router, private renderer:Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.buildBoard();
      this.loadPlayers();
    }, 0);
  }

  Game: any = {
    newBoard: function(n) {
      // Létrehoz egy új n x n méretű táblát és megjelöli őket: '.'
      this.board = new Array(n);
      for (var i = 0; i < this.board.length; i++) {
        this.board[i] = new Array(n).fill('.');
      }
      // Értékek alaphelyzetbe állítása
      this.finish = false;
      this.lastPlayer = 'undefined';
    },
    winCount: function(n) {
      this.countWin = n;
    },
    addMark: function(playerChosen, row, col) { // Cellák megjelölése
      this.board[row][col] = playerChosen;
      this["lastPlayer"] = playerChosen;
    },
    checkRows: function(playerChosen) { // Sorok ellenőrzése
      for (var row = 0; row < this.board.length; row++) {
        var count = 0;
        this.winArray = [];
        for (var col = 0; col < this.board.length; col++) {
          if (this.board[row][col] === playerChosen) {
            count++;
            this.winArray.push(Array(row, col));
          } else {
            count = 0;
            this.winArray = [];
          }
          if (count === this.countWin) {
            this["finish"] = true;
            return true;
          }
        }
      }
    },
    checkCols: function(playerChosen) { // Oszlopok ellenőrzése
      for (var col = 0; col < this.board.length; col++) {
        var count = 0;
        this.winArray = [];
        for (var row = 0; row < this.board.length; row++) {
          if (this.board[row][col] === playerChosen) {
            count++;
            this.winArray.push(Array(row, col));
          } else {
            count = 0;
            this.winArray = [];
          }
          if (count === this.countWin) {
            this["finish"] = true;
            return true;
          }
        }
      }
    },
    checkDiagLR: function(playerChosen) { // Átlók ellenőrzése (bal felsőtől jobb alsóig) (középpel együtt)
      var count = 0;
      var length = this.board.length;
      this.winArray = [];
      var maxLength = length - this.countWin + 1;
      for (var rowStart = 0; rowStart < maxLength; rowStart++) {
        for (var row = rowStart, col = 0; row < length && col < length; row++, col++) {
          if (this.board[row][col] === playerChosen) {
            count++;
            this.winArray.push(Array(row, col));
          } else {
            count = 0;
            this.winArray = [];
          }
          if (count === this.countWin) {
            this["finish"] = true;
            return true;
          }
        }
      }
      // Átlók ellenőrzése (bal felsőtől jobb alsóig) (közép kizárva)
      for (var colStart = 1; colStart < maxLength; colStart++) {
        for (var col = colStart, row = 0; col < length && row < length; col++, row++) {
          if (this.board[row][col] === playerChosen) {
            count++;
            this.winArray.push(Array(row, col));
          } else {
            count = 0;
            this.winArray = [];
          }
          if (count === this.countWin) {
            this["finish"] = true;
            return true;
          }
        }
      }
    },
    checkDiagRL: function(playerChosen) { // Átlók ellenőrzése (fordított írány)
      var count = 0;
      var length = this.board.length;
      var maxLength = length - this.countWin + 1;
      this.winArray = [];
      for (var rowStart = 0; rowStart < maxLength; rowStart++) {
        for (var row = rowStart, col = (length - 1); row < length && col >= 0; row++, col--) {
          if (this.board[row][col] === playerChosen) {
            count++;
            this.winArray.push(Array(row, col));
          } else {
            count = 0;
            this.winArray = [];
          }
          if (count === this.countWin) {
            this["finish"] = true;
            return true;
          }
        }
      }
      for (var colStart = (length - 2); colStart > (this.countWin - 2); colStart--) {
        for (var col = colStart, row = 0; col >= 0 && row <= (length - 2);
          (col-- && row++)) {
          if (this.board[row][col] === playerChosen) {
            count++;
            this.winArray.push(Array(row, col));
          } else {
            count = 0;
            this.winArray = [];
          }
          if (count === this.countWin) {
            this["finish"] = true;
            return true;
          }
        }
      }
    },
    isEmpty: function() { // Üres-e a tábla?
      var check = true;
      for (var i = 0; i < this.board.length; i++) {
        if (this.board[i].includes('.')) {
          return false;
        }
      }
      return check;
    },
    checkAll: function(playerChosen) { // Leellenőriz minden irányt
      if (this.checkRows(playerChosen)) {
        return true;
      }
      if (this.checkCols(playerChosen)) {
        return true;
      }
      if (this.checkDiagLR(playerChosen)) {
        return true;
      }
      if (this.checkDiagRL(playerChosen)) {
        return true;
      }
    }
  };

  count = 0;
  draw = false;
  players = parseInt(localStorage.getItem("Players"));
  playerArray = [];

  playerName1 = localStorage.getItem("PlayerName1")
  playerName2 = localStorage.getItem("PlayerName2");
  playerName3 = localStorage.getItem("PlayerName3");
  playerName4 = localStorage.getItem("PlayerName4");

  player1Sign = localStorage.getItem("Player1Sign");
  player2Sign = localStorage.getItem("Player2Sign");
  player3Sign = localStorage.getItem("Player3Sign");
  player4Sign = localStorage.getItem("Player4Sign");

  player1Score = JSON.parse(localStorage.getItem("Player1Sscore"));
  player2Score = JSON.parse(localStorage.getItem("Player2Sscore"));
  player3Score = JSON.parse(localStorage.getItem("Player3Sscore"));
  player4Score = JSON.parse(localStorage.getItem("Player4Sscore"));

  nextPlayer = this.playerName1;
  selectedPlayer = "player1";
  selectedSign;
  size = JSON.parse(localStorage.getItem("Size"));
  startArray = [this.playerName1, this.playerName2, this.playerName3, this.playerName4];
  winCount = JSON.parse(localStorage.getItem("Signs"));
  winnerPlayer;


  @ViewChild('cell') cell: ElementRef;
  @ViewChild('container') container: ElementRef;

  // Új tábla
  buildBoard = function() {
    this.Game.newBoard(this.size);
    this.Game.winCount(this.winCount);
    var dimension = (100 / this.size) + '%';
    var count = 0;
    // Cellák létrehozása, attribútumok hozzáadása
    for (var row = 0; row < this.size; row++) {
      for (var col = 0; col < this.size; col++) {
        count++;
        const content = this.renderer.createElement("div");
        const text = this.renderer.createText(count);
        this.renderer.appendChild(content, text);
        this.renderer.appendChild(content, text);
        content.classList.add("cell");
        content.setAttribute("row", row);
        content.setAttribute("col", col);
        content.setAttribute("style",  "height:"+dimension+";width:"+ dimension);
        this.renderer.listen(content, "click", (event) => {
          this.takeMove(content);
        });
        this.renderer.appendChild(this.container.nativeElement, content);
      }
    }
    return true;
  };

  // Aktuális és következő játékosok kiválasztása
  pickPlayer() {
    if (this.count == this.players-1) {
      this.count = 0;
      this.selectedPlayer = "player"+this.players;
      this.nextPlayer = this.playerArray[0];
    }
    else{
      this.selectedPlayer = "player"+(this.count+1);
      this.nextPlayer = this.playerArray[(this.count+1)];
      this.count++;
    }
  };

  // Játékosok másolása
  loadPlayers() {
    for (let index = 0; index < this.players; index++) {
      this.playerArray.push(this.startArray[index]);
    }
  };

  // Jelek társítása
  assignSigns(element) {
    switch (this.selectedPlayer) {
      case "player1":
        element.classList.add(this.player1Sign);
        break;
      case "player2":
          element.classList.add(this.player2Sign);
          break;
      case "player3":
          element.classList.add(this.player3Sign);
          break;
      case "player4":
          element.classList.add(this.player4Sign);
          break;
    }
  }

  // Lépések
  takeMove(element)
  {
    if (!element.classList.contains('player1') &&
        !element.classList.contains('player2') &&
        !element.classList.contains('player3') &&
        !element.classList.contains('player4')) {
      this.pickPlayer();
      this.Game.addMark(this.selectedPlayer, element.attributes['row'].value, element.attributes['col'].value);
      this.Game.checkAll(this.selectedPlayer);
      element.classList.add(this.selectedPlayer);
      this.assignSigns(element);
      this.checkGame();
    }
  }

  // Eredmény ellenőrzése
  checkGame() {
    if (this.Game.finish && this.Game.lastPlayer === 'player1') {
      this.player1Score++;
      localStorage.setItem("Player1Sscore", this.player1Score.toString());
      this.winnerPlayer = this.playerName1;
    } else if (this.Game.finish && this.Game.lastPlayer === 'player2') {
      this.player2Score++;
      localStorage.setItem("Player2Sscore", this.player2Score.toString());
      this.winnerPlayer = this.playerName2;
    } else if (this.Game.finish && this.Game.lastPlayer === 'player3') {
      this.player3Score++;
      localStorage.setItem("Player3Sscore", this.player3Score.toString());
      this.winnerPlayer = this.playerName3;
    } else if (this.Game.finish && this.Game.lastPlayer === 'player4') {
      this.player4Score++;
      localStorage.setItem("Player4Sscore", this.player4Score.toString());
      this.winnerPlayer = this.playerName4;
    } else if (this.Game.isEmpty() && !this.Game.finish) {
      this.draw = true;
    }
  }

  // Új kör
  newGame() {
    window.location.reload();
  }

  // Vissza a beállításokhoz
  restart() {
    localStorage.clear();
    this.router.navigate(["/game-setup"]);
  }
}
