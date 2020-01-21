import React, { useEffect, useState } from 'react';
import api from './services/api';
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

// Componente: Bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação.
// Propriedade: Informações que um componente PAI passa para o componente FILHO
// Estado: Informações mantidas pelo componente (Lembrar: imutabilidade)

function App() {
    const [devs, setDevs] = useState([]);

    useEffect(() => {
      async function loadDevs() {
        const response = await api.get('/devs');

        setDevs(response.data);
      }

      loadDevs();

      // Passa o array vazio se quiser que executa apenas uma vez
    }, [])

    async function handleAddDev(data) {
     const response = await api.post('/devs', data)
      
      // Assim que um usuário é cadastrado, aparece na tela
        // copia todos os devs que já tem na tela e adiciona o novo
      setDevs([...devs, response.data])
    }
  return (

  <div id="app">
    <aside>
      <strong>Cadastrar</strong>
     <DevForm onSubmit={handleAddDev} />
    </aside>
    <main>
      <ul>
        {devs.map(dev => (
          <DevItem key={dev._id} dev={dev} />
        ))}
        
      </ul>
    </main>
  </div>
  );
}

export default App;

// .join junta o array separando por , e espaço