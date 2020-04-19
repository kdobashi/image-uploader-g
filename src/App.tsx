import React from 'react';
import logo from './logo.svg';
import { DbLogic, ImgObject } from './dbLogic'
import './App.css';
import Button from '@material-ui/core/Button';

function App() {

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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button onClick={()=>{}}>
          
        </Button>
      </header>
    </div>
  );
}

export default App;
