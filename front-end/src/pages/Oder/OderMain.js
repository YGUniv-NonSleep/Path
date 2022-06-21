import { useEffect, useState } from "react";
import Map from "../../components/Map";
import { Link } from "react-router-dom";
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
  Button
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PhoneIcon from '@mui/icons-material/Phone';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  EmphasizeRedText, 
  SideNav,
  PlusSectionIcon, 
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
  FilterItem,
  SearchBoxWrap,
  SearchBox,
  SearchList,
  SearchItem,
  SearchItemInfo,
  SearchItemTitle,
  ItemBlueText,
  ItemCategoryText,
  SearchItemSub,
  SearchBoxPagination,
  SubNav,
  EntryLayout,
  EntryPlaceBridge,
  EntryCloseBtn,
  EntryCloseBtnSpan,
  WrapBarCloseBtn,
  BarCloseBtn,
  PlaceDataImageArea,
  ImageArea,
  PlaceDataArea,
  PlaceData,
  PlaceDataTitle,
  PlaceDataTitleName,
  PlaceDataTitleCate,
  PlaceDataPlus,
  PlaceDataPlusSection,
  PlusSectionUl,
  PlusSectionLi,
  PlusSection,
  PlusSectionContent,
} from "./styles/oderStyle";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CategoryList from "./categoryList";
import { Fragment } from "react";

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
    alignment,
    place,
    pagiObj,
    placeTarget,
    sortSearch,
    handleAlignment,
    keywordSetting,
    pageSetting,
    keywordSubmit,
    categorySubmit,
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
                      <CategoryList clicked={handleChange}></CategoryList>
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
                                  {placeList.map((item) => {
                                    return (
                                      <SearchItem
                                        onClick={() => placeTarget(item)}
                                        key={item.id}
                                      >
                                        <SearchItemInfo
                                          onClick={() => onSubBarClick(true)}
                                        >
                                          {/* 타이틀 */}
                                          <SearchItemTitle>
                                            <ItemBlueText>
                                              {item.place_name}
                                            </ItemBlueText>
                                            <ItemCategoryText>
                                              {item.category_group_name}
                                            </ItemCategoryText>
                                          </SearchItemTitle>
                                          {/* 서브타이틀 */}
                                          <SearchItemSub>
                                            {item.address_name}
                                          </SearchItemSub>
                                          {item.distance != '' ? (
                                            <SearchItemSub>
                                              현재 위치로부터
                                              <EmphasizeRedText>
                                                {item.distance}m
                                              </EmphasizeRedText>
                                            </SearchItemSub>
                                          ) : (
                                            <SearchItemSub>
                                              위치 정보가 있어야 표시됩니다.
                                            </SearchItemSub>
                                          )}
                                        </SearchItemInfo>
                                      </SearchItem>
                                    );
                                  })}
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
                      <EntryPlaceBridge>
                        {/* 이미지 받을 공간 */}
                        <PlaceDataImageArea>
                          <ImageArea>
                            <img src={process.env.PUBLIC_URL + "/noImage.png"} />
                          </ImageArea>
                        </PlaceDataImageArea>
                        {/* 상세 내용 추가 */}
                        <PlaceDataArea>
                          <PlaceData>
                            <PlaceDataTitle>
                              <PlaceDataTitleName>
                                {place.place_name}
                              </PlaceDataTitleName>
                              <PlaceDataTitleCate>
                                {place.category_group_name}
                              </PlaceDataTitleCate>
                            </PlaceDataTitle>
                            {/* 여러가지 추가적인 상세 정보들 */}
                            <PlaceDataPlus>
                              <PlaceDataPlusSection>
                                <PlusSectionUl>
                                  {/* 반복 */}
                                  <PlusSectionLi>
                                    <PlusSection>
                                      <PlusSectionContent>
                                        <PhoneIcon sx={{float: "left", margin: "6px 10px 0 0"}} />
                                        {place.phone != '' ? place.phone : '전화번호 정보 없음' }
                                      </PlusSectionContent>
                                    </PlusSection>
                                  </PlusSectionLi>
                                  <PlusSectionLi>
                                    <PlusSection>
                                      <PlusSectionContent>
                                        <MyLocationIcon sx={{float: "left", margin: "6px 10px 0 0"}} />
                                        {place.distance != '' ? (
                                          <Fragment>
                                            현재 위치로부터
                                            <EmphasizeRedText>
                                              {place.distance}m
                                            </EmphasizeRedText>
                                          </Fragment>
                                        ) : '현재 위치로 부터의 거리 정보 없음'}
                                      </PlusSectionContent>
                                    </PlusSection>
                                  </PlusSectionLi>
                                  <PlusSectionLi>
                                    <PlusSection>
                                      <PlusSectionContent>
                                        <LocationOnIcon sx={{float: "left", margin: "6px 10px 0 0"}} />
                                        {place.address_name}
                                      </PlusSectionContent>
                                    </PlusSection>
                                  </PlusSectionLi>
                                  {/* 제휴 업체만 버튼 보이기 */}
                                  {/* <PlusSectionLi>
                                    <PlusSection>
                                      <PlusSectionContent>
                                      <Button variant="contained" component="span" color="info">
                                        주문 하기
                                      </Button>
                                      </PlusSectionContent>
                                    </PlusSection>
                                  </PlusSectionLi> */}
                                </PlusSectionUl>
                              </PlaceDataPlusSection>
                            </PlaceDataPlus>
                          </PlaceData>
                        </PlaceDataArea>
                      </EntryPlaceBridge>
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
