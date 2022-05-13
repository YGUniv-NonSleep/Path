import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import pathLogo from '../assets/images/path_logo.svg';
import PathRouteElement from './PathRouteElement';
import CompRouteElement from './CompRouteElement';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

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
  top: 85%;
`;

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

  padding: 1.5em 4em;
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

  useEffect(() => {
    setCurrLocation(location.pathname);
  }, [location]);

  const [memberId, setMemberId] = useState('');

  useEffect(() => {
    tokenReissue();
  }, []);

  // === AccessToken 재발급 == //
  const tokenReissue = () => {
    axios
      .post(process.env.REACT_APP_SPRING_API + '/api/token', '', {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        const authorization = res.headers.authorization;
        // 이후 모든 axios 요청 헤더에 access token값 붙여서 보냄.
        axios.defaults.headers.common['authorization'] = authorization;
        console.log('AccessToken 발급 완료');
        const decoded = tokenDecode(authorization);
        setMemberId(decoded.id);
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.log(err.response.data);
        }
      });
  };

  // === AccessToken 값 디코딩 === //
  const tokenDecode = (authorization) => {
    var decoded = jwt_decode(authorization);
    console.log(decoded);
    return decoded;
  };

  // === 로그아웃 진행 === //
  const userLogOut = () => {
    axios
      .delete(process.env.REACT_APP_SPRING_API + '/api/token', {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setMemberId('');
        console.log('로그아웃');
        window.location.href = '/';
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clickToMember = () => {
    window.location.href = '/member';
  };

  return (
    <NavContainer>
      <Ul>
        <Image>
          <ScLink to="/"></ScLink>
        </Image>
      </Ul>
      <PathRouteElement></PathRouteElement>
      <CompRouteElement></CompRouteElement>
      <BtnUl>
        {memberId != '' ? (
          <Li $current={currLocation === '/logout' && true}>
            <Button onClick={clickToMember}>내 정보</Button>
            <Button onClick={userLogOut}>로그아웃</Button>
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
