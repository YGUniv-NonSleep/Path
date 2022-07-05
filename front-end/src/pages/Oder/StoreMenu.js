import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Tooltip from "@mui/material/Tooltip";
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {
  EntryStoreWrap,
  StoreTab,
  StoreTabInfo,
  SortBoxWrap,
  SortBoxInner,
  SortBoxSpace,
  FlickingViewport,
  FlickingCamera,
  StoreInfoArea,
  StoreInfo,
  StoreInfoTwo,
  StoreInfoItemKey,
  StoreInfoItemValue,
} from "./styles/oderStyle";
import { Fragment } from "react";
import useOderMain from "./hooks/useOderMain";

function StoreMenu({ place, prodList, compCateList, outStore }) {
  const { 
    category, dialogOpen, count, prodInfo, optionPrice, 
    setCount, handleDialogOpen, handleDialogClose, calculOpt, putCart, clickCategory
  } = useOderMain();
  
  function sInfo() {
    let list = [];
    
    let value = [
      `${place.name != '' ? place.name : '업체명'}`, 
      `약 ${`${place.waitTime}`}분`, 
      `${place.distance != NaN || place.distance != undefined || place.distance != null
        ? `${place.distance}m`
        : '위치정보를 얻어오지 못했습니다.' }`, 
      '카드결제' // 현장결제(카드/현금)
    ];
    const title = ['가게이름', '대기시간', '가게위치', '결제방법'];

    for (var i = 0; i < 4; i++) {
      list.push(
        <div>
          <StoreInfoItemKey>{title[i]}</StoreInfoItemKey>
          <StoreInfoItemValue>{value[i]}</StoreInfoItemValue>
        </div>
      )
    }

    return list
  }

  // 카테고리와 상품을 랜더하는 함수
  function cateMenu(list, keyGetter) {
    let sameCateMenu = new Map();

    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = sameCateMenu.get(key);
      if (!collection) {
        sameCateMenu.set(key, [item]);

      } else {
        if(item.exposure != false)
          collection.push(item);
      }
    });
    // console.log(sameCateMenu.keys())
    // console.log(sameCateMenu.values())

    let arr = [];

    for(var k of sameCateMenu.entries()) {
      arr.push(
        <Accordion defaultExpanded={true} disableGutters={true}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{k[0]}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {/* 메뉴 */}
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                { k[1].map((item) => 
                <>
                  <ListItemButton alignItems="flex-start" onClick={()=>handleDialogOpen(item)}>
                    <ListItemAvatar sx={{ margin: "auto 0" }}>
                      <Avatar
                        alt="item"
                        variant="rounded"
                        sx={{ height: "74px", width: "74px", marginRight: "10px" }}
                        src={ 
                          item.prodBasic.image != "blankImage" && item.prodBasic.image != undefined 
                          ? `${process.env.REACT_APP_SPRING_API}/api/image/${item.prodBasic.image}`
                          : `${process.env.PUBLIC_URL}/noImage.png`
                        }
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Typography>{item.prodBasic.name}</Typography>}
                      sx={{
                        display: "block",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        margin: "auto 0",
                      }}
                      secondary={
                        <Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {` ${item.prodBasic.detail} `}
                          </Typography>
                          <Typography
                            sx={{ display: "block" }}
                            component="span"
                            variant="button"
                          >
                            {`${item.price}원`}
                          </Typography>
                        </Fragment>
                      }
                    />
                  </ListItemButton>
                  <Divider variant="inset" component="li" />
                </>
                 ) }
              </List>
            </Typography>
          </AccordionDetails>
          <Divider />
        </Accordion>
      )
    }
    
    return arr
  }

  return (
    <EntryStoreWrap>
      { prodInfo != null && prodInfo != undefined ? (
        <Dialog
          open={dialogOpen}
          onClose={handleDialogClose}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          sx={{ height: '550px', margin: 'auto auto' }}
        >
          <DialogTitle id="scroll-dialog-title">{prodInfo.prodBasic.name}</DialogTitle>
          <DialogContent dividers={true} sx={{ minWidth: '350px' }}>
            <DialogContentText
              id="scroll-dialog-description"
              tabIndex={-1}
            >
              {/* 상품 옵션 */}
              { prodInfo.optionList.length != 0 ? (
                prodInfo.optionList.map((option) => 
                  <FormControl sx={{ display: 'block', marginBottom: '25px' }}>
                    <FormLabel id="item-option-label">{option.name}</FormLabel>
                    <RadioGroup
                      aria-labelledby="item-detail-option-group-label"
                      // defaultValue={`${option.detailOptionList[0].price}`}
                      name="radio-buttons-group"
                    >
                      {/* 세부 옵션 */}
                      { option.detailOptionList.map((od) => 
                        <div style={{ display: 'flex' }}>
                          <FormControlLabel 
                            value={`${od.price}`}
                            control={<Radio />} 
                            label={`${od.name}`} // 화면에 보이는 값
                            sx={{ display: 'inline-block' }} 
                            onChange={()=>calculOpt(od)}
                          />
                          <Typography 
                            sx={{ display: 'inline-flex', alignItems: 'center', marginLeft: 'auto' }}
                          >
                            +{od.price}원
                          </Typography>
                        </div>
                      ) }
                    </RadioGroup>
                    <Divider sx={{ marginTop: '5px' }} />
                </FormControl>  
                )
              ) : null }

              <ButtonGroup sx={{ display: 'flex', justifyContent: 'flex-end;', marginLeft: 'auto' }}> 
                <Button
                  aria-label="reduce"
                  onClick={() => {
                    setCount(Math.max(count - 1, 1));
                  }}
                >
                  <RemoveIcon fontSize="small" />
                </Button>
                <Button>{count}</Button>
                <Button
                    aria-label="increase"
                    onClick={() => {
                      setCount(count + 1);
                    }}
                >
                    <AddIcon fontSize="small" />
                </Button>
              </ButtonGroup>

              <div style={{ display: 'flex', marginTop: '15px' }}>
                <Typography sx={{ display: 'inline-block', marginRight: "auto" }}>총 주문금액</Typography>
                <Typography sx={{ display: 'inline-flex', marginLeft: "auto" }}>{(prodInfo.price + optionPrice) * count}원</Typography>
              </div>

            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>뒤로가기</Button>
            <Button onClick={()=>putCart(prodInfo, (prodInfo.price + optionPrice), count)}>장바구니 추가</Button>
          </DialogActions>
        </Dialog>
      ) : null }
      {/* 상품 옵션 선택 모달창 */}

      <StoreTab>
        <SortBoxWrap>
          <SortBoxInner>
            <SortBoxSpace>
              <StoreTabInfo>
                <IconButton aria-label="back" size="small" onClick={outStore}>
                  <KeyboardArrowLeftIcon fontSize="medium">
                    <span>돌아가기</span>
                  </KeyboardArrowLeftIcon>
                </IconButton>
                <Typography
                  sx={{
                    margin: "0 auto",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontWeight: 600
                  }}
                >
                  {place.name != '' ? place.name : '업체명'}
                </Typography>
                {/* <IconButton
                  aria-label="search"
                  size="small"
                  onClick={() => alert("search")}
                >
                  <SearchIcon fontSize="medium">
                    <span>검색</span>
                  </SearchIcon>
                </IconButton> */}
              </StoreTabInfo>
              <Divider />
              {/* <FlickingViewport>
                <FlickingCamera>
                  <Tooltip
                    title={
                      <Typography fontSize={"15px"}>
                        Scroll while holding shift
                      </Typography>
                    }
                    followCursor={true}
                    enterTouchDelay={700}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{
                        overflowX: "auto",
                        "&::-webkit-scrollbar": { display: "none" }, // 스크롤바 가려줌
                      }}
                    > */}
                      {/* 카테고리 수 만큼 반복 */}
                      {/* { compCateList != null
                        ? compCateList.map((item)=>{
                          // variant='outlined'
                          return (
                            <Chip 
                              label={`${item}`}
                              variant={ category == item ? 'filled' : 'outlined'}
                              onClick={(e) => clickCategory(e)} 
                            />
                          )
                        }) 
                        : null }
                    </Stack>
                  </Tooltip>
                </FlickingCamera>
              </FlickingViewport> */}
              <Divider />
            </SortBoxSpace>
          </SortBoxInner>
        </SortBoxWrap>
      </StoreTab>
      {/* 가이드바 / 여기까지 고정위치 */}

      <StoreInfoArea>
        <StoreInfo>
          <StoreInfoTwo>
            {sInfo()}
          </StoreInfoTwo>
          <Divider />
        </StoreInfo>
        {/* 상단 네비바 */}

        { prodList != null && prodList.length != 0 ? 
          cateMenu(prodList, prod => prod.prodBasic.category)
         : (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "350px" }}>
            <Typography>빠른 시일 이내로 준비 하겠습니다.</Typography>
            <Typography>감사합니다.</Typography>
          </div>
         ) } 
        {/* 카테고리별 상품 */}

        { prodList != null && prodList.length != 0 ? (
          <Typography
            variant={"body2"}
            align={"center"}
            gutterBottom={true}
            sx={{ margin: "10px 0 30px 0" }}
          >
            메뉴의 사진은 연출된 사진으로, 실제와 다를 수 있습니다.
          </Typography>
        ) : null }
      </StoreInfoArea>
      {/* 가게 정보 */}
    
    </EntryStoreWrap>
  );
}

export default StoreMenu;
