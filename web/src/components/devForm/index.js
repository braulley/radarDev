import React, { useEffect, useState } from 'react';

const DevForm = ({onSubmit}) => {
    
    const [ latitude, setLatitude] = useState('');
    const [ longitude, setLongitude] = useState('');
    const [ github_username, setGithub_username] = useState('');
    const [ tech, setTechs] = useState('');

    useEffect( () => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
          }, 
          (err) => {
            console.log(err);
          }, {
            timeout:30000,
          }
        );
      }, []);

      async function handleSubmit(e) {
          e.preventDefault();

          await onSubmit({
            github_username,
            tech,
            latitude,
            longitude,
          })

        setGithub_username('');
        setTechs('');
          
      }

    return(
        <form onSubmit={handleSubmit} method="post">
          <div className="input-block">
            <label htmlFor="github_username">Usuário</label>
            <input 
              type="text"
              name="github_username" 
              id="github_username"
              value={github_username} 
              onChange={(e) => setGithub_username(e.target.value)}
              required />
          </div>
          
          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input 
              name="techs" 
              type="text"
              id="techs"
              value={tech} 
              onChange={(e) => setTechs(e.target.value)}
              required />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input type="number" 
                name="latitude" 
                id="latitude" 
                value={latitude} 
                onChange={(e) => setLatitude(e.target.value)}
                required />
            </div>
            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input 
                type="number" 
                name="longitude" 
                id="longitude" 
                value={longitude} 
                onChange={(e) => setLongitude(e.target.value)}
                required />
            </div>            
          </div>          

          <button type="submit" value="Submit" >Salvar</button>
        </form>
    )
}

export default DevForm;