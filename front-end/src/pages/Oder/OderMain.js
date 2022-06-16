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
  WrapBarCloseBtn,
  BarCloseBtn,
} from "./styles/oderStyle";

function OderMain() {
  const { loading } = useLoading();
  const {
    closeToggle,
    animate,
    searchData,
    category,
    submit,
    handleChange,
    onCloseToggle,
  } = useOderMain();

  return (
    <div className="Oder">
      <SideNav clicked={closeToggle} visible={animate}>
        {loading ? null : <h2>로드 중...</h2>}
        <NavLayout>
          {/* 컨텐츠바 토글 */}
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
