import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import pathLogo from "../assets/path_logo.svg";

import { 
  Typography 
 } from "@mui/material";
import {
  JoinFull, DirectionsWalk, PedalBike, DirectionsBus, 
  DirectionsSubway, ElectricScooter, DirectionsCarFilled
 } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

// https://blog.logrocket.com/react-router-v6-future-reach-router/
// https://velog.io/@wiostz98kr/TIL50-l-React-Router-match.params-location.search
// http://www.tcpschool.com/css/css3_transform_2Dtransform

const SideNav = styled.nav`
  position: fixed;
  left: 95px;
  z-index:100;
  background-color: white;
  box-shadow: 3px 3px 3px gray;
  width: 390px;
  height: 100%;
`;

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

const Top = styled.ul`
  position: fixed;
  top: 10px;
  left: 110px;
  display: grid;
  grid-template-columns: 50px 50px 50px 50px 50px 50px 50px;
`;

const Top2 = styled.li`
  text-align: center;
`;

// 미사용
const Top1 = styled.div`
  position: fixed;
  top:50px;
  left: 120px;
  font-size: 12px;
  display: grid;
  grid-template-columns: 52px 46px 52px 52px 53px 45px 50px;
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
  width: 95px;
  text-align: center;
  font-size: 16px;
  border-bottom: 3px solid ${(props) => (props.$current ? "#E30914" : "transparent")};
`;

const Button = styled.button`
  background: none;
  font-size: 62.5%;
  border: 2px solid #fff;
  border-radius: 5px;
  color: #fff;
  display: block;
  font-size: 0.4em;
  font-weight: bold;
  margin: 1em auto;
  padding: 1.5em 4em;
  position: relative;
  text-transform: uppercase;

  ::before;
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
  };
  
  &:hover {
    color: #2ecc71;
  };
  &:hover:after {
    width: 100%;
  }

`;

const ScLink = styled(NavLink)`
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.$current ? "#E30914" : "white")};
  @media (max-width: 768px) {
    height: 50px;
  }
`;

const Nav = () => {
  const location = useLocation();
  const [currLocation, setCurrLocation] = useState(null);

  useEffect(()=>{
    setCurrLocation(location.pathname);
  }, [location]);

  return (
    <div className="Sidebar">
      <SideNav>
        <Top>
          <Top2>
            <IconButton color="primary">
              <JoinFull />
            </IconButton>
            <Typography variant="subtitle2">통합</Typography>
          </Top2>
          <Top2>
            <IconButton color="primary">
              <DirectionsBus />
            </IconButton>
            <Typography variant="subtitle2">버스</Typography>
          </Top2>
          <Top2>
            <IconButton color="primary">
              <DirectionsSubway />
            </IconButton>
            <Typography variant="subtitle2">지하철</Typography>
          </Top2>
          <Top2>
            <IconButton color="primary">
              <ElectricScooter />
            </IconButton>
            <Typography variant="subtitle2">킥보드</Typography>
          </Top2>
          <Top2>
            <IconButton color="primary">
              <PedalBike />
            </IconButton>
            <Typography variant="subtitle2">자전거</Typography>
          </Top2>
          <Top2>
            <IconButton color="primary">
              <DirectionsWalk />
            </IconButton>
            <Typography variant="subtitle2">도보</Typography>
          </Top2>
          <Top2>
            <IconButton color="primary">
              <DirectionsCarFilled />
            </IconButton>
            <Typography variant="subtitle2">자동차</Typography>
          </Top2>
        </Top>

      </SideNav>
      <NavContainer>
        <Ul>
          <Image>
            <ScLink to="/"></ScLink>
          </Image>
        </Ul>
        <Ul>
          <Li $current={currLocation === "/" && true}>
            <ScLink to="/" $current={currLocation === "/" && true}>
              원클릭 패쓰
            </ScLink>
          </Li>
          <Li $current={currLocation === "/oder" && true}>
            <ScLink to="/oder" $current={currLocation === "/oder" && true}>
              원클릭 오더
            </ScLink>
          </Li>
          <Li $current={currLocation === "/mobility" && true}>
            <ScLink to="/mobility" $current={currLocation === "/mobility" && true}>
              이동수단
            </ScLink>
          </Li>
          <Li $current={currLocation === "/carPool" && true}>
            <ScLink to="/carPool" $current={currLocation === "/carPool" && true}>
              카풀
            </ScLink>
          </Li>
          <Li $current={currLocation === "/community" && true}>
            <ScLink to="/community" $current={currLocation === "/community" && true}>
              고객센터
            </ScLink>
          </Li>
        </Ul>
        <Ul>
          <Li $current={currLocation === "/login" && true}>
            <ScLink to="/login" $current={currLocation === "/login" && true}>
              <Button>회원</Button>
            </ScLink>
          </Li>
        </Ul>
      </NavContainer>
    </div>
  );
};

export default Nav;