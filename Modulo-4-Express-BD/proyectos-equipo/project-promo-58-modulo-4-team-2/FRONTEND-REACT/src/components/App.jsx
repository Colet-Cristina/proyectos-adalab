import "../styles/App.scss";

import LogoBrand from "../images/laptop-code-solid.svg";
import LogoAdalab from "../images/adalab.png";

import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Hero from "./layout/Hero";
import Preview from "./create/Preview";
import Form from "./create/Form";

import LandingPage from "./pages/LandingPage";
import ProjectDetail from "./pages/ProjectDetail";

import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";

function App() {
  const [cardData, setCardData] = useState({
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
  });

  const [projectId, setProjectId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  //evita que desaparezca lo escrito al recargar la página
  useEffect(() => {
    const savedData = localStorage.getItem("form-backup");

    if (savedData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCardData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    // Este código se lanza cuando cambie cardData
    localStorage.setItem("form-backup", JSON.stringify(cardData));
  }, [cardData]);

  const handleInputCard = (ev) => {
    setCardData({
      ...cardData,
      [ev.target.name]: ev.target.value,
    });
  };

  const handleResetForm = () => {
    const initialData = {
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
    };
    setCardData(initialData);
    setProjectId(null);
    setErrorMsg("");
    localStorage.removeItem("form-backup");
  };

  return (
    <div className="container">
      <Header />
      <main className="main">
        <Routes>
          {/*ruta para la landing*/}
          <Route path="/" element={<LandingPage />} />
          {/*ruta para el detalle*/}
          <Route path="/project/:id" element={<ProjectDetail />} />

          {/*ruta para crear la tarjeta*/}
          <Route
            path="/create"
            element={
              <>
                <Hero />
                <Preview cardData={cardData} />
                <Form
                  handleInputCard={handleInputCard}
                  cardData={cardData}
                  setCardData={setCardData}
                  projectId={projectId}
                  setProjectId={setProjectId}
                  errorMsg={errorMsg}
                  setErrorMsg={setErrorMsg}
                  handleResetForm={handleResetForm}
                />
              </>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
