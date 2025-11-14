import { io } from 'socket.io-client';

// Initialize socket connection
const socket = io('http://localhost:3000');

// State
let playerName = '';
let currentRoom = null;
let currentRollRequest = null;

// Connection status
socket.on('connect', () => {
  console.log('Connected to server');
  document.getElementById('connection-status').textContent = 'Connected';
  document.getElementById('connection-status').style.color = '#00ff00';
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
  document.getElementById('connection-status').textContent = 'Disconnected';
  document.getElementById('connection-status').style.color = '#ff0000';
});

// Join room
document.getElementById('join-btn').addEventListener('click', () => {
  const roomCode = document.getElementById('room-code').value.trim();
  const name = document.getElementById('player-name').value.trim();

  if (roomCode && name) {
    playerName = name;
    currentRoom = roomCode;
    socket.emit('join_room', roomCode);
  } else {
    alert('Please enter both room code and your name!');
  }
});

socket.on('room_joined', (data) => {
  console.log('Joined room:', data.roomCode);
  document.getElementById('join-section').style.display = 'none';
  document.getElementById('roll-section').style.display = 'block';
  alert(`Welcome, ${playerName}!`);
});

// Listen for roll assignments (MVP 3)
socket.on('assign_roll', (rollRequest) => {
  console.log('Roll request received:', rollRequest);
  currentRollRequest = rollRequest;
  
  document.getElementById('request-text').textContent = 
    `GM requests: ${rollRequest.label} (${rollRequest.diceType})`;
  document.getElementById('execute-roll-btn').style.display = 'block';
});

// Execute the assigned roll
document.getElementById('execute-roll-btn').addEventListener('click', () => {
  if (!currentRollRequest) return;

  const sides = parseInt(currentRollRequest.diceType.substring(1));
  const result = Math.floor(Math.random() * sides) + 1;

  const rollResult = {
    roomCode: currentRoom,
    playerName,
    diceType: currentRollRequest.diceType,
    result,
    label: currentRollRequest.label,
    timestamp: Date.now()
  };

  socket.emit('player_roll_result', rollResult);
  
  document.getElementById('result-display').textContent = 
    `You rolled: ${result}`;
  document.getElementById('execute-roll-btn').style.display = 'none';
  
  console.log('Roll result sent:', rollResult);
});
