import { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

export default function MainComponent() {
  const [data, setData] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    axios
     /*  .get("http://localhost:4000/a/a") */
     .get("https://render-peliculas-d4ht.onrender.com/a/a")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log("errorrrrr", error);
      });
  }, []);

  // Función para obtener la película actual según el índice
  const getCurrentMovie = () => {
    if (currentMovieIndex >= 0 && currentMovieIndex < data.length) {
      return data[currentMovieIndex];
    }
    return null;
  };

  const handleNextMovie = () => {
    setCurrentMovieIndex((prevIndex) => prevIndex + 1);
    setShowInfo(false);
  };

  const handlePreviousMovie = () => {
    setCurrentMovieIndex((prevIndex) => prevIndex - 1);
    setShowInfo(false);
  };

  const handleToggleInfo = () => {
    setShowInfo((prevShowInfo) => !prevShowInfo);
  };

  const currentMovie = getCurrentMovie();
  const isFirstMovie = currentMovieIndex === 0;
  const isLastMovie = currentMovieIndex === data.length - 1;

  if (!currentMovie) {
    return <div>No hay más películas para mostrar</div>;
  }

  return (
    <div className="contenedor">
    
      <div className="info">
        <h3>{currentMovie.nombre}</h3>
        <h6>Clasificación: {currentMovie.clasificacion}</h6>
        <h6>Año: {currentMovie.año}</h6>
        <h6>precio: {currentMovie.precio}</h6>
        <img src={currentMovie.imagen} alt={currentMovie.nombre} />
      </div>
      <div className="botones">
        {!isFirstMovie && <button onClick={handlePreviousMovie}>Anterior</button>}
        {!isLastMovie && <button onClick={handleNextMovie}>Siguiente</button>}

        <button onClick={handleToggleInfo}>
          {showInfo ? "Ocultar Info" : "Info"}
        </button>

        {showInfo && (
          <div className="texto">
            <p>Sinopsis:</p>
            <p>{currentMovie.sinopsis}</p>
            <p>Actores:</p>
            <ul>
              {currentMovie.actores ? (
                currentMovie.actores.map((actor, index) => (
                  <li key={index}>{actor}</li>
                ))
              ) : (
                <li>No se encontraron actores.</li>
              )}
            </ul>
          </div>
        )}
      </div>



    </div>
    

    
  );
}
