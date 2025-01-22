const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

const rooms = [
  { id: 1, name: 'Quarto Solteiro', available: true, reservedBy: null },
  { id: 2, name: 'Quarto Casal', available: true, reservedBy: null },
  { id: 3, name: 'Quarto Suite', available: true, reservedBy: null },
  { id: 4, name: 'Quarto Cobertura', available: true, reservedBy: null },
];

app.get('/rooms', (req, res) => {
  res.json(rooms);
});

app.post('/reservations', (req, res) => {
  const { roomId, guestName } = req.body;
  const room = rooms.find((r) => r.id === roomId && r.available);
  if (!room) return res.status(400).json({ error: 'Room not available' });
  room.available = false;
  room.reservedBy = guestName;
  res.status(201).json({ message: 'Reservation created' });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
