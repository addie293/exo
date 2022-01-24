import * as React from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
import AppFooter from '../modules/views/AppFooter';
import AppAppBar from '../modules/views/AppAppBar';
import withRoot from '../modules/withRoot';
import SearchMovieComponent from '../modules/SearchMovieComponent.js'
import Top10MovieList from '../modules/Top10MovieList/Top10MoviesComponent';
import WatchList from '../modules/Favourites/FavouriteMovies';
import IP from '../Utils/config';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import moment from "moment";
import Typography from '@mui/material/Typography';

let favouriteMovies
const Home = () => {
  let [movies, setMovies] = React.useState([]);
  let [favouriteMovies, setFavouriteMovies] = React.useState([]);
  let [selectedMovie, setSelectedMovie] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    fetchMoviesList();
  }, []);
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if(selectedMovie!=""){
      setOpen(true)
    }
  }, [selectedMovie]);
  
  React.useEffect(() => {
    if(movies.length>0){
      fetchFavourtieMovieLists();
    }
  }, [movies]);

  const fetchMoviesList = async () => {
    try {
      await fetch(IP.api_endpoint + "movie/movies", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then(async (response) => {
          if (response.length > 0) {
            setMovies(response)
     
            //   notify("Added Successfully");
          } else {
            setMovies([])
            //   notify("Failed To Add.");
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    } catch (error) {
      console.log(`error ------------> `, error);
    }

  };

  const fetchFavourtieMovieLists = async () => {
    try {
      await fetch(IP.api_endpoint + `movie/favorite?userId=${localStorage.getItem("userId")}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then(async (response) => {
          if (response.length > 0) {
            let favourties = [];
            for (var arr in response) {
              for (var filter in movies) {
                if (response[arr].movieId === movies[filter].movieId) {
                  favourties.push(movies[filter]);
                }
              }
            }
            setFavouriteMovies(favourties);

          } else {

          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    } catch (error) {
      console.log(`error ------------> `, error);
    }


  };

  const markMovieFavourite = (movieID) => { 
    try {
      fetch(IP.api_endpoint + `movie/mark?userId=${localStorage.getItem("userId")}&movieId=${movieID}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then(async (response) => {
          if(!response.statusCode){
            let favourties = [...favouriteMovies];
              for (var filter in movies) {
                if (movieID === movies[filter].movieId) {
                  favourties.push(movies[filter]);
                }
              }
            setFavouriteMovies(favourties);
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    } catch (error) {
      console.log(`error ------------> `, error);
    }

  };


  return (
    <React.Fragment>
      <AppAppBar />
      <SearchMovieComponent movies={movies} setSelectedMovie={setSelectedMovie} favourites={favouriteMovies} markMovieFavourite={markMovieFavourite} />
      <Top10MovieList movies={movies.slice(0, 10)} favourites={favouriteMovies} markMovieFavourite={markMovieFavourite} />
      <WatchList movies={favouriteMovies} />
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {selectedMovie.title}
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
          {"Released on: " +moment(selectedMovie.release_date).format("MMM Do YY")}
          </Typography>
          <Typography gutterBottom>
          {selectedMovie.overview}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>markMovieFavourite(selectedMovie.movieId)}>
            Add to Watch List
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    
  );
}

export default withRoot(Home);
