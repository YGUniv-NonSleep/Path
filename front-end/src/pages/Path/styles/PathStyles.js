import styled from "styled-components";

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

const ScrollAreaInner = styled.div`
  width: 390px;
`;

const DirectionIndexSearchHistory = styled.div`
  display: block;
  padding: 12px 0 0;
`;

const InstantBox = styled.div`
  position: relative;
`;

const TitleBox = styled.div`
  display: block;
  margin: 0 25px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0,0,0,.1);
  font-size: 0;
`;

const InstantTitle = styled.strong`
  display: inline-block;
  font-weight: 700;
  font-size: 13px;
  color: #333;
  line-height: 16px;
  vertical-align: top;
`;

const SearchStandby = styled.div`
  display: block;
`;

const HistoryList = styled.div`
  display: block;
`;

const HistoryListPlace = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const HistoryItemPlace = styled.li`
  margin: 0;
  padding: 0;
  list-style: none;
  position: relative;
`;

const LinkPlace = styled.a`
  list-style: none;
  color: inherit;
  text-decoration: none;
  padding-right: 46px!important;
  display: block;
  padding: 7px 20px;
`;

const IconBox = styled.span`
  list-style: none;
  color: inherit;
  float: left;
  margin: -2px 4px 0 0;
  &:before {
    overflow: hidden;
    display: inline-block;
    width: 24px;
    height: 24px;
    font-size: 0;
    color: transparent;
    vertical-align: top;
    content: "";
  }
`;

const PlaceBox = styled.div`
  list-style: none;
  color: inherit;
  overflow: hidden;
`;

const PlaceText = styled.span`
  list-style: none;
  letter-spacing: -.4px;
  line-height: 22px;
  white-space: normal;
  font-size: 14px;
  vertical-align: top;
  color: #767676;
`;

const IconRoute = styled.span`
  list-style: none;
  letter-spacing: -.4px;
  line-height: 22px;
  white-space: normal;
  background-image: url(https://ssl.pstatic.net/static/maps/v5/pc/20220426174319/common.png);
  background-size: 257px 225px;
  overflow: hidden;
  display: inline-block;
  width: 11px;
  height: 8px;
  font-size: 0;
  color: transparent;
  vertical-align: top;
  background-position: -166px -47px;
  margin: 6px 4px 0 5px;
`; // →

const DirectionIndexFavorites = styled.div`
  display: block;
  margin-top: 16px;
`;

const EmptyBox = styled.div`
  min-height: 42px;
  padding: 10px 25px;
  font-size: 13px;
  color: #767676;
  letter-spacing: -.2px;
  line-height: 20px;
`;

const FavoritesText = styled.p`
  font-size: 13px;
  color: #767676;
  letter-spacing: -.2px;
  line-height: 20px;
  margin: 0;
  padding: 0;
`;

const LinkLogin = styled.button`
  user-select: none;
  margin: 0;
  border: 0;
  appearance: none;
  font-family: notosanskr,Malgun Gothic,맑은 고딕,Dotum,돋움,sans-serif;
  display: inline-block;
  height: 33px;
  margin-top: 13px;
  padding: 0 18px;
  border-radius: 3px;
  background-color: #03c75a;
  font-size: 12px;
  color: #fff;
  letter-spacing: -.7px;
  line-height: 33px;
  cursor: pointer;
  &:before {
    overflow: hidden;
    display: inline-block;
    width: 10px;
    height: 9px;
    font-size: 0;
    color: transparent;
    vertical-align: top;
    background-position: -166px -36px;
    margin: -1px 6px 1px 0;
    vertical-align: middle;
    content: "";
  }
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

export { 
  SideNav, SearchArea, 
  ScrollArea, ScrollAreaInner, DirectionIndexSearchHistory, InstantBox, TitleBox, InstantTitle, 
  SearchStandby, HistoryList, HistoryListPlace, HistoryItemPlace, LinkPlace, IconBox, PlaceBox, PlaceText, IconRoute, 
  DirectionIndexFavorites, EmptyBox, FavoritesText, LinkLogin, 
  DirectionSummaryList, DirectionSummarySpace, ScrollInner, SearchResultList, PathInserted, DirectionSummaryItemTransit, 
  SwitchButton 
}