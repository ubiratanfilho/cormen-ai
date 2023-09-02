import Header from '../componentes/Header';
import styled from 'styled-components';
import Pesquisa from '../componentes/Pesquisa';
import UltimosLancamentos from '../componentes/Noticias';

const HomeContainer = styled.div`
  width: 100vw;
  height: 400vh;
  background-image: linear-gradient(90deg, #002F52 35%, #326589 100%);
`


function Home() {
  return (
    <HomeContainer>
      <Header />
      <Pesquisa />
      <UltimosLancamentos />
    </HomeContainer>
  );
}

export default Home;