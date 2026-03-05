import { useState } from "react";
import { Link } from "react-router";
import Card from "../create/Card";
import { useEffect } from "react";

function LandingPage() {
  // eslint-disable-next-line no-unused-vars

  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "",
      slogan: "",
      repo: "",
      demo: "",
      technologies: "",
      desc: "",
      author: "",
      job: "",
      photo: "",
      image: "",
    },
    {
      id: 2,
      name: "",
      slogan: "",
      repo: "",
      demo: "",
      technologies: "",
      desc: "",
      author: "",
      job: "",
      photo: "",
      image: "",
    },
  ]);

  const server = import.meta.env.PROD
    ? 'https://project-promo-58-modulo-4-team-2.onrender.com'
    : 'http://localhost:3000';

  const getProjectsFromApi = () => {
    console.log("Se están pidiendo los proyectos de la app");

    return fetch(`${server}/api/projects`)
      .then((response) => response.json())
      .then((data) => {
        setProjects(data.projects);
        return data;
      });
  };
  // eslint-disable-next-line no-unused-vars
  const objToExport = {
    getProjectsFromApi: getProjectsFromApi,
  };

  useEffect(() => {
    getProjectsFromApi();
  }, []);

  return (
    <>
      <section className="landing">
        <Link to="/create" className="button--link">
          Crear mi tarjeta
        </Link>
        Listado de proyectos
        {projects.map((project) => (
          <Card
            key={project.project_id}
            changeData={{ ...project, id: project.project_id }}
          />
        ))}
      </section>
    </>
  );
}

export default LandingPage;
