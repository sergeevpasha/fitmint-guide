import {
    fitmintGuideActivitiesContractAddress,
    fitmintGuideTokenContract,
    fitmintGuideTokenContractAddress
} from './web3connector';

export const addToken = async (): Promise<void> => {
    if (window.ethereum) {
        window.ethereum
            .request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20',
                    options: {
                        address: fitmintGuideTokenContractAddress,
                        symbol: 'FGT',
                        decimals: 18,
                        image: 'https://fitmint.guide/images/fgt.svg'
                    }
                }
            })
            .catch();
    }
};

export const getBalance = async (wallet: string): Promise<string> => {
    if (wallet) {
        return fitmintGuideTokenContract.methods.balanceOf(wallet).call().catch();
    }

    return Promise.reject();
};

export const checkAllowance = async (wallet: string): Promise<string> => {
    if (wallet) {
        return fitmintGuideTokenContract.methods
            .allowance(wallet, fitmintGuideActivitiesContractAddress)
            .call()
            .catch();
    }

    return Promise.reject();
};

export const setAllowance = async (wallet: string): Promise<string> => {
    if (wallet) {
        return fitmintGuideTokenContract.methods
            .approve(
                fitmintGuideActivitiesContractAddress,
                '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
            )
            .send({ from: wallet })
            .catch();
    }

    return Promise.reject();
};
