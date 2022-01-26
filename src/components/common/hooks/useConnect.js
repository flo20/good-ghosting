import { useState } from "react";
import { ethers } from "ethers";
import ghostSmartContract from "../../../assets/abi/ABI-GoodGhostingWhitelisted.json";
import daiSmartContract from "../../../assets/abi/ABI-dai.json";

const useConnect = () => {
	const [approve, setApprove] = useState(false);
	const [joinedGame, setJoinedGame] = useState(false);
	const [earlyWithdraw, setEarlyWithdraw] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

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
	//console.log("ghostWithSigner", ghostWithSigner);
	const dai = ethers.utils.parseUnits("1.0", 18); // Each DAI has 18 decimal places

	const initConnector = async () => {
		try {
			await daiWithSigner.approve(ghostContractAddress, dai);
			// Receive an event when ANY  approval occurs
			daiWithSigner.on("Approval", (owner, spender, value) => {
				//console.log({ owner, spender, value });
				setApprove(true);
				setApprove((state) => {
					//console.log(state); //setState and get state right after calling setState
					return state;
				});
				window.sessionStorage.setItem("approve", approve);
				//console.log("Approved"); //Add spinner for pending state
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleJoinGame = async () => {
		try {
			console.log(" start joining game");

			await ghostWithSigner.joinGame();
			console.log("joining game");
			//console.log("earlyWithdrawal", earlyWithdrawal);

			ghostWithSigner.on("JoinedGame", (player, amount) => {
				console.log("joined", { player, amount });
				setJoinedGame(true); //Add spinner for pending state
				window.sessionStorage.setItem("JoinedGame", true);
				setJoinedGame((state) => {
					//console.log(state); // setState and get state right after calling setState
					return state;
				});
				//window.sessionStorage.setItem("joinedGame", joinedGame);
				console.log("joined successfully");
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleEarlyWithdrawal = async () => {
		try {
			console.log("start early withdrawal");
			await ghostWithSigner.earlyWithdraw();
			//const getFeeMethod = await ghostWithSigner.earlyWithdrawalFee;
			//console.log("start early withdrawal fee", getFeeMethod);
			//const getFee = await ghostWithSigner.earlyWithdrawalFee();
			//console.log("start early withdrawal fee", getFee);

			ghostWithSigner.on(
				"EarlyWithdrawal",
				(player, amount, totalGamePrincipal) => {
					console.log("withdrawn early", {
						player,
						amount,
						totalGamePrincipal,
					});
					setEarlyWithdraw(true);
					setEarlyWithdraw((state) => {
						//console.log(state);
						return state;
					});
					window.sessionStorage.setItem("earlyWithdraw", earlyWithdraw);
					console.log("withdrawn successfully");
				}
			);
		} catch (error) {
			console.log(error);
		}
	};

	return {
		approve,
		joinedGame,
		initConnector,
		handleJoinGame,
		handleEarlyWithdrawal,
	};
};

export default useConnect;
