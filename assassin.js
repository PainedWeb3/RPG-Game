class Assassin extends Character {
  constructor(name) {
    super(name, "Assassin", 55, 14);
  }

  specialAttack(target) {
    const critChance = 0.35;
    if (Math.random() < critChance) {
      const dmg = Math.round(this.baseDamage * 3.2);
      target.takeDamage(dmg);
      return `${this} lands a **Critical Backstab** → ${target} takes ${dmg} damage!`;
    } else {
      target.takeDamage(this.baseDamage + 6);
      return `${this} uses **Poisoned Blade** → ${target} takes ${this.baseDamage + 6} damage`;
    }
  }
}