import { CardMedia, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import './../App.css';
import { DbLogic, ImgObject } from '../dblogic/dbLogic';

// スタイル
const useStyles = makeStyles(() => ({
  input: {
    display: "block"
  },
}));

function App() {
  const classes = useStyles();
  const [src, setSrc] = useState<string>('');

  // const imgObjectSample : ImgObject = {
  //   key: '1',
  //   imageBinary: 'bbb',
  // }
  
  // TODO: open処理を先に動かしておく必要があるため、
  // シングルトンインスタンス生成をserviceWorkerで動かす
  DbLogic.getInstance();

  // 写真を
  const uploadImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files == null || e.target.files.length <= 0) return;
    var file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSrc(reader.result as string);
      var imgObject : ImgObject = {
        key: '1',
        imageBinary: reader.result as string,
      }
      DbLogic.getInstance().update(imgObject);
      // DbLogic.getInstance().getSingle('1');
      DbLogic.getInstance().getAll();
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
