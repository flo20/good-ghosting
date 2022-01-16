import { useEffect, useState } from "react";
import Web3 from "web3";
import ghostContract from "../../../assets/abi/ABI-GoodGhostingWhitelisted.json";

const useConnector = () => {
	const [data, setData] = useState(null);

	const initConnector = async () => {
		try {
			const web3 = new Web3("https://kovan.poa.network");
			const ghostAddress = process.env.REACT_APP_GHOST_ADDRESS;
			const contract = new web3.eth.Contract(ghostContract.abi, ghostAddress);
			const response = await contract.methods.joinGame().call();
			console.log("response ", response);

			setData(response);

			const addresses = web3.eth.getAccounts();
			console.log("addresses", addresses);
			contract.methods.setData(10).send({
				from: addresses[0],
				gas: 100,
			});
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		initConnector();
		return { data };
	}, [data]);
};

// function useConnector() {

//     useEffect(() => {
// 			const useConnector = () => {
// 			const respones
// 			};
// 		});
// }

// const provider = "https://kovan.poa.network";
// const web3Provider = new Web3.providers.HttpProvider(provider);

// const init = async () => {
// 	const web3 = new Web3("https://kovan.poa.network");
// 	const ghostAddress = "0xc69a569405eae312ca13c2ed85a256fbe4992a35";
// 	const contract = new web3.eth.Contract(ghostContract.abi, ghostAddress);
// };

export default useConnector;
