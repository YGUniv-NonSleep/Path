import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";
import { Typography } from "@mui/material";
import {
  JoinFull,
  DirectionsWalk,
  PedalBike,
  DirectionsBus,
  DirectionsSubway,
  ElectricScooter,
  DirectionsCarFilled
} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

// https://blog.logrocket.com/react-router-v6-future-reach-router/
// https://velog.io/@wiostz98kr/TIL50-l-React-Router-match.params-location.search
// http://www.tcpschool.com/css/css3_transform_2Dtransform

const Ul = styled.ul`
  position: fixed;
  top: 10px;
  left: 110px;
  display: grid;
  grid-template-columns: 50px 50px 50px 50px 50px 50px 50px;
`;

const Li = styled.li`
  text-align: center;
`;

const Icon = () => {
  return (
    <Ul>
      <Li>
        <IconButton color="primary">
          <JoinFull />
        </IconButton>
        <Typography variant="subtitle2">통합</Typography>
      </Li>

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

      <Li>
      <Link to="/mobility/walk" style={{ color: "black" }}>
      <IconButton color="primary">
          <DirectionsWalk />
        </IconButton>
        <Typography variant="subtitle2">도보</Typography>
        </Link>
      </Li>
      
      <Li>
        <Link to="/mobility/car" style={{ color: "black" }}>
        <IconButton color="primary">
          <DirectionsCarFilled />
        </IconButton>
        <Typography variant="subtitle2">자동차</Typography>
        </Link>
      </Li>
    </Ul>
  );
};

export default Icon;
