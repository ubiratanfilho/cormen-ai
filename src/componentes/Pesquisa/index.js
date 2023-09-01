import Input from "../Input";
import styled from "styled-components";
import { useState } from "react";
// import { livros } from "./dadosPesquisa";


const PesquisaContainer = styled.div`
    background-image: linear-gradient(90deg, #002F52 35%, #326589 165%);
    color: #FFF;
    text-align: center;
    padding: 85px 0;
    height: 100px;
    width: 100%;
`

const Titulo = styled.h1`
    color: #FFF;
    font-size: 36px;
    text-align: center;
    width: 100%;
`

const Subtitulo = styled.h4`
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 40px;
`

const Resultado = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    cursor: pointer;

    p {
        width: 200px;
    }

    img {
        width: 100px;
    }

    &:hover {
        border: 1px solid white;
    }
`

function Pesquisa() {
    // const [livrosPesquisados, setLivrosPesquisados] = useState([]);

    // console.log(livrosPesquisados);

    return (
        <PesquisaContainer>
            <Titulo>Tecnologia do futuro para problemas do presente</Titulo>
            <Subtitulo>Consultoria especializada na entrega de soluções de Inteligência Artificial, renomada e capacitada nas mais diferentes indústrias. Nós desenvolvemos produtos capazes de aumentar a produtividade e reduzir os custos, automatizando processos e gerando insights por muitos inimagináveis.</Subtitulo>
            {/* <Input
                placeholder="Escreva sua próxima leitura"
                onBlur={evento => {
                    const textoDigitado = evento.target.value;
                    const resultadoPesquisa = livros.filter( livro => livro.nome.includes(textoDigitado));
                    setLivrosPesquisados(resultadoPesquisa);
                }}
            />
            { livrosPesquisados.map( livro => (
                <Resultado>
                    <p>{livro.nome}</p>
                    <img src={livro.src} alt={livro.nome} />
                </Resultado>
            ))} */}
        </PesquisaContainer>
    )
};

export default Pesquisa;