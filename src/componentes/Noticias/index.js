import { noticias } from "./dadosUltimosLancementos";
import styled from "styled-components";

const NoticiasContainer = styled.div`
  background-image: #fff;
  color: #fff;
  text-align: center;
  padding: 85px 0;
  height: 100px;
  width: 100%;
`;

function UltimosLancamentos() {
  return (
    <NoticiasContainer>
      <h1>Notícias</h1>
      {noticias.map((noticia) => (
        <div>
          <h3>{noticia.title}</h3>
          <img src={noticia.thumbnail} alt={noticia.title} width={400} height={300}/>
          <p>{noticia.content}</p>
        </div>
      ))}
    </NoticiasContainer>
  );
}

export default UltimosLancamentos;