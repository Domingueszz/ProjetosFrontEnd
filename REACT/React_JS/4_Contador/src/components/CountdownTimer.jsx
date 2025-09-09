import React, { useEffect, useState } from 'react';
import './CountdownTimer.css';

export default function CountdownTimer({ targetDate }) {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    if (difference <= 0) return null;

    return {
      dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
      horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutos: Math.floor((difference / 1000 / 60) % 60),
      segundos: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const t = calculateTimeLeft();
      setTimeLeft(t);
      if (!t) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) return <p className="countdown-ended">Contagem finalizada!</p>;

  return (
    <div className="countdown-container">
      <div className="countdown-item">{timeLeft.dias}d</div>
      <div className="countdown-item">{timeLeft.horas}h</div>
      <div className="countdown-item">{timeLeft.minutos}m</div>
      <div className="countdown-item">{timeLeft.segundos}s</div>
    </div>
  );
}
