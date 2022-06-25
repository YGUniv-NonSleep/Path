import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Tooltip from '@mui/material/Tooltip';
import {
    EntryStoreWrap, StoreTab, StoreTabInfo, SortBoxWrap, SortBoxInner, SortBoxSpace, FlickingViewport, FlickingCamera, 
    StoreInfoArea, StoreInfo, StoreInfoTwo, StoreInfoItemKey, StoreInfoItemValue, 
} from './styles/oderStyle';

function StoreMenu({place, outStore}) {
    console.log(place)
    
    function cate() {
        let list = [];

        for(var i=0; i<7; i++) {
            list.push(
                <Accordion
                    defaultExpanded={true}
                    disableGutters={true}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <Typography>카테고리 이름</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                    </AccordionDetails>
                    <Divider />
                </Accordion>
            )    
        }

        return list
    }

    return (
        <EntryStoreWrap>
            <StoreTab>
                <SortBoxWrap>
                    <SortBoxInner>
                        <SortBoxSpace>
                            <StoreTabInfo>
                                <IconButton aria-label="back" size="small" onClick={outStore}>
                                    <KeyboardArrowLeftIcon fontSize='medium'>
                                        <span>돌아가기</span>
                                    </KeyboardArrowLeftIcon>
                                </IconButton>
                                <Typography sx={{
                                    margin: "0 auto",
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}>
                                    가게명
                                </Typography>
                                <IconButton aria-label="search" size="small" onClick={()=>alert("search")}>
                                    <SearchIcon fontSize='medium'>
                                        <span>검색</span>
                                    </SearchIcon>
                                </IconButton>
                            </StoreTabInfo>
                            <Divider />
                            <FlickingViewport>
                                <FlickingCamera>
                                <Tooltip 
                                    title={<Typography fontSize={'15px'}>Scroll while holding shift</Typography>} 
                                    followCursor 
                                    enterTouchDelay
                                >
                                    <Stack 
                                        direction="row" 
                                        spacing={1} 
                                        sx={{
                                            overflowX: 'auto', 
                                            "&::-webkit-scrollbar": {display: 'none'}
                                        }}
                                    >
                                        {/* 카테고리 수 만큼 반복 */}
                                        <Chip label="카테1" onClick={()=>alert("카테1")} />
                                        <Chip label="카테2" variant="outlined" onClick={()=>alert("카테2")} />
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
                        <div>
                            <StoreInfoItemKey>가게이름</StoreInfoItemKey>
                            <StoreInfoItemValue>가게명</StoreInfoItemValue>
                        </div>
                        <div>
                            <StoreInfoItemKey>대기시간</StoreInfoItemKey>
                            <StoreInfoItemValue>약 1시간</StoreInfoItemValue>
                        </div>
                        <div>
                            <StoreInfoItemKey>가게위치</StoreInfoItemKey>
                            <StoreInfoItemValue>1000m</StoreInfoItemValue>
                        </div>
                        <div>
                        <StoreInfoItemKey>결제방법</StoreInfoItemKey>
                        <StoreInfoItemValue>카드결제, 현장결제(카드/현금)</StoreInfoItemValue>
                        </div>
                    </StoreInfoTwo>
                    <Divider />
                </StoreInfo>
                {/* 가게 정보 */}

                { cate() }
                {/* 카테고리별 상품 */}
                
                <Typography 
                    variant={'body2'} 
                    align={'center'} 
                    gutterBottom={true} 
                    sx={{margin: "10px 0 30px 0"}} 
                >
                    메뉴의 사진은 연출된 사진으로, 실제와 다를 수 있습니다.
                </Typography>
            </StoreInfoArea>
        </EntryStoreWrap>
    )
}

export default StoreMenu