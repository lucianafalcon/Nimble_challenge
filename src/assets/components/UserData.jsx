/*********************************************************************************
 19-02-2026  
    Nimble Gravity 
    Falcon Luciana
 Página de inicio donde el candidato ingresa su email para verificar que exista 
 en la base de datos de la empresa.
*********************************************************************************/

import { useState } from "react";
import { getCandidateByEmail } from "../services/Api";
import "./UserData.css";
import Swal from "sweetalert2"
import logo from "../logo.png"

function UserData({ setCandidate }) {
  const [emailInput, setEmailInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  // si el candidato no existe en la base de la empresa no puede continuar
  const handleSubmit = () => {
    if (emailInput.trim() === "") return;

    setLoading(true);
    setError("");

    getCandidateByEmail(emailInput)
      .then(data => {
        if (data.error) {
          Swal.fire({
            icon: "error",
            title: "Email no registrado",
            text: "El email ingresado no está registrado como candidato.",
            timer: 2000,    
            confirmButtonText: "OK"
          });
          console.error(data.error);
        } else {
          setCandidate(data);
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error de conexión",
          text: "Hubo un problema al verificar el email. Intenta nuevamente."   
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="user-data">
      <img src={logo} alt="Logo empresa" className="logo" />

      <input
        type="email"
        value={emailInput}
        placeholder="Ingresa tu email"
        onChange={(e) => setEmailInput(e.target.value)}
      />
      
      {error && <p className="error-text">{error}</p>}
      
      <div className="user-data-btn">
        <button onClick={handleSubmit}>Ingresar</button>
      </div>
      
    </div>
  );
}

export default UserData;