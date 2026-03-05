import { useNavigate } from "react-router";
import { Link } from "react-router";

function Card({ changeData }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/project/${changeData.id}`);
  };

  const handleLinkClick = (ev) => {
    ev.stopPropagation();
  };

  return (
    <article
      className="card"
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <h2 className="card__projectTitle">
        <span className="card__projectTitle--text">Personal project card</span>
      </h2>

      <div className="card__author">
        <div
          className="card__authorPhoto"
          style={{
            backgroundImage: changeData.photo
              ? `url("${changeData.photo}")`
              : null,
          }}
        ></div>
        <p className="card__job">{changeData.job || "Full stack Developer"}</p>
        <h3 className="card__name">
          {changeData.author || "Emmelie Bjôrklund"}
        </h3>
      </div>

      <div className="card__project">
        <h3 className="card__name">{changeData.name || "Elegant Workspace"}</h3>
        <p className="card__slogan">
          {changeData.slogan || "Diseños Exclusivos"}
        </p>

        <h3 className="card__descriptionTitle">Product description</h3>
        <p className="card__description">
          {changeData.desc || "Lorem ipsum dolor sit amet..."}
        </p>

        <div className="card__technicalInfo">
          <p className="card__technologies">
            {changeData.technologies || "React JS - HTML - CSS"}
          </p>

          <a
            className="icon icon__www"
            href={changeData.demo}
            onClick={handleLinkClick}
            target="_blank"
            rel="noopener noreferrer"
          />

          <a
            className="icon icon__github"
            href={changeData.repo}
            onClick={handleLinkClick}
            target="_blank"
            rel="noopener noreferrer"
          />
        </div>
      </div>
    </article>
  );
}

export default Card;
