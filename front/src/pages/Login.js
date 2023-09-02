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
    margin-left: 420px;

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

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [response, setResponse] = useState("");

    const handleLogin = () => {
        console.log(username, password)
        axios.post("http://localhost:3002/login/check", {
            username: username,
            password: password
        }).then(response => {
            setResponse(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <LoginContainer>
            <Header />
                <LoginTitulo>Login</LoginTitulo>
                <Input placeholder="Usuário" onChange={(event) => setUsername(event.target.value)} />
                <Input placeholder="Senha" onChange={(event) => setPassword(event.target.value)} />
                <LoginButton onClick={handleLogin}>Entrar</LoginButton>
                <Resposta>{response}</Resposta>
        </LoginContainer>
    );
}

export default Login;