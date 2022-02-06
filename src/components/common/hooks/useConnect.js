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
	const [showErrorMessage, setShowErrorMessage] = useState(false);

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
			daiWithSigner.on("Approval", () => {
				//console.log({ owner, spender, value });
				setApprove(true);
				setApprove((state) => {
					window.localStorage.setItem("approve", approve);
					return state;
				});
				setIsLoading(false);
			});
		} catch (error) {
			setIsLoading(false);
			console.log(error);
			if (error.code === 4001) {
				setShowErrorMessage(true);
				setErrorMessage("Transaction was rejected");
				setTimeout(() => {
					setShowErrorMessage(false);
				}, 5000);
			}
		}
	};

	const handleJoinGame = async () => {
		try {
			console.log("start joining game");
			await ghostWithSigner.joinGame();
			setIsLoading(true);

			ghostWithSigner.on("JoinedGame", () => {
				console.log("joined");
				window.localStorage.setItem("joinedGame", true);
				window.localStorage.setItem("earlyWithdraw", false);

				setEarlyWithdraw(!earlyWithdraw);
				setJoinedGame(!joinedGame);
				setApprove(!approve);

				setIsLoading(false);

				console.log("joined successfully");
			});
		} catch (error) {
			setIsLoading(false);
			console.log(error);
			if (error.code === 4001) {
				setShowErrorMessage(true);
				setErrorMessage("Transaction was rejected");
				setTimeout(() => {
					setShowErrorMessage(false);
				}, 5000);
			}

			if (error.code === -32603)
				return setErrorMessage("Insufficient funds for transaction");
		}
	};

	const handleEarlyWithdrawal = async () => {
		try {
			console.log("start early withdrawal");
			await ghostWithSigner.earlyWithdraw();
			setIsLoading(true);

			ghostWithSigner.on("EarlyWithdrawal", () => {
				console.log("withdrawn early");

				window.localStorage.setItem("earlyWithdraw", true);
				window.localStorage.setItem("joinedGame", false);
				window.localStorage.setItem("approve", false);

				setEarlyWithdraw(!earlyWithdraw);
				setJoinedGame(!joinedGame);
				setApprove(!approve);

				setIsLoading(false);

				console.log("withdrawn successfully");
			});
		} catch (error) {
			setIsLoading(false);
			console.log(error);
			if (error.code === 4001) {
				setShowErrorMessage(true);
				setErrorMessage("Transaction was rejected");
				setTimeout(() => {
					setShowErrorMessage(false);
				}, 5000);
			}
		}
	};

	return {
		approve,
		earlyWithdraw,
		joinedGame,
		isLoading,
		errorMessage,
		showErrorMessage,
		initConnector,
		handleJoinGame,
		handleEarlyWithdrawal,
	};
};

export default useConnect;
