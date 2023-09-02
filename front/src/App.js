import styled from 'styled-components';
import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Publicar from './pages/Publicar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const AppContainer = styled.div`
  width: 100vw;
  height: 400vh;
  background-image: linear-gradient(90deg, #002F52 35%, #326589 100%);
`

function App() {
  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route path="/" element={<Home />} index />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/publicar" element={<Publicar />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;