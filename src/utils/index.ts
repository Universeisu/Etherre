import { getAddress } from '@ethersproject/address'
import { BigNumber } from '@ethersproject/bignumber'
import { ethers } from 'ethers'
import { ChainId, Token, TokenAmount, JSBI } from '@uniswap/sdk'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { AddressZero } from '@ethersproject/constants'
import { Contract } from '@ethersproject/contracts'
import {
    ROUTER_ADDRESS
} from '../constants'
import IUniswapV2Router02ABI from './../constants/abi/uniswapV2Router02.json'




//Created check function to see if the MetaMask extension is installed
export const isMetaMaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
};

// returns the checksummed address if the address for valid address or returns false
export function isAddress(value: any): string | false {
    try {
        return getAddress(value)
    } catch {
        return false
    }
}

// shortens the address to the format: 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
    const parsed = isAddress(address)
    if (!parsed) {
        throw Error(`Error due to Invalid 'address' parameter '${address}'.`)
    }
    return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}



export const getSigner = (library: Web3Provider, account: string): JsonRpcSigner => {
    return library.getSigner(account).connectUnchecked()
}


export const getProviderOrSigner = (library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner => {
    return account ? getSigner(library, account) : library
}


export const getContract = (address: string, ABI: any, library: Web3Provider, account?: string): Contract => {
    if (!isAddress(address) || address === AddressZero) {
        throw Error(`Invalid 'address' argument '${address}'.`)
    }

    return new Contract(address, ABI, getProviderOrSigner(library, account) as any)
}

export const getRouterAddress = (chainId?: ChainId) => {
    if (!chainId) {
        throw Error(`Undefined 'chainId' parameter '${chainId}'.`)
    }
    return ROUTER_ADDRESS
}


export function getRouterContract(chainId: number, library: Web3Provider, account?: string): Contract {
    return getContract(
        getRouterAddress(chainId),
        IUniswapV2Router02ABI,
        library,
        account
    )
}

export const getDeadline = (deadlineInMinutes: Number | string = 10) =>
    Math.floor((new Date().getTime() / 1000) + Number(deadlineInMinutes) * 60);


export const formatBalance = (balance: BigNumber | string) => {
    if (balance) {
        return parseFloat(ethers.utils.formatUnits(balance, 18));
    }
    return 0;
};

interface InputToken {
    address: string;
    chainId: number;
    name: string;
    symbol: string;
    decimals: number;
    logoURI?: string;
}
export const tokenObject = (token: InputToken) => {
    return new Token(
        token.chainId,
        token.address,
        token.decimals,
        token.symbol,
        token.name
    );
};


export function calculateSlippageAmount(value: TokenAmount | undefined, slippage: number): any {
    if (!value) {
        return console.log('value cannot be undefined')
    }
    if (slippage < 0 || slippage > 10000) {
        throw Error(`Unexpected slippage value: ${slippage}`)
    }
    return [
        JSBI.divide(JSBI.multiply(value.raw, JSBI.BigInt(10000 - slippage)), JSBI.BigInt(10000)),
        JSBI.divide(JSBI.multiply(value.raw, JSBI.BigInt(10000 + slippage)), JSBI.BigInt(10000))
    ]
}