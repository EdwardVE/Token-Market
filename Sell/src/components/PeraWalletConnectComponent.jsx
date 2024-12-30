import { useEffect, useState } from 'react';
import { PeraWalletConnect } from '@perawallet/connect';
import { callMethod } from '../utils/appCaller';
import './PeraWalletConnectComponent.css';
import algodClient from '../utils/algorandClient';
import algosdk from 'algosdk';
import BuyerComponent from './BuyerComponent';
import SellerComponent from './SellerComponent';
// const peraWallet = new PeraWalletConnect();



const PeraWalletConnectComponent = () => {
    const [accountAddress, setAccountAddress] = useState(null);
    const [receiverAddress, setReceiverAddress] = useState('');
    const [assets, setAssets] = useState([]);
    const [assetsBuyer, setAssetsBuyer] = useState([]);
    const [peraWallet, setPeraWallet] = useState(null);

    useEffect(() => {
        // Initialize PeraWalletConnect only once
        const initializeWallet = () => {
            const wallet = new PeraWalletConnect();
            setPeraWallet(wallet);
        };
        initializeWallet();
        return () => {
            console.log("Component unmounted");
            // localStorage.removeItem('walletconnect');
            // localStorage.removeItem('PeraWallet.Wallet');
        };
    }, []);

    const connectWallet = async (rol) => {
        try {
            if (!peraWallet) {
                console.error("PeraWalletConnect not initialized");
                return;
            }else{
                localStorage.removeItem('walletconnect');
                localStorage.removeItem('PeraWallet.Wallet');
            }
            const newAccounts = await peraWallet.connect();
            console.log("Connecting to Pera Wallet",newAccounts);
            // Actualizamos el estado según el rol (vendedor o comprador)
            if (newAccounts.length > 0) {
                if (rol === 'seller') {
                    setAccountAddress(newAccounts[0]);
                } else if (rol === 'buyer') {
                    setReceiverAddress(newAccounts[0]);
                }
            }

            //! Manejo de desconexión para cada rol
            peraWallet.connector.on("disconnect", () => {
                console.log("Disconnected from Pera Wallet");
                if (rol === 'seller') {
                    console.log("SELLER Disconnected from Pera Wallet");

                    // setAccountAddress(null);
                } else if (rol === 'buyer') {
                    console.log("BUYER Disconnected from Pera Wallet");
                    // setReceiverAddress(null);

                }
            });
        } catch (error) {
            console.error("Failed to connect to Pera Wallet", error);
        }
    };

    const handleCallContract = async () => {
        if (accountAddress) {
            const method =  {
                "name": "emitShares",
                "args": [
                  {
                    "name": "name",
                    "type": "string"
                  },
                  {
                    "name": "unitName",
                    "type": "string"
                  },
                  {
                    "name": "q",
                    "type": "uint64"
                  }
                ],
                "returns": {
                  "type": "uint64"
                }
              }
            await callMethod(peraWallet,accountAddress, method, ["Mi Token", "MTK", "1000"]);
        } else {
            alert("Connect to Pera Wallet first");
        }
    };
    // Opt-in del receptor al Acción (necesario si el receptor aún no tiene el Acción)
    const optInToAsset = async ({receiverAddress, assetId }) => {
        if (!receiverAddress || !assetId) {
            console.log("Receiver address:", receiverAddress, "Asset ID:", assetId);
            alert("Please provide both receiver address and asset ID.");
            // return;
        }
    
        try {
            console.log("Opting in to asset with ID:", assetId);
    
            // Obtener los parámetros sugeridos de la transacción de la red
            const suggestedParams = await algodClient.getTransactionParams().do();
    
            // Crear la transacción de opt-in (transferencia de 0 tokens)
            const optInTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                from: receiverAddress,
                to: receiverAddress,
                assetIndex: parseInt(assetId),
                amount: 0,  // 0 para opt-in
                suggestedParams,
            });
            
            console.log(optInTxn);


    
            // Solicitar a Pera Wallet que firme la transacción
            // const signedOptInTxn = await peraWallet.signTransaction([optInTxn]);
            const signedOptInTxn = await peraWallet.signTransaction([[
                {
                    txn: optInTxn,
                    signers: [algosdk.encodeAddress(optInTxn.from.publicKey)],
                }
            ]]);
    
            // Enviar la transacción a la red
            const { txId } = await algodClient.sendRawTransaction(signedOptInTxn).do();
            console.log("Opt-in transaction sent with ID:", txId);
    
            // Esperar la confirmación de la transacción
            await algosdk.waitForConfirmation(algodClient, txId, 4);
            console.log("Opt-in confirmed.");
        } catch (error) {
            console.error("Failed to opt-in to asset", error);
        }
    };
    const createAsset = async () => {
        if (!accountAddress) {
            alert("Connect to Pera Wallet first");
            return;
        }

        try {
            console.log("Creating asset...",accountAddress);
            const suggestedParams = await algodClient.getTransactionParams().do();
            const assetCreationTxn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
                from: accountAddress,
                assetName: "assetName",
                unitName: "unitName",
                total: 1,
                decimals: 0,
                suggestedParams,
            });
            //! Acá podría loguear cuando vaya hacer esto

            const signedTx = await peraWallet.signTransaction([[{ txn: assetCreationTxn, signers: [accountAddress] }]]);
            const { txId } = await algodClient.sendRawTransaction(signedTx).do();
            console.log("Asset creation transaction sent with ID:", txId);
            await algosdk.waitForConfirmation(algodClient, txId, 4);
            console.log("Asset creation confirmed.");
            fetchAssets();
        } catch (error) {
            console.error("Failed to create asset", error);
        }
    };
    const fetchAssets = async () => {
        if (!accountAddress) {
            alert("Connect to Pera Wallet first");
            return;
        }
        console.log("Fetching assets...");

        try {
            const accountInfo = await algodClient.accountInformation(accountAddress).do();
            const assetsList = accountInfo.assets || [];
            setAssets(assetsList);
            console.log("List assets",assetsList);
        } catch (error) {
            console.error("Failed to fetch assets", error);
        }
    };
    const fetchAssetsBuyer = async () => {
        if (!receiverAddress) {
            alert("Connect to Pera Wallet first");
            return;
        }
        console.log("Fetching assets...");

        try {
            const accountInfo = await algodClient.accountInformation(receiverAddress).do();
            const assetsList = accountInfo.assets || [];
            setAssetsBuyer(assetsList);
            console.log("List assets",assetsList);
        } catch (error) {
            console.error("Failed to fetch assets", error);
        }
    };
    const handleBuy = async(senderAddress, receiverAddress, assetID) => {
        console.log("Comprando Acción...",senderAddress, receiverAddress, assetID);
        if (!(senderAddress && receiverAddress && assetID)) {
            alert("Por favor, proporcione la dirección del remitente, la dirección del receptor y el ID del activo.");
            return
            
        }
        try {
            // 1. Verificar si el receptor ya tiene el activo (assetId)
            const accountInfo = await algodClient.accountInformation(receiverAddress).do();
            const hasAsset = accountInfo.assets.some(asset => asset['asset-id'] === parseInt(assetID));
    
            // 2. Si el receptor no tiene el activo, realizar el opt-in
            if (!hasAsset) {
                console.log("Receiver needs to opt-in to the asset.");
                await optInToAsset({ receiverAddress, assetId: assetID }); // Pasamos el objeto con los parámetros
            }
    
            // 3. Proceder con la transferencia del activo una vez que el opt-in esté completado
            await transferAssetWithPera(senderAddress, receiverAddress, assetID); // Función de transferencia
    
        } catch (error) {
            console.error("Error en la compra del activo", error);
        }


        async function transferAssetWithPera() {
            try {
                // Conectar Pera Wallet (si no está conectado ya)
                if (!peraWallet.isConnected) {
                    await peraWallet.connect();
                }
        
                // Obtener los parámetros de la red para la transacción
                const params = await algodClient.getTransactionParams().do();

                const message = "Pruebas para hacer elecciones, ingluyo el ID" + assetID;
        
                // Crear la transacción de transferencia de activo
                const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                    from: senderAddress,
                    to: receiverAddress,
                    assetIndex: assetID,
                    amount: 1,  // Cantidad de activos a transferir
                    suggestedParams: params,
                    note: new TextEncoder().encode(message)
                });

                // // Firmar y enviar la transacción
                // const signedTransferTxn = await peraWallet.signTransaction([{ txn: transferTxn, signers: [senderAddress] }]);
                // const { txId } = await algodClient.sendRawTransaction(signedTransferTxn).do();
        
                // Formatear la transacción para Pera Wallet
                const txnGroup = [{ txn }];
        
                // Solicitar la firma de la transacción en Pera Wallet
                const signedTxn = await peraWallet.signTransaction([txnGroup]);
        
                // Enviar la transacción firmada a la red
                const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
                console.log("Transacción enviada con éxito. ID: ", txId);
        
                // Confirmar la transacción
                await waitForConfirmation(algodClient, txId);
                console.log("Transacción confirmada.");
            } catch (error) {
                console.error("Error al transferir el activo con Pera Wallet: ", error);
            }
        }
        // Función para confirmar la transacción en la blockchain
        async function waitForConfirmation(algodClient, txId) {
            let lastRound = (await algodClient.status().do())["last-round"];
            while (true) {
                const pendingInfo = await algodClient.pendingTransactionInformation(txId).do();
                if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
                    console.log("Transacción " + txId + " confirmada en el bloque " + pendingInfo["confirmed-round"]);
                    fetchAssetsBuyer();
                    break;
                }
                lastRound++;
                await algodClient.statusAfterBlock(lastRound).do();
            }
        }
      };
    useEffect(() => {
        if (accountAddress) {
            fetchAssets();
        }
    }, [accountAddress]);
    useEffect(() => {
        if (receiverAddress) {
            fetchAssetsBuyer();
        }
    }, [receiverAddress]);


    return (
        <div className="pera-wallet-container" >
            <h1>Connet with Pera Wallet</h1>

                <div className="container">
                {/* Columna del vendedor */}
                    <div className="column">
                        {/* <SellerComponent></SellerComponent> */}
                        <h2>Vendedor</h2>
                            <button className="pera-wallet-button" onClick={()=> connectWallet('seller')}>Connect Pera Wallet</button>
                            <p>
                                Nota: Conecta tu billetera Pera Wallet a <strong>TestNet</strong> para crear tu propio Acción. 
                                <a href="/Tutorial" style={{ textDecoration: 'none', color: 'blue' }}>Tutorial</a> 
                                de configuración de Pera Wallet a TestNet.
                            </p>
                            {accountAddress && (
                                <div className="pera-wallet-account">
                                    <p >Cuenta del vendedor: {accountAddress}</p>
                                    
                                    <button className="pera-wallet-create-button" onClick={ () => createAsset()}>Cree su Acción</button>

                                </div>
                            )}
                        <ul>
                        {assets.map((asset, index) => (
                            <li key={index} className="listItem">
                            {asset['asset-id']} - Acción - {index}
                            <button className="button" onClick={() => handleBuy( accountAddress , receiverAddress, asset['asset-id'] ) }>
                                Comprar
                            </button>
                            </li>
                        ))}
                        </ul>
                    </div>

                    {/* Columna del comprador */}
                    <div className="column">
                        {/* <BuyerComponent></BuyerComponent> */}
                        <h2>Comprador</h2>
                        <button className="pera-wallet-button" onClick={()=> connectWallet('buyer')}>Connect Pera Wallet</button>
                            <p>
                                Nota: Conecta tu billetera Pera Wallet a <strong>TestNet</strong> para crear tu propio Acción. 
                                <a href="/Tutorial" style={{ textDecoration: 'none', color: 'blue' }}>Tutorial</a>
                                de configuración de Pera Wallet a TestNet.
                            </p>
                            {receiverAddress && (
                                <div className="pera-wallet-account">
                                    <p >Cuenta del comprador: {receiverAddress}</p>
                                </div>
                            )}
                        <ul>
                        {assetsBuyer.map((asset, index) => (
                            <li key={index} className="listItem">
                            {asset['asset-id']} - Acción - {index}
                            <button className="button" onClick={ () => window.open(`https://lora.algokit.io/testnet/asset/${asset['asset-id']}`)}>
                                Detalles
                            </button>
                            </li>
                        ))}
                        </ul>
                    </div>
                </div>

        </div>
    );
};

export default PeraWalletConnectComponent;