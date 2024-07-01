import ReduxProvider from "@/store/ReduxProvider";
import Search from "@components/Search/Search";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("поиск", () => {
  test("поиск", () => {
    render(
      <ReduxProvider>
        <Search />
      </ReduxProvider>
    );
    const inputElement = screen.getByPlaceholderText(/Поиск/i);
    expect(inputElement).toBeInTheDocument();
  });
});