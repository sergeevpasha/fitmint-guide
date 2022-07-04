import React, { ReactElement, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import axios from 'axios';
import { getChainId, getUserChainId, switchToDefaultNetwork } from '../../utils/contracts/web3connector';
import { connectWallet, getCurrentWalletConnected } from '../../utils/contracts/fitmintGuideActivities';
import cutStringInTheMiddle from '../../utils/cutStringInTheMiddle';
import { getBalance } from '../../utils/contracts/fitmintGuideToken';
import { UserModel } from '../../app/models/User';

const rpcWsUrl = process.env.NEXT_PUBLIC_ACLHEMY_API_WS_URL || '';
const web3 = createAlchemyWeb3(rpcWsUrl);

export default function AddressButton(): ReactElement {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);
    const address = useSelector((state: any) => state.user.address);
    const [isWrongNetwork, setIsWrongNetwork] = useState(false);

    const switchNetwork = async (): Promise<void> => {
        await switchToDefaultNetwork();
        if ((await getUserChainId()) === (await getChainId())) {
            setIsWrongNetwork(false);
        }
    };

    const syncAttempts = async (wallet: string): Promise<void> => {
        axios.get(`users/${wallet}`).then(({ data: { data } }: { data: { data: UserModel } }) => {
            dispatch({ type: 'user/setAttempts', payload: data ? data.attempts : 0 });
        });
    };

    const signIn = async (): Promise<void> => {
        if ((await getUserChainId()) !== (await getChainId())) {
            await switchNetwork();
        }
        const connectedWallet = await connectWallet();
        if (connectedWallet) {
            await syncAttempts(connectedWallet);
            const tokenBalance: string | null = await getBalance(connectedWallet);
            dispatch({ type: 'user/setAddress', payload: connectedWallet });
            dispatch({ type: 'user/setBalance', payload: tokenBalance });
            dispatch({ type: 'user/setLoggedIn', payload: true });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const connectedWallet = await getCurrentWalletConnected();
            if (connectedWallet) {
                await syncAttempts(connectedWallet);
                const tokenBalance: string | null = await getBalance(connectedWallet);
                dispatch({ type: 'user/setLoggedIn', payload: true });
                dispatch({ type: 'user/setAddress', payload: connectedWallet });
                dispatch({ type: 'user/setBalance', payload: tokenBalance });
                if ((await getUserChainId()) !== (await getChainId())) {
                    setIsWrongNetwork(true);
                    await switchNetwork();
                }
            }
        };

        web3.eth.subscribe('newBlockHeaders').on('data', async () => {
            const connectedWallet = await getCurrentWalletConnected();
            if (connectedWallet) {
                await syncAttempts(connectedWallet);
                const tokenBalance: string | null = await getBalance(connectedWallet);
                dispatch({ type: 'user/setBalance', payload: tokenBalance });
            } else {
                dispatch({ type: 'user/setBalance', payload: 0 });
            }
        });

        if (window.ethereum) {
            window.ethereum.on('chainChanged', async () => {
                if ((await getUserChainId()) !== (await getChainId())) {
                    setIsWrongNetwork(true);
                    await switchNetwork();
                } else {
                    setIsWrongNetwork(false);
                }
            });
            window.ethereum.on('accountsChanged', async () => {
                const connectedWallet = await getCurrentWalletConnected();
                const tokenBalance: string | null = await getBalance(connectedWallet);
                if (connectedWallet) {
                    await syncAttempts(connectedWallet);
                    dispatch({ type: 'user/setAddress', payload: connectedWallet });
                    dispatch({ type: 'user/setBalance', payload: tokenBalance });
                    dispatch({ type: 'user/setLoggedIn', payload: true });
                } else {
                    dispatch({ type: 'user/setAddress', payload: '' });
                    dispatch({ type: 'user/setBalance', payload: tokenBalance });
                    dispatch({ type: 'user/setLoggedIn', payload: false });
                }
            });
        }

        fetchData().catch();
    }, [address]);

    const connectButton = (): ReactElement => {
        if (isLoggedIn && !isWrongNetwork) {
            return <Button className="primary">{cutStringInTheMiddle(address)}</Button>;
        }
        if (isLoggedIn && isWrongNetwork) {
            return (
                <Button className="btn-warning" onClick={switchNetwork}>
                    Wrong Network
                </Button>
            );
        }
        return (
            <Button className="primary" onClick={signIn}>
                Connect Wallet
            </Button>
        );
    };
    return connectButton();
}
