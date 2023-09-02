import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";

const NoticiasContainer = styled.div`
  background-image: #fff;
  color: #fff;
  text-align: center;
  padding: 85px 0;
  height: 100px;
  width: 100%;
`;

function UltimosLancamentos() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/noticias')
      .then((response) => {
        setNoticias(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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