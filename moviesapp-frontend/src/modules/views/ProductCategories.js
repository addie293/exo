import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';

const ImageBackdrop = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: '#000',
  opacity: 0.5,
  transition: theme.transitions.create('opacity'),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  display: 'block',
  padding: 0,
  borderRadius: 0,
  height: '40vh',
  [theme.breakpoints.down('md')]: {
    width: '100% !important',
    height: 100,
  },
  '&:hover': {
    zIndex: 1,
  },
  '&:hover .imageBackdrop': {
    opacity: 0.15,
  },
  '&:hover .imageMarked': {
    opacity: 0,
  },
  '&:hover .imageTitle': {
    border: '4px solid currentColor',
  },
  '& .imageTitle': {
    position: 'relative',
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  '& .imageMarked': {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

const images = [
  {
    url: 'https://static.wikia.nocookie.net/21a2d4e6-8805-4716-8954-825da7e92cdd/scale-to-width-down/800',
    title: 'Action',
    width: '40%',
  },
  {
    url: 'https://unitingartists.org/wp-content/uploads/2020/06/Adventure-Genre-800x445.jpg',
    title: 'Adventure',
    width: '20%',
  },
  {
    url: 'https://www.horror.land/wp-content/uploads/2020/01/Scariest-Bedroom-Scenes-Deadly-Blessing-Article-Images-2020-v01.jpg',
    title: 'Horror',
    width: '40%',
  },
  {
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIS9lKFfA_R9rTCypsmQpp8U7Iobmw0_ePDA&usqp=CAU',
    title: 'Thriller',
    width: '38%',
  },
  {
    url: 'data:image/jpeg;base64,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',
    title: 'Romance',
    width: '38%',
  },
  {
    url: 'https://www.hollywoodreporter.com/wp-content/uploads/2014/11/behind_the_screen_whiplash_still.jpg',
    title: 'Musical',
    width: '24%',
  },
  {
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQKpodDZRTgI6oNopmj6EdSkXnBcxLnBTDJA&usqp=CAU',
    title: 'Animated',
    width: '40%',
  },
  {
    url: 'https://i.guim.co.uk/img/static/sys-images/Film/Pix/pictures/2009/6/11/1244715161882/Scene-from-The-Hangover-2-001.jpg?width=300&quality=85&auto=format&fit=max&s=b17a1441bede3d3591b4c4adffc4f851',
    title: 'Comedy',
    width: '20%',
  },
  {
    url: 'https://i.insider.com/5b48ed004474db29008b472b?width=1000&format=jpeg&auto=webp',
    title: 'Drama',
    width: '40%',
  },
];

export default function ProductCategories() {
  return (
    <Container component="section" sx={{ mt: 8, mb: 4 }}>
      <Typography variant="h4" marked="center" align="center" component="h2">
        For all generations and age groups
      </Typography>
      <Box sx={{ mt: 8, display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image) => (
          <ImageIconButton
            key={image.title}
            style={{
              width: image.width,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundSize: 'cover',
                backgroundPosition: 'center 40%',
                backgroundImage: `url(${image.url})`,
              }}
            />
            <ImageBackdrop className="imageBackdrop" />
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'common.white',
              }}
            >
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className="imageTitle"
              >
                {image.title}
                <div className="imageMarked" />
              </Typography>
            </Box>
          </ImageIconButton>
        ))}
      </Box>
    </Container>
  );
}
