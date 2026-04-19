import { useState, useEffect } from 'react';
import { Seat } from './Seat';

interface SeatData {
  id: string;
  row: string;
  number: number;
  status: 'available' | 'selected' | 'sold' | 'held';
  price: number;
}

interface SeatMapProps {
  onSeatSelect: (seat: SeatData) => void;
  selectedSeats: SeatData[];
}

export function SeatMap({ onSeatSelect, selectedSeats }: SeatMapProps) {
  const [seats, setSeats] = useState<SeatData[]>([]);

  useEffect(() => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const seatsPerRow = 12;
    const initialSeats: SeatData[] = [];

    rows.forEach((row) => {
      for (let i = 1; i <= seatsPerRow; i++) {
        const random = Math.random();
        let status: SeatData['status'] = 'available';

        if (random < 0.15) {
          status = 'sold';
        } else if (random < 0.20) {
          status = 'held';
        }

        initialSeats.push({
          id: `${row}${i}`,
          row,
          number: i,
          status,
          price: row <= 'C' ? 150 : row <= 'F' ? 100 : 75,
        });
      }
    });

    setSeats(initialSeats);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeats((currentSeats) => {
        const newSeats = [...currentSeats];
        const heldSeats = newSeats.filter((s) => s.status === 'held');

        heldSeats.forEach((seat) => {
          if (Math.random() < 0.3) {
            const index = newSeats.findIndex((s) => s.id === seat.id);
            if (index !== -1) {
              newSeats[index] = { ...seat, status: 'available' };
            }
          }
        });

        const availableSeats = newSeats.filter((s) => s.status === 'available');
        if (availableSeats.length > 0 && Math.random() < 0.4) {
          const randomIndex = Math.floor(Math.random() * availableSeats.length);
          const seatIndex = newSeats.findIndex((s) => s.id === availableSeats[randomIndex].id);
          if (seatIndex !== -1) {
            newSeats[seatIndex] = { ...newSeats[seatIndex], status: 'held' };
          }
        }

        return newSeats;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleSeatClick = (seat: SeatData) => {
    if (seat.status === 'available' || seat.status === 'selected') {
      onSeatSelect(seat);
    }
  };

  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <div className="w-full max-w-2xl h-12 bg-gradient-to-b from-gray-800 to-gray-700 rounded-lg flex items-center justify-center text-white text-sm font-medium shadow-lg">
        STAGE
      </div>

      <div className="flex flex-col gap-3">
        {rows.map((row) => (
          <div key={row} className="flex items-center gap-2">
            <div className="w-8 text-right text-sm font-medium text-gray-600">{row}</div>
            <div className="flex gap-1.5">
              {seats
                .filter((s) => s.row === row)
                .map((seat) => {
                  const isSelected = selectedSeats.some((s) => s.id === seat.id);
                  return (
                    <Seat
                      key={seat.id}
                      seat={{ ...seat, status: isSelected ? 'selected' : seat.status }}
                      onClick={() => handleSeatClick(seat)}
                    />
                  );
                })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white border-2 border-gray-300 rounded"></div>
          <span className="text-sm text-gray-600">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-500 rounded"></div>
          <span className="text-sm text-gray-600">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-orange-500 rounded animate-pulse"></div>
          <span className="text-sm text-gray-600">Held by Others</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-700 rounded"></div>
          <span className="text-sm text-gray-600">Sold</span>
        </div>
      </div>
    </div>
  );
}
