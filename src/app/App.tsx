import { useState } from 'react';
import { SeatMap } from './components/SeatMap';
import { BookingSummary } from './components/BookingSummary';
import { Ticket } from 'lucide-react';

interface SeatData {
  id: string;
  row: string;
  number: number;
  status: 'available' | 'selected' | 'sold' | 'held';
  price: number;
}

export default function App() {
  const [selectedSeats, setSelectedSeats] = useState<SeatData[]>([]);

  const handleSeatSelect = (seat: SeatData) => {
    setSelectedSeats((current) => {
      const isAlreadySelected = current.some((s) => s.id === seat.id);
      if (isAlreadySelected) {
        return current.filter((s) => s.id !== seat.id);
      } else {
        return [...current, seat];
      }
    });
  };

  const handleCheckout = () => {
    if (selectedSeats.length > 0) {
      alert(`Successfully secured ${selectedSeats.length} seat(s)!\nSeats: ${selectedSeats.map(s => s.id).join(', ')}\nTotal: $${(selectedSeats.reduce((sum, s) => sum + s.price, 0) * 1.15).toFixed(2)}`);
      setSelectedSeats([]);
    }
  };

  return (
    <div className="size-full bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-8 py-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Ticket className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">The Midnight Concert</h1>
            <p className="text-sm text-gray-500">Saturday, June 15, 2026 · 8:00 PM · Arena Center</p>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-auto bg-white">
          <SeatMap onSeatSelect={handleSeatSelect} selectedSeats={selectedSeats} />
        </div>

        <div className="w-96 bg-white border-l border-gray-200 shadow-xl overflow-auto">
          <BookingSummary selectedSeats={selectedSeats} onCheckout={handleCheckout} />
        </div>
      </div>
    </div>
  );
}