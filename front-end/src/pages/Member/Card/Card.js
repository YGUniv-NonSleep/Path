import { Grid, Box } from '@mui/material';

const Card = ({ card }) => {
  const createDate = card.createTime.slice(0, 10);
  const cardNum = `${card.number.slice(0, 4)}-${card.number.slice(4, 8)}-
  ${card.number.slice(12, 16)}-${card.number.slice(16, 20)}`;

  return (
    <Grid item xs={14} sm={6} md={4}>
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
        <Box sx={{ color: 'text.secondary' }}>{card.cardCompany} 카드</Box>
        <Box
          sx={{
            mt: 2,
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
    </Grid>
  );
};

export default Card;
