import { render, screen } from "@testing-library/react";
import NotFound from "../pages/NotFound/NotFound";

test("should render the not found component", () => {
	render(<NotFound />);
	const lostElement = screen.getByRole("button");
	expect(lostElement).toBeInTheDocument();
	expect(lostElement).toHaveTextContent("Back to dashboard");
});

