import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import ghostContract from "../../../assets/abi/ABI-GoodGhostingWhitelisted.json";

const useConnect = () => {
	//connecting to ethereum blockchain
	const initConnector = async () => {
		try {
			const customHttpProvider = new ethers.providers.JsonRpcProvider(
				"https://kovan.poa.network"
			);
			//const blockNumber = await customHttpProvider.getBlockNumber();
			//console.log("blockNumber", blockNumber);
			//console.log("signer", signer);
			//const connectSigner = signer.connect()
			const signer = customHttpProvider.getSigner();
			const ghostAddress = process.env.REACT_APP_GHOST_ADDRESS;
			const gasPrice = customHttpProvider.getGasPrice();
			//console.log("gasPrice", gasPrice);

			const contract = new ethers.Contract(
				ghostAddress,
				ghostContract.abi,
				signer
			);
			console.log("wallet", contract);

			const transaction = {
				from: contract.address,
				to: "0xc2B9Cd74b835F11F300b4C46382a20C7e17AC8Ea",
				value: ethers.utils.parseUnits("0.001", "ether"),
				gasPrice: gasPrice,
				gasLimit: ethers.utils.hexlify(10000), //100 gwei
				nonce: customHttpProvider.getTransactionCount(
					contract.address,
					"latest"
				),
			};
			// const sendDai = await signer.sendTransaction(transaction);
			// console.log(sendDai);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		initConnector();
	}, []);
};

export default useConnect;
