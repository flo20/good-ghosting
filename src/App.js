import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";

const App = () => {
	return (
		<div className="bg-gradient-to-r from-indigo-500">
			<Routes>
				<Route path="/" element={<HomePage />} />
			</Routes>
		</div>
	);
};

export default App;
