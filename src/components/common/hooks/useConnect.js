import { useState, useContext} from "react";
import { ethers } from "ethers";
import ghostSmartContract from "../../../assets/abi/ABI-GoodGhostingWhitelisted.json";
import daiSmartContract from "../../../assets/abi/ABI-dai.json";
import { UserContext } from "../../../App";

const useConnect = () => {
	const [approve, setApprove] = useState(false);
	const [joinedGame, setJoinedGame] = useState(false);
	const [approvedTransaction, setApprovedTransaction] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	const userAddress = useContext(UserContext);
	//connecting to ethereum blockchain

	//console.log("ghostAddress", ghostAbi);

	const initConnector = async () => {
		try {
			//Connecting to the DAI Contract
			const customHttpProvider = new ethers.providers.Web3Provider(
				window.ethereum
			);

			const daiContractAddress = process.env.REACT_APP_DAI_CONTRACT_ADDRESS;
			const daiContract = new ethers.Contract(
				daiContractAddress, //dai address
				daiSmartContract.abi, //dia abi
				customHttpProvider
			);

			const ghostContractAddress = process.env.REACT_APP_GHOST_ADDRESS;
			const ghostContract = new ethers.Contract(
				ghostContractAddress,
				ghostSmartContract.abi,
				customHttpProvider
			);
			//Sending DAI
			const signer = customHttpProvider.getSigner();
			//const signerAddress = signer.getAddress();
			const daiWithSigner = daiContract.connect(signer);
			const ghostWithSigner = ghostContract.connect(signer);
			console.log("ghostWithSigner", ghostWithSigner);
			const dai = ethers.utils.parseUnits("1.0", 18); // Each DAI has 18 decimal places
			const approval = await daiWithSigner.approve(userAddress, dai);
			console.log("approval", approval);
			await daiWithSigner.transferFrom(userAddress, daiContractAddress, dai);
			//const joinGameResponse = await ghostWithSigner.joinGame();
			const earlyWithdrawal = await ghostWithSigner.earlyWithdraw();
			//console.log("joinGameResponse", joinGameResponse);
			console.log("earlyWithdrawal", earlyWithdrawal);
			// const getBalance = await daiWithSigner.balanceOf(userAddress);
			// console.log("getBalance", getBalance);

			// joinGameResponse.then(function (result) {
			// 	console.log("result", result);
			// });

			// Receive an event when ANY  approval occurs
			daiWithSigner.on("Approval", (from, to, amount, event) => {
				//console.log({ from, to, amount, event });
				// setApprove(true);
				// setApprovedTransaction(approve);
				console.log("Approval");
			});

			// Receive an event when ANY transfer occurs
			daiContract.on("Transfer", (from, to, amount, event) => {
				console.log("transferred dai");
				//setJoinedGame(true);
			});
		} catch (error) {
			console.log(error);
		}
	};
	// useEffect(() => {
	// 	initConnector();
	// });

	//const handleTransfer = () => {};
	return { approve, joinedGame, approvedTransaction, initConnector };
};

export default useConnect;
