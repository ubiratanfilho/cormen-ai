import Header from '../componentes/Header';
import styled from 'styled-components';
import Input from '../componentes/Input';
import { useEffect, useState } from "react";
import axios from "axios";

const LoginContainer = styled.div`
    width: 100vw;
    height: 400vh;
    background-image: #000;
`

const LoginTitulo = styled.h1`
    color: #FFF;
    font-size: 40px;
    margin-left: 20px;
    margin-bottom: 40px;
`

const LoginButton = styled.button`
    background-color: #FFF;
    color: #000;
    border: none;
    padding: 10px 20px;
    border-radius: 50px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 20px;
    margin-left: 370px;

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

function Cadastro() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [response, setResponse] = useState("");

    const handleCadastro = () => {
        axios.post("http://localhost:3002/login", {
            username: username,
            password: password,
            email: email
        }).then(response => {
            console.log(response.data);
            setResponse(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <LoginContainer>
            <Header />
                <LoginTitulo>Cadastro</LoginTitulo>
                <Input placeholder="Usuário" onChange={(event) => setUsername(event.target.value)} />
                <Input placeholder="E-mail" onChange={(event) => setEmail(event.target.value)} />
                <Input placeholder="Senha" onChange={(event) => setPassword(event.target.value)} />
                <LoginButton onClick={handleCadastro}>Cadastrar</LoginButton>
                <Resposta>{response}</Resposta>
        </LoginContainer>
    );
}

export default Cadastro;