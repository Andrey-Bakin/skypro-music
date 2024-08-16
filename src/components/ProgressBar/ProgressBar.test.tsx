import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProgressBar from "./ProgressBar";

describe("ProgressBar", () => {
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
  test("Изменение позиции трека", () =>{
    const onChange = jest.fn();
    const { getByDisplayValue } = render(
      <ProgressBar 
      max={40} 
      value={20} 
      step={0.5} 
      onChange={onChange} />
    );
    getByDisplayValue("20")
    const input = getByDisplayValue("20")
    fireEvent.change(input, { target: {value: "20" } })
    getByDisplayValue("20")
  })
})
