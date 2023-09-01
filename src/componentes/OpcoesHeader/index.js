import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Opcao = styled(Link)`
  min-width: 120px;
  font-size: 16px;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-width: 120px;
  height: 100%;
  padding: 0 5px;
  cursor: pointer;
`

const Opcoes = styled.ul`
  display: flex;
`

const Links = ['HOME', 'LOGIN', 'CADASTRO', 'PUBLICAR'];


function OpcoesHeader(){
    return (
        <Opcoes>
            {Links.map((link) => (
                <Opcao to={`/${link.toLowerCase()}`}>
                    <li>{link}</li>
                </Opcao>
            ))}
        </Opcoes>
    )
}

export default OpcoesHeader;