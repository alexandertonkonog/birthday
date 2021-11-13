import {Box, Container, Typography, IconButton} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import p5 from './images/p5.jpg';
import p6 from './images/p6.jpg';
import p7 from './images/p7.jpg';
import p8 from './images/p8.jpg';
import p9 from './images/p9.jpg';
import p10 from './images/p10.jpg';
import p11 from './images/p11.jpg';
import p12 from './images/p12.jpg';
import p13 from './images/p13.jpg';
import p14 from './images/p14.jpg';
import {useState} from "react";
import Game from "./components/Game";

const App = () => {
  const [activePhoto, setActivePhoto] = useState(0);
  const images = [ p5, p6, p7, p8, p9, p10, p11, p12, p13, p14 ];

  const changePhoto = (vector) => {
    if (vector) {
      if (activePhoto === (images.length - 1)) {
        setActivePhoto(0);
      } else {
        setActivePhoto(prev => prev + 1);
      }
    } else {
      if (activePhoto === 0) {
        setActivePhoto(images.length - 1);
      } else {
        setActivePhoto(prev => prev - 1);
      }
    }
  }

  return (
    <Container>
      <Box className={'wrapper'}>
        <IconButton onClick={() => changePhoto(false)} size={'large'} className={'main-arrow main-arrow_back'}>
          <ArrowBackIosIcon size={'large'} />
        </IconButton>
        <div style={{
          backgroundImage: `url(${images[activePhoto]})`,
        }} className={'main-photo'}>
          <Typography className={'main-title'} variant={'h1'}>С др, НАСТЯ</Typography>
        </div>
        <IconButton onClick={() => changePhoto(true)} size={'large'} className={'main-arrow main-arrow_next'}>
          <ArrowForwardIosIcon size={'large'} />
        </IconButton>
        <Game />
      </Box>
    </Container>
  );
}

export default App;
