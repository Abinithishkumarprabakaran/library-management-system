import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

const formValidationSchema = yup.object({
  libId: yup
          .number()
          .required(),
  bookId: yup
          .number()
          .required(),
  bookTitle: yup
          .string()
          .required(),
  borrowerName: yup
          .string()
          .required(),
  issuerName: yup
          .string()
          .required(),
  dateOfIssue: yup
          .string()
          .required(),
  dateOfReturn: yup
          .string()
          .required(),
  returnStatus: yup
          .string()
          .required(),
})

export function IssueBooks() {

  const { id } = useParams();

  const [book, setBook] = useState(null)

  const getBooks = () => {
    fetch(`https://6414122350dff8e8fe44409b.mockapi.io/books/${id}`)
      .then((data) => data.json())
      .then((book) => setBook(book))
  }

  useEffect(() => getBooks(), [id])


  return book ? <IssueBookForm book={book} /> : <h2>Loading...</h2>;
}

function IssueBookForm({ book }){

  const {handleSubmit,handleChange,handleBlur,values,errors,touched} = useFormik({
    initialValues: { 
        libId: '', 
        bookId: `${book.id}`,
        bookTitle: `${book.bookTitle}`,
        borrowerName: '',
        issuerName: '',
        dateOfIssue: '',
        dateOfReturn: '',
        returnStatus: '' },
    validationSchema: formValidationSchema,
    onSubmit: (issuedBook) => {
        console.log("Form Values", issuedBook)
       issueBook(issuedBook)
       
    }
  });

  const navigate = useNavigate();

  const issueBook = async (issuedBook) => {

      await fetch('https://6414122350dff8e8fe44409b.mockapi.io/issuedbooks', {
          method: "POST",
          body: JSON.stringify(issuedBook),
          headers: {
              "Content-Type": "application/json",
          },
      });
      navigate("/viewissuedbooks")
  };
  
  return (
    <form className="add-book-form" onSubmit={handleSubmit}>
        <TextField
            name="libId"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.libId}
            label="User ID"
            variant="outlined"
            error={errors.libId && touched.libId}
            helperText={errors.libId && touched.libId ? errors.libId: null}
            />
        <TextField
            name="bookId"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.bookId}
            label="Book ID"
            variant="outlined"
            error={errors.bookId && touched.bookId}
            helperText={errors.bookId && touched.bookId ? errors.bookId: null}
            />
        <TextField
            name="bookTitle"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.bookTitle}
            label="Title"
            variant="outlined"
            error={errors.bookTitle && touched.bookTitle}
            helperText={errors.bookTitle && touched.bookTitle ? errors.bookTitle: null}
            />
        <TextField
            name="borrowerName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.borrowerName}
            label="Borrower"
            variant="outlined"
            error={errors.borrowerName && touched.borrowerName}
            helperText={errors.borrowerName && touched.borrowerName ? errors.borrowerName: null}
            />
        <TextField
            name="issuerName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.issuerName}
            label="Issuer"
            variant="outlined"
            error={errors.issuerName && touched.issuerName}
            helperText={errors.issuerName && touched.issuerName ? errors.issuerName: null}
            />
        <TextField
            name="dateOfIssue"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.dateOfIssue}
            label="Date of Issue"
            variant="outlined"
            error={errors.dateOfIssue && touched.dateOfIssue}
            helperText={errors.dateOfIssue && touched.dateOfIssue ? errors.dateOfIssue: null}
            />
        <TextField
            name="dateOfReturn"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.dateOfReturn}
            label="Date of Return"
            variant="outlined"
            error={errors.dateOfReturn && touched.dateOfReturn}
            helperText={errors.dateOfReturn && touched.dateOfReturn ? errors.dateOfReturn: null}
            />
        <TextField
            name="returnStatus"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.returnStatus}
            label="Return Status"
            variant="outlined"
            error={errors.returnStatus && touched.returnStatus}
            helperText={errors.returnStatus && touched.returnStatus ? errors.returnStatus: null}
            />

        <Button type="submit" variant="contained">
            Issue Book
        </Button>
    </form>
    );
}

