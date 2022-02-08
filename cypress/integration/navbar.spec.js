/* eslint-disable testing-library/await-async-query */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable no-undef */
describe("GoodGhost app", function () {
	beforeEach(function () {
		cy.visit("http://localhost:3000");
	});

	//connect wallet
	it.only("user can connect wallet and switch to network to kovan", function () {
		cy.findByRole("button", { name: /connect wallet/i }).click();
		cy.findByTestId("pinElement").click();
	});
});

//join game process
describe("user can join game", function () {
	it("user can click join game button and approve single deposit", function () {
		cy.findByRole("button", { name: /join our game/i }).click();
		cy.findByRole("button", { name: /approve single deposit/i }).click();
	});

	it("user can click join game button and join game", function () {
		cy.findByRole("button", { name: /join game/i }).click();
		cy.findByRole("button", { name: /back to dashboard/i }).click(); //or select the close button icon
	});
});

//early withdraw process
describe("user can make an early withdrawal from the game", function () {
	it("user can click join game button and approve single deposit", function () {
		cy.findByRole("button", { name: /join our game/i }).click();
	});

	it("user can click join game and join game", function () {
		cy.findByRole("button", { name: /earlywithdraw/i }).click();
		cy.findByRole("button", { name: /yes, withdraw anyway/i }).click();
		cy.findByRole("button", { name: /back to dashboard/i }).click(); //or select the close button icon
	});
});
