import { useState, useEffect } from "react";
import { ethers } from "ethers";
import ghostSmartContract from "../../../assets/abi/ABI-GoodGhostingWhitelisted.json";
import daiSmartContract from "../../../assets/abi/ABI-dai.json";

const useConnect = () => {
	const [approve, setApprove] = useState(false);
	const [joinedGame, setJoinedGame] = useState(false);
	const [earlyWithdraw, setEarlyWithdraw] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		setJoinedGame(JSON.parse(window.localStorage.getItem("joinedGame")));
		setEarlyWithdraw(JSON.parse(window.localStorage.getItem("earlyWithdraw")));
	}, []);

	//Connecting to the DAI Contract
	const customHttpProvider = new ethers.providers.Web3Provider(window.ethereum);

	const daiContractAddress = "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD";
	const daiContract = new ethers.Contract(
		daiContractAddress, //dai address
		daiSmartContract.abi, //dai abi
		customHttpProvider
	);

	//const ghostContractAddress = process.env.REACT_APP_GHOST_ADDRESS;
	const ghostContractAddress = "0xc69a569405eae312ca13c2ed85a256fbe4992a35";
	const ghostContract = new ethers.Contract(
		ghostContractAddress,
		ghostSmartContract.abi,
		customHttpProvider
	);
	//Sending DAI
	const signer = customHttpProvider.getSigner();
	const daiWithSigner = daiContract.connect(signer);
	const ghostWithSigner = ghostContract.connect(signer);
	const dai = ethers.utils.parseUnits("1.0", 18); // Each DAI has 18 decimal places

	const initConnector = async () => {
		try {
			//Alert user when the dai is too low
			setIsLoading(true);
			await daiWithSigner.approve(ghostContractAddress, dai);
			// Receive an event when ANY  approval occurs
			daiWithSigner.on("Approval", (owner, spender, value) => {
				//console.log({ owner, spender, value });
				setApprove(true);
				// setApprove((state) => {
				// 	console.log(state); //setState and get state right after calling setState
				// 	return state;
				// });
				window.localStorage.setItem("approve", approve);

				setIsLoading(false);
			});
		} catch (error) {
			setIsLoading(false);
			console.log(error);
			if (error.code === 4001)
				return setErrorMessage("Transaction has been rejected");
		}
	};

	const handleJoinGame = async () => {
		try {
			console.log("start joining game");
			await ghostWithSigner.joinGame();
			setIsLoading(true);
			console.log("joining game");

			ghostWithSigner.on("JoinedGame", (player, amount) => {
				//console.log("joined", { player, amount });
				setJoinedGame(true);
				window.localStorage.setItem("joinedGame", true);
				window.localStorage.setItem("earlyWithdraw", false);
				setIsLoading(false);

				console.log("joined successfully");
			});
		} catch (error) {
			setIsLoading(false);
			console.log(error);
			if (error.code === 4001)
				return setErrorMessage("Transaction has been rejected");
			if (error.code === -32603)
				return setErrorMessage("Insufficient funds for transaction");
		}
	};

	const handleEarlyWithdrawal = async () => {
		try {
			console.log("start early withdrawal");
			await ghostWithSigner.earlyWithdraw();
			setIsLoading(true);

			ghostWithSigner.on(
				"EarlyWithdrawal",
				(player, amount, totalGamePrincipal) => {
					console.log("withdrawn early", {
						player,
						amount,
						totalGamePrincipal,
					});
					setEarlyWithdraw(!earlyWithdraw); //true
					setJoinedGame(!joinedGame);
					setApprove(!approve);

					window.localStorage.setItem("earlyWithdraw", true);
					window.localStorage.setItem("joinedGame", false);
					window.localStorage.setItem("approve", false);

					setIsLoading(false);

					console.log("withdrawn successfully");
				}
			);
		} catch (error) {
			setIsLoading(false);
			console.log(error);
			if (error.code === 4001)
				return setErrorMessage("Transaction has been rejected");
		}
	};

	return {
		approve,
		earlyWithdraw,
		joinedGame,
		isLoading,
		errorMessage,
		initConnector,
		handleJoinGame,
		handleEarlyWithdrawal,
	};
};

export default useConnect;
