interface SeatProps {
  seat: {
    id: string;
    status: 'available' | 'selected' | 'sold' | 'held';
  };
  onClick: () => void;
}

export function Seat({ seat, onClick }: SeatProps) {
  const getStyles = () => {
    switch (seat.status) {
      case 'available':
        return 'bg-white border-2 border-gray-300 cursor-pointer hover:border-blue-400 hover:scale-110 transition-all';
      case 'selected':
        return 'bg-blue-500 cursor-pointer hover:bg-blue-600 scale-110 shadow-lg';
      case 'held':
        return 'bg-orange-500 cursor-not-allowed animate-pulse';
      case 'sold':
        return 'bg-gray-700 cursor-not-allowed';
      default:
        return '';
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={seat.status === 'sold' || seat.status === 'held'}
      className={`w-7 h-7 rounded transition-all duration-200 ${getStyles()}`}
      aria-label={`Seat ${seat.id} - ${seat.status}`}
    />
  );
}
