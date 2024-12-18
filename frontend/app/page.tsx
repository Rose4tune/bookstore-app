"use client";

import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import PaginationComponent from "../components/Pagination";
import axios from "../utils/api";
import styled from "styled-components";

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

const MainPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBooks = async (page: number) => {
    try {
      const response = await axios.get(`/api/books?page=${page}`);
      console.log(response.data);
      setBooks(response.data.books);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  useEffect(() => {
    fetchBooks(page);
  }, [page]);

  return (
    <div>
      <Header>
        <div className="flex">
          <h1 className="text-2xl font-bold">RGT 문고</h1>
        </div>
      </Header>
      <MainContainer className="inner">
        {books.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            imageUrl={book.imageUrl}
          />
        ))}
      </MainContainer>
      <PaginationComponent
        count={totalPages}
        page={page}
        onChange={(e, value) => setPage(value)}
      />
    </div>
  );
};

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(8.5rem, 1fr));
  gap: 1rem;
  padding: 1rem;
  margin: 0 auto;
`;

const Header = styled.div`
  border-bottom: 1px solid lightgray;

  & > div {
    max-width: 75rem;
    padding: 1.5625rem 0;
    margin: 0 auto;
  }
`;

export default MainPage;
