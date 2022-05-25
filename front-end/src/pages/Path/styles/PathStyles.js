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

const NoResultText = styled.p`
  font-size: 13px;
  color: #767676;
  letter-spacing: -.2px;
  line-height: 20px;
  margin: 0;
  padding: 0;
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
  &:hover {
    background-color: #f2f2f2;
  }
`;

const LinkPlace = styled.a`
  list-style: none;
  color: inherit;
  text-decoration: none;
  padding-right: 46px!important;
  display: block;
  padding: 7px 20px;
`;

const DeleteBtn = styled.button`
  list-style: none;
  border: 0;
  padding: 0;
  appearance: none;
  background-color: transparent;
  cursor: pointer;
  line-height: inherit;
  border-radius: 0;
  background-image: url(https://ssl.pstatic.net/static/maps/v5/pc/20220426174319/search.png);
  background-size: 194px 190px;
  overflow: hidden;
  width: 20px;
  height: 20px;
  font-size: 0;
  color: transparent;
  vertical-align: top;
  background-position: -122px -90px;
  display: block;
  position: absolute;
  top: 0;
  right: 18px;
  bottom: 0;
  margin: auto;
  z-index: 10;
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

const PlaceTextBox = styled.div`
  list-style: none;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  letter-spacing: -.4px;
  color: #767676;
  padding: 0;
  line-height: 22px;
  white-space: normal;
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
  background-color: #3396ff;
  font-size: 12px;
  color: #fff;
  letter-spacing: -.7px;
  line-height: 33px;
  cursor: pointer;
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

const RouteSummaryBox = styled.div`
  list-style: none;
`;

// 최적, 시간, 환승, 도보
const RouteType = styled.em`
  font-family: notosanskr,Malgun Gothic,맑은 고딕,Dotum,돋움,sans-serif;
  list-style: none;
  font-style: normal;
  display: block;
  margin-bottom: 3px;
  font-size: 13px;
  line-height: 16px;
  font-weight: 700;
  letter-spacing: -.3px;
  color: #0475f4;
`;

const RouteSummaryInfoArea = styled.div`
  list-style: none;
  line-height: 16px;
  color: #242424;
`;

const DurationTime = styled.strong`
  list-style: none;
  font-weight: 500;
  display: inline-block;
  color: #242424;
  line-height: 1;
`;

const ReadableDuration = styled.div`
  display: inline-block;
  list-style: none;
  font-weight: 500;
  color: #242424;
  line-height: 1;
`;

const TimeValue = styled.span`
  list-style: none;
  color: #242424;
  line-height: 1;
  display: inline-block;
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -1.07px;
  font-family: -apple-system,BlinkMacSystemFont,helvetica,Apple SD Gothic Neo,sans-serif;
  vertical-align: 2px;
`;

const UnitValue = styled.span`
  font-family: notosanskr,Malgun Gothic,맑은 고딕,Dotum,돋움,sans-serif;
  list-style: none;
  color: #242424;
  line-height: 1;
  display: inline-block;
  margin-left: 1px;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: -.3px;
  vertical-align: 2px;
`;

const SummaryInfo = styled.span`
  font-family: notosanskr,Malgun Gothic,맑은 고딕,Dotum,돋움,sans-serif;
  list-style: none;
  line-height: 16px;
  color: #242424;
  position: relative;
  display: inline-block;
  font-size: 13px;
  vertical-align: 2px;
  &:before {
    display: inline-block;
    width: 1px;
    height: 8px;
    margin: -1px 6px 0 7px;
    background: rgba(0,0,0,.15);
    content: "";
  }
`;

const StepInfoWrap = styled.div`
  margin-top: 17px;
`;

const StepInfoList = styled.ol`
  font-family: notosanskr,Malgun Gothic,맑은 고딕,Dotum,돋움,sans-serif;
  margin: 0;
  padding: 0;
  list-style: none;
  position: relative;
  padding-top: 3px;
  border-top: 1px solid rgba(0,0,0,.05);
  &:before {
    position: absolute;
    top: 0;
    bottom: 16px;
    left: 7px;
    width: 1px;
    background: rgba(0,0,0,.05);
    content: "";
  }
`;

