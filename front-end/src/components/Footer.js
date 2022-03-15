import styled from "styled-components";

const Footerdiv = styled.div`
    width: 100%;
    height: 100px;
`;

function Footer({text}) {
    return (
        <Footerdiv>
            {text}
        </Footerdiv>
    )
}

export default Footer;
