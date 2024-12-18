"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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

const BookDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publisher: "",
    publishedDate: "",
    price: "",
    stock: "",
    image: null as File | null,
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
        image: null,
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleUpdate = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("author", formData.author);
      formDataToSend.append("publisher", formData.publisher);
      formDataToSend.append("publishedDate", formData.publishedDate);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("stock", formData.stock);

      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      await axios.put(`/api/books/${params.id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setIsEditing(false);
      fetchBook();
    } catch (error) {
      console.error("Failed to update book:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/books/${params.id}`);
      router.push("/");
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
  };

  const handleCancle = useCallback(() => {
    if (!book) return;
    setIsEditing(false);
    setFormData({
      title: book.title,
      author: book.author,
      publisher: book.publisher,
      publishedDate: book.publishedDate,
      price: book.price.toString(),
      stock: book.stock.toString(),
      image: null,
    });
  }, [book]);

  const handleGoBack = () => {
    router.back();
  };

  useEffect(() => {
    fetchBook();
  }, []);

  if (!book) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <DetailContainer className="inner">
        <StyledCardMedia
          // component="img"
          // height="400"
          image={`${process.env.NEXT_PUBLIC_BACKEND_URL}${book.imageUrl}`}
          title={book.title}
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
              <input type="file" accept="image/*" onChange={handleFileChange} />
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdate}
              >
                저장하기
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCancle}
              >
                수정 취소
              </Button>
              <Button variant="contained" color="error" onClick={handleDelete}>
                삭제하기
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
              <Button
                variant="contained"
                color="secondary"
                onClick={handleGoBack}
              >
                돌아가기
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
`;

const StyledCardMedia = styled(CardMedia)`
  width: 50%;
  max-width: 28.125rem;
  height: 40.625rem;
  object-fit: cover;
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
