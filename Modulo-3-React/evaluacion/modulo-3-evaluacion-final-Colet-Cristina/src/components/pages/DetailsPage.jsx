import { useParams, Link } from "react-router";

//aray completo
function CharacterDetails({ findCharacter }) {
  const params = useParams();
  const idCharacter = params.id;

  const characterFound = findCharacter(idCharacter);
  if (characterFound === undefined) {
    return (
      <article className="detail-null">
        <h2>¡Lechuza Extraviada y Confundida!</h2>
        <h3> ¡Mala noticia!</h3>
        <p>
          La lechuza mensajera que transportaba los detalles de este personaje
          fue afectada por un encantamiento.
        </p>
        <p>Ha dejado caer el pergamino en algún lugar desconocido.</p>
        <p>¡No podemos encontrar la ficha del personaje!</p>
        <Link to="/">Hechizo de Desaparición: Volver a Hogwarts</Link>
      </article>
    );
  }
  return (
    <div className="detail-container">
      <Link to="/" className="details-link">
        Volver a Hogwarts
      </Link>
      <article className="detail-page">
        <img
          className="detail-img"
          src={characterFound.image}
          alt={"Foto de " + characterFound.name}
        />

        <section className="detail-list">
          <h2>{characterFound.name}</h2>
          <dl>
            <dt>Especie:</dt>
            <dd>{characterFound.species}</dd>
            <dt>Casa:</dt>
            <dd>{characterFound.house}</dd>
            <dt>Género:</dt>
            <dd>{characterFound.gender}</dd>
            <dt>Actor:</dt>
            <dd>{characterFound.actor}</dd>
          </dl>
        </section>
      </article>
    </div>
  );
}

export default CharacterDetails;
