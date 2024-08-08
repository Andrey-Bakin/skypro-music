import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Sidebar from "@components/SideBar/SideBar";
import ReduxProvider from "../../store/ReduxProvider";
import { useRouter } from "next/navigation"; 


jest.mock("next/navigation");

test("Отрендерить изображение с логотипом", () => {
  const mockUseRouter = useRouter as jest.Mock;
  mockUseRouter.mockReturnValue({
    pathname: "/",
    push: jest.fn(),
  });
  render(
    <ReduxProvider>
      <Sidebar />
    </ReduxProvider>
  );
  expect(screen.getByAltText("Плейлист дня")).toBeInTheDocument();
});