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
  ScrollArea, DirectionIndexSearchHistory, InstantBox, TitleBox, InstantTitle, 
  SearchStandby, NoResultText, HistoryList, HistoryListPlace, HistoryItemPlace, 
  LinkPlace, IconBox, PlaceBox, PlaceTextBox, PlaceText, IconRoute, 
  DirectionIndexFavorites, EmptyBox, FavoritesText, LinkLogin, 
  DirectionSummaryList, DirectionSummarySpace, ScrollInner, SearchResultList,
  SwitchButton, DeleteBtn, 
} from "./styles/PathStyles";
import useInputForm from "./hooks/useInputForm";
import PathList from "./PathList";

function PathMain() {
  const { 
    SPoint, APoint, jusoOption, loading, pathList, historyList, userInfo, 
    onchangeSP, onchangeAP, refreshPoints, switchPoints, 
    deletePathFindingHistory, wayFind, pathDrawing, historyFind,
  } = useInputForm()
  // console.log(pathList)
  // (int) 1-지하철, 2-버스, 3-도보, 4 퍼스널 모빌리티(예정)

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
                  sx={{ 
                    backgroundColor: '#3396ff', 
                    width: 80, height: 35, 
                    marginLeft: "84px", 
                    paddingLeft: "13px" 
                  }}
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
                    <PathList 
                      list={pathList} 
                      click={pathDrawing}
                    ></PathList>
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
                      {
                        historyList.length != 0 ? (
                          <InstantBox>
                            <HistoryList>
                              <InstantBox>
                                <HistoryListPlace>
                                  {/* 최근 검색 데이터 */}
                                  {
                                    historyList.map((item, idx)=>{
                                      return (
                                        <HistoryItemPlace key={idx}>
                                          <LinkPlace onClick={()=>{historyFind(item)}}>
                                            <IconBox>
                                              {/* type에 맞는 아이콘 설정 */}
                                              {/* item.type */}
                                            </IconBox>
                                            <PlaceBox>
                                              <PlaceTextBox>
                                                <PlaceText>
                                                  {item.startName}
                                                </PlaceText>
                                                <IconRoute>→</IconRoute>
                                                <PlaceText>
                                                  {item.goalName}
                                                </PlaceText>
                                              </PlaceTextBox>
                                            </PlaceBox>
                                          </LinkPlace>
                                          <DeleteBtn 
                                            onClick={()=>deletePathFindingHistory(
                                              item.type, item.startId, item.goalId
                                            )}
                                          >
                                            삭제
                                          </DeleteBtn>
                                        </HistoryItemPlace>
                                      )
                                    })
                                  }
                                  {/* <button onClick={deletePathFindingHistory}>삭제</button> */}
                                </HistoryListPlace>
                                {/* 더보기 btn */}

                              </InstantBox>
                            </HistoryList>
                          </InstantBox>
                        ) : (
                        <EmptyBox>
                          <NoResultText>
                            검색 기록이 없습니다
                          </NoResultText>
                        </EmptyBox>
                      )}
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
                      {userInfo.id == 0 || userInfo.loginId == 'anonymous' ? (
                        <>
                          <FavoritesText>
                            로그인 하면 즐겨찾기한 경로를 빠르게 확인할 수 있습니다
                          </FavoritesText>
                          <Link to="/login">
                            <LinkLogin>
                              로그인
                            </LinkLogin>
                          </Link>
                        </>
                        ) : (
                          <>
                            <FavoritesText>
                              즐겨찾기한 경로가 존재하지않습니다.
                            </FavoritesText>
                          </>
                      )}
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