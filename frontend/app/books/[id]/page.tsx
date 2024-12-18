"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "@/utils/api";
import Header from "@/components/Header";
import { Button, Typography, CardMedia } from "@mui/material";

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

  const fetchBook = async () => {
    try {
      const response = await axios.get(`/api/books/${params.id}`);
      setBook(response.data);
    } catch (error) {
      console.error("Failed to fetch book:", error);
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
          <Typography variant="h4">{book.title}</Typography>
          <Typography>저자: {book.author}</Typography>
          <Typography>출판사: {book.publisher}</Typography>
          <Typography>출판일: {book.publishedDate}</Typography>
          <Typography>가격: {book.price} 원</Typography>
          <Typography>재고: {book.stock} 개</Typography>
          <Button variant="contained" color="primary">
            수정하기
          </Button>
          <Button variant="contained" color="secondary">
            삭제하기
          </Button>
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
