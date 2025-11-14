// Player data model for MVP 2

export class Player {
  constructor(data) {
    this.id = data.id || null;
    this.name = data.name;
    this.hp = data.hp;
    this.maxHp = data.maxHp;
    this.ac = data.ac;
    this.initiative = data.initiative || 0;
    this.roomCode = data.roomCode;
    this.socketId = data.socketId || null; // For MVP 3 player client connection
    this.notes = data.notes || '';
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      hp: this.hp,
      maxHp: this.maxHp,
      ac: this.ac,
      initiative: this.initiative,
      roomCode: this.roomCode,
      socketId: this.socketId,
      notes: this.notes
    };
  }
}
