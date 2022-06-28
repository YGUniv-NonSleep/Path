import Map from "../../components/Map";
import PropTypes from "prop-types";
import useLoading from "../../hooks/useLoading";
import useOderMain from "./hooks/useOderMain";

import {
  InputAdornment,
  TextField,
  Box,
  Pagination,
  ToggleButtonGroup,
  ToggleButton,
  IconButton, 
} from "@mui/material";
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import SearchIcon from "@mui/icons-material/Search";
import {
  SideNav,
  NavLayout,
  PanelWrap,
  PanelBase,
  SearchBarBox,
  BubbleFilter,
  BubbleFilterListWrap,
  BubbleFilterArea,
  BubbleFilterList,
  BaseCard,
  MainTopSpace,
  SearchPathSpace,
  PathView,
  CombinedSearchList,
  SaltSearchList,
  ExternalFrameBridge,
  SearchFrame,
  PlaceWrap,
  PlaceRoot,
  SortBoxWrap,
  SortBoxInner,
  SortBoxSpace,
  FlickingViewport,
  FlickingCamera,
  SearchBoxWrap,
  SearchList,
  SearchItemSub,
  SearchBoxPagination,
  SubNav,
  EntryLayout,
  EntryCloseBtn,
  EntryCloseBtnSpan,
  WrapBarCloseBtn,
  BarCloseBtn,
} from "./styles/oderStyle";
import CategoryList from "./CategoryList";
import StoreInfo from './StoreInfo';
import PlaceList from './PlaceList';
import StoreMenu from "./StoreMenu";

