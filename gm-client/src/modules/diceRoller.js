// MVP 1: Dice rolling functionality

export class DiceRoller {
  constructor(socket, getRoomCode) {
    this.socket = socket;
    this.getRoomCode = getRoomCode;
    this.init();
  }

  init() {
    const rollBtn = document.getElementById('roll-btn');
    rollBtn.addEventListener('click', () => this.handleRoll());
  }

  handleRoll() {
    const diceType = document.getElementById('dice-type').value;
    const label = document.getElementById('roll-label').value || 'GM Roll';
    const roomCode = this.getRoomCode();
    const modifier = Number(document.getElementById('roll-modifier').value) || 0;
    const rawResult = this.rollDice(diceType);
    const finalResult = rawResult + modifier;

    if (!roomCode) {
      alert('Please join a room first!');
      return;
    }

    const rollData = {
      roomCode,
      roller: 'GM',
      diceType,
      result: finalResult,
      label,
      modifier,
      rawResult,
      timestamp: Date.now()
    };

    this.socket.emit('gm_roll', rollData);
    console.log('Roll sent:', rollData);

    // Added: UI feedback - assumes <div id="feedback"></div> in index.html
    const feedback = document.getElementById('feedback');
    feedback.textContent = `Rolled ${diceType}: ${rawResult} + ${modifier} = ${finalResult} (${label})`;
  }

  rollDice(diceType) {
    const sides = parseInt(diceType.substring(1));
    return Math.floor(Math.random() * sides) + 1;
  }
}