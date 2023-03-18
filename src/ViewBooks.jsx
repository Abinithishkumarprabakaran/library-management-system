import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'

export function ViewBooks() {

  const [bookList, setBookList] = useState([])

  const navigate = useNavigate();

  const getBooks = () => {
    fetch("https://6414122350dff8e8fe44409b.mockapi.io/books")
      .then((data) => data.json())
      .then((book) => setBookList(book))
  }

  useEffect(() => getBooks(), [])

  return (
    <div>
      <div className='addBooksBtn'>
        <Button className='addbookbtn'
          variant="contained"
          sx={{ marginLeft: 'auto' }}
          onClick={()=> navigate('/addbooks')}
          >
            Add Book
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align='center'>Book Title</TableCell>
              <TableCell align='center'>Author</TableCell>
              <TableCell align='center'>ISBN</TableCell>
              <TableCell align='center'>Language</TableCell>
              <TableCell align='center'>Available Books</TableCell>
              <TableCell align='center'>Issue / Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookList.map((book) => (
              <TableRow
                key={book.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" align='center'>
                  {book.bookTitle}
                </TableCell>
                <TableCell align='center'>{book.author}</TableCell>
                <TableCell align='center'>{book.ISBN}</TableCell>
                <TableCell align='center'>{book.language}</TableCell>
                <TableCell align='center'>{book.booksAvailable}</TableCell>
                <TableCell align='center'>
                  <Button
                    variant="contained"
                    sx={{ marginRight: 1, marginTop: 1}}
                    onClick={()=> navigate(`/issuebooks/${book.id}`)}
                    >
                      Issue
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ marginRight: 1, marginTop: 1}}
                    onClick={deleteBook}
                    >
                      Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

function deleteBook() {
  console.log("Delete button is pressed")
}
