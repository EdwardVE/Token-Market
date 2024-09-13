import algosdk from 'algosdk';
import algodClient from '../utils/algorandClient';
import { callMethod } from '../utils/appCaller';
 

const methodRegister ={
  "name": "reigsterCandidate",
  "args": [
    {
      "name": "address",
      "type": "address"
    },
    {
      "name": "data",
      "type": "(string,string,string,string)"
    }
  ],
  "returns": {
    "type": "void"
  }
}
// const [“address”, [“Nombre”,”Apellidos”,”correo”,”edad”]]
export async function registerCandidate(address, dataCandidate, wallet) {
    try {
      console.log('Registering candidate:', address, dataCandidate, wallet);
      
      const send = await callMethod(wallet,  address, methodRegister, dataCandidate);
      return  send
        // let params = await algodClient.getTransactionParams().do();
        // console.log('Llegó acá')
    
        // const assetCreateTxn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
        //   from: sender,
        //   assetName: candidateName,
        //   unitName: 'VOTE',
        //   total: 1,
        //   decimals: 0,
        //   suggestedParams: params,
        // });
     
        // const txns = [[{ txn: assetCreateTxn, signers: [sender] }]];
          
        // // Solicitar a Pera Wallet que firme y envíe la transacción
        // const signedTxn = await wallet.signTransaction(txns);
        // // Obtener el ID de la transacción
        // let txId = assetCreateTxn.txID().toString();
        // // Enviar la transacción firmada a Algorand
        // const send = await algodClient.sendRawTransaction(signedTxn).do();
        // console.log('Transaction sent with ID', txId);
        // return send
        
    } catch (error) {
        console.error('Error registering candidate:', error);
    }
  }

export  async function voteForCandidate(sender, privateKey, candidateAssetId) {
    let params = await algodClient.getTransactionParams().do();
    
    // Sending a vote by transferring an asset
    const voteTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: sender,
      to: candidateAssetId, // Candidate's address
      amount: 1,
      assetIndex: candidateAssetId, // The asset representing the vote
      suggestedParams: params,
    });
  
    const signedTxn = voteTxn.signTxn(privateKey);
    let txId = voteTxn.txID().toString();
    await algodClient.sendRawTransaction(signedTxn).do();
    console.log('Transaction sent with ID', txId);
  }
export async function  fetchCandidates (address) {
    try {
      // Obtener todos los activos creados por la cuenta
      const accountInfo = await algodClient.accountInformation(address).do();
      console.log('Account Info:', accountInfo);
      const createdAssets = accountInfo['created-assets'];
      console.log('Created Assets:', createdAssets);

      // Filtrar los activos que representan a los candidatos
        const candidateAssets = createdAssets.filter((asset) => asset.params['unit-name'] === 'VOTE').map((asset) => ({
            id: asset.index,
            name: asset.params.name,
            total: asset.params.total-1,

        }));

      console.log('Candidate Assets:', candidateAssets);
      return candidateAssets;
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

