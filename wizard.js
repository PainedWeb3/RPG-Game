class Wizard extends Character {
  constructor(name) {
    super(name, "Wizard", 10, 2, 200);
  }

  specialAttack(target) {
    if (this.mana >= 25) {
      this.mana -= 25;
      target.takeDamage(7);
      return `${this} casts **Fireball** → ${target} takes 7 damage!`;
    } else {
      target.takeDamage(this.baseDamage);
      return `${this} weakly attacks ${target} for ${this.baseDamage}`;
    }
  }
}