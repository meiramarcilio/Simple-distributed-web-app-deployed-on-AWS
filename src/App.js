import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL; // URL do API Gateway

function App() {
    const [view, setView] = useState('lista'); // Controle de navegação simples
    const [alunos, setAlunos] = useState([]);
    const [form, setForm] = useState({ Nome: '', Email: '' });

    useEffect(() => {
        fetchAlunos();
    }, []);

    const fetchAlunos = async () => {
        const res = await axios.get(`${API_URL}/alunos`);
        setAlunos(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log("Submitting:", form);
        // console.log("POST URL:", `${API_URL}/alunos`);

        try {
            const response = await axios.post(
                `${API_URL}/alunos`,
                form,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            // console.log("POST response:", response);

            setForm({ Nome: '', Email: '' });

            await fetchAlunos();

            setView('lista');

        } catch (error) {
            console.error("Error submitting form:");
            // console.error("POST /alunos ERROR");
            // console.error("Message:", error.message);
            // console.error("Response:", error.response);
            // console.error("Request:", error.request);
        }
    };

    return (
        <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
            <nav style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                <button onClick={() => setView('lista')}>Lista de Alunos</button>
                <button onClick={() => setView('cadastro')} style={{ marginLeft: '10px' }}>Novo Aluno</button>
            </nav>

            {view === 'lista' ? (
                <div>
                    <h2>Alunos Cadastrados</h2>
                    <ul>
                        {alunos.map(a => <li key={a.idAluno}>{a.Nome} - {a.Email}</li>)}
                    </ul>
                </div>
            ) : (
                <div>
                    <h2>Cadastro de Aluno</h2>
                    <form onSubmit={handleSubmit}>
                        <input 
                            placeholder="Nome" 
                            value={form.Nome} 
                            onChange={e => setForm({...form, Nome: e.target.value})} 
                            required 
                        /><br/><br/>
                        <input 
                            placeholder="Email" 
                            type="email" 
                            value={form.Email} 
                            onChange={e => setForm({...form, Email: e.target.value})} 
                            required 
                        /><br/><br/>
                        <button type="submit">Salvar</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default App;


// import logo from './logo.svg';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;