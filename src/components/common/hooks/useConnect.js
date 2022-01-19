import { useState, useEffect } from "react";
import { ethers } from "ethers";
//import ghostContract from "../../../assets/abi/ABI-GoodGhostingWhitelisted.json";
import daiSmartContract from "../../../assets/abi/ABI-dai.json";

const useConnect = () => {
	const [approve, setApprove] = useState(false);
	//connecting to ethereum blockchain
	const initConnector = async () => {
		try {
			const customHttpProvider = new ethers.providers.Web3Provider(
				window.ethereum
			);

			const signer = customHttpProvider.getSigner();
			const daiContractAddress = "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD";
			const userAddress = "0xc2B9Cd74b835F11F300b4C46382a20C7e17AC8Ea";

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
				console.log("transferred dai");
			});
		} catch (error) {
			console.error(error);
		}
	};

	return { approve, initConnector };
};

export default useConnect;
