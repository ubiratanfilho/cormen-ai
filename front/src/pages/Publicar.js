import Header from '../componentes/Header';
import styled from 'styled-components';
import Input from '../componentes/Input';

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

function Publicar() {
    return (
        <PubContainer>
            <Header />
                <PubTitulo>Publicar Notícia</PubTitulo>
                <Input placeholder="Título" />
                <Input placeholder="Conteúdo" />
                <Input placeholder="Thumbnail" />
                <PubButton>Publicar</PubButton>
        </PubContainer>
    );
}

export default Publicar;