import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import NotFound from "./components/NotFound/NotFound";

const App = () => {
	return (
		<div>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/not-found" element={<NotFound />} />
				<Route path="*" element={<Navigate replace to="/not-found" />} />
			</Routes>
		</div>
	);
};

export default App;
