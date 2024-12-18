"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "@/utils/api";
import Header from "@/components/Header";
import { Button, TextField, Typography, CardMedia } from "@mui/material";

type Book = {
  id: number;
  title: string;
  author: string;
  publisher: string;
  publishedDate: string;
  price: number;
  stock: number;
  imageUrl: string;
};

const BookDetailPage = ({ params }: { params: { id: string } }) => {
  const [book, setBook] = useState<Book | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publisher: "",
    publishedDate: "",
    price: "",
    stock: "",
  });

  const fetchBook = async () => {
    try {
      const response = await axios.get(`/api/books/${params.id}`);
      setBook(response.data);
      setFormData({
        title: response.data.title,
        author: response.data.author,
        publisher: response.data.publisher,
        publishedDate: response.data.publishedDate,
        price: response.data.price,
        stock: response.data.stock,
      });
    } catch (error) {
      console.error("Failed to fetch book:", error);
    }
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/books/${params.id}`, formData);
      setIsEditing(false);
      fetchBook();
    } catch (error) {
      console.error("Failed to update book:", error);
    }
  };

  useEffect(() => {
    fetchBook();
  }, []);

  if (!book) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <DetailContainer>
        <CardMedia
          component="img"
          height="400"
          image={`${process.env.NEXT_PUBLIC_BACKEND_URL}${book.imageUrl}`}
          alt={book.title}
        />
        <Details>
          {isEditing ? (
            <EditForm>
              <TextField
                label="제목"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
              <TextField
                label="저자"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
              />
              <TextField
                label="출판사"
                name="publisher"
                value={formData.publisher}
                onChange={handleInputChange}
              />
              <TextField
                label="출판일"
                name="publishedDate"
                value={formData.publishedDate}
                onChange={handleInputChange}
              />
              <TextField
                label="가격"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
              />
              <TextField
                label="재고"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdate}
              >
                저장하기
              </Button>
            </EditForm>
          ) : (
            <>
              <Typography variant="h4">{book.title}</Typography>
              <Typography>저자: {book.author}</Typography>
              <Typography>출판사: {book.publisher}</Typography>
              <Typography>출판일: {book.publishedDate}</Typography>
              <Typography>가격: {book.price} 원</Typography>
              <Typography>재고: {book.stock} 개</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleEditToggle}
              >
                수정하기
              </Button>
              <Button variant="contained" color="secondary">
                삭제하기
              </Button>
            </>
          )}
        </Details>
      </DetailContainer>
    </div>
  );
};

export default BookDetailPage;

const DetailContainer = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;
  max-width: 75rem;
  margin: 0 auto;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .MuiTextField-root {
    width: 100%;
  }
`;
