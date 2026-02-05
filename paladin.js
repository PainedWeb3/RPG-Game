class Paladin extends Character {
  constructor(name) {
    super(name, "Paladin", 95, 12, 80);
  }

  specialAttack(target) {
    if (this.mana >= 30) {
      this.mana -= 30;
      const heal = 25;
      this.heal(heal);
      return `${this} casts **Holy Light** → heals self for ${heal} HP`;
    } else {
      return this.basicAttackMsg(target);
    }
  }

  basicAttackMsg(target) {
    target.takeDamage(this.baseDamage);
    return `${this} attacks ${target} for ${this.baseDamage} damage`;
  }
}