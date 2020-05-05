import { CardMedia, makeStyles, Container, Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React, { useState, useEffect } from 'react';
import './../App.css';
import { ImageDbLogic, ImgObject } from '../dblogic/imageDbLogic';
import { ImageContainer } from '../containers/imageContainer';

// スタイル
const useStyles = makeStyles(() => ({
  input: {
    display: "block"
  },
}));

function App() {
  const classes = useStyles();
  const imageContainer = ImageContainer.useContainer();

  useEffect(() => {
    imageContainer.getAllImage();
  }, [])

  return (
    <div className="App">
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={imageContainer.addImage}
      />
      <Box>全{imageContainer.imgObjects.length}件</Box>
      {imageContainer.imgObjects.map(i => 
          <CardMedia
            key={i.id}
            component="img"
            image={i.imageBinary}
          />
      )}
    </div>
  );
}

export default App;
