import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Preview from "../create/Preview";

function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  const server = import.meta.env.PROD
    ? 'https://project-promo-58-modulo-4-team-2.onrender.com'
    : 'http://localhost:3000';

  useEffect(() => {
    fetch(`${server}/api/projects/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProject(data.data);
        }
      });
  }, [id]);

  if (!project) {
    return <p>Cargando proyecto...</p>;
  }

return (
  <div className="project-detail">
    <div className="project-detail__top">
      <button
        className="button--link"
        onClick={() => navigate("/")}
      >
Volver al listado
      </button>
    </div>

    <div className="project-detail__content">
      <Preview cardData={project} />
    </div>
  </div>
);
}

export default ProjectDetail;