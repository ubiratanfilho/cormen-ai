import Header from '../componentes/Header';
import styled from 'styled-components';
import Input from '../componentes/Input';

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

function Login() {
    return (
        <LoginContainer>
            <Header />
                <LoginTitulo>Login</LoginTitulo>
                <Input placeholder="Usuário" />
                <Input placeholder="Senha" />
                <LoginButton>Entrar</LoginButton>
        </LoginContainer>
    );
}

export default Login;