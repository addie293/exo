import * as React from 'react';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from '../views/ProductHeroLayout';
import backgroundImage from '../../Utils/Images/movieCover.jpg' 
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


const SearchMovie=(props)=> {
    const options = props.movies.map((option) => {
        const firstLetter = option.title[0].toUpperCase();
        return {
          firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
          ...option,
        };
      });

  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Search your favourite movie
      </Typography>
      <Paper
      component="form"
      sx={{ m:'30px', display: 'flex', alignItems: 'center', width: 400 }}
    >
  <Autocomplete
      options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
      groupBy={(option) => option.firstLetter}
      getOptionLabel={(option) => option.title}
      onChange={(e,v)=>{
        if(v){
          props.setSelectedMovie(v)
        }else{
          props.setSelectedMovie("")
        }

      }}
      sx={{ width: '100%' }}
      renderInput={(params) => <TextField {...params} />}
    />
    </Paper>

    </ProductHeroLayout>
  );

  
}

  
  export default SearchMovie;
