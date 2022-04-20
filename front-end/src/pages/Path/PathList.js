import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
function PathList() {
    // ListItem -> key={index}
    return (
        <ListItem sx={{ height: 250 }} component="div" disablePadding>
            <ListItemButton>
                <ListItemText primary={`Item 3`} />
            </ListItemButton>
        </ListItem>
    );
}
export default function VirtualizedList() {
    return (
      <Box
        sx={{ width: '100%', height: '100%', bgcolor: 'background.paper' }}
      >
        <FixedSizeList
          height={500}
          width={"100%"}
          itemSize={50}
          itemCount={20}
          overscanCount={5}
        >
          {PathList}
        </FixedSizeList>
      </Box>
    );
  }