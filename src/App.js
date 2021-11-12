import logo from './logo.svg';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import {List as IngredientsList} from './ingredients/List';
import {One as IngredientsOne} from './ingredients/One';
import {List as PlacesList} from './places/List';
import {One as PlacesOne} from './places/One';
import {Home} from './home/home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/ingredients/" element={<IngredientsList/>} />
        <Route path="/ingredients/add/" element={<IngredientsOne mode='add' />} />
        <Route path="/ingredients/:id" element={<IngredientsOne mode='edit' />} />
        <Route path="/places/" element={<PlacesList/>} />
        <Route path="/places/add/" element={<PlacesOne mode='add' />} />
        <Route path="/places/:id" element={<PlacesOne mode='edit' />} />
      </Routes>
    </Router>
  );
}

export default App;
