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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  SideNav, NavLayout, PanelWrap, PanelBase, SearchBarBox,
  BubbleFilter, BubbleFilterListWrap, BubbleFilterArea, BubbleFilterList, BubbleFilterItem, BubbleFilterBtn, MoreGroupWrap, MoreGroupBtn, MoreGroupBtnSpan, 
  AppendixFilterArea, AppendixFilterWrap, AppendixFilterInner, AppendixFilterListUl, AppendixFilterListLi, AppendixFilterListBtn, AppendixFilterListImg, 
  BaseCard, MainTopSpace, SearchPathSpace, PathView, 
  SubNav, EntryLayout,EntryPlaceBridge, EntryCloseBtn, EntryCloseBtnSpan, WrapBarCloseBtn, BarCloseBtn,
} from "./styles/oderStyle";

function OderMain() {
  const { loading } = useLoading();
  const {
    closeToggle,
    animate, subBarHide, 
    searchData,
    category,
    submit,
    handleChange,
    onCloseToggle, onSubBarClick, 
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
                  onSubmit={submit}
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
              <BubbleFilter>
                <BubbleFilterListWrap>
                    <BubbleFilterArea>
                        {/* 보이는 카테고리 */}
                        <BubbleFilterList>
                            {/* 길이에 맞게 늘어남 */}
                            <BubbleFilterItem>
                                <BubbleFilterBtn>
                                    <AppendixFilterListImg src="https://map.pstatic.net/res/category/image/00023-00099.png" />
                                    텍스트
                                </BubbleFilterBtn>
                            </BubbleFilterItem>
                        </BubbleFilterList>
                        {/* 더보기 카테고리 */}
                        <MoreGroupWrap>
                            <MoreGroupBtn>
                                <MoreGroupBtnSpan>
                                    주변 필터 더보기
                                </MoreGroupBtnSpan>
                            </MoreGroupBtn>
                            {/* AppendixFilterListBtn, AppendixFilterListImg,  */}
                            <AppendixFilterArea>
                                <AppendixFilterWrap>
                                    <AppendixFilterInner>
                                        {/* 맞게 반복 */}
                                        <AppendixFilterListUl>
                                            {/* 맞게 반복 */}
                                            <AppendixFilterListLi>
                                                <AppendixFilterListBtn>
                                                    <AppendixFilterListImg src="https://map.pstatic.net/res/category/image/00023-00099.png" />
                                                    텍스트
                                                </AppendixFilterListBtn>
                                            </AppendixFilterListLi>
                                        </AppendixFilterListUl>
                                    </AppendixFilterInner>
                                </AppendixFilterWrap>
                            </AppendixFilterArea>
                        </MoreGroupWrap>
                    </BubbleFilterArea>
                </BubbleFilterListWrap>
              </BubbleFilter>
              {/* 메인바 컨텐츠, 서브네비바 */}
              <BaseCard>
                  <MainTopSpace>
                    {/* 찾은 경로 텍스트로 보여줌 */}
                    <SearchPathSpace>
                      <PathView>
                        "여기에서 -> 저기로"
                      </PathView>
                    </SearchPathSpace>
                    {/* 여기다 데이터 입력데이터 보여줌 */}
                    
                  </MainTopSpace>
                  {/* 버튼 누르면 히든 */}
                  <SubNav clicked={subBarHide}>
                    <EntryLayout>
                      {/* 서브바 컨텐츠 */}
                      <EntryPlaceBridge>

                      </EntryPlaceBridge>
                      <EntryCloseBtn onClick={onSubBarClick} openSubBar={closeToggle}>
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
