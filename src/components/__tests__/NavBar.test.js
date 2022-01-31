import { render, screen } from "@testing-library/react";
import NavBar from "../NavBar/NavBar";

test("should render button", () => {
	render(<NavBar />);
	const buttonElement = screen.getByRole("walletButton");
	expect(buttonElement).toBeInTheDocument();
});
