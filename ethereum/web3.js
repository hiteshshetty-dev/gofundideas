import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && window.web3 !== 'undefined') {
    web3 = new Web3(window.web3.currentProvider);


}
else {
    const provider = new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/8d57041b02164c228dc08721d80bd897');
    web3 = new Web3(provider);
}

export default web3;