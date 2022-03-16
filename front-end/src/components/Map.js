import styled from "styled-components";

const StyledMap = styled.div`
    position: absolute;
    top: 115px;
    left: 550px;
    width: 700px;
    height:600px;
`;

function Map() {
    return (
        <StyledMap id="map"></StyledMap>
    )
}

export default Map;