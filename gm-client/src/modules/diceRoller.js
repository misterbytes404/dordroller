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

    // Advantage/Disadvantage Mutually Exclusive
    const advantage = document.getElementById('advantage');
    const disadvantage = document.getElementById('disadvantage');
    advantage.addEventListener('change', () => {
      if (advantage.checked) disadvantage.checked = false;
    });
    disadvantage.addEventListener('change', () => {
      if (disadvantage.checked) advantage.checked = false;
    });
  }

  handleRoll() {
    const quantity = Number(document.getElementById('dice-quantity').value) || 1;
    const diceType = document.getElementById('dice-type').value;
    const label = document.getElementById('roll-label').value || 'GM Roll';
    const roomCode = this.getRoomCode();
    const modifier = Number(document.getElementById('roll-modifier').value) || 0;
    const advantage = document.getElementById('advantage').checked;
    const disadvantage = document.getElementById('disadvantage').checked;


    if (!roomCode) {
      alert('Please join a room first!');
      return;4
    }

    // Roll Logic
    let individualRolls = [];
    let totalRaw = 0;
    let rollSets = [];

    if (advantage || disadvantage) {
      // Roll Twice
      const rolls1 = [];
      const rolls2 = [];
      for (let i = 0; i < quantity; i++) {
        rolls1.push(this.rollDice(diceType));
        rolls2.push(this.rollDice(diceType));
      }
      const sum1 = rolls1.reduce((a, b) => a + b, 0);
      const sum2 = rolls2.reduce((a, b) => a + b, 0);
      rollSets = [rolls1, rolls2];
      totalRaw = advantage ? Math.max(sum1, sum2) : Math.min(sum1, sum2);
      individualRolls = advantage ? (sum1 >= sum2 ? rolls1 : rolls2) : (sum1 <= sum2 ? rolls1 :rolls2);
    } else {
      // Normal Roll
      for (let i = 0; i < quantity; i++) {
        const roll = this.rollDice(diceType);
        individualRolls.push(roll);
        totalRaw += (roll);
      }
      rollSets = [individualRolls];
    }

    const finalResult = totalRaw + modifier;

    const rollData = {
      roomCode,
      roller: 'GM',
      diceType,
      quantity,
      result: finalResult,
      label,
      modifier,
      rawResult: totalRaw,
      individualRolls,
      rollSets,
      advantage,
      disadvantage,
      timestamp: Date.now()
    };

    this.socket.emit('gm_roll', rollData);
    console.log('Roll sent:', rollData);

    // Added: UI feedback - assumes <div id="feedback"></div> in index.html
    const optionText = advantage ? ' with Advantage' : disadvantage ? ' with Disadvantage' : '';
    const feedback = document.getElementById('feedback');
    feedback.textContent = `Rolled ${quantity}x ${diceType}${optionText}: [${individualRolls.join(', ')}] + ${modifier} = ${finalResult} (${label})`;
  }

  rollDice(diceType) {
    const sides = parseInt(diceType.substring(1));
    return Math.floor(Math.random() * sides) + 1;
  }
}