import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import VolumeBar from "./VolumeBar";

it("Должен отрендерить картинку с логотипом", () => {
  const onChange = jest.fn();

  render(
    <VolumeBar min={0} max={10} step={0.1} value={20} onChange={onChange} />
  );
  const input = screen.getByTestId("progress-input");
  
  expect(input).toHaveAttribute("value", "20");
});