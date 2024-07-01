import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Nav from "./Nav";

describe("Компонент Nav", () => {
  it("Должен рендерить изображение с логотипом", () => {
    render(<Nav />);
    const image = screen.getByAltText("логотип скайпро музыка");

    expect(image).toBeInTheDocument();
  });
});