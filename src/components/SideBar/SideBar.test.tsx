import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SideBar from "./SideBar";

test("должен отрендерить изображение с надписью", () => {
  render(<SideBar />);
  expect(screen.getByAltText("Плейлист дня")).toBeInTheDocument();
});
