import styled from "styled-components";

const StyledMap = styled.div`
    maxWidth: 100vh;
    height: 100vh;
`;

function Map() {
    return (
        <StyledMap id="map"></StyledMap>
    )
}

export default Map;