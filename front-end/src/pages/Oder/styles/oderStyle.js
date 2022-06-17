import styled from "styled-components";

const SideNav = styled.nav`
  position: fixed;
  left: 95px;
  z-index: 5;
  background-color: ${(props) => props.clicked ? "white;" : "white" };
  box-shadow: ${(props) => props.clicked ? "3px 3px 3px gray;" : "none" };
  width: 390px;
  height: 100%;
  display: block;
  transform: translatex(${(props) => props.clicked ? "0%" : (
    props.openSubBar ? "-100%" : "-200.3%"
  ) });
  transition: transform 0.3s ease-in-out;
`;

const NavLayout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 200;
`;

const PanelWrap = styled.div`
  user-select: none;
  font-family: notosanskr,Malgun Gothic,맑은 고딕,Dotum,돋움,sans-serif;
  height: 100%;
  background: #fff;
  min-width: 390px;
  box-shadow: 0 0 5px 0 rgba(0,0,0,.2),5px 0 15px 0 rgba(0,0,0,.1);
`;

const PanelBase = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const SearchBarBox = styled.div`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 340px;
  margin: auto;
  padding: 15px 25px;
`;

const BubbleFilter = styled.div`
  user-select: none;
  font-family: notosanskr,Malgun Gothic,맑은 고딕,Dotum,돋움,sans-serif;
  visibility: visible;
`;

const BubbleFilterListWrap = styled.div`
  user-select: none;
  font-family: notosanskr,Malgun Gothic,맑은 고딕,Dotum,돋움,sans-serif;
  visibility: visible;
  position: absolute;
  left: 405px;
  top: 15px;
  border: 1px solid rgba(0,0,0,.05);
  border-radius: 4px;
`;

const BubbleFilterArea = styled.div`
  visibility: visible;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.12);
  border-radius: 4px;
  font-size: 0;
  white-space: nowrap;
  &:after {
    display: block;
    clear: both;
    content: "";
  }
`;

const BubbleFilterList = styled.ul`
  visibility: visible;
  font-size: 0;
  white-space: nowrap;
  margin: 0;
  list-style: none;
  display: inline-block;
  padding: 0 11px;
`;

const BubbleFilterItem = styled.li`
  visibility: visible;
  font-size: 0;
  white-space: nowrap;
  margin: 0;
  padding: 0;
  list-style: none;
  display: inline-block;
  vertical-align: top;
`;

const BubbleFilterBtn = styled.button`
  visibility: visible;
  white-space: nowrap;
  list-style: none;
  margin: 0;
  border: 0;
  appearance: none;
  background-color: transparent;
  cursor: pointer;
  border-radius: 0;
  font-family: notosanskr,Malgun Gothic,맑은 고딕,Dotum,돋움,sans-serif;
  position: relative;
  padding: 19px 11px 17px;
  line-height: 19px;
  font-size: 15px;
  font-weight: 600;
  color: #242424;
`;

const MoreGroupWrap = styled.div`
  user-select: none;
  font-family: notosanskr,Malgun Gothic,맑은 고딕,Dotum,돋움,sans-serif;
  visibility: visible;
  font-size: 0;
  white-space: nowrap;
  display: inline-block;
  vertical-align: top;
`;

const MoreGroupBtn = styled.button`
  user-select: none;
  visibility: visible;
  white-space: nowrap;
  margin: 0;
  border: 0;
  padding: 0;
  appearance: none;
  background-color: transparent;
  cursor: pointer;
  color: inherit;
  font-family: notosanskr,Malgun Gothic,맑은 고딕,Dotum,돋움,sans-serif;
  height: 55px;
  width: 55px;
  border-left: 1px solid #ededed;
  font-size: 1px;
  line-height: 3px;
  vertical-align: top;
  border-radius: 0 4px 4px 0;

  &:before {
    overflow: hidden;
    display: inline-block;
    width: 15px;
    height: 3px;
    font-size: 0;
    color: transparent;
    vertical-align: top;
    background-position: -468px -441px;
    background-image: url(https://ssl.pstatic.net/static/maps/v5/pc/20220512184234/home.png);
    content: "";
  }
  &:hover {
    background: #f7f9fa;
  }
`;

const MoreGroupBtnSpan = styled.span`
  user-select: none;
  visibility: visible;
  white-space: nowrap;
  cursor: pointer;
  font-family: notosanskr,Malgun Gothic,맑은 고딕,Dotum,돋움,sans-serif;
  line-height: 3px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  font-size: 1px;
  color: transparent;
  position: absolute;
  width: 1px;
  height: 1px;
`;

const AppendixFilterArea = styled.div`
  user-select: none;
  font-family: notosanskr,Malgun Gothic,맑은 고딕,Dotum,돋움,sans-serif;
  visibility: visible;
  font-size: 0;
  white-space: nowrap;
  position: absolute;
  right: -1px;
  top: 100%;
`;

const AppendixFilterWrap = styled.div`
  visibility: visible;
  font-size: 0;
  white-space: nowrap;
  margin-top: 8px;
  border: 1px solid rgba(0,0,0,.05);
  border-radius: 4px;
`;

const AppendixFilterInner = styled.div`
  visibility: visible;
  padding: 0 10px;
  background: #fff;
  border-radius: 4px;
  font-size: 0;
  white-space: nowrap;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.12);
`;

const AppendixFilterListUl = styled.ul`
  visibility: visible;
  font-size: 0;
  white-space: nowrap;
  margin: 0;
  list-style: none;
  display: inline-block;
  vertical-align: top;
  padding: 17px 0 16px;
