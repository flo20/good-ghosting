import React, { useState, createContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/pages/HomePage/HomePage";
import NotFound from "./components/pages/NotFound/NotFound";
import Footer from "./components/Footer/Footer";

export const UserContext = createContext();

const App = () => {
	const [userAccount, setUserAccount] = useState(null);

	const handleAccountChange = (account) => {
		setUserAccount(account);
	};
	return (
		<div>
			Hello world
			<UserContext.Provider value={userAccount}>
				<Routes>
					<Route path="/not-found" element={<NotFound />} />
					<Route
						path="/"
						element={<HomePage onAccountSelected={handleAccountChange} />}
					/>
					<Route path="*" element={<Navigate replace to="/not-found" />} />
				</Routes>
				<Footer />
			</UserContext.Provider>
		</div>
	);
};

export default App;
