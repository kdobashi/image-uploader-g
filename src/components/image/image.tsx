import { CardMedia, makeStyles, Container, Box, TextField, InputAdornment, ButtonBase } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React, { useState, useEffect } from 'react';
import './../../App.css';
import { ImageDbLogic, ImgObject } from '../../dblogic/imageDbLogic';
import { ImageContainer } from '../../containers/imageContainer';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import ja from "date-fns/locale/ja";
import ExtendedDateFnsUtils from '../../utils/extendedDateFunsUtils'
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import ImageTile from '../share/imageTile'

// スタイル
const useStyles = makeStyles(() => ({
  input: {
    display: "block"
  },
  
}));

function Image() {
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
              <Box width='45%' paddingBottom='20px' >
                <ImageTile
                  id={i.id}
                  imageBinary={i.imageBinary}
                />
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label=""
                  format="yyyy/MM/dd"
                  okLabel="決定"
                  cancelLabel="キャンセル"
                  value={i.date}
                  onChange={e => imageContainer.handleDateChange(e, i)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />

                <TextField
                  id="amount"
                  type="tel"
                  inputMode="decimal"
                  defaultValue={i.amount}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">¥</InputAdornment>,
                  }}
                  onChange={e => imageContainer.handleTextChange(e, i)}
                />

                <TextField
                  id="note"
                  defaultValue={i.note}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><CommentOutlinedIcon /></InputAdornment>,
                  }}
                  onChange={e => imageContainer.handleTextChange(e, i)}
                />

              </Box>
            )}
          </Box>
        </MuiPickersUtilsProvider>
      </Container>
    </div>
  );
}

export default Image;
