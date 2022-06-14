import styled from "styled-components";

const SideNav = styled.nav`
  position: fixed;
  left: 95px;
  z-index: 5;
  background-color: ${(props) => props.clicked ? "white;" : "white" };
  box-shadow: ${(props) => props.clicked ? "3px 3px 3px gray;" : "none" };
  width: 390px;
  height: 100%;
  display: block;
  transform: translatex(${(props) => props.clicked ? "0%" : "-100%" });
  transition: transform 0.3s ease-in-out;
`;

const WrapBarCloseBtn = styled.div`
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
  z-index: 100;
`;
// #check-btn { display:none; }
const BarCloseBtn = styled.button`
  margin: 0;
  border: 0;
  padding: 0;
  appearance: none;
  background-color: transparent;
  cursor: pointer;
  line-height: inherit;
  border-radius: 0;
  background-image: url(https://ssl.pstatic.net/static/maps/v5/pc/20220512184234/home.png);
  background-size: 508px 492px;
  background-position: -428px ${(props) => props.clicked ? "-245px;" : "-345px" };
  overflow: hidden;
  display: inline-block;
  width: 22px;
  height: 50px;
  font-size: 0;
  color: transparent;
  vertical-align: top;
`;

export { SideNav, WrapBarCloseBtn, BarCloseBtn }