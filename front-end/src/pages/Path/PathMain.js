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
  font-family: notosanskr,Malgun Gothic,맑은 고딕,Dotum,돋움,sans-serif;
  position: relative;
  height: 25%;
  padding: 10px 20px 15px;
  border-bottom: 1px solid rgb(184, 184, 184);
  z-index: 30;
`;

{/* 경로 검색 전 component */}
const ScrollArea = styled.div`
  position: relative;
  height: 100%;
  max-width: 390px;
  overflow-x: hidden;
  overflow-y: hidden;
`;

{/* 경로 검색 후 component */}
const DirectionSummaryList = styled.div`
  font-family: notosanskr,Malgun Gothic,맑은 고딕,Dotum,돋움,sans-serif;
  position: relative; 
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  width: 390px;
`;

const DirectionSummarySpace = styled.div`
  scrollbar-width: none;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  height: 100%;
`;

const ScrollInner = styled.div`
  width: 390px;
`;

const SearchResultList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  position: relative;
  padding-top: 1px;
  transition: .2s;
`;

const PathInserted = styled.li`
  margin: 0;
  padding: 0;
  list-style: none;
  &:after {
    position: absolute;
    left: 18px;
    right: 18px;
    height: 1px;
    background: rgba(0,0,0,.1);
    content: "";
  }
  &:hover {
    background-color: rgb(240, 251, 255, 0.842);
  }
`; // display: block;

const DirectionSummaryItemTransit = styled.div`
  font-family: notosanskr,Malgun Gothic,맑은 고딕,Dotum,돋움,sans-serif;
  list-style: none;
  position: relative;
  padding: 18px 20px 15px;
  display: block;
`;

const SwitchButton = styled.button`
  z-index: 5;
  position: absolute;
  left: 300px;
  top: 113px;
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
    onchangeSP, onchangeAP, refreshPoints, switchPoints, 
    wayFind, pathDrawing 
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
                  sx={{ width: 80, height: 35, marginRight: "10px", paddingRight: "8px" }}
                  startIcon={<AutorenewIcon sx={{ marginLeft: -1 }} />}
                  onClick={refreshPoints}
                ><Typography variant="inherit" sx={{ marginLeft: -0.5, fontSize: 10 }}>
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
                  sx={{ width: 80, height: 35, marginLeft: "84px", paddingLeft: "13px" }}
                  endIcon={<ChevronRightIcon sx={{ marginRight: -2 }} />}
                  onClick={wayFind}
                ><Typography variant="inherit" align="left" sx={{ fontSize: 12 }}>
                  길찾기
                 </Typography>
                </Button>
              </Grid>
            </Stack>
          </Box>
        </SearchArea>
        <DirectionSummaryList>
          <DirectionSummarySpace>
            <ScrollInner>
              <SearchResultList>
                {/* results */}
                <PathInserted>
                  <DirectionSummaryItemTransit>
                    <button onClick={() => pathDrawing(0)}>0</button>    
                  </DirectionSummaryItemTransit>
                </PathInserted>
                <PathInserted>
                  <DirectionSummaryItemTransit>
                    <button onClick={() => pathDrawing(1)}>1</button>    
                  </DirectionSummaryItemTransit>
                </PathInserted>
                <PathInserted>
                  <DirectionSummaryItemTransit>
                    <button onClick={() => pathDrawing(2)}>2</button>    
                  </DirectionSummaryItemTransit>
                </PathInserted>
              </SearchResultList>
            </ScrollInner>
          </DirectionSummarySpace>
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