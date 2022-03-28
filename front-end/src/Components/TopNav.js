import styles from "./TopNav.module.css"
import { Link } from "react-router-dom";
import styled from "styled-components";


const StyledDiv = styled.div`
    font-size: 40px;
    color: white;
`; 

function TopNav(){
    return (
        <div className={styles.wrap}>
        <div className={styles.title}>Path 콕!</div>
        <StyledDiv><Link to="/" style={{ textDecoration: 'none', color: "white" }}>원클릭 패스</Link></StyledDiv>
        <StyledDiv><Link to="/oder" style={{ textDecoration: 'none', color: "white" }}>원클릭 오더</Link></StyledDiv>
        <StyledDiv><Link to="/mobility" style={{ textDecoration: 'none', color: "white" }}>이동수단 조회</Link></StyledDiv>
        <StyledDiv><Link to="/carpool" style={{ textDecoration: 'none', color: "white" }}>카풀</Link></StyledDiv>
        <StyledDiv><Link to="/community" style={{ textDecoration: 'none', color: "white" }}>고객센터</Link></StyledDiv>
      <Link to="/login" variant="body2">
        <button type="button" className={styles.btn}>Login</button>
      </Link>
        </div>
    
    );
}

export default TopNav;