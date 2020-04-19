import { CardMedia, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import './App.css';
import { DbLogic, ImgObject } from './dbLogic';

// スタイル
const useStyles = makeStyles(() => ({
  input: {
    display: "block"
  },
}));

function App() {
  const classes = useStyles();
  const [src, setSrc] = useState<string>('');

  const imgObject : ImgObject = {
    key: '1',
    url: 'aaaa',
  }

  var dbLogic!: DbLogic;
  dbLogic = new DbLogic();
  dbLogic.open()
    .then((result) => {
      console.log(result);
      dbLogic.update(imgObject)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });

    const uploadImg = (e: React.ChangeEvent<HTMLInputElement>) => {
      var file! : File;
      console.log(e.target.files);
      if(e.target.files == null || e.target.files.length <= 0) return; 
      file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setSrc(reader.result as string);
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
