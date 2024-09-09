import algosdk from 'algosdk';

const algodToken = ''; // No se necesita token con AlgoNode
const algodServer = 'https://testnet-api.algonode.network';
const algodPort = '';

const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

export default algodClient;