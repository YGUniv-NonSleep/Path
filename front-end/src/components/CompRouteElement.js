import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Ul = styled.ul`
  display: flex-inline;
  align-items: center;
  width: 100%;
`;

const Li = styled.li`
  padding: 10px 0px 5px 0px;
  width: 95px;
  text-align: center;
  font-size: 16px;
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

const CompRouteElement = () => {
  const location = useLocation();
  const [currLocation, setCurrLocation] = useState(null);

  useEffect(() => {
    setCurrLocation(location.pathname);
  }, [location]);

  return (
    <Ul>
      <Li $current={currLocation === "/company" && true}>
        <ScLink to="/company" $current={currLocation === "/company" && true}>
          메인 화면
        </ScLink>
      </Li>
      <Li $current={currLocation === "/company/store" && true}>
        <ScLink to="/company/store" $current={currLocation === "/company/store" && true}>
          마이 업체
        </ScLink>
      </Li>
      <Li $current={currLocation === "/company/manage" && true}>
        <ScLink to="/company/manage" $current={currLocation === "/company/manage" && true}>
          업체 관리
        </ScLink>
      </Li>
    </Ul>
  );
};

export default CompRouteElement;
