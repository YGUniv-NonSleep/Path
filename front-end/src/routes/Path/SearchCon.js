import styled from "styled-components";
import { useEffect, useState } from "react";
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
  height: 30%;
  margin-left: 20px;
  margin-top: 35px;
`;

const DirectionSummaryList = styled.div`
  position: relative;
  height: 70%;
`;
// width: 150px,
//   height: 150px,
//   borderRadius: 70%
const SwitchButton = styled(Button)`
  
  border: 1px solid #3b8c9a;
    	cursor:pointer; cursor:hand;
  	background-color: #3b8c9a;
  	color: white;
  	padding: 5px;
  	border-radius: 2em;
`;

function SearchCon(props) {
  // console.log(props.juso)
  return (
    <>
      <SideNav>
        <SearchArea>
          <Autocomplete
            value={props.juso.sp}
            onInputChange={props.juso.onchangeSP}
            id="sp-input"
            options={props.juso.jusoValue}
            sx={{ width: 350 }}
            renderInput={(params) => <TextField {...params} label="Start" />}
          ></Autocomplete>
          <Autocomplete
            value={props.juso.ap}
            onInputChange={props.juso.onchangeAP}
            id="ap-input"
            options={props.juso.jusoValue}
            sx={{ width: 350 }}
            renderInput={(params) => <TextField {...params} label="Arrival" />}
          ></Autocomplete>
          <SwitchButton variant="outlined" onClick={props.juso.switchPoints}>스위칭</SwitchButton>

          <Box sx={{ width: 350 }}>
            <Stack direction="row" spacing={2}>
              <Grid>
                <Button
                  variant="outlined"
                  sx={{ width: 80, height: 35, marginRight: "10px" }}
                  startIcon={<AutorenewIcon sx={{ marginLeft: -1 }} />}
                  onClick={props.juso.refreshPoints}
                >
                  <Typography
                    variant="inherit"
                    sx={{ width: 40, fontSize: 10 }}
                  >
                    다시입력
                  </Typography>
                </Button>
                <Button
                  variant="outlined"
                  sx={{ width: 80, height: 35 }}
                  startIcon={<AddIcon sx={{ marginLeft: -1 }} />}
                >
                  <Typography variant="inherit" sx={{ fontSize: 10 }}>
                    경유지
                  </Typography>
                </Button>
              </Grid>
              <Grid>
                <Button
                  variant="contained"
                  sx={{ width: 80, height: 35, marginLeft: "84px" }}
                  endIcon={<ChevronRightIcon sx={{ marginRight: -1 }} />}
                  // onClick={props.juso.wayFind}
                >
                  <Typography
                    variant="inherit"
                    align="left"
                    sx={{ fontSize: 11 }}
                  >
                    길 찾기
                  </Typography>
                </Button>
              </Grid>
            </Stack>
          </Box>
        </SearchArea>
        <DirectionSummaryList>asd</DirectionSummaryList>
      </SideNav>
    </>
  );
}

export default SearchCon;
