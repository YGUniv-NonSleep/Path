import styled from "styled-components";

const Topdiv = styled.div`
    width: 100%;
    height: 150px;
`;

function Top({text}) {
    return (
        <Topdiv>
            <div>{text}</div>
        </Topdiv>
    )
}

export default Top;
