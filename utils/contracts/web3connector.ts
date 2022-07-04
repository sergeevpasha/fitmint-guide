import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import { AbiItem } from 'web3-utils';
import fitmintGuideActivitiesContractAbi from '../../fitmintGuideActivities.abi.json';
import fitmintGuideTokenContractAbi from '../../fitmintGuideToken.abi.json';

const rpcHttpUrl = process.env.NEXT_PUBLIC_ACLHEMY_API_HTTP_URL || '';

export const fitmintGuideActivitiesContractAddress = process.env.NEXT_PUBLIC_FITMINT_GUIDE_ACTIVITIES_CONTRACT || '';
export const fitmintGuideTokenContractAddress = process.env.NEXT_PUBLIC_FITMINT_GUIDE_TOKEN_CONTRACT || '';
export const blockExplorerUrl = process.env.NEXT_PUBLIC_BLOCK_EXPLORER_URL || '';
export const chainName = process.env.NEXT_PUBLIC_CHAIN_NAME || '';

export const web3 = createAlchemyWeb3(rpcHttpUrl);
export const fitmintGuideActivitiesContract = new web3.eth.Contract(
    fitmintGuideActivitiesContractAbi as AbiItem[],
    fitmintGuideActivitiesContractAddress
);
export const fitmintGuideTokenContract = new web3.eth.Contract(
    fitmintGuideTokenContractAbi as AbiItem[],
    fitmintGuideTokenContractAddress
);

export const getChainId = async () => web3.eth.getChainId();
export const getUserChainId = async (): Promise<number> => {
    const hexChainId: string = (await window.ethereum?.request({ method: 'eth_chainId' })) as string;
    return parseInt(hexChainId, 16);
};

export const switchToDefaultNetwork = async () => {
    const chainId = `0x${(await getChainId()).toString(16)}`;
    try {
        await window.ethereum?.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId }]
        });
    } catch (error: any) {
        if (error.code === 4902) {
            await window.ethereum?.request({
                method: 'wallet_addEthereumChain',
                params: [
                    {
                        chainId,
                        chainName,
                        rpcUrls: [rpcHttpUrl],
                        nativeCurrency: {
                            name: 'Matic',
                            symbol: 'Matic',
                            decimals: 18
                        },
                        blockExplorerUrls: [blockExplorerUrl]
                    }
                ]
            });
        }
    }
};

export const getSuggestedGas = async (): Promise<number> => +(await web3.eth.getGasPrice());
