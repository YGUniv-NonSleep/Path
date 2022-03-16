import styled from "styled-components";

const StyledMap = styled.div`
    display: block;
    width: 1000px;
    height: 600px;
`;

function Map() {
    return (
        <StyledMap id="map"></StyledMap>
    )
}

export default Map;