const StepInfoItem = styled.li`
  user-select: none;
  font-family: notosanskr,Malgun Gothic,맑은 고딕,Dotum,돋움,sans-serif;
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  position: relative;
`;

const IconWrap = styled.div`
  display: flex;
`;

const IconArea = styled.div`
  padding-top: 12px;
  flex-shrink: 0;
  margin-right: 4px;
`;

const IconSpan = styled.span`
  user-select: none;
  font-family: notosanskr,Malgun Gothic,맑은 고딕,Dotum,돋움,sans-serif;
  list-style: none;
  background-image: url(${props => props.img});
  background-size: 16px 15px;
  overflow: hidden;
  display: inline-block;
  width: 15px;
  height: 16px;
  font-size: 0;
  color: transparent;
  vertical-align: top;
  background-position: 0 0px;
  position: relative;
  margin-top: -1px;
  background-color: #FFFFFF;
`;

const VehicleTypeArea = styled.div`
  user-select: none;
  font-family: notosanskr,Malgun Gothic,맑은 고딕,Dotum,돋움,sans-serif;
  list-style: none;
  padding-top: 12px;
  flex-shrink: 0;
`;

const VehicleTypeLabel = styled.em`
  user-select: none;
  font-family: notosanskr,Malgun Gothic,맑은 고딕,Dotum,돋움,sans-serif;
  list-style: none;
  font-style: normal;
  display: block;
  overflow: hidden;
  width: 75px;
  margin-right: 4px;
  font-size: 13px;
  line-height: 16px;
  font-weight: 700;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: rgb(56, 109, 232);
`;

const StepInfoArea = styled.div`
  flex: 1;
  overflow: hidden;
  padding-top: 12px;
`;

const StepTitleArea = styled.div`
  display: flex;
`;

const StepTitle = styled.strong`
  font-family: notosanskr,Malgun Gothic,맑은 고딕,Dotum,돋움,sans-serif;
  list-style: none;
  display: block;
  flex: 1;
  overflow: hidden;
  font-size: 13px;
  line-height: 16px;
  font-weight: 500;
  text-overflow: ellipsis;
  color: #484848;
  white-space: nowrap;
`;

const AppendixBtnArea = styled.div`
  flex-shrink: 0;
  margin: -3px 0;
`;

const StepBottomArea = styled.div`
  margin-top: 1px;
`; // 상세보기 버튼 공간

const DetailBtn = styled.button`
  margin: 0;
  border: 0;
  padding: 0;
  appearance: none;
  background-color: transparent;
  cursor: pointer;
  border-radius: 0;
  font-family: notosanskr,Malgun Gothic,맑은 고딕,Dotum,돋움,sans-serif;
  margin-top: 9px;
  font-size: 12px;
  line-height: 15px;
  color: #333;
  &:after {
    background-position: -183px -88px;
    margin-top: -2px;
    content: "";
    overflow: hidden;
    display: inline-block;
    width: 8px;
    height: 12px;
    font-size: 0;
    color: transparent;
    vertical-align: top;
    vertical-align: middle;
    background-image: url(https://ssl.pstatic.net/static/maps/v5/pc/20220426174319/directions.png);
    background-size: 192px 165px;
  }
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
  ScrollArea, DirectionIndexSearchHistory, InstantBox, TitleBox, InstantTitle, 
  SearchStandby, NoResultText, HistoryList, HistoryListPlace, HistoryItemPlace, 
  LinkPlace, IconBox, PlaceBox, PlaceTextBox, PlaceText, IconRoute, 
  DirectionIndexFavorites, EmptyBox, FavoritesText, LinkLogin, 
  DirectionSummaryList, DirectionSummarySpace, ScrollInner, SearchResultList, PathInserted, DirectionSummaryItemTransit, 
  RouteSummaryBox, RouteType, RouteSummaryInfoArea, DurationTime, ReadableDuration, TimeValue, UnitValue, SummaryInfo, 
  StepInfoWrap, StepInfoList, StepInfoItem, IconWrap, IconArea, IconSpan, 
  VehicleTypeArea, VehicleTypeLabel, StepInfoArea, StepTitleArea, StepTitle, AppendixBtnArea, 
  SwitchButton, DeleteBtn
}