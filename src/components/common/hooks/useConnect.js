import { useState, useContext } from "react";
import { ethers } from "ethers";
//import ghostContract from "../../../assets/abi/ABI-GoodGhostingWhitelisted.json";
import daiSmartContract from "../../../assets/abi/ABI-dai.json";
import { UserContext } from "../../../App";

const useConnect = () => {
	const [approve, setApprove] = useState(false);
	const [joinedGame, setJoinedGame] = useState(false);

	const userAddress = useContext(UserContext);
	//connecting to ethereum blockchain
	const initConnector = async () => {
		try {
			const customHttpProvider = new ethers.providers.Web3Provider(
				window.ethereum
			);

			const signer = customHttpProvider.getSigner();
			const daiContractAddress = process.env.REACT_APP_DAI_CONTRACT_ADDRESS;

			const daiContract = new ethers.Contract(
				daiContractAddress, //dai address
				daiSmartContract.abi, //dia
				customHttpProvider
			);
			const daiWithSigner = daiContract.connect(signer);

			//dai set up

			// Each DAI has 18 decimal places
			const dai = ethers.utils.parseUnits("1.0", 18);

			const signerAddress = () => {
				signer.getAddress();
			};
			console.log("signerAddress", signerAddress);

			const approval = await daiWithSigner.approve(userAddress, dai);
			await daiWithSigner.transferFrom(userAddress, daiContractAddress, dai);
			// Receive an event when ANY transfer occurs
			approval.on("Approval", (from, to, amount, event) => {
				console.log(
					`${from} sent ${ethers.utils.formatEther(amount)} to ${to}`
				);
				setApprove(true);
			});
			//console.log(sendDai);

			daiContract.on("Transfer", (from, to, amount, event) => {
				setJoinedGame(true);
				console.log("transferred dai");
			});
		} catch (error) {
			console.error(error);
		}
	};

	return { approve, joinedGame, initConnector };
};

export default useConnect;
