class Monk extends Character {
  constructor(name) {
    super(name, "Monk", 65, 15);
  }

  specialAttack(target) {
    // 40% chance to do double damage, otherwise normal + small heal
    if (Math.random() < 0.4) {
      const dmg = this.baseDamage * 2;
      target.takeDamage(dmg);
      return `${this} unleashes **Flurry of Blows** → ${target} takes ${dmg} damage!`;
    } else {
      this.heal(8);
      target.takeDamage(this.baseDamage);
      return `${this} uses **Focused Strike** → ${target} takes ${this.baseDamage} damage • Monk heals 8`;
    }
  }
}