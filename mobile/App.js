import React from 'react';
import Routes from './src/routes';
import { StatusBar, YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);

export default function App() {
  return (
    //Nao existem comandos HTML dentro do react native
    //View seriam como as divs
    //Não existem ids ou classes, cada container possui um css próprio
    <>
      <StatusBar barStyle="light-content" />
      <Routes />
    </>
  );
}