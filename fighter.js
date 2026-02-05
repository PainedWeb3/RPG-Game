class Fighter extends Character {
  constructor(name) {
    super(name, "Fighter", 80, 18);
  }

  specialAttack(target) {
    // Power Strike – strong single hit
    const dmg = this.baseDamage * 2.2;
    target.takeDamage(Math.round(dmg));
    return `${this} uses **Power Strike** → ${target} takes ${Math.round(dmg)} damage!`;
  }
}