import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SwitchNetwork from "../SwitchNetwork/SwitchNetwork";

afterEach(() => {
	cleanup();
	// cleanup on exiting
});

test("toggle button and pin should trigger switch", () => {
	const mockFunctionHandler = jest.fn();
	render(<SwitchNetwork handleKovanSwitch={mockFunctionHandler} />);

	const switchElement = screen.getByText(/Switch to Kovan/i);
	const toggleElement = screen.getByRole("button");
	const pinElement = screen.getByTestId("pinElement");
	const clickedPin = userEvent.dblClick(pinElement, {
		skipPointerEventsCheck: true,
    });
    

	expect(switchElement).toHaveTextContent("Switch to Kovan");
	expect(toggleElement).toBeVisible();
	expect(pinElement).toBeInTheDocument();
	expect(clickedPin).toBeFalsy();

	expect(mockFunctionHandler).toHaveBeenCalledTimes(0);
});
