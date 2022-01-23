import { useState, useContext } from "react";
import { ethers } from "ethers";
import ghostSmartContract from "../../../assets/abi/ABI-GoodGhostingWhitelisted.json";
import daiSmartContract from "../../../assets/abi/ABI-dai.json";
import ghostSmart from "../../../assets/ABI-smart.json";
import { UserContext } from "../../../App";

const useConnect = () => {
	const [approve, setApprove] = useState(false);
	const [joinedGame, setJoinedGame] = useState(false);
	const [approvedTransaction, setApprovedTransaction] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	const userAddress = useContext(UserContext);
	//Connecting to the DAI Contract
	const customHttpProvider = new ethers.providers.Web3Provider(window.ethereum);

	const daiContractAddress = process.env.REACT_APP_DAI_CONTRACT_ADDRESS;
	const daiContract = new ethers.Contract(
		daiContractAddress, //dai address
		daiSmartContract.abi, //dia abi
		customHttpProvider
	);

	//const ghostContractAddress = process.env.REACT_APP_GHOST_ADDRESS;
	const ghostContractAddress = "0xc69a569405eae312ca13c2ed85a256fbe4992a35";
	const ghostContract = new ethers.Contract(
		ghostContractAddress,
		ghostSmart.abi,
		customHttpProvider
	);
	//Sending DAI
	const signer = customHttpProvider.getSigner();
	//const signerAddress = signer.getAddress();
	const daiWithSigner = daiContract.connect(signer);
	const ghostWithSigner = ghostContract.connect(signer);
	//console.log("ghostWithSigner", ghostWithSigner);
	const dai = ethers.utils.parseUnits("1.0", 18); // Each DAI has 18 decimal places

	const handleTransfer = async () => {
		await daiWithSigner.transferFrom(userAddress, ghostContractAddress, dai);
	};

	const handleJoinGame = async () => {
		try {
			await ghostWithSigner.joinGame();
			//const earlyWithdrawal = await ghostWithSigner.earlyWithdraw();
			//console.log("joinGameResponse", joinGameResponse);
			//console.log("earlyWithdrawal", earlyWithdrawal);

			ghostWithSigner.on("JoinedGame", (player, amount) => {
				console.log("joined", { player, amount });
				setJoinedGame(true); //Add spinner for pending state
				setJoinedGame((state) => {
					console.log(state); // setState and get state right after calling setState
					return state;
				});
			});
		} catch (error) {
			console.log(error);
		}

		// joinGameResponse.then(function (result) {
		// 	console.log("result", result);
		// });
	};

	const initConnector = async () => {
		try {
			//const approval = await daiWithSigner.approve(userAddress, dai);
			const approval = await daiWithSigner.approve(ghostContractAddress, dai);
			//console.log("approval", approval);

			// const getBalance = await daiWithSigner.balanceOf(userAddress);
			// console.log("getBalance", getBalance);

			// Receive an event when ANY  approval occurs
			daiWithSigner.on("Approval", (from, to, amount, event) => {
				//console.log({ from, to, amount, event });
				setApprove(true);
				setApprove((state) => {
					console.log(state); //setState and get state right after calling setState
					return state;
				});
				handleTransfer();
				console.log("Approvals"); //Add spinner for pending state
			});

			// Receive an event when ANY transfer occurs
			daiWithSigner.on("Transfer", (from, to, amount, event) => {
				console.log("transferred dai");
				handleJoinGame();
			});
		} catch (error) {
			console.log(error);
		}
	};

	return { approve, joinedGame, approvedTransaction, initConnector };
};

export default useConnect;
