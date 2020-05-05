import { CardMedia, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import './../App.css';
import { ImageDbLogic, ImgObject } from '../dblogic/imageDbLogic';

// スタイル
const useStyles = makeStyles(() => ({
  input: {
    display: "block"
  },
}));

function App() {
  const classes = useStyles();
  const [src, setSrc] = useState<string>('');

  // 写真を
  const uploadImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files == null || e.target.files.length <= 0) return;
    var file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSrc(reader.result as string);
      var imgObject : ImgObject = {
        id: '1',
        imageBinary: reader.result as string,
      }
      ImageDbLogic.getInstance().update(imgObject);
      ImageDbLogic.getInstance().getAll().then(result => {
        
      });

      var tempArray: Array<string> = ['1','2'];
      ImageDbLogic.getInstance().getMultiple(tempArray)
        .then(aaa => {
          console.log(aaa);
        });
    }
  }

  return (
    <div className="App">
      <CardMedia
        component="img"
        image={src}
      />
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={uploadImg}
      />
    </div>
  );
}

export default App;
