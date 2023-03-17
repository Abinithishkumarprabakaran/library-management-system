import { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

const formValidationSchema = yup.object({
  bookTitle: yup
          .string()
          .required(),
  author: yup
          .string()
          .required()
          .min(4),
  language: yup
          .string()
          .required(),
  booksAvailable: yup
          .number()
          .required(),
  ISBN: yup
          .number()
          .required()
})

export function AddBooks() {

  const {handleSubmit,handleChange,handleBlur,values,errors,touched} = useFormik({
    initialValues: { 
        bookTitle: '', 
        author: '',
        language: '',
        booksAvailable: '',
        ISBN: '' },
    validationSchema: formValidationSchema,
    onSubmit: (newBook) => {
        console.log("Form Values", newBook)
        addBook(newBook)
    }
  });

const navigate = useNavigate();

const addBook = async (newBook) => {

    await fetch(`https://6414122350dff8e8fe44409b.mockapi.io/books`, {
        method: "POST",
        body: JSON.stringify(newBook),
        headers: {
            "Content-Type": "application/json",
        },
    });

    navigate("/viewbooks")
};
  
  return (
    <form className="add-book-form" onSubmit={handleSubmit}>
        <TextField
            name="bookTitle"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.bookTitle}
            label="Book Title"
            variant="outlined"
            error={errors.bookTitle && touched.bookTitle}
            helperText={errors.bookTitle && touched.bookTitle ? errors.bookTitle: null}
            />

        <TextField
            name="author"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.author}
            label="Author"
            variant="outlined"
            error={errors.author && touched.author}
            helperText={errors.author && touched.author ? errors.author: null}
            />
        <TextField
            name="ISBN"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.ISBN}
            label="ISBN"
            variant="outlined"
            error={errors.ISBN && touched.ISBN}
            helperText={errors.ISBN && touched.ISBN ? errors.ISBN: null}
            />
        <TextField
            name="language"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.language}
            label="Language"
            variant="outlined"
            error={errors.language && touched.language}
            helperText={errors.language && touched.language ? errors.language: null}
            />
        {/* {errors.summary && touched.summary ? errors.summary: null} */}
        <TextField
            name="booksAvailable"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.booksAvailable}
            label="Books Available"
            variant="outlined"
            error={errors.booksAvailable && touched.booksAvailable}
            helperText={errors.booksAvailable && touched.booksAvailable ? errors.booksAvailable: null}
            />

        <Button type="submit" variant="contained">
            Add Book
        </Button>
    </form>
    );
}