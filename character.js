class Character {
  constructor(name, className, maxHp, baseDamage, maxMana = 0) {
    this.name = name;
    this.className = className;
    this.maxHp = maxHp;
    this.hp = maxHp;
    this.baseDamage = baseDamage;
    this.maxMana = maxMana;
    this.mana = maxMana;
    this.alive = true;
  }

  isAlive() {
    return this.alive && this.hp > 0;
  }

  takeDamage(amount) {
    this.hp = Math.max(0, this.hp - amount);
    if (this.hp <= 0) this.alive = false;
  }

  heal(amount) {
    this.hp = Math.min(this.maxHp, this.hp + amount);
  }

  // Must be overridden
  specialAttack(target) {
    throw new Error("specialAttack must be implemented");
  }

  // Can be overridden
  basicAttack(target) {
    target.takeDamage(this.baseDamage);
  }

  toString() {
    return `${this.name} (${this.className})`;
  }
}