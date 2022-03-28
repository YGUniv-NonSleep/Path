import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import pathLogo from "../assets/path_logo.svg";

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
  position:absolute;
  top: 90%;
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
    color:#E30914 ;
    
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

const Menubar = () => {
  const location = useLocation();
  const [currLocation, setCurrLocation] = useState(null);

  useEffect(()=>{
    setCurrLocation(location.pathname);
  }, [location]);

  return (
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
        <BtnUl>
          <Li $current={currLocation === "/login" && true}>
            <ScLink to="/login" $current={currLocation === "/login" && true}>
              <Button>회원</Button>
            </ScLink>
          </Li>
        </BtnUl>
      </NavContainer>
  );
};

export default Menubar;
