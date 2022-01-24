import MovieCard from './MovieCard';
import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Top10Movies = (props) => {
  const [movies, setMovies] = React.useState(props.movies);
  
  let responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };
  return (
    <Container component="section" sx={{ mt: 8, mb: 4 }}>
      <Typography variant="h4" marked="center" align="center" component="h2">
        Top 10 Movies in Theater
      </Typography>

      <Carousel
        swipeable={false}
        draggable={false}
        showDots={false}
        responsive={responsive}
        ssr={false} // means to render carousel on server-side.
        infinite={false}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >

        {
          props.movies.map(movie=>{
            return(
              <MovieCard movie={movie} favourites={props.favourites} markMovieFavourite={props.markMovieFavourite}/>
            )
          })
        }
      </Carousel>;

    </Container>
  );
}


export default Top10Movies;
