import { Grid, Box, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { red } from '@mui/material/colors';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

const SamsungCard = styled.div`
  width: 240px;
  height: 160px;
  opacity: 0.6;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    opacity: 1;
    transform: translateY(-3px);
    transition: all 0.5s ease-out;
  }
`;

const Card = ({ card, isRemove, handleRemove }) => {
  const [isCardShow, setIsCardShow] = useState(true);
  const toggleIsCardShow = () => setIsCardShow(!isCardShow);
  const createDate = card.createTime.slice(0, 10);
  const cardNum = `${card.number.slice(0, 4)}-${card.number.slice(4, 8)}-
  ${card.number.slice(8, 12)}-${card.number.slice(12, 16)}`;
  const imgUrl =
    process.env.REACT_APP_SPRING_API +
    '/api/image/' +
    '4eeba5f1-1359-4b2d-bf90-77af0088600f' +
    card.cardCompany +
    '카드';

  useEffect(() => {
    if (isRemove === true) setIsCardShow(false);
    else setIsCardShow(true);
  }, [isRemove]);

  return (
    <Grid item xs={14} sm={6} md={4} onClick={toggleIsCardShow}>
      {isCardShow ? (
        <>
          <SamsungCard>
            <img src={imgUrl} width={240} height={160} />
          </SamsungCard>
        </>
      ) : (
        <>
          <Box
            sx={{
              bgcolor: 'background.paper',
              boxShadow: 1,
              borderRadius: 2,
              p: 2,
              minWidth: 100,
              minHeight: 150,
              mr: 1,
            }}
          >
            <Box
              sx={{
                color: 'text.secondary',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {card.cardCompany}카드
              {isRemove ? (
                <>
                  <IconButton
                    sx={{ color: red[400] }}
                    component="span"
                    onClick={() => handleRemove(card)}
                  >
                    <ClearIcon />
                  </IconButton>
                </>
              ) : (
                <></>
              )}
            </Box>
            <Box
              sx={{
                mt: 1,
                mb: 2,
                color: 'text.primary',
                fontSize: 22,
                fontWeight: 'medium',
              }}
            >
              {cardNum}
            </Box>
            <Box
              sx={{
                color: 'success.dark',
                display: 'inline',
                fontWeight: 'bold',
                mx: 0.5,
                fontSize: 14,
              }}
            >
              {card.type}
            </Box>
            <Box
              sx={{
                color: 'text.secondary',
                display: 'inline',
                fontSize: 14,
                ml: 14,
              }}
            >
              {createDate}
            </Box>
          </Box>
        </>
      )}
    </Grid>
  );
};

export default Card;
