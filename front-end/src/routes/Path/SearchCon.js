import styled from "styled-components";
import { useEffect, useState } from 'react';
import { TextField, Autocomplete, Button, Box, Typography, Grid } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';

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

// margin-top: 90px;

function SearchCon(props) {
    console.log(props.juso)
  return (
    <>
      <SideNav>
        <SearchArea>
            <>
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
                <Box sx={{ width: 350 }} >
                    <Stack direction="row" spacing={2}>
                        <Grid>
                            <Button 
                                variant="outlined" 
                                sx={{ width: 80, height: 35, marginRight: "10px" }} 
                                startIcon={<AutorenewIcon sx={{marginLeft: -1}} />}
                                onClick={props.juso.refreshPoints}
                            ><Typography variant="inherit" sx={{ width: 40, fontSize: 10 }}>다시입력</Typography>
                            </Button>
                            <Button variant="outlined" sx={{ width: 80, height: 35 }} startIcon={<AddIcon sx={{marginLeft: -1}} />}>
                                <Typography variant="inherit" sx={{ fontSize: 10 }}>경유지</Typography>
                            </Button>
                        </Grid>
                        <Grid >
                            <Button 
                                variant="contained" 
                                sx={{ width: 80, height: 35, marginLeft: "84px" }} 
                                endIcon={<ChevronRightIcon sx={{marginRight: -1}} />}
                                // onClick={props.juso.wayFind}
                            ><Typography variant="inherit" align="left" sx={{ fontSize: 11 }}>길 찾기</Typography>
                            </Button>
                        </Grid>
                    </Stack>
                </Box>
            </>
        {/* <directions-search _ngcontent-jis-c204="" _nghost-jis-c171="">
            <div _ngcontent-jis-c171="" class="search_box">
              <directions-search-box
                _ngcontent-jis-c171=""
                _nghost-jis-c170=""
                class="directions-search-item-el droppable item_search start"
              >
                <div _ngcontent-jis-c170="" class="search_inner valued">
                  <div _ngcontent-jis-c170="" class="input_area">
                    <span
                      _ngcontent-jis-c170=""
                      class="icon_route start ng-star-inserted"
                    ></span>
                    <div _ngcontent-jis-c170="" class="input_box">
                      <label
                        _ngcontent-jis-c170=""
                        class="input_label blind"
                        for="directionStart0"
                      >
                        출발지 입력
                      </label>
                      <input
                        _ngcontent-jis-c170=""
                        type="text"
                        autocomplete="off"
                        class="directions-search-input-el input_search ng-pristine ng-valid ng-touched"
                        id="directionStart0"
                      />
                    </div>
                    <div
                      _ngcontent-jis-c170=""
                      class="tooltip ng-star-inserted"
                    >
                      {" "}
                      끌어서 이동{" "}
                    </div>
                  </div>
                </div>
              </directions-search-box>
              <directions-search-box
                _ngcontent-jis-c171=""
                _nghost-jis-c170=""
                class="directions-search-item-el droppable item_search"
              >
                <div _ngcontent-jis-c170="" class="search_inner valued">
                  <div _ngcontent-jis-c170="" class="input_area">
                    <span
                      _ngcontent-jis-c170=""
                      class="icon_route end ng-star-inserted"
                    ></span>
                    <div _ngcontent-jis-c170="" class="input_box">
                      <label
                        _ngcontent-jis-c170=""
                        class="input_label blind"
                        for="directionGoal1"
                      >
                        도착지 입력
                      </label>
                      <input
                        _ngcontent-jis-c170=""
                        type="text"
                        autocomplete="off"
                        class="directions-search-input-el input_search ng-untouched ng-pristine ng-valid"
                        id="directionGoal1"
                      />
                    </div>
                    <div
                      _ngcontent-jis-c170=""
                      class="tooltip ng-star-inserted"
                    >
                      {" "}
                      끌어서 이동{" "}
                    </div>
                  </div>
                </div>
              </directions-search-box>
              <button
                _ngcontent-jis-c171=""
                type="button"
                class="btn_switch ng-star-inserted"
                title="출발지/도착지 전환"
              ></button>
            </div>
            <div _ngcontent-jis-c171="" class="btn_box">
              <button
                _ngcontent-jis-c171=""
                type="button"
                class="btn btn_clear"
              >
                {" "}
                다시입력{" "}
              </button>
              <button
                _ngcontent-jis-c171=""
                type="button"
                class="btn btn_direction active"
              >
                {" "}
                길찾기{" "}
              </button>
            </div>
            <div _ngcontent-jis-c171="" class="empty-search-box">
              <div _ngcontent-jis-c171="" class="empty-search-box-guide"></div>
            </div>
        </directions-search> */}
        </SearchArea>
        <DirectionSummaryList>asd</DirectionSummaryList>
      </SideNav>
    </>
  );
}

export default SearchCon;
