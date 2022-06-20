import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import pathLogo from '../assets/images/path_logo.svg';
import PathRouteElement from './PathRouteElement';
import CompRouteElement from './CompRouteElement';
import useTokenReissue from '../hooks/useTokenReissue';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { pink } from '@mui/material/colors';

const NavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  position: fixed;

  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(3px);
  z-index: 100;
  padding: 0 0 40 0px;

  width: 95px;
  height: 100%;
  @media (max-height: 768px) {
    bottom: 0;
    transform: none;
    height: 100%;
  }
`;

const Ul = styled.ul`
  display: flex-inline;
  align-items: center;
  width: 100%;
`;

const BtnUl = styled.ul`
  display: flex-inline;
  align-items: center;
  width: 100%;
  position: absolute;
  top: 80%;
`;
  position: relative;
  bottom: ${(props) => { 
    return props.h === 'ROLE_ANONYMOUS' ? "-40%" : (
      props.h === 'ROLE_BUSINESS' ? (
        props.compView ? "-48.1%" : "-30%"
      ) : "-35%"
    )
  }};
`; // -48%


const Image = styled.div`
  background: url(${pathLogo}) no-repeat center center;
  background-size: 100px;
  margin-right: auto;
  width: 95px;
  @media (max-width: 768px) {
    margin-right: 0;
    background-size: 110px;
  }
`;

const Li = styled.li`
  padding: 10px 0px 5px 0px;
  width: 95px;
  text-align: center;
  font-size: 16px;
`;

const Button = styled.button`
  background: none;
  font-size: 62.5%;
  border: 2px solid #fff;
  border-radius: 5px;
  color: #fff;
  display: block;
  font-size: 0.4em;
  margin: 2em auto;
  width: 90px;

  padding: 1.5em 3em;
  position: relative;
  text-transform: uppercase;
  ::before ;

  ::after {
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
    background: #fff;
    content: '';
    position: absolute;
    z-index: -1;
    height: 100%;
    left: 0;
    top: 0;
    width: 0;
  }

  &:hover {
    color: #e30914;
  }
  &:hover:after {
    width: 100%;
  }
`;

const BtnLiEm = styled.em`

`;

const ScLink = styled(NavLink)`
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.$current ? '#E30914' : 'white')};
  @media (max-width: 768px) {
    height: 50px;
  }
`;

const Menubar = () => {
  const location = useLocation();
  const [currLocation, setCurrLocation] = useState(null);
  const [compChk, setCompChk] = useState(false);
  const navigate = useNavigate();
  const { userLogOut, tokenReissue } = useTokenReissue();
  let userState = useSelector((state) => state);
  // let dispatch = useDispatch();

  function isBusiness(){
    if(currLocation != null){
      // 경로 이동했을 때 company가 포함되는지의 여부
      if(currLocation.includes("company") == true) return setCompChk(true)
      else return setCompChk(false)
      // 회원 role이 비즈니스이면 창이 보이도록
    }
  }

  useEffect(() => {
    setCurrLocation(location.pathname);
  }, [location]);

  useEffect(() => {
    isBusiness()
  }, [currLocation])

  useEffect(() => {
    tokenReissue();
    console.log(state);
  }, [state]); 
=======
    console.log(userState);
  }, [userState]);

  return (
    <NavContainer>
      <Ul>
        <Image>
          <ScLink to="/"></ScLink>
        </Image>
      </Ul>
      {userState.user.role != 'ROLE_BUSINESS' ? (
        <PathRouteElement></PathRouteElement>  
        ) : (
          <>
            {compChk != true ? (
              <PathRouteElement></PathRouteElement>
              ) : (
                <CompRouteElement></CompRouteElement>
            )}
          </>
      )}
      <BtnUl h={userState.user.role} compView={compChk}>
        {userState.user.loginId != 'anonymous' ? (
          <Li $current={currLocation === '/logout' && true}>
            {userState.user.role === 'ROLE_BUSINESS' ? (
              <>
                {compChk != true ? (
                  <Button onClick={() => navigate('/company')}>내 업체</Button>
                  ) : (
                    <Button onClick={() => navigate('/')}>패스 콕</Button>
                )}
              </>
              ) : (
                null
            )}
            <Button onClick={() => navigate('/member')}>내 정보</Button>
            <Button onClick={userLogOut}>
              <BtnLiEm>로그아웃</BtnLiEm>
            </Button>
          </Li>
        ) : (
          <Li $current={currLocation === '/login' && true}>
            <ScLink to="/login" $current={currLocation === '/login' && true}>
              <Button>회원</Button>
            </ScLink>
          </Li>
        )}
      </BtnUl>
    </NavContainer>
  );
};

export default Menubar;
