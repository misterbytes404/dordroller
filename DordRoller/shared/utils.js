// Shared utility functions

export function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function rollDice(diceType) {
  const sides = parseInt(diceType.replace('d', ''));
  if (isNaN(sides) || sides < 1) {
    throw new Error('Invalid dice type');
  }
  return Math.floor(Math.random() * sides) + 1;
}

export function validateRoomCode(code) {
  return /^[A-Z0-9]{4,8}$/.test(code);
}

export function formatTimestamp(timestamp) {
  return new Date(timestamp).toLocaleTimeString();
}
