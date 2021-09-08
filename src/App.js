import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import SelectCurrency from './components/SelectCurrency';

function App() {
  let [rates, setRates] = useState([]);
  let [originCurrency, setOriginCurrency] = useState();
  let [targetCurrency, setTargetCurrency] = useState();
  let [originalAmount, setOriginalAmount] = useState(0);
  let [finalAmount, setFinalAmount] = useState();

  useEffect(() => {
    axios('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json')
      .then((response) => {
        setRates(Object.keys(response.data).map((x) => x.toUpperCase()));
      });
  }, []);

  useEffect(() => {
    setOriginCurrency(rates[0]);
    setTargetCurrency(rates[1]);
  }, [rates])

  let convertCurrency = async () => {
    let originLower = originCurrency.toLowerCase();
    let targetLower = targetCurrency.toLowerCase();

    axios(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${originLower}/${targetLower}.json`)
      .then((response) => {
        setFinalAmount(`${targetCurrency} ${(originalAmount * parseFloat(response.data[targetLower])).toFixed(2)}`);
      });
  };

  return (
    <div className='container'>
      <div className='card'>
        <h1>Currency converter</h1>
        <div className='flex-container'>
          <SelectCurrency
            title='From'
            currencies={rates}
            evnt={(ev) => setOriginCurrency(ev.target.value)}
            value={originCurrency}>
          </SelectCurrency>
          <SelectCurrency
            title='To'
            currencies={rates}
            evnt={(ev) => setTargetCurrency(ev.target.value)}
            value={targetCurrency}>
          </SelectCurrency>
        </div>
        <p>Monto</p>
        <input id='inpMonto' type='number' className='app-input' placeholder='Amount...' onChange={(ev) => setOriginalAmount(ev.target.value)}></input>
        <button className='app-button' onClick={convertCurrency}>Calculate</button>
        <p>{finalAmount}</p>
      </div>
    </div>
  );
}

export default App;
