import { CardMedia, makeStyles, Container, Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React, { useState, useEffect } from 'react';
import './../App.css';
import { ImageDbLogic, ImgObject } from '../dblogic/imageDbLogic';
import { ImageContainer } from '../containers/imageContainer';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import ja from "date-fns/locale/ja";
import ExtendedDateFnsUtils from '../utils/extendedDateFunsUtils'
import CircularIndeterminate from '../utils/indicator';

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
      <Container>
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
          onChange={imageContainer.addImage}
        />
        <MuiPickersUtilsProvider utils={ExtendedDateFnsUtils} locale={ja}>
          <Box>全{imageContainer.imgObjects.length}件</Box>
          <Box display='flex' flexWrap='wrap' justifyContent='space-between'>
            {imageContainer.imgObjects.map(i => 
              <Box width='45%' >
                <CardMedia
                  key={i.id}
                  component="img"
                  image={i.imageBinary}
                />

                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="使用日"
                  format="yyyy/MM/dd"
                  okLabel="決定"
                  cancelLabel="キャンセル"
                  value={i.date}
                  onChange={e => imageContainer.handleDateChange(e, i)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />

                

              </Box>
            )}
          </Box>
        </MuiPickersUtilsProvider>
      </Container>
    </div>
  );
}

export default App;
