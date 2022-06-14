import styled from "styled-components";

const SideNav = styled.nav`
  position: fixed;
  left: 95px;
  z-index: 5;
  background-color: white;
  box-shadow: 3px 3px 3px gray;
  width: 390px;
  height: 100%;
`;

const OderCon = styled.div`
    width: 390px;
    height: 100%;
`;

const OderSubCon = styled.div`
    margin-left: 130px;
`;

export { SideNav, OderCon, OderSubCon }