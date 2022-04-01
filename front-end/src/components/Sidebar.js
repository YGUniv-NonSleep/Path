import {Link, Route, Switch, BrowserRouter as Router} from "react-router-dom";
import styled from "styled-components";
import Icon from "./Icon";

// https://blog.logrocket.com/react-router-v6-future-reach-router/
// https://velog.io/@wiostz98kr/TIL50-l-React-Router-match.params-location.search
// http://www.tcpschool.com/css/css3_transform_2Dtransform

const SideNav = styled.nav`
  position: fixed;
  left: 95px;
  z-index:5;
  background-color: white;
  box-shadow: 3px 3px 3px gray;
  width: 390px;
  height: 100%;
`;

const BarContainer = styled.div`
  z-index: 10
  width: 390px;
  height: 90%;
  margin-top: 90px;
`;

const Sidebar = () => {
  
  return (
      <SideNav>
        <Icon />
        <BarContainer>
          
        </BarContainer>
      </SideNav>
  );
};

export default Sidebar;
