const Game = {
  characters: [],
  turn: 0,
  maxTurns: 10,
  logElement: null,
  partyElement: null,

  init() {
    this.logElement = document.getElementById("log");
    this.partyElement = document.getElementById("party");
    document.getElementById("startBtn").onclick = () => this.startGame();
    document.getElementById("nextTurnBtn").onclick = () => this.nextTurn();
  },

  log(message) {
    const p = document.createElement("p");
    p.innerHTML = `[Turn ${this.turn}] ${message}`;
    this.logElement.appendChild(p);
    this.logElement.scrollTop = this.logElement.scrollHeight;
  },

  startGame() {
    this.characters = [];
    this.turn = 0;
    this.logElement.innerHTML = "";
    this.log("New battle begins...");

    const names = ["Aria", "Kael", "Sylas", "Luna", "Draven", "Mira", "Thorne", "Elara", "Riven", "Zara"];
    const classes = [Fighter, Paladin, Monk, Wizard, Assassin];

    // Random 5 characters
    for (let i = 0; i < 5; i++) {
      const randomClass = classes[Math.floor(Math.random() * classes.length)];
      const randomName = names[Math.floor(Math.random() * names.length)];
      const char = new randomClass(`${randomName} ${i+1}`);
      this.characters.push(char);
    }

    this.renderParty();
    document.getElementById("startBtn").disabled = true;
    document.getElementById("nextTurnBtn").disabled = false;
    this.log("Five fighters enter the arena...");
  },

  renderParty() {
    this.partyElement.innerHTML = "";
    this.characters.forEach(char => {
      const div = document.createElement("div");
      div.className = `card ${!char.isAlive() ? "dead" : ""}`;
      div.setAttribute("data-class", char.className);

      const hpPercent = (char.hp / char.maxHp) * 100;
      const mpPercent = char.maxMana > 0 ? (char.mana / char.maxMana) * 100 : 0;

      div.innerHTML = `
        <div class="name">${char.name}</div>
        <div class="hp-bar"><div class="hp-fill" style="width:${hpPercent}%"></div></div>
        <div class="stats">HP: ${char.hp}/${char.maxHp}</div>
        ${char.maxMana > 0 ? `
          <div class="mp-bar"><div class="mp-fill" style="width:${mpPercent}%"></div></div>
          <div class="stats">Mana: ${char.mana}/${char.maxMana}</div>
        ` : ''}
      `;

      if (this.turn > 0 && char.isAlive()) div.classList.add("highlight");

      this.partyElement.appendChild(div);
    });
  },

  nextTurn() {
    this.turn++;
    this.log(`──── Turn ${this.turn} ────`);

    // Filter only living characters
    const alive = this.characters.filter(c => c.isAlive());

    if (alive.length <= 1) {
      this.endGame(alive);
      return;
    }

    if (this.turn > this.maxTurns) {
      this.endGame(alive);
      return;
    }

    // Everyone acts (simple AI for now)
    alive.forEach(attacker => {
      if (!attacker.isAlive()) return;

      // Choose target: lowest HP (prioritize killing blow)
      const possibleTargets = alive.filter(c => c !== attacker && c.isAlive());
      if (possibleTargets.length === 0) return;

      possibleTargets.sort((a,b) => a.hp - b.hp);
      const target = possibleTargets[0];

      // 40% chance to use special, else basic
      const useSpecial = Math.random() < 0.4;

      let message;
      if (useSpecial) {
        message = attacker.specialAttack(target);
      } else {
        attacker.basicAttack(target);
        message = `${attacker} attacks ${target} for ${attacker.baseDamage} damage`;
      }

      this.log(message);

      // Clean dead characters visually
      if (!target.isAlive()) {
        this.log(`☠ ${target} has been defeated!`);
      }
    });

    this.renderParty();

    // Check win condition after full turn
    const stillAlive = this.characters.filter(c => c.isAlive());
    if (stillAlive.length <= 1) {
      this.endGame(stillAlive);
    }
  },

  endGame(alive) {
    document.getElementById("nextTurnBtn").disabled = true;
    if (alive.length === 1) {
      this.log(`🏆 <b>${alive[0].name} (${alive[0].className}) wins!</b>`);
    } else if (alive.length > 1) {
      const winner = alive.reduce((max, c) => c.hp > max.hp ? c : max, alive[0]);
      this.log(`Time's up! <b>${winner.name} (${winner.className}) wins with most HP!</b>`);
    } else {
      this.log("Everyone died... somehow.");
    }
    document.getElementById("startBtn").disabled = false;
  }
};

window.onload = () => Game.init();