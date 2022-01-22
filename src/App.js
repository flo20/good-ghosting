import React, { useState, createContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import NotFound from "./components/NotFound/NotFound";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

export const UserContext = createContext();

const App = () => {
	const [userAccount, setUserAccount] = useState(null);

	const handleAccountChange = (account) => {
		//console.log(account);
		setUserAccount(account);
	};
	return (
		<div>
			<UserContext.Provider value={userAccount}>
				<NavBar onAccountSelected={handleAccountChange} />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/not-found" element={<NotFound />} />
					<Route path="*" element={<Navigate replace to="/not-found" />} />
				</Routes>
				<Footer />
			</UserContext.Provider>
		</div>
	);
};

export default App;
