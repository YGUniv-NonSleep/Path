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

function StoreMenu({ place, outStore }) {
  // console.log(place);
  const { 
    dialogOpen, count, prodList, compCateList, setCount, handleDialogOpen, handleDialogClose, 
  } = useOderMain();
  console.log(prodList, compCateList)
  
  function cateList() {
    let list = [];
    for (var i = 0; i < compCateList.length; i++) {
      list.push(
        <Chip label={`${compCateList[i]}`} variant="filled" onClick={() => alert(`${compCateList[i]}`)} />
      )
    }
    return list
  }

  function sInfo() {
    let list = [];
    let value = [`${place.name != '' ? place.name : '업체명'}`, `약 ${'나중에 받을거임'}분`, `${'나중에 받으려나?'}m`, '카드결제, 현장결제(카드/현금)'];
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

  function menu() {
    let list = [];

    // 메뉴 수 만큼 반복
    for (var i = 0; i < 2; i++) {
      list.push(
        <>
          <ListItemButton alignItems="flex-start" onClick={handleDialogOpen}>
            <ListItemAvatar sx={{ margin: "auto 0" }}>
              <Avatar
                alt="item"
                variant="rounded"
                sx={{ height: "74px", width: "74px", marginRight: "10px" }}
                src="/static/images/avatar/1.jpg"
              />
            </ListItemAvatar>
            <ListItemText
              primary={<Typography>메뉴명</Typography>}
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
                    {` I'll be in your 설명 `}
                  </Typography>
                  <Typography
                    sx={{ display: "block" }}
                    component="span"
                    variant="button"
                  >
                    {`1000원`}
                  </Typography>
                </Fragment>
              }
            />
          </ListItemButton>
          <Divider variant="inset" component="li" />
        </>
      );
    }

    return list;
  }

  function cate() {
    let list = [];

    // 카테고리 수 만큼 반복
    for (var i = 0; i < 3; i++) {
      list.push(
        <Accordion defaultExpanded={true} disableGutters={true}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>카테고리 이름</Typography>
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
                {menu()}
              </List>
            </Typography>
          </AccordionDetails>
          <Divider />
        </Accordion>
      );
    }

    return list;
  }

  return (
    <EntryStoreWrap>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        // paperScrollPaper={true}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        sx={{ height: '550px', margin: 'auto auto' }}
      >
        <DialogTitle id="scroll-dialog-title">메뉴이름</DialogTitle>
        <DialogContent dividers={true} sx={{ minWidth: '350px' }}>
          <DialogContentText
            id="scroll-dialog-description"
            tabIndex={-1}
          >
            {/* {[...new Array(50)].map(() => 
                `Cras mattis consectetur purus sit amet fermentum.
                Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
            ).join("\n")} */}

{/* 상품 옵션 반복 */}
            {/* 옵션 */} {/* 데이터 받아오는거 보고 뿌릴건데 일단 map -> 함수로 세부 옵션까지 뿌려부자 */}
            <FormControl sx={{ display: 'block', marginBottom: '25px' }}>
                <FormLabel id="item-option-label">옵션이름</FormLabel>
                <RadioGroup
                    aria-labelledby="item-detail-option-group-label"
                    defaultValue="opt1"
                    name="radio-buttons-group"
                >
                    {/* 세부 옵션 */}
                    <div style={{ display: 'flex' }}>
                    <FormControlLabel value={`opt1`} control={<Radio />} label={`Opt1`} sx={{ display: 'inline-block',  }} />
                    <Typography sx={{ display: 'inline-flex', alignItems: 'center', marginLeft: 'auto' }}>+{0}원</Typography>
                    </div>
                </RadioGroup>
                <Divider sx={{ marginTop: '5px' }} />
            </FormControl>

            <ButtonGroup sx={{ display: 'flex', justifyContent: 'flex-end;', marginLeft: 'auto' }}> 
                <Button
                    aria-label="reduce"
                    onClick={() => {
                        setCount(Math.max(count - 1, 0));
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
                <Typography sx={{ display: 'inline-flex', marginLeft: "auto" }}>{10000}원</Typography>
            </div>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>뒤로가기</Button>
          <Button onClick={handleDialogClose}>장바구니 추가</Button>
        </DialogActions>
      </Dialog>
      {/* 모달창 */}

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
                <IconButton
                  aria-label="search"
                  size="small"
                  onClick={() => alert("search")}
                >
                  <SearchIcon fontSize="medium">
                    <span>검색</span>
                  </SearchIcon>
                </IconButton>
              </StoreTabInfo>
              <Divider />
              <FlickingViewport>
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
                    >
                      {/* 카테고리 수 만큼 반복 */}
                      { cateList() }
                      <Chip label="카테1" variant="filled" onClick={() => alert("카테1")} />
                      <Chip label="카테2" variant="outlined" onClick={() => alert("카테2")} />
                    </Stack>
                  </Tooltip>
                </FlickingCamera>
              </FlickingViewport>
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
        {/* 카테고리별 상품 */}
        {cate()}

        <Typography
          variant={"body2"}
          align={"center"}
          gutterBottom={true}
          sx={{ margin: "10px 0 30px 0" }}
        >
          메뉴의 사진은 연출된 사진으로, 실제와 다를 수 있습니다.
        </Typography>
      </StoreInfoArea>
      {/* 가게 정보 */}
    
    </EntryStoreWrap>
  );
}

export default StoreMenu;
