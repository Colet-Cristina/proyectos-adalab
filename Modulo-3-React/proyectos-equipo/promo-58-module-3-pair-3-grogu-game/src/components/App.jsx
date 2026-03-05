import "../styles/App.scss";
import { useState } from "react";
import Header from "./Header";
import Board from "./Board";

function App() {
  // Variables de estado
  const [diceNumber, setDiceNumber] = useState(0);
  const [groguPosition, setGroguPosition] = useState(0);

  const [goods, setGoods] = useState({
    cookies: 3,
    eggs: 3,
    frogs: 3,
  });

  const [statusGame, setStatusGame] = useState("Game in progress");
  const [message, setMessage] = useState("");

  // --- Función para tirar el dado ---
  console.log ("Holis")
  const rollDice = () => {
    const randomNumber = Math.floor(Math.random() * 4) + 1;
    setDiceNumber(randomNumber);
    console.log(randomNumber)

    // Número 4 → Grogu avanza
    if (randomNumber === 4) {
      const newPosition = groguPosition + 1;
      setGroguPosition(newPosition);

      if (newPosition >= 6) {
        setStatusGame("Grogu ha ganado 🎉");
      }

      setMessage("Grogu avanza una casilla");
      return;
    }

    // Número 1 → Quita un huevo si quedan
    if (randomNumber === 1 && goods.eggs > 0) {
      setGoods({ ...goods, eggs: goods.eggs - 1 });
      setMessage("Grogu se ha comido un huevo 🥚");
      return;
    }

    else if(randomNumber === 2 && goods.cookies > 0) {
      setGoods({ ...goods, cookies: goods.cookies - 1 });
      setMessage("Grogu se ha comido una galleta 🍪");
      return;
    }

      else if (randomNumber === 3 && goods.frogs > 0) {
      setGoods({ ...goods, frogs: goods.frogs - 1 });
      setMessage("Grogu se ha comido una rana 🐸");
      return;
    }

    // Otros números → Se descarga mercancía (si queda)
    const totalGoods = goods.cookies + goods.eggs + goods.frogs;

    if (totalGoods === 0) {
      setMessage("No hay más mercancías que descargar");
      return;
    }

    // Orden de descarga: cookies → eggs → frogs
    if (goods.cookies > 0) {
      setGoods({ ...goods, cookies: goods.cookies - 1 });
      setMessage("Se ha descargado una cookie 🍪");
    } else if (goods.eggs > 0) {
      setGoods({ ...goods, eggs: goods.eggs - 1 });
      setMessage("Se ha descargado un huevo 🥚");
    } else if (goods.frogs > 0) {
      setGoods({ ...goods, frogs: goods.frogs - 1 });
      setMessage("Se ha descargado una rana 🐸");
    }
  };

  // --- Reiniciar juego ---
  const restartGame = () => {
    setDiceNumber(0);
    setGroguPosition(0);
    setGoods({ cookies: 3, eggs: 3, frogs: 3 });
    setStatusGame("Game in progress");
    setMessage("");
  };

  return (
    <div className="page">
      <Header />
      <main className="page">
        
        <Board position={groguPosition} />

        <section>
          <button className="dice" onClick={rollDice}>
            Lanzar Dado
          </button>
          <div className="game-status">{statusGame}</div>
          <div className="message">{message}</div>
          <div className="dice-number">Dado: {diceNumber}</div>
        </section>

        {/* MERCANCÍAS DINÁMICAS */}
        <section className="goods-container">
          {[...Array(goods.cookies)].map((_, i) => (
            <div key={i} className="goods-item">🍪</div>
          ))}
        </section>

        <section className="goods-container">
          {[...Array(goods.eggs)].map((_, i) => (
            <div key={i} className="goods-item">🥚</div>
          ))}
        </section>

        <section className="goods-container">
          {[...Array(goods.frogs)].map((_, i) => (
            <div key={i} className="goods-item">🐸</div>
          ))}
        </section>

        <section>
          <button className="restart-button" onClick={restartGame}>
            Reiniciar Juego
          </button>
        </section>
      </main>
    </div>
  );
}

export default App;
