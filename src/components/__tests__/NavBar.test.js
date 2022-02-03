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

		render(<MockNavBar />);
		const buttonElement = screen.getByRole("button");
		expect(buttonElement).toBeVisible();
		expect(buttonElement).toHaveTextContent("Connect wallet");
	});

	test("should render connecting to metamask and displaying the user account", () => {
		window.alert = () => {};
		const userAddress = {
			currentAccount: "abcd",
		};

		const mockHandler = jest.fn();
		render(<MockNavBar connectWalletHandler={mockHandler} />);
		const buttonElement = screen.getByRole("button");
		fireEvent.click(buttonElement);
		expect(buttonElement).toHaveTextContent(userAddress.currentAccount);
	});

	//mocking what the metamask plugin does and making sure the option to switch to Kovan is displayed
	//mock the switch network and ensure that the join game button appears  if user has already joined, the join button shouldn't appear  (Early withdrawal button should rather be displayed)

	//test state changes from join game to early withdrawal :
	//(when the user withdraws, they should see the Join our game button )
	//(when the user has not yet joined the game, they should see the Join our game button )
});
