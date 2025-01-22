import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [guestName, setGuestName] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/rooms')
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }, []);

  const handleReserve = () => {
    fetch('http://localhost:5000/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomId: selectedRoom, guestName }),
    })
      .then((res) => res.json())
      .then(() => {
        setRooms((prev) =>
          prev.map((room) =>
            room.id === selectedRoom
              ? { ...room, available: false, reservedBy: guestName }
              : room
          )
        );
        setTimeout(() => {
          setGuestName('');
          setSelectedRoom(null);
        }, 300);
      });
  };  

  return (
    <div className="App">
      <h1>Sistema de Reservas</h1>
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            {room.name} -{' '}
            {room.available
              ? 'Disponível'
              : `Reservado por ${room.reservedBy || 'Desconhecido'}`}
            {room.available && (
              <button onClick={() => setSelectedRoom(room.id)}>
                Reservar
              </button>
            )}
          </li>
        ))}
      </ul>
      {selectedRoom && (
        <div>
          <h2>Fazer Reserva</h2>
          <input
            type="text"
            placeholder="Nome do Hóspede"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
          />
          <button onClick={handleReserve}>Confirmar</button>
        </div>
      )}
    </div>
  );
}

export default App;
