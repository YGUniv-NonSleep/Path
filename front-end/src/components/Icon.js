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
  DirectionsCarFilled,
} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

// https://blog.logrocket.com/react-router-v6-future-reach-router/
// https://velog.io/@wiostz98kr/TIL50-l-React-Router-match.params-location.search
// http://www.tcpschool.com/css/css3_transform_2Dtransform

const Ul = styled.ul`
  position: relative;
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
        <IconButton color="primary">
          <DirectionsBus />
        </IconButton>
        <Typography variant="subtitle2">버스</Typography>
      </Li>

      <Li>
        <IconButton color="primary">
          <DirectionsSubway />
        </IconButton>
        <Typography variant="subtitle2">지하철</Typography>
      </Li>

      <Li>
        <IconButton color="primary">
          <ElectricScooter />
        </IconButton>
        <Typography variant="subtitle2">킥보드</Typography>
      </Li>

      <Li>
        <IconButton color="primary">
          <PedalBike />
        </IconButton>
        <Typography variant="subtitle2">자전거</Typography>
      </Li>

      <Li>
        <IconButton color="primary">
          <DirectionsWalk />
        </IconButton>
        <Typography variant="subtitle2">도보</Typography>
      </Li>

      <Li>
        <IconButton color="primary">
          <DirectionsCarFilled />
        </IconButton>
        <Typography variant="subtitle2">자동차</Typography>
      </Li>
    </Ul>
  );
};

export default Icon;