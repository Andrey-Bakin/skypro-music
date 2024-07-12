import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProgressBar from "./ProgressBar";

it("Должен отрендерить картинку с логотипом", () => {
  const onChange = jest.fn();

  render(
    <ProgressBar 
      max={undefined} 
      value={35} 
      step={0.5} 
      onChange={onChange} 
    />
  );
  const input = screen.getByTestId("progress-bar");
 
  expect(input).toHaveAttribute("max", "0");
});