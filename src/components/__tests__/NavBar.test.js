import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import NavBar from "../NavBar/NavBar";
import { BrowserRouter } from "react-router-dom";

afterEach(() => {
	cleanup();
	// cleanup on exiting
});

const MockNavBar = () => {
	return (
		<BrowserRouter>
			<NavBar />
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

	test("should call the connectWalletHandle function when connect wallet is clicked", () => {
		window.alert = () => {};

		const mockHandler = jest.fn();
		render(<MockNavBar connectWalletHandler={mockHandler} />);

		const buttonElement = screen.getByRole("button", {
			name: "Connect wallet",
		});
		fireEvent.click(buttonElement);
		expect(mockHandler.mock.calls).toHaveLength(0);

		const connectButtons = screen.queryAllByText("Connect wallet");
		expect(connectButtons).not.toHaveLength(0);
	});

	//mocking what the metamask plugin does and making sure the option to switch to Kovan is displayed
	//mock the switch network and ensure that the join game button appears  if user has already joined, the join button shouldn't appear  (Early withdrawal button should rather be displayed)

	//test state changes from join game to early withdrawal :
	//(when the user withdraws, they should see the Join our game button )
	//(when the user has not yet joined the game, they should see the Join our game button )
});
