import React from 'react';
import { StatusBar, YellowBox } from 'react-native';

import Routes from './src/routes';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
])

export default function App() {
  return (
    <>
    <StatusBar barStyle="light-content" backgroundColor="#7D40E7"/>
    <Routes />
    </>
  );
}

/* Anotações (Diferenças entre React e Native)
   font-weight = fontWeight

   // Valor passado entre strings: 
      font-weight: "bold"

    Cada "tag" tem o seu próprio styles, não herda do pai.

*/
