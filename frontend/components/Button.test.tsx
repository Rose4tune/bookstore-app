import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button Component", () => {
  test("renders button with correct label", () => {
    render(<Button label="Click Me" onClick={() => {}} />);
    const buttonElement = screen.getByTestId("custom-button");

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent("Click Me");
  });

  test("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();

    render(<Button label="Click Me" onClick={handleClick} />);
    const buttonElement = screen.getByTestId("custom-button");

    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
