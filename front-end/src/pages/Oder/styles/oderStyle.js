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
    props.openSubBar ? "-200.3%" : "-100%"
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
  visibility: ${(props) => props.subBarOpen ? "hidden;" : "visible" };
`;

const BubbleFilterListWrap = styled.div`
  user-select: none;
  font-family: notosanskr,Malgun Gothic,맑은 고딕,Dotum,돋움,sans-serif;
  visibility: inherit;
  position: absolute;
  left: 405px;
  top: 15px;
  border: 1px solid rgba(0,0,0,.05);
  border-radius: 4px;
`;

const BubbleFilterArea = styled.div`
  visibility: inherit;
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
  visibility: inherit;
  font-size: 0;
  white-space: nowrap;
  margin: 0;
  list-style: none;
  display: inline-block;
  padding: 0 11px;
`;

const BubbleFilterItem = styled.li`
  visibility: inherit;
  font-size: 0;
  white-space: nowrap;
  margin: 0;
  padding: 0;
  list-style: none;
  display: inline-block;
  vertical-align: top;
`;

const BubbleFilterBtn = styled.button`
  visibility: inherit;
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

const AppendixFilterListImg = styled.img`
  visibility: inherit;
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
`;

const ExternalFrameBridge = styled.div`
  pointer-events: auto;
  border: none;
  width: 100%; 
  height: 100%;
`;

const SearchFrame = styled.div`
  margin: 0;
  padding: 0;
  font-family: -apple-system,BlinkMacSystemFont,helvetica,Apple SD Gothic Neo,sans-serif;
  font-size: 1.6rem;
  letter-spacing: -0.3px;
  line-height: 2rem;
  color: rgba(var(--place-color-text1), 1);
  word-break: break-all;
  word-wrap: break-word;
  -webkit-text-size-adjust: none;
  height: 100%;
  background-color: rgba(var(--place-color-bg1), 1);
`;

const PlaceWrap = styled.div`
  transition: opacity .3s cubic-bezier(0.22, 0.61, 0.36, 1);
  opacity: 1;
  height: 100%;
`;

const PlaceRoot = styled.div`
  display: flex;
  overflow: hidden;
  flex: 1;
  flex-direction: column;
  height: 100%;
  border-top: 1px solid;
  border-color: #ecf0f2;
`;

// 검색 결과
const SearchBoxWrap = styled.div`
  display: block;
  overflow: hidden;
  overflow-y: auto;
  flex: 1;
`;

const SearchBox = styled.div`
  overflow-y: auto;
  display: block;
`;

const SearchList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const SearchItem = styled.li`
  margin: 0;
  position: relative;
  padding: 18px 25px 20px;
  display: list-item;
  cursor: pointer;
  &:before {
    position: absolute;
    top: -1px;
    right: 0;
    left: 0;
    height: 1px;
    background: rgba(0,0,0,0.2);
    content: "";
  }
`;

const SearchItemInfo = styled.div`
  display: block;
  text-decoration: none;
`;

const SearchItemTitle = styled.div`
  display: -webkit-box;
  overflow: hidden;
  max-height: 4.6rem;
  line-height: 2.3rem;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  white-space: normal;
  text-decoration: none;
`;

const ItemBlueText = styled.span`
  margin-right: 6px;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: -1px;
`;

const ItemCategoryText = styled.span`
  display: inline-block;
  vertical-align: left;
  font-size: 1.1rem;
  color: #8f8f8f;
`;

const SearchItemSub = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 2px;
  font-size: 0.9rem;
  color: #8f8f8f;
  letter-spacing: -0.2px;
`; // color: rgba(var(--place-color-text5), 1);

// 페이지네이션 레이아웃
const SearchBoxPagination = styled.div`
  position: relative;
  padding: 8px 0 8px;
  box-sizing: border-box;
  
  display: block;
  
  &:before {
    position: absolute;
    top: -1px;
    right: 0;
    left: 0;
    height: 1px;
    background: rgba(0,0,0,0.2);
    content: "";
  }
`;

// 정렬 창
const SortBoxWrap = styled.div`
  position: relative;
  border-bottom: 1px solid;
  border-color: #ecf0f2;
  margin: 0px 0 -1px;
`;

const SortBoxInner = styled.div`
  overflow: hidden;
  display: block;
`;

const SortBoxSpace = styled.div`
  white-space: normal;
  position: relative;
