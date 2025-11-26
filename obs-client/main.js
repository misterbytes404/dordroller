// OBS Client - Lightweight display for stream overlay
// This is a read-only client that listens for roll events

// Allow room code to be set via URL parameter first
const urlParams = new URLSearchParams(window.location.search);
const roomFromUrl = urlParams.get('room');
let ROOM_CODE = 'game1'; // Default
if (roomFromUrl) {
  ROOM_CODE = roomFromUrl;
  console.log('Room code set from URL:', ROOM_CODE);
}

const socket = io(window.location.origin);

// Connect to room
socket.on('connect', () => {
  console.log('OBS Client connected');
  socket.emit('join_room', ROOM_CODE);
});

socket.on('joined_room', (data) => {
  console.log('OBS Client joined room:', data.roomCode);
});

// Listen for roll broadcasts
socket.on('broadcast_roll', (rollData) => {
  console.log('Roll received:', rollData);
  displayRoll(rollData);
});

function displayRoll(rollData) {
  const display = document.getElementById('roll-display');
  const label = display.querySelector('.roll-label');
  const largeResult = document.getElementById('large-result');
  const rollDetails = document.getElementById('roll-details');

  // Populate data
  label.textContent = rollData.label;
  largeResult.textContent = rollData.result; // Final Result displayed in large font
  const rollsText = rollData.individualRolls.join(' + ');
  const modifierText = rollData.modifier !== 0 ? ` + ${rollData.modifier}` : '';

  // Debug logging
  console.log('rollData.result:', rollData.result, typeof rollData.result);
  console.log('rollsText:', rollsText);
  console.log('modifier.Text:', modifierText);

  rollDetails.textContent = `Rolled ${rollData.quantity}x ${rollData.diceType}: [${rollData.individualRolls.join(', ')}]${modifierText}`;

  // Debug logging
  console.log('largeResult.textContent set to:', largeResult ? largeResult.textContent : 'null');
  console.log('rollDetails.textContent set to:', rollDetails ? rollDetails.textContent : 'null');


  // Show with animation
  display.classList.remove('hidden');
  display.classList.add('show');

  // Auto-hide after 5 seconds
  setTimeout(() => {
    display.classList.remove('show');
    display.classList.add('hide');
    
    setTimeout(() => {
      display.classList.add('hidden');
      display.classList.remove('hide');
    }, 500);
  }, 5000);
}