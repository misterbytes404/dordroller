// MVP 1: Dice rolling functionality

export class DiceRoller {
  constructor(socket, getRoomCode) {
    this.socket = socket;
    this.getRoomCode = getRoomCode;
    this.init();
  }

  init() {
    // Normal Roll Button
    const rollBtn = document.getElementById('roll-btn');
    rollBtn.addEventListener('click', () => this.handleRoll('normal'));  // Normal roll

    // Advantage Roll Button
    const advBtn = document.getElementById('adv-btn');
    advBtn.addEventListener('click', () => this.handleRoll('advantage'));  // Advantage roll

    // Disadvantage Roll Button (New)
    const disadvBtn = document.getElementById('disadv-btn');
    disadvBtn.addEventListener('click', () => this.handleRoll('disadvantage'));  // Disadvantage roll
  }

  handleRoll(rollType) {
    // Determine settings based on roll type
    const isSpecial = rollType === 'advantage' || rollType === 'disadvantage';
    const quantity = isSpecial ? 1 : (Number(document.getElementById('dice-quantity').value) || 1);
    const diceType = isSpecial ? 'd20' : document.getElementById('dice-type').value;
    const label = document.getElementById('roll-label').value || (rollType === 'advantage' ? 'Advantage Roll' : rollType === 'disadvantage' ? 'Disadvantage Roll' : 'GM Roll');
    const roomCode = this.getRoomCode();
    const modifier = Number(document.getElementById('roll-modifier').value) || 0;

    if (!roomCode) {
      alert('Please join a room first!');
      return;
    }

    let individualRolls = [];
    let totalRaw = 0;

    if (rollType === 'advantage') {
      // Roll 2 d20s, keep highest
      const roll1 = this.rollDice('d20');
      const roll2 = this.rollDice('d20');
      totalRaw = Math.max(roll1, roll2);
      individualRolls = [roll1, roll2];
    } else if (rollType === 'disadvantage') {
      // Roll 2 d20s, keep lowest
      const roll1 = this.rollDice('d20');
      const roll2 = this.rollDice('d20');
      totalRaw = Math.min(roll1, roll2);
      individualRolls = [roll1, roll2];
    } else {
      // Normal roll
      for (let i = 0; i < quantity; i++) {
        const roll = this.rollDice(diceType);
        individualRolls.push(roll);
        totalRaw += roll;
      }
    }

    const finalResult = totalRaw + modifier;

    const rollData = {
      roomCode,
      roller: 'GM',
      diceType,
      quantity: isSpecial ? 2 : quantity,
      result: finalResult,
      label,
      modifier,
      rawResult: totalRaw,
      individualRolls,
      rollType,
      timestamp: Date.now()
    };

    this.socket.emit('gm_roll', rollData);
    console.log('Roll sent:', rollData);

    // UI Feedback
    const feedback = document.getElementById('feedback');
    const typeText = rollType === 'advantage' ? 'Advantage (2d20 keep highest)' : rollType === 'disadvantage' ? 'Disadvantage (2d20 keep lowest)' : `${quantity}x ${diceType}`;
    feedback.textContent = `Rolled ${typeText}: [${individualRolls.join(', ')}] + ${modifier} = ${finalResult} (${label})`;
  }

  rollDice(diceType) {
    const sides = parseInt(diceType.substring(1));
    return Math.floor(Math.random() * sides) + 1;
  }
}