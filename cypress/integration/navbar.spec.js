/* eslint-disable no-undef */
describe("GoodGhost app", function () {
	beforeEach(function () {
		cy.visit("http://localhost:3000");
	});

	it("front page can be opened", function () {
		cy.contains("Connect wallet");
	});

	it("metamask can be connected", function () {
		cy.contains("Connect wallet").click();
	});
});
