import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { ViewBooks } from './ViewBooks';
import { Home } from './Home';
import { NotFound } from './NotFound';
import { Routes, Route } from 'react-router-dom';
import { AddBooks } from './AddBooks';
import { ViewIssuedBooks } from './ViewIssuedBooks';
import { IssueBooks } from './IssueBooks';

export const books = [
  {
      "id": "1",
      "bookTitle": "Atomic Habits",
      "author": "James Clear",
      "language": "English",
      "booksAvailable": 10,
      "ISBN": 89564256
  },
  {
      "id": "2",
      "bookTitle": "The Alchemist",
      "author": "Paulo Coelho",
      "language": "English",
      "booksAvailable": 3,
      "ISBN": 78452615
  }
];

function App() {

  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/viewbooks' element={<ViewBooks />}/>
        <Route path='/addbooks' element={<AddBooks />}/>
        <Route path='/viewissuedbooks' element={<ViewIssuedBooks />}/>
        <Route path='/issuebooks' element={<IssueBooks />}/>
        <Route path='*' element={<NotFound />} />
      </Routes>

    </div>
  )
}

export default App

