import { useState } from 'react';
import CountdownTimer from './components/CountdownTimer';
import DateSelector from './components/DateSelector';
import { predefinedDates } from './data/predefinedDates';
import './App.css';

function App() {
  const [targetDate, setTargetDate] = useState(predefinedDates['Natal']);

  return (
    <div className="app">
      <h1 className="app-title">Contador Regressivo</h1>

      <DateSelector
        onDateChange={setTargetDate}
        predefinedDates={predefinedDates}
      />

      <CountdownTimer targetDate={targetDate} />
    </div>
  );
}

export default App;
