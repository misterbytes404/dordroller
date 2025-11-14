import { io } from 'socket.io-client';
import { DiceRoller } from './modules/diceRoller.js';
import { MonsterTracker } from './modules/monsterTracker.js';
import { PlayerTracker } from './modules/playerTracker.js';

// Initialize socket connection
const socket = io('http://localhost:3000');

// State
let currentRoom = null;

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

// Room management
document.getElementById('join-room-btn').addEventListener('click', () => {
  const roomCode = document.getElementById('room-code').value.trim();
  if (roomCode) {
    socket.emit('join_room', roomCode);
    currentRoom = roomCode;
  }
});

socket.on('room_joined', (data) => {
  console.log('Joined room:', data.roomCode);
  alert(`Joined room: ${data.roomCode}`);
});

// Initialize modules
const diceRoller = new DiceRoller(socket, () => currentRoom);
const monsterTracker = new MonsterTracker();
const playerTracker = new PlayerTracker();
