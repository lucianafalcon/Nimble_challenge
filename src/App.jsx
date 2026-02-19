/*********************************************************************************
 19-02-2026  
    Nimble Gravity 
    Falcon Luciana
 Script para la postulación a los trabajos disponibles.
*********************************************************************************/

import { useEffect, useState } from 'react'
import UserData from "./assets/components/UserData";
import { getJobs, applyToJob } from "./assets/services/Api";
import './App.css'
import Swal from "sweetalert2"

function App() {
  const [jobs, setJobs] = useState(null);
  const [inputValues, setInputValues] = useState({});
  const [candidate, setCandidate] = useState(null);
  const [submitted, setSubmitted] = useState({});

  const handleInputChange = (index, value) => {
    setInputValues(prev => ({ ...prev, [index]: value }));
  };

  // se recupera la lista de trabajos disponibles
  useEffect(() => {
    getJobs()
      .then(data => setJobs(data))
      .catch(err => console.error(err));
  }, []);

  // se postula al trabajo seleccionado con el repositorio ingresado
  const handleSubmit = (jobId, repoUrl) => {
     if (!repoUrl) {
      Swal.fire({
        icon: "warning",
        title: "Repositorio vacío",
        text: "Debes ingresar un link antes de enviar",
        timer: 2000
      })
      return;
    }

    applyToJob(candidate, jobId, repoUrl)  
      .then(() => {
        Swal.fire({
        icon: "success",
        title: "Postulación enviada",
          text: "Tu repositorio fue enviado correctamente",
          confirmButtonText: "OK"
        })
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un problema al enviar la postulación"
        })
      });
  };

  if (candidate === null) {
    return <UserData setCandidate={setCandidate} />
  }

  return (
    <>
  <div className="welcome-title">HOLA {candidate.firstName.toUpperCase()}, </div>
  <div className="welcome-subtitle">estas son las propuestas <br /> que tenemos para vos:</div>

  <div className="jobs-container">
    {jobs && jobs.map((job, index) => (
      <div key={index} className="job-card">
        <h3>{job.title}</h3>
        <input
          type="text"
          value={inputValues[index] || ""}
          placeholder="Ingresa el link de tu repositorio"
          onChange={(e) => handleInputChange(index, e.target.value)}
          className="job-input"
        />
        <button
          className="job-btn"
          onClick={() => handleSubmit(job.id, inputValues[index] || "")}
        >
          Submit
        </button>
      </div>))}
  </div>
    </>
  )
}

export default App
