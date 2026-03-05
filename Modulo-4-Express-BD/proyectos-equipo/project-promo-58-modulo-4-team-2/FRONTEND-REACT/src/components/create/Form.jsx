/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router";
import GetAvatar from "./getAvatar";

// eslint-disable-next-line no-unused-vars
function Form({
  handleInputCard,
  cardData,
  setCardData,
  projectId,
  setProjectId,
  errorMsg,
  setErrorMsg,
  handleResetForm,
}) {
  const navigate = useNavigate();

  const server = import.meta.env.PROD
    ? 'https://project-promo-58-modulo-4-team-2.onrender.com'
    : 'http://localhost:3000';

  const handleChangePhoto = (photoData) => {
    setCardData({
      ...cardData,
      photo: photoData,
    });
  };

  const handleChangeImage = (imageData) => {
    setCardData({
      ...cardData,
      image: imageData,
    });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    // Limpiar id anterior y errores
    setProjectId(null);
    setErrorMsg("");

    fetch(`${server}/api/project`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cardData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const id = data.cardURL.split("/").pop();
          setProjectId(id);
          setErrorMsg("");
        } else {
          setErrorMsg(data.error || "Error al guardar proyecto");
        }
      })
      // eslint-disable-next-line no-unused-vars
      .catch((err) => setErrorMsg("Error al conectar con el servidor"));
  };

  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <h2 className="title">Información</h2>
      <fieldset className="addForm__group">
        <legend className="addForm__title">Cuéntanos sobre el proyecto</legend>
        <input
          className="addForm__input"
          type="text"
          name="name"
          id="name"
          placeholder="Nombre del proyecto"
          value={cardData.name}
          onInput={handleInputCard}
        />
        <input
          className="addForm__input"
          type="text"
          name="slogan"
          id="slogan"
          placeholder="Slogan"
          value={cardData.slogan}
          onInput={handleInputCard}
        />
        <div className="addForm__2col">
          <input
            className="addForm__input"
            type="url"
            name="repo"
            id="repo"
            placeholder="Repositorio"
            value={cardData.repo}
            onInput={handleInputCard}
          />
          <input
            className="addForm__input"
            type="url"
            name="demo"
            id="demo"
            placeholder="Demo"
            value={cardData.demo}
            onInput={handleInputCard}
          />
        </div>
        <input
          className="addForm__input"
          type="text"
          name="technologies"
          id="technologies"
          placeholder="Tecnologías"
          value={cardData.technologies}
          onInput={handleInputCard}
        />
        <textarea
          className="addForm__input"
          type="text"
          name="desc"
          id="desc"
          placeholder="Descripción"
          value={cardData.desc}
          onInput={handleInputCard}
          rows="5"
        ></textarea>
      </fieldset>

      <fieldset className="addForm__group">
        <legend className="addForm__title">Cuéntanos sobre la autora</legend>
        <input
          className="addForm__input"
          type="text"
          name="author"
          id="author"
          placeholder="Nombre"
          value={cardData.author}
          onInput={handleInputCard}
        />
        <input
          className="addForm__input"
          type="text"
          name="job"
          id="job"
          placeholder="Trabajo"
          value={cardData.job}
          onInput={handleInputCard}
        />
      </fieldset>

      <fieldset className="addForm__group--upload">
        <GetAvatar
          text="Subir foto del proyecto"
          updateAvatar={handleChangeImage}
        />

        <GetAvatar
          text="Subir foto de la autora"
          updateAvatar={handleChangePhoto}
        />

        <button className="button--large" type="submit">
          Guardar proyecto
        </button>

        <button className="button--large" type="button" onClick={handleResetForm}>
          Limpiar formulario
        </button>

        {projectId && (
          <small>
            Proyecto guardado:{" "}
            <button
              className="button--link"
              type="button"
              onClick={() => navigate(`/project/${projectId}`)}
            >
              Ver proyecto
            </button>
          </small>
        )}
      </fieldset>
    </form>
  );
}

export default Form;
