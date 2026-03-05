import Grogu from "./Grogu";

// Definimos el número de casillas (ejemplo: 7)
const NUMBER_OF_CELLS = 7; 

function Board({ groguPosition }) { // <-- 1. ¡Recibir la prop 'position'!
  
  // Creamos un array de casillas basado en el número total que queremos
  const cells = [...Array(NUMBER_OF_CELLS)].map((_, index) => {
    
    // 2. Comprobamos si el índice actual es igual a la posición de Grogu
    const isGroguHere = index === groguPosition;

    return (
      <div key={index} className="cell">
        {/* Si Grogu está aquí (isGroguHere es true), renderizamos el componente */}
        {isGroguHere && <Grogu />}
      </div>
    );
  });

  return (
    <div>
      <section className="board">
        {cells} {/* Renderizamos el array de casillas */}
      </section>
    </div>
  );
}

export default Board;