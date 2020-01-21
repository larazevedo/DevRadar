import React, { useState, useEffect } from 'react';

function DevForm({ onSubmit }) {

    // States para controlar os dados do Git
    const [github_username, setGithubUsername] = useState('');
    const [techs, setTechs] = useState('');


    // States para controlar as coordenadas
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
      // Pega coordenadas
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Buscando latitude e longitude do retorno da geolocation
          const { latitude, longitude } = position.coords;

          setLatitude(latitude);
          setLongitude(longitude);

        },
          (err) => {
            console.log(err);
          },
          {
            timeout: 30000,
          }
      )
    }, [])

async function handleSubmit(e){
  e.preventDefault();

  await onSubmit({
    github_username,
    techs,
    latitude,
    longitude,
  });

        // Campos ficam em branco depois do cadastro
        setGithubUsername('');
        setTechs('');
}

  return (
    <form onSubmit={handleSubmit}>
    <div className="input-block">
    <label htmlFor="">Usuário do Github</label>
    <input 
      name="github_username" 
      id="github_username" 
      required
      value={github_username}
      onChange={e => setGithubUsername(e.target.value)}
      />
    </div>

    <div className="input-block">
    <label htmlFor="techs">Tecnologias</label>
    <input 
      name="techs" 
      id="techs" 
      required
      value={techs}
      onChange={e => setTechs(e.target.value)}
      />
    </div>

    <div className="input-group">
     <div className="input-block">
       <label htmlFor="latitude">Latitude</label>
       <input  
        type="number" 
        name="latitude" 
        id="latitude" 
        required 
        value={latitude} 
        onChange={e => setLatitude(e.target.value)}
        />
     </div>

     <div className="input-block">
       <label htmlFor="longitude">Longitude</label>
       <input 
        type="number" 
        name="longitude" 
        id="longitude" 
        required 
        value={longitude}
        onChange={e => setLongitude(e.target.value)}
        />
     </div>
    </div>
    <button type="submit">Salvar</button>
  </form>
  )
}

export default DevForm;