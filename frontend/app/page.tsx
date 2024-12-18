"use client";

import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import PaginationComponent from "../components/Pagination";
import axios from "../utils/api";
import styled from "styled-components";
import Header from "@/components/Header";

type Book = {
  id: number;
  title: string;
  author: string;
  imageUrl: string;
};

const MainPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("title");

  const fetchBooks = async (page: number, query = "", field = "title") => {
    try {
      const response = await axios.get(
        `/api/books?page=${page}&search=${query}&searchField=${field}`
      );
      setBooks(response.data.books);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  useEffect(() => {
    fetchBooks(page, searchQuery, searchField);
  }, [page, searchQuery, searchField]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchField(e.target.value);
    setPage(1);
  };

  return (
    <div>
      <Header
        children={
          <SearchContainer>
            <select value={searchField} onChange={handleFieldChange}>
              <option value="title">제목</option>
              <option value="author">저자</option>
            </select>
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </SearchContainer>
        }
      />
      <MainContainer className="inner">
        {books.map((book) => (
          <BookCard
            key={book.id}
            id={book.id}
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

const SearchContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 60%;
  border: 1px solid #ccc;
  border-radius: 0.25rem;

  select,
  input {
    padding: 0.5rem;
    font-size: 1rem;
  }
  input {
    width: 100%;
  }
`;

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(8.5rem, 1fr));
  gap: 1rem;
  min-height: 39.375rem;
`;

export default MainPage;