function OderMain() {
  const { loading } = useLoading();
  const {
    closeToggle,
    animate,
    subBarHide,
    searchData,
    searchPath,
    category,
    placeList,
    page,
    affiliate,
    alignment,
    place,
    pagiObj,
    showStore, 
    prodList, 
    compCateList, 
    handleShowStore, 
    placeTarget,
    handleAlignment,
    keywordSetting,
    pageSetting,
    handleChange,
    onCloseToggle,
    onSubBarClick,
  } = useOderMain();

  return (
    <div className="Oder">
      <SideNav clicked={closeToggle} visible={animate} openSubBar={subBarHide}>
        {loading ? null : <h2>로드 중...</h2>}
        <NavLayout>
          {/* 메인네비바 토글 */}
          <WrapBarCloseBtn onClick={onCloseToggle}>
            <BarCloseBtn clicked={closeToggle} />
          </WrapBarCloseBtn>
          <PanelWrap>
            <PanelBase>
              {/* 입력 창 */}
              <SearchBarBox>
                <Box
                  component="form"
                  noValidate
                  onSubmit={keywordSetting}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    sx={{ width: "340px" }}
                    placeholder="장소, 상품 검색"
                    size="small"
                    id="store"
                    name="store"
                    value={searchData}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {" "}
                          <SearchIcon />{" "}
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </SearchBarBox>
              {/* 버블 카테고리바 */}
              <BubbleFilter subBarOpen={subBarHide}>
                <BubbleFilterListWrap>
                  <BubbleFilterArea>
                    {/* 보이는 카테고리 */}
                    <BubbleFilterList>
                      {/* 카테고리 리스트 */}
                      <CategoryList clicked={handleChange} />
                    </BubbleFilterList>
                  </BubbleFilterArea>
                </BubbleFilterListWrap>
              </BubbleFilter>
              {/* 메인바 컨텐츠, 서브네비바 */}
              <BaseCard>
                <MainTopSpace>
                  {/* 찾은 경로 텍스트로 보여줌 */}
                  <SearchPathSpace>
                    <PathView>
                      {searchPath != null ? (
                        "여기에서 -> 저기로"
                      ) : (
                        <SearchItemSub>
                          검색된 경로가 있을 경우 여기에 표시 됩니다.
                        </SearchItemSub>
                      )}
                    </PathView>
                  </SearchPathSpace>
                  {/* 여기다 입력데이터 보여줌 */}
                  <CombinedSearchList>
                    <SaltSearchList>
                      <ExternalFrameBridge>
                        <SearchFrame>
                          <PlaceWrap>
                            <PlaceRoot>
                              <SortBoxWrap>
                                <SortBoxInner>
                                  <SortBoxSpace>
                                    <FlickingViewport>
                                      <FlickingCamera>
                                        {/* 정렬 기준 아이템 반복 */}
                                        {pagiObj == null ? (
                                          "원클릭 오더"
                                        ) : (
                                          <ToggleButtonGroup
                                            value={alignment}
                                            exclusive
                                            onChange={handleAlignment}
                                            aria-label="text alignment"
                                            sx={{
                                              flexDirection: "column",
                                              width: "100%",
                                            }}
                                          >
                                            <ToggleButton
                                              value="left"
                                              aria-label="left aligned"
                                            >
                                              <ElectricBoltIcon
                                                sx={{ marginRight: "5px" }}
                                              />
                                              거리순
                                            </ToggleButton>
                                            <ToggleButton
                                              value="right"
                                              aria-label="right aligned"
                                            >
                                              <TaskAltIcon
                                                sx={{ marginRight: "5px" }}
                                              />
                                              정확순
                                            </ToggleButton>
                                          </ToggleButtonGroup>
                                        )}
                                      </FlickingCamera>
                                    </FlickingViewport>
                                  </SortBoxSpace>
                                </SortBoxInner>
                              </SortBoxWrap>
                              {/* 검색 결과 */}
                              <SearchBoxWrap>
                                <SearchList>
                                  {/* SearchBox 반복 */}
                                  {/* 검색된 후에는 api 데이터 보여주고 그전엔 업체데이터 보여주기 */}
                                  { placeList.length == 0 ? (
                                    affiliate.map((item) => {
                                      return (
                                        <PlaceList 
                                          key={item.id}
                                          item={item}
                                          target={()=>placeTarget(item)} 
                                          clicked={()=>onSubBarClick(true)} 
                                        />
                                      );
                                    })
                                  ) : (
                                    placeList.map((item) => {
                                      return (
                                        <PlaceList 
                                          key={item.id}
                                          item={item}
                                          target={()=>placeTarget(item)} 
                                          clicked={()=>onSubBarClick(true)} 
                                        />
                                      );
                                    })
                                  ) }
                                </SearchList>
                              </SearchBoxWrap>
                              {/* 페이지네이션 컴포넌트 */}
                              {pagiObj == null ? null : (
                                <SearchBoxPagination>
                                  <Pagination
                                    hidePrevButton
                                    hideNextButton
                                    onChange={pageSetting}
                                    count={pagiObj.last}
                                    size="small"
                                    sx={{
                                      margin: "0 120px",
                                    }}
                                  />
                                </SearchBoxPagination>
                              )}
                            </PlaceRoot>
                          </PlaceWrap>
                        </SearchFrame>
                      </ExternalFrameBridge>
                    </SaltSearchList>
                  </CombinedSearchList>
                </MainTopSpace>
                {/* 버튼 누르면 히든 */}
                <SubNav clicked={subBarHide}>
                  <EntryLayout>
                    {/* 서브바 컨텐츠 */}
                    {place != null ? (
                      // 나중에 가게 상품 정보도 넘겨줌
                      showStore ? (
                        <>
                          <StoreMenu place={place} prodList={prodList} compCateList={compCateList} outStore={handleShowStore} />
                          {/* 메뉴 */}

                          <IconButton 
                            aria-label="cart" 
                            sx={{ zIndex: '100', position: 'absolute', left: '300px;', top: '870px;' }}
                            onClick={()=>alert("cart")}
                          >
                            <Badge badgeContent={4} color="warning">
                              <ShoppingCartIcon sx={{width:'42px', height: '42px'}} />
                            </Badge>
                          </IconButton>
                          {/* 장바구니 */} {/* 리덕스 툴킷에 보관 예정 */}
                        </>
                      )
                      : <StoreInfo place={place} showStore={handleShowStore}/>
                    ) : null}
                    <EntryCloseBtn
                      onClick={() => onSubBarClick(false)}
                      openSubBar={closeToggle}
                    >
                      <EntryCloseBtnSpan>닫기</EntryCloseBtnSpan>
                    </EntryCloseBtn>
                  </EntryLayout>
                </SubNav>
              </BaseCard>
            </PanelBase>
          </PanelWrap>
        </NavLayout>
      </SideNav>
      <Map />
    </div>
  );
}

OderMain.propTypes = {
  // ex) prop: PropTypes.type.isRequired,
  loading: PropTypes.bool.isRequired,
};
export default OderMain;
