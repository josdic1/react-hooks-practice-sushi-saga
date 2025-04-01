import { useState, useEffect } from 'react';
import SushiContainer from "./SushiContainer";
import Table from "./Table";
import { SUSHI_API } from "../utils/api";

function App() {
  const [sushis, setSushis] = useState([]);
  const [eatenSushis, setEatenSushis] = useState([]);
  const [money, setMoney] = useState(100);

  useEffect(() => {
    fetchSushis();
  }, []);

  async function fetchSushis() {
    try {
      const r = await fetch(SUSHI_API);
      const data = await r.json();
      setSushis(data);
    } catch (err) {
      console.error("❌", err.message);
    }
  }

  function handleEat(sushi) {
    if (eatenSushis.includes(sushi.id)) return; 
    if (money < sushi.price) return; 
    setEatenSushis([...eatenSushis, sushi.id]);
    setMoney(prev => prev - sushi.price);
  }

  return (
    <div className="app">
      <SushiContainer
        sushis={sushis}
        itemsPerPage={4}
        onEat={handleEat}
        eatenSushis={eatenSushis}
      />
      <Table plates={eatenSushis} money={money} />
    </div>
  );
}

export default App;
