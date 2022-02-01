import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import NavBar from "../NavBar/NavBar";
import { BrowserRouter } from "react-router-dom";

afterEach(() => {
	cleanup();
});

const MockNavBar = ({ onAccountSelected }) => {
	return (
		<BrowserRouter>
			<NavBar onAccountSelected={onAccountSelected} />
		</BrowserRouter>
	);
};

describe("NavBar buttons", () => {
	test("should render Connect button", () => {
		window.alert = () => {};

		const mockHandler = jest.fn();
		render(<MockNavBar connectWalletHandler={mockHandler} />);
		const buttonElement = screen.getByRole("button");
		fireEvent.click(buttonElement);
		expect(mockHandler.mock.calls).toHaveLength(0);
		expect(buttonElement).toBeVisible();
		expect(buttonElement).toHaveTextContent("Connect wallet");
	});

});
