import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NotFound from "../pages/NotFound/NotFound";
afterEach(() => {
	cleanup();
});

const MockNotFound = () => {
	return (
		<BrowserRouter>
			<NotFound />
		</BrowserRouter>
	);
};

test("should render the not found component", () => {
	render(<MockNotFound />);
	const lostElement = screen.getByRole("button");
	expect(lostElement).toBeInTheDocument();
	expect(lostElement).toHaveTextContent("Back to dashboard");
});