`;

const FlickingViewport = styled.div`
  position: static;
  z-index: 20;
  padding: 0 25px 15px;
`;

const FlickingCamera = styled.div`
  will-change: transform;
  display: block;
`;

// 반복
const FilterItem = styled.span`
  padding-left: 0;
  margin-top: 6px;
  margin-right: 6px;
  display: inline-block;
  vertical-align: top;
`; // first-child -> padding-left: 18px;

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

const EntryStoreWrap = styled.div`
  position: relative;
  display: block;
  z-index: 10;
`; // overflow: hidden;

const StoreDataArea = styled.div`
  margin-top: 0;
  margin-bottom: 7px;
  border-top: 0;
  border-bottom: 2px solid;
  border-color: #e2e5e8;
  background-color: #fff;
`;



const EntryPlaceBridge = styled.div`
  position: relative;
  display: block;
  overflow: hidden;
  margin-top: 150px;
  z-index: 10;
`; // height: 100%;

const PlaceDataImageArea = styled.div`;
  position: relative;
`;

const ImageArea = styled.div`
  display: flex;
  position: relative;
  height: 187px;
  background: #fff;
  justify-content: center;
`;

// 여기서 자식들을 받을거임
const PlaceDataArea = styled.div`
  margin-top: 0;
  margin-bottom: 7px;
  border-top: 0;
  border-bottom: 1px solid;
  border-color: #e2e5e8;
  background-color: #fff;
`;

// 제목
const PlaceData = styled.div`
  padding: 16px 18px 14px;
  text-align: center;
`;

const PlaceDataTitle = styled.div`
  line-height: 2.5rem;
  display: block;
`;

const PlaceDataTitleName = styled.div`
  font-weight: 700;
  letter-spacing: -1px;
  display: inline-block;
  vertical-align: top;
  margin-right: 6px;
  font-size: 2.1rem;
  color: #000;
`;

const PlaceDataTitleCate = styled.div`
  font-size: 1.4rem;
  display: inline-block;
  vertical-align: top;
  color: #8f8f8f;
`;

const PlaceDataPlus = styled.div`
  min-height: 872px;
  display: block;
`;

const PlaceDataPlusSection = styled.div`
  margin-top: 0;
  border-color: #e2e5e8;
  background-color: #fff;
`; // border-bottom: 1px solid;

const PlusSectionUl = styled.ul`
  padding: 4px 18px 4px;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const PlusSectionLi = styled.li`
  position: relative;
  padding: 10px 0;
  margin: 0;
  display: list-item;
`;

const PlusSection = styled.div`
  overflow: hidden;
  font-size: 1rem;
  color: #424242;
  line-height: 2.2rem;
`; // display: block;

const PlusSectionContent = styled.div`
  display: inline-block;
  vertical-align: top;
  cursor: pointer;
  text-decoration: none;
  margin-right: 8px;
`; // color: inherit;

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

const EmphasizeRedText = styled.em`
  flex: 0 0 auto;
  position: relative;
  z-index: 10;
  padding-left: 6px;
  color: #ff5757;
  font-style: normal;
`;

export { 
  SideNav, NavLayout, PanelWrap, PanelBase, SearchBarBox, EmphasizeRedText, 
  BubbleFilter, BubbleFilterListWrap, BubbleFilterArea, BubbleFilterList, BubbleFilterItem, BubbleFilterBtn, AppendixFilterListImg, 
  BaseCard, MainTopSpace, SearchPathSpace, PathView, CombinedSearchList, SaltSearchList, ExternalFrameBridge, SearchFrame, PlaceWrap, PlaceRoot, 
  SortBoxWrap, SortBoxInner, SortBoxSpace, FlickingViewport, FlickingCamera, FilterItem, SearchBoxWrap, SearchBox, 
  SearchList, SearchItem, SearchItemInfo, SearchItemTitle, ItemBlueText, ItemCategoryText, SearchItemSub, 
  SearchBoxPagination, SubNav, EntryLayout,EntryPlaceBridge, EntryCloseBtn, EntryCloseBtnSpan, WrapBarCloseBtn, BarCloseBtn, 
  PlaceDataImageArea, ImageArea, PlaceDataArea, PlaceData, PlaceDataTitle, PlaceDataTitleName, PlaceDataTitleCate, 
  PlaceDataPlus, PlaceDataPlusSection, PlusSectionUl, PlusSectionLi, PlusSection, PlusSectionContent, 
}