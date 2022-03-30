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

const PathRouteElement = () => {
  const location = useLocation();
  const [currLocation, setCurrLocation] = useState(null);

  useEffect(() => {
    setCurrLocation(location.pathname);
  }, [location]);

  return (
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
  );
};

export default PathRouteElement;
