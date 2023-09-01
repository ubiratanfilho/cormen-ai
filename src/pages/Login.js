import Header from '../componentes/Header';
import styled from 'styled-components';
import Pesquisa from '../componentes/Pesquisa';
import UltimosLancamentos from '../componentes/Noticias';

const HomeContainer = styled.div`
  width: 100vw;
  height: 400vh;
  background-image: #000;
`


function Login() {
  return (
    <HomeContainer>
      <Header />
      <Pesquisa />
      <UltimosLancamentos />
    </HomeContainer>
  );
}

export default Login;