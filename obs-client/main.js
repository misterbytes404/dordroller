// OBS Client - Lightweight display for stream overlay
// This is a read-only client that listens for roll events

const socket = io('http://localhost:3000');

// Configuration - GM should set this before using
const ROOM_CODE = 'game1'; // TODO: Make this configurable via URL parameter

// Connect to room
socket.on('connect', () => {
  console.log('OBS Client connected');
  socket.emit('join_room', ROOM_CODE);
});

socket.on('room_joined', (data) => {
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
  const result = display.querySelector('.roll-result');
  const diceType = display.querySelector('.roll-dice-type');

  // Populate data
  label.textContent = rollData.label;
  result.textContent = rollData.result;
  diceType.textContent = rollData.diceType;

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

// Allow room code to be set via URL parameter
const urlParams = new URLSearchParams(window.location.search);
const roomFromUrl = urlParams.get('room');
if (roomFromUrl) {
  ROOM_CODE = roomFromUrl;
  console.log('Room code set from URL:', ROOM_CODE);
}
