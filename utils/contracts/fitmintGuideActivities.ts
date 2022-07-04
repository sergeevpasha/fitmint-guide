import { BigNumber } from '@ethersproject/bignumber';
import { fitmintGuideActivitiesContract, getSuggestedGas } from './web3connector';
import { Address } from '../../app/models/User';

export const getCurrentWalletConnected = async (): Promise<string> => {
    if (window.ethereum) {
        const wallets: any = await window.ethereum
            .request({
                method: 'eth_accounts'
            })
            .catch();

        return wallets.length ? wallets[0] : '';
    }

    return Promise.reject();
};

export const connectWallet = async (): Promise<string> => {
    if (window.ethereum) {
        const wallets: any = await window.ethereum
            .request({
                method: 'eth_requestAccounts'
            })
            .catch();

        return wallets.length ? wallets[0] : '';
    }
    return Promise.reject();
};

export const postResults = async <T>(
    wallet: Address,
    data: T,
    pending: (bool: boolean, message?: string) => void
): Promise<string> => {
    const contractGas = await fitmintGuideActivitiesContract.methods.postResults(data).estimateGas({ from: wallet });
    const gas = BigNumber.from(await getSuggestedGas())
        .add(BigNumber.from(contractGas))
        .toString();
    return fitmintGuideActivitiesContract.methods
        .postResults(data)
        .send({ from: wallet, maxFeePerGas: gas, maxPriorityFeePerGas: gas })
        .on('transactionHash', () => {
            pending(true);
        })
        .then(() => {
            pending(false, 'Results uploaded successfully');
        })
        .catch((response: { code: number; message: string }) => {
            let message = 'Unknown error';
            if (response.code !== 4001) {
                message = 'You reached daily upload limit';
            }

            if (response.message) {
                message = response.message;
            }

            pending(false, message);
        });
};

export const topUp = async (amount: string, pending: (bool: boolean, message?: string) => void): Promise<string> => {
    const wallet = await getCurrentWalletConnected();
    const contractGas = await fitmintGuideActivitiesContract.methods.topUp(amount).estimateGas({ from: wallet });
    const gas = BigNumber.from(await getSuggestedGas())
        .add(BigNumber.from(contractGas))
        .toString();
    return fitmintGuideActivitiesContract.methods
        .topUp(amount)
        .send({
            from: wallet,
            maxFeePerGas: gas,
            maxPriorityFeePerGas: gas
        })
        .on('transactionHash', () => {
            pending(true);
        })
        .then(() => {
            pending(false, 'Attempts balance increased successfully');
        })
        .catch((response: { code: number; message: string }) => {
            pending(false, response.message || 'Unknown error');
        });
};

export const buyTokens = async (
    wallet: Address,
    etherToSend: string,
    pending: (bool: boolean, message?: string) => void
): Promise<string> => {
    const contractGas = await fitmintGuideActivitiesContract.methods
        .buyTokens()
        .estimateGas({ from: wallet, value: etherToSend });
    const gas = BigNumber.from(await getSuggestedGas())
        .add(BigNumber.from(contractGas))
        .toString();

    return fitmintGuideActivitiesContract.methods
        .buyTokens()
        .send({
            from: await getCurrentWalletConnected(),
            value: etherToSend,
            maxFeePerGas: gas,
            maxPriorityFeePerGas: gas
        })
        .on('transactionHash', () => {
            pending(true);
        })
        .then(() => {
            pending(false, 'Tokens received!');
        })
        .catch((response: { code: number; message: string }) => {
            pending(false, response.message || 'Unknown error');
        });
};
