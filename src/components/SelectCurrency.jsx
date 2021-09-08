function SelectCurrency({ title, currencies, evnt, value }) {
  return (
    <div>
      <p>{title}</p>
      <select className='app-select' value={value} onChange={evnt} >
        {currencies.map((currency, index) => <option key={index}>{currency}</option>)}
      </select>
    </div>
  )
}

export default SelectCurrency;