import Map from '../../components/Map';
import PropTypes from 'prop-types';
import useLoading from '../../hooks/useLoading';
import useOderMain from './hooks/useOderMain';
import { useSelector } from 'react-redux';

import {
  InputAdornment,
  TextField,
  Box,
  Pagination,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
  Button, 
  Typography,
} from '@mui/material';
import Chip from '@mui/material/Chip';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
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
  LookDetail, 
  ButtonDetail, 
} from './styles/oderStyle';
import CategoryList from './CategoryList';
import StoreInfo from './StoreInfo';
import PlaceList from './PlaceList';
import StoreMenu from './StoreMenu';
import Cart from "./Cart";

function OderMain() {
  const { loading } = useLoading();
  const cartState = useSelector((state) => state.cart);
  const {
    closeToggle,
    animate,
    subBarHide,
    searchData,
    searchPath,
    placeList,
    page,
    affiliate,
    alignment,
    place,
    pagiObj,
    showStore, 
    prodList, 
    compCateList, 
    cartOpen, 
    pathName, 
    reset, 
    products, 
    pathDraw, 
    handleCartOpen, 
    handleCartClose, 
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
        {loading ? null : <h2>?????? ???...</h2>}
        <NavLayout>
          {/* ??????????????? ?????? */}
          <WrapBarCloseBtn onClick={onCloseToggle}>
            <BarCloseBtn clicked={closeToggle} />
          </WrapBarCloseBtn>
          <PanelWrap>
            <PanelBase>
              {/* ?????? ??? */}
              <SearchBarBox>
                <Box
                  component="form"
                  noValidate
                  onSubmit={keywordSetting}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    sx={{ width: '340px' }}
                    placeholder="?????? ??????"
                    size="small"
                    id="store"
                    name="store"
                    value={searchData}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {' '}
                          <SearchIcon />{' '}
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <IconButton size="small" onClick={()=>reset()}>
                          <CloseIcon />
                        </IconButton>
                      )
                    }}
                  />
                </Box>
              </SearchBarBox>
              {/* ?????? ??????????????? */}
              <BubbleFilter subBarOpen={subBarHide}>
                <BubbleFilterListWrap>
                  <BubbleFilterArea>
                    {/* ????????? ???????????? */}
                    <BubbleFilterList>
                      {/* ???????????? ????????? */}
                      <CategoryList clicked={handleChange} />
                    </BubbleFilterList>
                  </BubbleFilterArea>
                </BubbleFilterListWrap>
              </BubbleFilter>
              {/* ????????? ?????????, ??????????????? */}
              <BaseCard>
                <MainTopSpace>
                  {/* ?????? ?????? ???????????? ????????? */}
                  <SearchPathSpace>
                    <PathView>
                      {pathName.sName != "" ? (
                        <div style={{ marginTop: "5px" }}>
                          <div style={{ display: "flex", justifyContent: "center" }}>
                            <Typography sx={{ fontWeight: 600 }}>{pathName.sName}</Typography>
                            <ArrowRightAltIcon/>
                            <Typography sx={{ fontWeight: 600 }}>{pathName.eName}</Typography>
                          </div>
                          {/* LookDetail, ButtonDetail,  */}
                          <LookDetail>
                            <ButtonDetail onClick={pathDraw}>
                              <Typography
                                sx={{ fontSize: 13.5, fontWeight: 700, display: "flex" }}
                              >
                                ?????? ??????
                              </Typography>
                              <ArrowForwardIosIcon sx={{ marginRight: -2, width: "14px", height: "18px", display: "flex" }} />
                            </ButtonDetail>
                          </LookDetail>
                        </div>
                      ) : (
                        <SearchItemSub>
                          ????????? ????????? ?????? ?????? ????????? ?????? ?????????.
                        </SearchItemSub>
                      )}
                    </PathView>
                  </SearchPathSpace>
                  {/* ????????? ??????????????? ????????? */}
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
                                        {/* ?????? ?????? ????????? ?????? */}
                                        {pagiObj == null ? (
                                          '????????? ??????'
                                        ) : (
                                          <ToggleButtonGroup
                                            value={alignment}
                                            exclusive
                                            onChange={handleAlignment}
                                            aria-label="text alignment"
                                            sx={{
                                              flexDirection: 'column',
                                              width: '100%',
                                            }}
                                          >
                                            <ToggleButton
                                              value="left"
                                              aria-label="left aligned"
                                            >
                                              <ElectricBoltIcon
                                                sx={{ marginRight: '5px' }}
                                              />
                                              ?????????
                                            </ToggleButton>
                                            <ToggleButton
                                              value="right"
                                              aria-label="right aligned"
                                            >
                                              <TaskAltIcon
                                                sx={{ marginRight: '5px' }}
                                              />
                                              ?????????
                                            </ToggleButton>
                                          </ToggleButtonGroup>
                                        )}
                                      </FlickingCamera>
                                    </FlickingViewport>
                                  </SortBoxSpace>
                                </SortBoxInner>
                              </SortBoxWrap>
                              {/* ?????? ?????? */}
                              <SearchBoxWrap>
                                <SearchList>
                                  {/* SearchBox ?????? */}
                                  {/* ????????? ????????? api ????????? ???????????? ????????? ??????????????? ???????????? */}
                                  { placeList.length == 0 ? (
                                    // ?????? ?????? ??????
                                    affiliate.length != 0 ? (
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
                                    ) : products.length != 0 ? (
                                      products.map((item) => {
                                        return (
                                          <PlaceList 
                                            key={item.id}
                                            item={item}
                                            target={()=>placeTarget(item)} 
                                            clicked={()=>onSubBarClick(true)} 
                                          />
                                        );
                                      })
                                    ) : null
                                  ) : (
                                    placeList.map((item, index) => {
                                      return (
                                        <PlaceList 
                                          key={index}
                                          item={item}
                                          target={()=>placeTarget(item)} 
                                          clicked={()=>onSubBarClick(true)} 
                                        />
                                      );
                                    })
                                  ) }
                                </SearchList>
                              </SearchBoxWrap>
                              {/* ?????????????????? ???????????? */}
                              {pagiObj == null ? null : (
                                <SearchBoxPagination>
                                  <Pagination
                                    hidePrevButton
                                    hideNextButton
                                    onChange={pageSetting}
                                    count={pagiObj.last}
                                    size="small"
                                    sx={{
                                      margin: '0 120px',
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
                {/* ?????? ????????? ?????? */}
                <SubNav clicked={subBarHide}>
                  <EntryLayout>
                    {/* ????????? ????????? */}
                    {place != null ? (
                      // ?????? ????????? ??? ???, ???????????? ??? ??? Map??? ???????????? ????????????
                      showStore ? (
                        <>
                          <StoreMenu place={place} prodList={prodList} compCateList={compCateList} outStore={handleShowStore} />
                          {/* ?????? */}
                          <IconButton
                            aria-label="cart"
                            sx={{
                              zIndex: '100',
                              position: 'absolute',
                              left: '300px;',
                              top: '870px;',
                            }}
                            onClick={handleCartOpen}
                          >
                            <Badge badgeContent={cartState.orderCompositionList.length} color="warning">
                              <ShoppingCartIcon sx={{ width: '42px', height: '42px' }} />
                            </Badge>
                          </IconButton>
                          
                          { cartOpen ? <Cart openChk={cartOpen} handleClose={handleCartClose} /> : null }
                          {/* ???????????? */}
                        </>
                      ) : (
                        <StoreInfo place={place} showStore={handleShowStore} />
                      )
                    ) : null}
                    <EntryCloseBtn
                      onClick={() => onSubBarClick(false)}
                      openSubBar={closeToggle}
                    >
                      <EntryCloseBtnSpan>??????</EntryCloseBtnSpan>
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
