import logo from '../../imagens/logo.png';
import styled from 'styled-components';

const LogoContainer = styled.div`
  display: flex;
  font-size: 30px;
`

const LogoImage = styled.img`
  width: 80px;
  height: 70px;
  margin-right: 10px;
`

function Logo() {
    return (
        <LogoContainer>
          <LogoImage 
            src={logo} 
            alt='logo' 
          /> 
          <p><strong>Cormen AI</strong> Solutions</p> 
        </LogoContainer>
    )
}

export default Logo