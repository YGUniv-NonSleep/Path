import styled from "styled-components";

const StyledMap = styled.div`
    width: 100%;
    height: 100vh;
    z-index: 2;
`;

function Map() {
    return (
        <StyledMap id="map"></StyledMap>
    )
}

export default Map;
