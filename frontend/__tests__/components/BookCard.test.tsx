import React from "react";
import { render, screen } from "@testing-library/react";
import BookCard from "@/components/BookCard";

describe("BookCard Component", () => {
  it("renders the book title, author, and image", () => {
    // Mock Props
    const book = {
      title: "테스트 책 제목",
      author: "테스트 저자",
      imageUrl: "/uploads/test-image.jpg",
    };

    // Render the component
    render(<BookCard title={book.title} author={book.author} imageUrl={book.imageUrl} />);

    // Assertions
    expect(screen.getByText(book.title)).toBeInTheDocument();
    expect(screen.getByText(book.author)).toBeInTheDocument();
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", book.imageUrl);
    expect(image).toHaveAttribute("title", book.title);
  });
});