import './DateSelector.css';

export default function DateSelector({ onDateChange, predefinedDates }) {
  return (
    <div className="date-selector">
      <label>Escolha uma data personalizada:</label>
      <input
        type="datetime-local"
        onChange={(e) => onDateChange(e.target.value)}
      />

      <label>Ou selecione uma data pré-definida:</label>
      <select onChange={(e) => onDateChange(e.target.value)}>
        {Object.entries(predefinedDates).map(([label, value]) => (
          <option key={label} value={value}>{label}</option>
        ))}
      </select>
    </div>
  );
}
