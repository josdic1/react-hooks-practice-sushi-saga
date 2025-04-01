import { useState, useEffect } from 'react';
import MoreButton from "./MoreButton";
import Sushi from "./Sushi";

function SushiContainer({ sushis, itemsPerPage, onEat, eatenSushis }) {
  const [page, setPage] = useState(0);
  const [visList, setVisList] = useState([]);

  useEffect(() => {
    if (sushis.length > 0) {
      renderList();
    }
  }, [sushis, page, eatenSushis]);

  function renderList() {
    const start = page * itemsPerPage;
    const visibleSushi = sushis.slice(start, start + itemsPerPage);
    const listData = visibleSushi.map(s => (
      <Sushi key={s.id} sushi={s} onEat={onEat} isEaten={eatenSushis.includes(s.id)} />
    ));
    setVisList(listData);
  }

  const handleClick = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className="belt">
      {visList}
      <MoreButton onClick={handleClick} />
    </div>
  );
}

export default SushiContainer;
