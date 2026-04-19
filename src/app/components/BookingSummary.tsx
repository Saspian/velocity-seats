import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface SeatData {
  id: string;
  row: string;
  number: number;
  status: 'available' | 'selected' | 'sold' | 'held';
  price: number;
}

interface BookingSummaryProps {
  selectedSeats: SeatData[];
  onCheckout: () => void;
}

export function BookingSummary({ selectedSeats, onCheckout }: BookingSummaryProps) {
  const [timeLeft, setTimeLeft] = useState(59);

  useEffect(() => {
    if (selectedSeats.length === 0) {
      setTimeLeft(59);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 59;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedSeats]);

  const subtotal = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-semibold mb-6">Booking Summary</h2>

        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 mb-8 border border-orange-200">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-medium text-orange-900">Flash Sale Active</span>
          </div>
          <div className="text-4xl font-bold text-orange-600 tabular-nums">
            {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:{String(timeLeft % 60).padStart(2, '0')}
          </div>
          <p className="text-xs text-orange-700 mt-2">Time remaining to secure your seats</p>
        </div>

        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-600 mb-4">Seats Selected</h3>
          {selectedSeats.length === 0 ? (
            <p className="text-gray-400 text-sm">No seats selected yet</p>
          ) : (
            <div className="space-y-3">
              {selectedSeats.map((seat) => (
                <div
                  key={seat.id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <span className="font-medium text-gray-900">{seat.id}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      Row {seat.row}
                    </span>
                  </div>
                  <span className="font-semibold text-gray-900">${seat.price}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-2xl font-bold text-gray-900">${subtotal}</span>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>Taxes & Fees</span>
            <span>${(subtotal * 0.15).toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
            <span className="font-semibold text-gray-900">Total</span>
            <span className="text-3xl font-bold text-gray-900">
              ${(subtotal * 1.15).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="p-8 pt-0">
        <button
          onClick={onCheckout}
          disabled={selectedSeats.length === 0}
          className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100"
        >
          {selectedSeats.length === 0 ? 'Select Seats to Continue' : 'Secure These Seats'}
        </button>
      </div>
    </div>
  );
}
