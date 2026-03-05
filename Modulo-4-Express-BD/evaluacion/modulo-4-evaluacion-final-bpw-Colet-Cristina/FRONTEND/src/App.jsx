import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [aves, setAves] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [formData, setFormData] = useState({
    nombre_comun: "",
    nombre_cientifico: "",
    descripcion: "",
    imagen: "",
    categoria_id: 1,
  });

  const API_URL = "http://localhost:3000/api/aves";

  const cargarAves = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setAves(data);
    } catch (error) {}
  };

  useEffect(() => {
    cargarAves();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setFormData({
      nombre_comun: "",
      nombre_cientifico: "",
      descripcion: "",
      imagen: "",
      categoria_id: 1,
    });
    cargarAves();
  };

  const eliminarAve = async (id) => {
    if (window.confirm("¿Eliminar ave?")) {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      cargarAves();
    }
  };

  const avesFiltradas = aves.filter((ave) => {
    const termino = busqueda.toLowerCase();
    const nombreComun = (ave.nombre_comun || "").toLowerCase();
    const nombreCientifico = (ave.nombre_cientifico || "").toLowerCase();
    const categoriaTipo = (ave.tipo || "").toLowerCase();

    return (
      nombreComun.includes(termino) ||
      nombreCientifico.includes(termino) ||
      categoriaTipo.includes(termino)
    );
  });

  // --- AGRUPACIÓN POR CATEGORÍA ---
  const avesPorCategoria = avesFiltradas.reduce((acc, ave) => {
    const catNombre = ave.tipo || "Otras Especies";
    if (!acc[catNombre]) acc[catNombre] = [];
    acc[catNombre].push(ave);
    return acc;
  }, {});

  return (
    <div className="container">
      <header className="header">
        <h1>Pajarracos</h1>
        <div className="search-wrapper">
          <input
            type="text"
            placeholder=" Buscar por nombre o categoría (ej: Rapaces)..."
            className="search-bar"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          {busqueda && (
            <button className="btn-clear" onClick={() => setBusqueda("")}>
              Limpiar
            </button>
          )}
        </div>
      </header>

      {/* RECUADRO PARA AÑADIR AVES */}
      <section className="add-bird-box">
        <h2>Añadir Nueva Ave</h2>
        <form onSubmit={handleSubmit} className="bird-form">
          <div className="form-grid">
            <input
              name="nombre_comun"
              placeholder="Nombre Común"
              value={formData.nombre_comun}
              onChange={handleChange}
              required
            />
            <input
              name="nombre_cientifico"
              placeholder="Nombre Científico"
              value={formData.nombre_cientifico}
              onChange={handleChange}
            />
            <input
              name="imagen"
              placeholder="URL de la Imagen"
              value={formData.imagen}
              onChange={handleChange}
            />
            <select
              name="categoria_id"
              value={formData.categoria_id}
              onChange={handleChange}
            >
              <option value="1">Rapaces</option>
              <option value="2">Nocturnas</option>
              <option value="3">Pájaros</option>
            </select>
            <textarea
              name="descripcion"
              placeholder="Descripción de la especie..."
              value={formData.descripcion}
              onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit" className="btn-submit">
            Guardar Ave
          </button>
        </form>
      </section>

      {/* LISTADO SEPARADO POR CATEGORÍAS */}
      <div className="categories-list">
        {Object.keys(avesPorCategoria).length > 0 ? (
          Object.keys(avesPorCategoria).map((cat) => (
            <div key={cat} className="category-section">
              <h2 className="category-title">{cat}</h2>
              <div className="birds-grid">
                {avesPorCategoria[cat].map((ave) => (
                  <div key={ave.id} className="bird-card">
                    <img
                      src={ave.imagen || "https://via.placeholder.com/150"}
                      alt={ave.nombre_comun}
                    />
                    <div className="bird-info">
                      <h3>{ave.nombre_comun}</h3>
                      <p>
                        <i>{ave.nombre_cientifico}</i>
                      </p>
                      <button
                        onClick={() => eliminarAve(ave.id)}
                        className="btn-delete"
                      >
                        Borrar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">
            No se han encontrado pajarracos que coincidan.
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
