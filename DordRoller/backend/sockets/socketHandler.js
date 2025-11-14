// Central socket event handler

export const setupSocketHandlers = (io) => {
  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Room management
    socket.on('join_room', (roomCode) => {
      socket.join(roomCode);
      console.log(`Socket ${socket.id} joined room: ${roomCode}`);
      socket.emit('room_joined', { roomCode });
    });

    // GM roll events (MVP 1)
    socket.on('gm_roll', (rollData) => {
      console.log('GM roll:', rollData);
      // Broadcast to room (especially OBS client)
      io.to(rollData.roomCode).emit('broadcast_roll', rollData);
    });

    // Player roll assignment (MVP 3)
    socket.on('assign_roll', (assignmentData) => {
      // Implementation pending
    });

    // Player roll response (MVP 3)
    socket.on('player_roll_result', (resultData) => {
      // Implementation pending
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};

export default setupSocketHandlers;
