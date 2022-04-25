import { Link } from "react-router-dom";
import styled from "styled-components"

const NotFoundWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
`;

const NotFoundContent = styled.div`
    font-size: 2.3rem;
    margin-top: 10px;
    margin-left: 30px;
`;

function PageNotFound() {
  return (
    <NotFoundWrapper>
        <h1 style={{ color: "red", fontSize: 95 }}>404</h1>
        <NotFoundContent>
            <div>Page Not Found</div>
            <Link to="/">Go Home</Link>
        </NotFoundContent>
    </NotFoundWrapper>
  );
}

export default PageNotFound;
