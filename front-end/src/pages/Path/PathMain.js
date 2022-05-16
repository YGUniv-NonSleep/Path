import Map from "../../components/Map";
import PathList from "./PathList";

import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
  TextField,
  Autocomplete,
  Button,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import Icon from "../../components/Icon"
import useInputForm from "./hooks/useInputForm";

const SideNav = styled.nav`
  position: fixed;
  left: 95px;
  z-index: 5;
  background-color: white;
  box-shadow: 3px 3px 3px gray;
  width: 390px;
  height: 100%;
`;

const SearchArea = styled.div`
  position: relative;
  height: 25%;
  margin-left: 20px;
  margin-top: 5px;
`;

const DirectionSummaryList = styled.div`
  position: relative;
  height: 75%;
  overflow: auto;
`;

const SwitchButton = styled.button`
  z-index: 5;
  position: absolute;
  left: 280px;
  top: 103px;
  border: 1px solid #9E9E9E;
  cursor:pointer; cursor:hand;
  background-color: white;
  width: 30px;
  height: 30px;
  -webkit-border-radius: 30px;
`;

function PathMain() {
  const { 
    SPoint, APoint, jusoOption, loading, 
    onchangeSP, onchangeAP, refreshPoints, switchPoints, wayFind, pathDrawing
  } = useInputForm()

  return (
    <div className="Path">
      {loading ? null : <h2>로드 중...</h2>}
      <SideNav>
        <SearchArea>
          <Icon></Icon>
          <Autocomplete
            value={SPoint}
            onInputChange={onchangeSP}
            id="sp-input"
            options={jusoOption}
            sx={{ width: 350 }}
            renderInput={(params) => <TextField {...params} label="Start" />}
          ></Autocomplete>
          <Autocomplete
            value={APoint}
            onInputChange={onchangeAP}
            id="ap-input"
            options={jusoOption}
            sx={{ width: 350 }}
            renderInput={(params) => <TextField {...params} label="Arrival" />}
          ></Autocomplete>
          <SwitchButton onClick={switchPoints}>↑↓</SwitchButton>
          <Box sx={{ width: 350, marginTop: 1 }}>
            <Stack direction="row" spacing={2}>
              <Grid>
                <Button
                  variant="outlined"
                  sx={{ width: 80, height: 35, marginRight: "10px" }}
                  startIcon={<AutorenewIcon sx={{ marginLeft: -1 }} />}
                  onClick={refreshPoints}
                ><Typography variant="inherit" sx={{ width: 40, fontSize: 10 }}>
                  다시입력
                  </Typography>
                </Button>
                <Button
                  variant="outlined"
                  sx={{ width: 80, height: 35 }}
                  startIcon={<AddIcon sx={{ marginLeft: -1 }} />}
                ><Typography variant="inherit" sx={{ fontSize: 10 }}>
                  경유지
                 </Typography>
                </Button>
              </Grid>
              <Grid>
                <Button
                  variant="contained"
                  sx={{ width: 80, height: 35, marginLeft: "84px" }}
                  endIcon={<ChevronRightIcon sx={{ marginRight: -1 }} />}
                  onClick={wayFind}
                ><Typography variant="inherit" align="left" sx={{ fontSize: 11 }}>
                  길 찾기
                 </Typography>
                </Button>
              </Grid>
            </Stack>
          </Box>
        </SearchArea>
        <DirectionSummaryList>
          <button onClick={() => pathDrawing(0)}>0</button>
          
        </DirectionSummaryList>
      </SideNav>
      <Map />
    </div>
  );
}
PathMain.propTypes = {
  // ex) prop: PropTypes.type.isRequired,
  loading: PropTypes.bool.isRequired,
};
export default PathMain;