import Map from "../../components/Map";

import { Link } from "react-router-dom";
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
import Icon from "../../components/Icon";
import { 
  SideNav, SearchArea, 
  ScrollArea, ScrollAreaInner, DirectionIndexSearchHistory, InstantBox, TitleBox, InstantTitle, 
  SearchStandby, HistoryList, HistoryListPlace, HistoryItemPlace, LinkPlace, IconBox, PlaceBox, PlaceText, IconRoute, 
  DirectionIndexFavorites, EmptyBox, FavoritesText, LinkLogin, 
  DirectionSummaryList, DirectionSummarySpace, ScrollInner, SearchResultList, PathInserted, DirectionSummaryItemTransit, 
  SwitchButton,  
} from "./styles/PathStyles";
import useInputForm from "./hooks/useInputForm";

function PathMain() {
  const { 
    SPoint, APoint, jusoOption, loading, pathList, 
    onchangeSP, onchangeAP, refreshPoints, switchPoints, 
    savePathFindingHistory, deletePathFindingHistory, 
    wayFind, pathDrawing 
  } = useInputForm()

  console.log(pathList)

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
        { pathList != undefined && pathList.length != 0 ? (
            <DirectionSummaryList>
              <DirectionSummarySpace>
                <ScrollInner>
                  {/* results */}
                  <SearchResultList>
                    {
                      pathList.map((item)=>{
                        // console.log(item)
                        return (
                          <PathInserted>
                            <DirectionSummaryItemTransit>
                              <div>{item.totalTime}</div>
                              <button onClick={() => pathDrawing(1)}>0</button> 
                            </DirectionSummaryItemTransit>
                          </PathInserted>
                        )
                      })
                    }
                  </SearchResultList>
                </ScrollInner>
                {/* bookmark -> favorites 기능, 요약 정보 컴포넌트 */}
              </DirectionSummarySpace>
            </DirectionSummaryList>
          ) : (
            <ScrollArea>
              <ScrollInner>
                <SearchResultList>
                  <InstantBox>
                    <TitleBox>
                      <InstantTitle>
                        최근 검색
                      </InstantTitle>
                    </TitleBox>
                    <SearchStandby>
                      <InstantBox>
                        <HistoryList>
                          <InstantBox>
                            <HistoryListPlace>
                              {/* 최근 검색 데이터 */}
                              <div>리스트 데이터 없음</div>
                              <button onClick={savePathFindingHistory}>추가</button>
                              <button onClick={deletePathFindingHistory}>삭제</button>
                            </HistoryListPlace>
                            {/* 더보기 btn */}

                          </InstantBox>
                        </HistoryList>
                      </InstantBox>
                    </SearchStandby>
                  </InstantBox>
                </SearchResultList>
                <DirectionIndexFavorites>
                  <InstantBox>
                    <TitleBox>
                      <InstantTitle>
                        즐겨찾기
                      </InstantTitle>
                    </TitleBox>
                    <EmptyBox>
                      <FavoritesText>
                        로그인 하면 즐겨찾기한 경로를 빠르게 확인할 수 있습니다
                      </FavoritesText>
                      <Link to="/login">
                        <LinkLogin>
                          로그인
                        </LinkLogin>
                      </Link>
                    </EmptyBox>
                  </InstantBox>
                </DirectionIndexFavorites>
              </ScrollInner>
            </ScrollArea>
        )}
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