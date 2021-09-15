import React, { useState, useEffect } from 'react';
import axios from "axios";
import Coin from './Coin';
import Footer from './footer';
import './App.css';

function App() {
  const [coins, setCoins] = useState([]);
  const [search,setSearch] = useState("");
  useEffect(() => {
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false").then(res => {
        setCoins(res.data); console.log(res.data);
      }).catch(err => console.log(err));
  }, []);
  const handleChange = e => {
    setSearch(e.target.value);
  };
  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="coin-app">
      <div className="coin-search">
        <h2 className="coin-text">
          Search for Coins Here
        </h2>
        <input type="text" placeholder="Search" className="coin-input" onChange={handleChange} autoFocus/>
      </div>
      {filteredCoins.map(coin => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
      );
      })}
      <Footer/>
    </div>
  );
}

export default App;
