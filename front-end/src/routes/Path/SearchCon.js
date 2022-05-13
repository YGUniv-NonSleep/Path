import styled from "styled-components";
import { useEffect, useState } from "react";
import PathList from "./PathList";
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
`;
// width: 150px,
//   height: 150px,
//   borderRadius: 70%
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

function SearchCon(props) {
  let jusoOption = props.juso.jusoValue.map((it) => {
    // console.log(it)
    return `${it.pN} (${it.aN})`
  })

  return (
    <>
      <SideNav>
        <SearchArea>
          <Icon></Icon>
          <Autocomplete
            value={props.juso.sp}
            onInputChange={props.juso.onchangeSP}
            id="sp-input"
            options={jusoOption}
            sx={{ width: 350 }}
            renderInput={(params) => <TextField {...params} label="Start" />}
          ></Autocomplete>
          <Autocomplete
            value={props.juso.ap}
            onInputChange={props.juso.onchangeAP}
            id="ap-input"
            options={jusoOption}
            sx={{ width: 350 }}
            renderInput={(params) => <TextField {...params} label="Arrival" />}
          ></Autocomplete>
          <SwitchButton onClick={props.juso.switchPoints}>↑↓</SwitchButton>

          <Box sx={{ width: 350, marginTop: 1 }}>
            <Stack direction="row" spacing={2}>
              <Grid>
                <Button
                  variant="outlined"
                  sx={{ width: 80, height: 35, marginRight: "10px" }}
                  startIcon={<AutorenewIcon sx={{ marginLeft: -1 }} />}
                  onClick={props.juso.refreshPoints}
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
                  onClick={props.juso.wayFind}
                ><Typography variant="inherit" align="left" sx={{ fontSize: 11 }}>
                  길 찾기
                 </Typography>
                </Button>
              </Grid>
            </Stack>
          </Box>
        </SearchArea>
        <DirectionSummaryList>
          {/* <button onClick={() => props.juso.pathSearch(0)}>0</button> */}
          <PathList></PathList>
        </DirectionSummaryList>
      </SideNav>
    </>
  );
}

export default SearchCon;
