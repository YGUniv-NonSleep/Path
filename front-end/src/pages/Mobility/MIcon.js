import { Link } from "react-router-dom";
import { Typography, IconButton } from "@mui/material";
import {
  PedalBike,
  DirectionsBus,
  DirectionsSubway,
  ElectricScooter,
} from "@mui/icons-material";
import styled from "styled-components";

// https://blog.logrocket.com/react-router-v6-future-reach-router/
// https://velog.io/@wiostz98kr/TIL50-l-React-Router-match.params-location.search
// http://www.tcpschool.com/css/css3_transform_2Dtransform

const Ul = styled.ul`
  position: absolute;
  z-index:10;
  top: 10px;
  left: 10px;
  display: grid;
  grid-template-columns: 90px 90px 90px 90px;
`;

const Li = styled.li`
  text-align: center;
`;

const MIcon = () => {
  return (
    <Ul>
      <Li>
        <Link to="/mobility/bus" style={{ color: "black" }}>
          <IconButton color="primary">
            <DirectionsBus />
          </IconButton>
          <Typography variant="subtitle2">버스</Typography>
        </Link>
      </Li>

      <Li>
        <Link to="/mobility/subway" style={{ color: "black" }}>
          <IconButton color="primary">
            <DirectionsSubway />
          </IconButton>
          <Typography variant="subtitle2">지하철</Typography>
        </Link>
      </Li>

      <Li>
        <Link to="/mobility/scooter" style={{ color: "black"}}>
        <IconButton color="primary">
          <ElectricScooter />
        </IconButton>
        <Typography variant="subtitle2">킥보드</Typography>
        </Link>
      </Li>

      <Li>
        <Link to="/mobility/Bike" style={{ color: "black"}}>
        <IconButton color="primary">
          <PedalBike />
        </IconButton>
        <Typography variant="subtitle2">자전거</Typography>
        </Link>
      </Li>
    </Ul>
  );
};

export default MIcon;