`;

const AppendixFilterListLi = styled.li`
  visibility: visible;
  font-size: 0;
  white-space: nowrap;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const AppendixFilterListBtn = styled.button`
  visibility: visible;
  white-space: nowrap;
  list-style: none;
  margin: 0;
  border: 0;
  appearance: none;
  background-color: transparent;
  cursor: pointer;
  border-radius: 0;
  position: relative;
  line-height: 19px;
  font-size: 15px;
  font-weight: 600;
  color: #242424;
  width: 100%;
  padding: 13px 15px 14px;
  text-align: left;
`;

const AppendixFilterListImg = styled.img`
  visibility: visible;
  white-space: nowrap;
  list-style: none;
  cursor: pointer;
  line-height: 19px;
  font-size: 15px;
  font-weight: 600;
  color: #242424;
  text-align: left;
  width: 20px;
  aspect-ratio: auto 20 / 20;
  height: 20px;
  border: 0;
  vertical-align: top;
  margin: -1px 5px 0 0;
`;

const WrapBarCloseBtn = styled.div`
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
  z-index: 100;
`;

const BarCloseBtn = styled.button`
  margin: 0;
  border: 0;
  padding: 0;
  appearance: none;
  background-color: transparent;
  cursor: pointer;
  line-height: inherit;
  border-radius: 0;
  background-image: url(https://ssl.pstatic.net/static/maps/v5/pc/20220512184234/home.png);
  background-size: 508px 492px;
  background-position: -428px ${(props) => props.clicked ? "-245px;" : "-345px" };
  overflow: hidden;
  display: inline-block;
  width: 22px;
  height: 50px;
  font-size: 0;
  color: transparent;
  vertical-align: top;
`;

const BaseCard = styled.div`
  flex: 1 1 auto;
  height: 100%;
  position: relative;
  display: flex;
`;

const MainTopSpace = styled.div`
  position: relative;
  display: flex;
  width: 390px;
  flex: none;
  flex-direction: column;
  background: #fff;
  padding-top: 76px;
`;

const SearchPathSpace = styled.div`
  user-select: none;
  font-family: notosanskr,Malgun Gothic,맑은 고딕,Dotum,돋움,sans-serif;
  display: block;
  margin: 0 25px 20px 25px;
  flex: none;
  border-bottom: 1px solid #dbdee0;
`;

const PathView = styled.div`
  padding-bottom: 27px;
`;

const CombinedSearchList = styled.div`
  position: relative;
  display: block;
  flex: 1 1 auto;
  overflow: hidden;
  height: 100%;
  visibility: visible;
`;

const SaltSearchList = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  visibility: visible;
`;


const ExternalFrameBridge = styled.div`
  height: 100%;
`;

const SubNav = styled.div`
  position: relative;
  display: ${(props) => props.clicked ? "flex" : "none" };
  width: 390px;
  flex: none;
  flex-direction: column;
  background: #fff;
  border-left: 1px solid #ddd;
  z-index: 5;
`;

const EntryLayout = styled.div`
  user-select: none;
  font-family: notosanskr,Malgun Gothic,맑은 고딕,Dotum,돋움,sans-serif;
  display: flex;
  flex-direction: column;
  width: 390px;
  height: 100%;
  background-color: #fff;
  box-sizing: border-box;
  padding-top: 0px;
`;

const EntryPlaceBridge = styled.div`
  user-select: none;
  font-family: notosanskr,Malgun Gothic,맑은 고딕,Dotum,돋움,sans-serif;
  background-color: #fff;
  display: flex;
  position: relative;
  overflow: hidden;
  flex-direction: column;
  height: 100%;
  z-index: 10;
`;

const EntryCloseBtn = styled.button`
  margin: 0;
  padding: 0;
  appearance: none;
  color: inherit;
  position: absolute;
  right: -43px;
  top: 24px;
  width: 43px;
  height: 44px;
  background: #fff;
  border: 1px solid rgba(0,0,0,.2);
  border-left: 0;
  border-radius: 0 4px 4px 0;
  font-size: 1px;
  line-height: 1px;
  box-shadow: 0 3px 7px 0 rgba(0,0,0,.2);
  cursor: pointer;
  display: ${(props) => props.openSubBar ? "block" : "none" };
  
  &:before {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 1px;
    background: hsla(0,0%,87.8%,.3);
    content: "";
  }
  &:after {
    overflow: hidden;
    display: inline-block;
    left: 10px;
    width: 14px;
    height: 14px;
    color: transparent;
    vertical-align: top;
    background-position: -40px -158px;
    background-image: url(https://ssl.pstatic.net/static/maps/v5/pc/20220512184234/search.png);
    background-size: 194px 190px;
    content: "";
  }
`;

const EntryCloseBtnSpan = styled.span`
  line-height: 1px;
  cursor: pointer;
  overflow: hidden;
  clip: rect(0 0 0 0);
  font-size: 1px;
  color: transparent;
  position: absolute;
  width: 1px;
  height: 1px;
`;

export { 
  SideNav, NavLayout, PanelWrap, PanelBase, SearchBarBox, 
  BubbleFilter, BubbleFilterListWrap, BubbleFilterArea, BubbleFilterList, BubbleFilterItem, BubbleFilterBtn, MoreGroupWrap, MoreGroupBtn, MoreGroupBtnSpan, 
  AppendixFilterArea, AppendixFilterWrap, AppendixFilterInner, AppendixFilterListUl, AppendixFilterListLi, AppendixFilterListBtn, AppendixFilterListImg, 
  BaseCard, MainTopSpace, SearchPathSpace, PathView, 
  SubNav, EntryLayout,EntryPlaceBridge, EntryCloseBtn, EntryCloseBtnSpan, WrapBarCloseBtn, BarCloseBtn 
}