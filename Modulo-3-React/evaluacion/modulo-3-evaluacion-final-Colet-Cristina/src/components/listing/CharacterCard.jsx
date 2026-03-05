import { Link } from "react-router";
function CharacterCard({ eachCharacter }) {
  return (
    <Link to={`/details/${eachCharacter.id}`}>
      <img
        className="card_img"
        src={eachCharacter.image}
        alt={"Foto de" + eachCharacter.name}
        title={"Foto de" + eachCharacter.name}
      />
      <h3 className="card-title">{eachCharacter.name}</h3>
      <p>{eachCharacter.house}</p>
    </Link>
  );
}

export default CharacterCard;
