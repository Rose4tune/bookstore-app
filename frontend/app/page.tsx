"use client";

import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import PaginationComponent from "../components/Pagination";
import axios from "../utils/api";

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
    <div className="min-h-screen p-4 bg-gray-50">
      <h1 className="text-2xl font-bold text-center mb-8">RGT 문고</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            imageUrl={book.imageUrl}
          />
        ))}
      </div>
      <PaginationComponent
        count={totalPages}
        page={page}
        onChange={(e, value) => setPage(value)}
      />
    </div>
  );
};

export default MainPage;
