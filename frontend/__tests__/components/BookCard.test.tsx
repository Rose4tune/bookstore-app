import React from "react";
import { render, screen } from "@testing-library/react";
import BookCard from "../../components/BookCard";

describe("BookCard Component", () => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  it("renders the book title, author, and image", () => {
    const book = {
      id: 1,
      title: "테스트 책 제목",
      author: "테스트 저자",
      imageUrl: "/uploads/image.jpg",
    };

    render(
      <BookCard
        id={book.id}
        title={book.title}
        author={book.author}
        imageUrl={book.imageUrl}
      />
    );

    expect(screen.getByText(book.title)).toBeInTheDocument();
    expect(screen.getByText(book.author)).toBeInTheDocument();

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("title", book.title);
  });
});
