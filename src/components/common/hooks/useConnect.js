import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import ghostContract from "../../../assets/abi/ABI-GoodGhostingWhitelisted.json";
import daiSmartContract from "../../../assets/abi/ABI-dai.json";

const useConnect = () => {
	//connecting to ethereum blockchain
	const initConnector = async () => {
		try {
			const customHttpProvider = new ethers.providers.Web3Provider(
				window.ethereum
			);
			//const blockNumber = await customHttpProvider.getBlockNumber();
			//console.log("blockNumber", blockNumber);
			//console.log("signer", signer);
			//const connectSigner = signer.connect()
			const signer = customHttpProvider.getSigner();
			const ghostAddress = process.env.REACT_APP_GHOST_ADDRESS;
			//const gasPrice = customHttpProvider.getGasPrice();
			//console.log("gasPrice", gasPrice);

			const daiContract = new ethers.Contract(
				ghostAddress, //dai address
				daiSmartContract.abi, //dia
				customHttpProvider
            );
            
            const goodGhostAddress = process.env.REACT_APP_GHOST_ADDRESS
			//console.log("wallet", contract);
			//check the ammount of thdai the user has ,
          let singerAddress = await signer.getAddress();
			// let balance = await daiContract.balanceOf(singerAddress);
			// let readableBalance = ethers.utils.formatUnits(balance, 18);
			//if readableBalance > 1 , then send transaction

			//dai set up
			const daiWithSigner = daiContract.connect(signer);

			// Each DAI has 18 decimal places
			const dai = ethers.utils.parseUnits("1.0", 18);
	// Send 1 DAI to "ricmoo.firefly.eth"
            console.log()
		 const tx = daiWithSigner.transferFrom(singerAddress,goodGhostAddress, dai);

			// Receive an event when ANY transfer occurs
			daiContract.on("Approval", (from, to, amount, event) => {
				console.log(`${from} sent ${ethers.utils.formatEther(amount)} to ${to}`);
				// The event object contains the verbatim log data, the
				// EventFragment and functions to fetch the block,
				// transaction and receipt and event functions
			});
			//console.log(sendDai);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		initConnector();
	}, []);
};

export default useConnect;
