import { useState, useEffect,useCallback, Fragment } from 'react'
import { Link } from 'react-router-dom'
import SwitchNetwork from '../SwitchNetwork/SwitchNetwork'
import _ from 'lodash'
import logo from '../../assets/logo.svg'
import JoinModal from '../JoinModal/JoinModal'
import EarlyWithdrawModal from '../EarlyWithdrawModal/EarlyWithdrawModal'

import styles from './NavBar.module.scss'
import Button from '../common/NavButtons/NavButton'

const NavBar = ({ onAccountSelected }) => {
	const [currentAccount, setCurrentAccount] = useState(null)
	const [network, setNetwork] = useState(null)
	const [displaySwitchButton, setDisplaySwitchButton] = useState(false)
	const [walletIsConnected, setWalletConnected] = useState(false)

	const [showJoinModal, setShowJoinModal] = useState(false)
	const [showWithdrawalModal, setShowWithdrawalModal] = useState(false)

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const networkChainIdToName = () => {
		const chainId = window.ethereum.networkVersion

		if (chainId !== '42') {
			setDisplaySwitchButton(true)
		}
		//detect chainId and display network name
		switch (chainId) {
			case '1':
				return setNetwork('Ethereum Main')
			case '3':
				return setNetwork('Ropsten')
			case '4':
				return setNetwork('Rinkeby')
			case '5':
				return setNetwork('Goerli')
			case '42':
				return setNetwork('Kovan')
			default:
				return setNetwork(network)
		}
	}
	const { ethereum } = window

	const connectWalletHandler = useCallback(async () => {
		try {
			const accounts = await ethereum.request({
				method: 'eth_requestAccounts',
			})
			const account = accounts[0]
			setCurrentAccount(_.truncate(account, { length: 8 }))
			window.localStorage.setItem('userAccount', account)
			onAccountSelected(account)
			setWalletConnected(true)
			networkChainIdToName()
		} catch (err) {
			console.error(err)
		}
	},[ethereum,networkChainIdToName,onAccountSelected])

	useEffect(() => {
		if (!ethereum) {
			console.warn('MetaMask is not installed.')
			return
		}
		connectWalletHandler()

		const handleChainChanged = () => {
			window.location.reload()
		}

		const handleAccountsChanged = () => {
			window.location.reload()
		}
		return () => {
			ethereum.removeListener('chainChanged', handleChainChanged)
			ethereum.removeListener('accountsChanged', handleAccountsChanged)
		}
	}, [connectWalletHandler, ethereum])

	return (
		<nav className={styles.navContainer}>
			<Link to="/">
				<img
					src={logo}
					alt="logo"
					className={styles.logo}
				/>
			</Link>
			<div className={styles.navItems}>
				{walletIsConnected && currentAccount ? (
					<Fragment>
						<div className={styles.buttonChange}>
							{displaySwitchButton ? (
								<SwitchNetwork network={network} />
							) : (
								<Fragment>
									<div className={styles.joinGameWrapper}>
										{/* display join game button when network is on kovan  */}
										{network === 'Kovan' &&
										JSON.parse(localStorage.getItem('joinedGame')) ? (
											<Button
												buttonDescription="EarlyWithdraw"
												handleClick={() => setShowWithdrawalModal(true)}
											/>
										) : (
											<Button
												buttonDescription="Join our game"
												handleClick={() => setShowJoinModal(true)}
											/>
										)}

										<JoinModal
											showJoinModal={showJoinModal}
											setShowJoinModal={setShowJoinModal}
										/>
										<EarlyWithdrawModal
											showWithdrawalModal={showWithdrawalModal}
											setShowWithdrawalModal={setShowWithdrawalModal}
										/>
									</div>
									<div className={styles.kovanNetwork}>{network}</div>
								</Fragment>
							)}
						</div>
						<p className={styles.accountAddress}>{currentAccount} </p>
					</Fragment>
				) : (
					<Button
						buttonDescription="Connect wallet"
						handleClick={connectWalletHandler}
					/>
				)}
			</div>
		</nav>
	)
}

export default NavBar
