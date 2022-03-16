import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledDiv = styled.div`
  font-size: 40px;
  color: white;
`;

const WrapNav = styled.div`
  padding-top: 25px;
  padding-left: 400px;
  position: absolute;
  top: 0px;
  width: 100%;
  height: 80px;
  display: grid;
  overflow: hidden;
  background-color: black;
  box-shadow: 5px 5px 7px gray;
  grid-template-columns: 250px 250px 310px 140px 250px;
`;

const TitleNav = styled.div`
  position: absolute;
  top: 16px;
  left: 35px;
  font-size: 50px;
  color: white;
`;

const ButtonNav = styled.button`
  position: absolute;
  top: 30px;
  left: 1680px;
  width: 90px;
  height: 50px;
  border: 1px solid rgb(75, 130, 231);
  border-radius: 6px;
  background-color: rgb(75, 130, 231);
  color: white;
  font-size: 20px;
  font-family: "font";
`;

function TopNav(){
    return (
      <WrapNav>
        <TitleNav>Path 콕!</TitleNav>
        <StyledDiv><Link to="/" style={{ textDecoration: 'none', color: "white" }}>원클릭 패스</Link></StyledDiv>
        <StyledDiv><Link to="/oder" style={{ textDecoration: 'none', color: "white" }}>원클릭 오더</Link></StyledDiv>
        <StyledDiv><Link to="/mobility" style={{ textDecoration: 'none', color: "white" }}>이동수단 조회</Link></StyledDiv>
        <StyledDiv><Link to="/carpool" style={{ textDecoration: 'none', color: "white" }}>카풀</Link></StyledDiv>
        <StyledDiv><Link to="/community" style={{ textDecoration: 'none', color: "white" }}>고객센터</Link></StyledDiv>
        <Link to="/login">
          <ButtonNav>Login</ButtonNav>
        </Link>
      </WrapNav>
    );
}

export default TopNav;
