import listingContractAbi from "../abi/listingContractAbi"
import { listingContractAddress } from "../../utils/constants";
import {JsonRpcProvider, ethers} from "ethers"

const network = {
    chainId: 11155111,
    name: 'Sepolia',
    currency: 'xDAI',
    rpcUrl: 'https://eth-sepolia.api.onfinality.io/public'
}

    const provider = new JsonRpcProvider(network.rpcUrl)
    let listingContract = new ethers.Contract(listingContractAddress, listingContractAbi, provider)

    export { listingContract }