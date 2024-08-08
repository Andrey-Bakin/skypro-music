import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import VolumeBar from "./VolumeBar";
import { useState } from "react";

describe("VolumeBar", () => {
  it("Должен отрендерить картинку с логотипом", () => {
    const onChange = jest.fn();
  
    render(
      <VolumeBar min={0} max={10} step={0.1} value={20} onChange={onChange} />
    );
    const input = screen.getByTestId("progress-input");
    
    expect(input).toHaveAttribute("value", "20");
  });
  test("Изменение громкости", () =>{
    const onChange = jest.fn();
    const { getByDisplayValue } = render(
    <VolumeBar min={0} max={10} step={0.1} value={8} onChange={onChange} />
  );
    getByDisplayValue("8")
    const input = getByDisplayValue("8")
    fireEvent.change(input, { target: {value: "8" } })
    getByDisplayValue("8")
  })
})
