import UploadForm from "@/compoennts/UploadForm";
import './globals.css';
import { Box } from "@mui/material";
import List from '@/compoennts/List';

export default function Home() {
  return (
    <Box width={'100%'} height={'100vh'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
      <List />
    </Box>
  );
}
