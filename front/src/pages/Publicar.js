import Header from '../componentes/Header';
import styled from 'styled-components';
import Input from '../componentes/Input';
import { useEffect, useState } from "react";
import axios from "axios";

const PubContainer = styled.div`
    width: 100vw;
    height: 400vh;
    background-image: #000;
`

const PubTitulo = styled.h1`
    color: #FFF;
    font-size: 40px;
    margin-left: 20px;
    margin-bottom: 40px;
`

const PubButton = styled.button`
    background-color: #FFF;
    color: #000;
    border: none;
    padding: 10px 20px;
    border-radius: 50px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 20px;
    margin-left: 400px;

    &:hover {
        background-color: #000;
        color: #FFF;
    }
`;

const Resposta = styled.h2`
    color: #FFF;
    font-size: 20px;
    margin-left: 20px;
    margin-bottom: 40px;
`

function Publicar() {
    const [title, setTitulo] = useState("");
    const [content, setContent] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [response, setResponse] = useState("");

    const handlePublicar = () => {
        axios.post("http://localhost:3001/noticias", {
            title: title,
            content: content,
            thumbnail: thumbnail
        }).then(response => {
            console.log(response.data);
            setResponse(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <PubContainer>
            <Header />
                <PubTitulo>Publicar Notícia</PubTitulo>
                <Input placeholder="Título" onChange={e => setTitulo(e.target.value)} />
                <Input placeholder="Conteúdo" onChange={e => setContent(e.target.value)} />
                <Input placeholder="Thumbnail" onChange={e => setThumbnail(e.target.value)} />
                <PubButton onClick={handlePublicar}>Publicar</PubButton>
                <Resposta>{response}</Resposta>
        </PubContainer>
    );
}

export default Publicar;