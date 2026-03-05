import CharacterCard from "./CharacterCard";

function CharacterList({ characters }) {
  if (characters.length === 0) {
    return (
      <div className="error-message">
        <p>
          <h2>¡Mensaje del Departamento de Misterios!🔍</h2>
        </p>
        <p>
          <h3>
            Busqué ese nombre en el Mapa del Merodeador, pero ni rastro. Puede
            que hiciera un Evanesco tan potente que desapareció hasta de la
            lista de invitad@s.
          </h3>
        </p>
      </div>
    );
  }
  return (
    <ul className="list-card">
      {characters.map((eachCharacter) => (
        <li className="card" key={eachCharacter.id}>
          <CharacterCard eachCharacter={eachCharacter} />
        </li>
      ))}
    </ul>
  );
}

export default CharacterList;
