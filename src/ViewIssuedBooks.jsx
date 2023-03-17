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

export function ViewIssuedBooks() {

  const [issuedBookList, setIssuedBookList] = useState([])

  const navigate = useNavigate();

  const getIssuedBooks = () => {
    fetch("https://6414122350dff8e8fe44409b.mockapi.io/issuedbooks")
      .then((data) => data.json())
      .then((book) => setIssuedBookList(book))
  }

  useEffect(() => getIssuedBooks(), [])

  console.log(issuedBookList)

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align='center'>ID</TableCell>
              <TableCell align='center'>Book ID</TableCell>
              <TableCell align='center'>Title</TableCell>
              <TableCell align='center'>Borrower Name</TableCell>
              <TableCell align='center'>Issuer Name</TableCell>
              <TableCell align='center'>Date of Issue</TableCell>
              <TableCell align='center'>Date of Return</TableCell>
              <TableCell align='center'>Return Status</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {issuedBookList.map((book) => (
              <TableRow key={book.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align='center'>{book.libId}</TableCell>
                <TableCell component="th" scope="row" align='center'>
                  {book.bookId}
                </TableCell>
                <TableCell align='center'>{book.bookTitle}</TableCell>
                <TableCell align='center'>{book.borrowerName}</TableCell>
                <TableCell align='center'>{book.issuerName}</TableCell>
                <TableCell align='center'>{book.dateOfIssue}</TableCell>
                <TableCell align='center'>{book.dateOfReturn}</TableCell>
                <TableCell align='center'>{book.returnStatus}</TableCell>
                <TableCell align='center'>
                  <Button
                    variant="contained"
                    sx={{ marginRight: 1, marginTop: 1}}
                    >
                      Edit
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ marginRight: 1, marginTop: 1}}
                    onClick={deleteIssuedBook}
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

function deleteIssuedBook() {
  console.log("Delete button is pressed")
}

