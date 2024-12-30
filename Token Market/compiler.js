require('dotenv').config();
const algosdk = require('algosdk');
const algokit = require('@algorandfoundation/algokit-utils');
// Configuración de Algorand y Algokit
const algodToken = process.env.ALGOD_TOKEN;
const algodServer = process.env.ALGOD_SERVER;
const algodPort = process.env.ALGOD_PORT;

const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

let deployContract = async () => {
    const account = algosdk.mnemonicToSecretKey(process.env.DEPLOYER_MNEMONIC);

    const client = algokit.getAppClient({
        sender: account,
        resolveBy: 'id',
        id: 0,
        app: APP_SPEC()
    }, algodClient);
    console.log("/*")
    const app = await client.create({ method: 'createApplication()void', methodArgs: [] });
    await client.fundAppAccount(algokit.microAlgos(250_000));
    console.log("*/")
    console.log('// eslint-disable-next-line import/no-anonymous-default-export');
    console.log('export default ', app.appId);
    //return app;
}

let APP_SPEC =  () => {
return { 
    "hints": {
      "createApplication()void": {
        "call_config": {
          "no_op": "CREATE"
        }
      },
      "reigsterCandidate(address,(string,string,string,string))void": {
        "call_config": {
          "no_op": "CALL"
        }
      },
      "vote(address)void": {
        "call_config": {
          "no_op": "CALL"
        }
      }
    },
    "bare_call_config": {
      "no_op": "NEVER",
      "opt_in": "NEVER",
      "close_out": "NEVER",
      "update_application": "NEVER",
      "delete_application": "NEVER"
    },
    "schema": {
      "local": {
        "declared": {},
        "reserved": {}
      },
      "global": {
        "declared": {
          "owner": {
            "type": "bytes",
            "key": "owner"
          }
        },
        "reserved": {}
      }
    },
    "state": {
      "global": {
        "num_byte_slices": 1,
        "num_uints": 0
      },
      "local": {
        "num_byte_slices": 0,
        "num_uints": 0
      }
    },
    "source": {
      "approval": "I3ByYWdtYSB2ZXJzaW9uIDEwCgovLyBUaGlzIFRFQUwgd2FzIGdlbmVyYXRlZCBieSBURUFMU2NyaXB0IHYwLjEwMC4yCi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbGdvcmFuZGZvdW5kYXRpb24vVEVBTFNjcmlwdAoKLy8gVGhpcyBjb250cmFjdCBpcyBjb21wbGlhbnQgd2l0aCBhbmQvb3IgaW1wbGVtZW50cyB0aGUgZm9sbG93aW5nIEFSQ3M6IFsgQVJDNCBdCgovLyBUaGUgZm9sbG93aW5nIHRlbiBsaW5lcyBvZiBURUFMIGhhbmRsZSBpbml0aWFsIHByb2dyYW0gZmxvdwovLyBUaGlzIHBhdHRlcm4gaXMgdXNlZCB0byBtYWtlIGl0IGVhc3kgZm9yIGFueW9uZSB0byBwYXJzZSB0aGUgc3RhcnQgb2YgdGhlIHByb2dyYW0gYW5kIGRldGVybWluZSBpZiBhIHNwZWNpZmljIGFjdGlvbiBpcyBhbGxvd2VkCi8vIEhlcmUsIGFjdGlvbiByZWZlcnMgdG8gdGhlIE9uQ29tcGxldGUgaW4gY29tYmluYXRpb24gd2l0aCB3aGV0aGVyIHRoZSBhcHAgaXMgYmVpbmcgY3JlYXRlZCBvciBjYWxsZWQKLy8gRXZlcnkgcG9zc2libGUgYWN0aW9uIGZvciB0aGlzIGNvbnRyYWN0IGlzIHJlcHJlc2VudGVkIGluIHRoZSBzd2l0Y2ggc3RhdGVtZW50Ci8vIElmIHRoZSBhY3Rpb24gaXMgbm90IGltcGxlbWVudGVkIGluIHRoZSBjb250cmFjdCwgaXRzIHJlc3BlY3RpdmUgYnJhbmNoIHdpbGwgYmUgIipOT1RfSU1QTEVNRU5URUQiIHdoaWNoIGp1c3QgY29udGFpbnMgImVyciIKdHhuIEFwcGxpY2F0aW9uSUQKIQppbnQgNgoqCnR4biBPbkNvbXBsZXRpb24KKwpzd2l0Y2ggKmNhbGxfTm9PcCAqTk9UX0lNUExFTUVOVEVEICpOT1RfSU1QTEVNRU5URUQgKk5PVF9JTVBMRU1FTlRFRCAqTk9UX0lNUExFTUVOVEVEICpOT1RfSU1QTEVNRU5URUQgKmNyZWF0ZV9Ob09wICpOT1RfSU1QTEVNRU5URUQgKk5PVF9JTVBMRU1FTlRFRCAqTk9UX0lNUExFTUVOVEVEICpOT1RfSU1QTEVNRU5URUQgKk5PVF9JTVBMRU1FTlRFRAoKKk5PVF9JTVBMRU1FTlRFRDoKCS8vIFRoZSByZXF1ZXN0ZWQgYWN0aW9uIGlzIG5vdCBpbXBsZW1lbnRlZCBpbiB0aGlzIGNvbnRyYWN0LiBBcmUgeW91IHVzaW5nIHRoZSBjb3JyZWN0IE9uQ29tcGxldGU/IERpZCB5b3Ugc2V0IHlvdXIgYXBwIElEPwoJZXJyCgovLyBjcmVhdGVBcHBsaWNhdGlvbigpdm9pZAoqYWJpX3JvdXRlX2NyZWF0ZUFwcGxpY2F0aW9uOgoJLy8gZXhlY3V0ZSBjcmVhdGVBcHBsaWNhdGlvbigpdm9pZAoJY2FsbHN1YiBjcmVhdGVBcHBsaWNhdGlvbgoJaW50IDEKCXJldHVybgoKLy8gY3JlYXRlQXBwbGljYXRpb24oKTogdm9pZApjcmVhdGVBcHBsaWNhdGlvbjoKCXByb3RvIDAgMAoKCS8vIGNvbnRyYWN0cy9Wb3RhdGlvbnMuYWxnby50czoxMwoJLy8gdGhpcy5vd25lci52YWx1ZSA9IHRoaXMuYXBwLmNyZWF0b3IKCWJ5dGUgMHg2Zjc3NmU2NTcyIC8vICJvd25lciIKCXR4bmEgQXBwbGljYXRpb25zIDAKCWFwcF9wYXJhbXNfZ2V0IEFwcENyZWF0b3IKCXBvcAoJYXBwX2dsb2JhbF9wdXQKCXJldHN1YgoKLy8gcmVpZ3N0ZXJDYW5kaWRhdGUoYWRkcmVzcywoc3RyaW5nLHN0cmluZyxzdHJpbmcsc3RyaW5nKSl2b2lkCiphYmlfcm91dGVfcmVpZ3N0ZXJDYW5kaWRhdGU6CgkvLyBkYXRhOiAoc3RyaW5nLHN0cmluZyxzdHJpbmcsc3RyaW5nKQoJdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgoKCS8vIGFkZHJlc3M6IGFkZHJlc3MKCXR4bmEgQXBwbGljYXRpb25BcmdzIDEKCWR1cAoJbGVuCglpbnQgMzIKCT09CgoJLy8gYXJndW1lbnQgMSAoYWRkcmVzcykgZm9yIHJlaWdzdGVyQ2FuZGlkYXRlIG11c3QgYmUgYSBhZGRyZXNzCglhc3NlcnQKCgkvLyBleGVjdXRlIHJlaWdzdGVyQ2FuZGlkYXRlKGFkZHJlc3MsKHN0cmluZyxzdHJpbmcsc3RyaW5nLHN0cmluZykpdm9pZAoJY2FsbHN1YiByZWlnc3RlckNhbmRpZGF0ZQoJaW50IDEKCXJldHVybgoKLy8gcmVpZ3N0ZXJDYW5kaWRhdGUoYWRkcmVzczogQWRkcmVzcywgZGF0YTogQ2FuZGlkYXRlSW5mbyk6IHZvaWQKcmVpZ3N0ZXJDYW5kaWRhdGU6Cglwcm90byAyIDAKCgkvLyBjb250cmFjdHMvVm90YXRpb25zLmFsZ28udHM6MjAKCS8vIHRoaXMuZGF0YUNhbmRpZGF0ZShhZGRyZXNzKS52YWx1ZSA9IHsgZGF0YTogZGF0YSwgdm90ZXM6IDAgfQoJZnJhbWVfZGlnIC0xIC8vIGFkZHJlc3M6IEFkZHJlc3MKCWR1cAoJYm94X2RlbAoJcG9wCglieXRlIDB4IC8vIGluaXRpYWwgaGVhZAoJYnl0ZSAweCAvLyBpbml0aWFsIHRhaWwKCWJ5dGUgMHgwMDAzIC8vIGluaXRpYWwgaGVhZCBvZmZzZXQKCWZyYW1lX2RpZyAtMiAvLyBkYXRhOiBDYW5kaWRhdGVJbmZvCgljYWxsc3ViICpwcm9jZXNzX2R5bmFtaWNfdHVwbGVfZWxlbWVudAoJYnl0ZSAweDAwCgljYWxsc3ViICpwcm9jZXNzX3N0YXRpY190dXBsZV9lbGVtZW50Cglwb3AgLy8gcG9wIGhlYWQgb2Zmc2V0Cgljb25jYXQgLy8gY29uY2F0IGhlYWQgYW5kIHRhaWwKCWJveF9wdXQKCXJldHN1YgoKLy8gdm90ZShhZGRyZXNzKXZvaWQKKmFiaV9yb3V0ZV92b3RlOgoJLy8gY2FuZGlkYXRlOiBhZGRyZXNzCgl0eG5hIEFwcGxpY2F0aW9uQXJncyAxCglkdXAKCWxlbgoJaW50IDMyCgk9PQoKCS8vIGFyZ3VtZW50IDAgKGNhbmRpZGF0ZSkgZm9yIHZvdGUgbXVzdCBiZSBhIGFkZHJlc3MKCWFzc2VydAoKCS8vIGV4ZWN1dGUgdm90ZShhZGRyZXNzKXZvaWQKCWNhbGxzdWIgdm90ZQoJaW50IDEKCXJldHVybgoKLy8gdm90ZShjYW5kaWRhdGU6IEFkZHJlc3MpOiB2b2lkCnZvdGU6Cglwcm90byAxIDAKCgkvLyBjb250cmFjdHMvVm90YXRpb25zLmFsZ28udHM6MjUKCS8vIGFzc2VydCh0aGlzLmRhdGFDYW5kaWRhdGUoY2FuZGlkYXRlKS5leGlzdHMsICdDYW5kaXRhZSBubyByZWdpc3RlcmVkJykKCWZyYW1lX2RpZyAtMSAvLyBjYW5kaWRhdGU6IEFkZHJlc3MKCWJveF9sZW4KCXN3YXAKCXBvcAoKCS8vIENhbmRpdGFlIG5vIHJlZ2lzdGVyZWQKCWFzc2VydAoKCS8vIGNvbnRyYWN0cy9Wb3RhdGlvbnMuYWxnby50czoyNgoJLy8gdGhpcy5kYXRhQ2FuZGlkYXRlKGNhbmRpZGF0ZSkudmFsdWUudm90ZXMgPSB0aGlzLmRhdGFDYW5kaWRhdGUoY2FuZGlkYXRlKS52YWx1ZS52b3RlcyArIDEKCWZyYW1lX2RpZyAtMSAvLyBjYW5kaWRhdGU6IEFkZHJlc3MKCWJveF9nZXQKCgkvLyBib3ggdmFsdWUgZG9lcyBub3QgZXhpc3Q6IHRoaXMuZGF0YUNhbmRpZGF0ZShjYW5kaWRhdGUpLnZhbHVlCglhc3NlcnQKCXN0b3JlIDI1NSAvLyBmdWxsIGFycmF5Cglsb2FkIDI1NSAvLyBmdWxsIGFycmF5CglpbnQgMgoJZnJhbWVfZGlnIC0xIC8vIGNhbmRpZGF0ZTogQWRkcmVzcwoJYm94X2dldAoKCS8vIGJveCB2YWx1ZSBkb2VzIG5vdCBleGlzdDogdGhpcy5kYXRhQ2FuZGlkYXRlKGNhbmRpZGF0ZSkudmFsdWUKCWFzc2VydAoJc3RvcmUgMjU1IC8vIGZ1bGwgYXJyYXkKCWxvYWQgMjU1IC8vIGZ1bGwgYXJyYXkKCWV4dHJhY3QgMiAxCglidG9pCglpbnQgMQoJKwoJaXRvYgoJZHVwCgliaXRsZW4KCWludCA4Cgk8PQoKCS8vIHRoaXMuZGF0YUNhbmRpZGF0ZShjYW5kaWRhdGUpLnZhbHVlLnZvdGVzICsgMSBvdmVyZmxvd2VkIDggYml0cwoJYXNzZXJ0CglleHRyYWN0IDcgMQoJcmVwbGFjZTMKCWZyYW1lX2RpZyAtMSAvLyBjYW5kaWRhdGU6IEFkZHJlc3MKCWR1cAoJYm94X2RlbAoJcG9wCglzd2FwCglib3hfcHV0CglyZXRzdWIKCipjcmVhdGVfTm9PcDoKCW1ldGhvZCAiY3JlYXRlQXBwbGljYXRpb24oKXZvaWQiCgl0eG5hIEFwcGxpY2F0aW9uQXJncyAwCgltYXRjaCAqYWJpX3JvdXRlX2NyZWF0ZUFwcGxpY2F0aW9uCgoJLy8gdGhpcyBjb250cmFjdCBkb2VzIG5vdCBpbXBsZW1lbnQgdGhlIGdpdmVuIEFCSSBtZXRob2QgZm9yIGNyZWF0ZSBOb09wCgllcnIKCipjYWxsX05vT3A6CgltZXRob2QgInJlaWdzdGVyQ2FuZGlkYXRlKGFkZHJlc3MsKHN0cmluZyxzdHJpbmcsc3RyaW5nLHN0cmluZykpdm9pZCIKCW1ldGhvZCAidm90ZShhZGRyZXNzKXZvaWQiCgl0eG5hIEFwcGxpY2F0aW9uQXJncyAwCgltYXRjaCAqYWJpX3JvdXRlX3JlaWdzdGVyQ2FuZGlkYXRlICphYmlfcm91dGVfdm90ZQoKCS8vIHRoaXMgY29udHJhY3QgZG9lcyBub3QgaW1wbGVtZW50IHRoZSBnaXZlbiBBQkkgbWV0aG9kIGZvciBjYWxsIE5vT3AKCWVycgoKKnByb2Nlc3Nfc3RhdGljX3R1cGxlX2VsZW1lbnQ6Cglwcm90byA0IDMKCWZyYW1lX2RpZyAtNCAvLyB0dXBsZSBoZWFkCglmcmFtZV9kaWcgLTEgLy8gZWxlbWVudAoJY29uY2F0CglmcmFtZV9kaWcgLTMgLy8gdHVwbGUgdGFpbAoJZnJhbWVfZGlnIC0yIC8vIGhlYWQgb2Zmc2V0CglyZXRzdWIKCipwcm9jZXNzX2R5bmFtaWNfdHVwbGVfZWxlbWVudDoKCXByb3RvIDQgMwoJZnJhbWVfZGlnIC00IC8vIHR1cGxlIGhlYWQKCWZyYW1lX2RpZyAtMiAvLyBoZWFkIG9mZnNldAoJY29uY2F0CglmcmFtZV9idXJ5IC00IC8vIHR1cGxlIGhlYWQKCWZyYW1lX2RpZyAtMSAvLyBlbGVtZW50CglkdXAKCWxlbgoJZnJhbWVfZGlnIC0yIC8vIGhlYWQgb2Zmc2V0CglidG9pCgkrCglpdG9iCglleHRyYWN0IDYgMgoJZnJhbWVfYnVyeSAtMiAvLyBoZWFkIG9mZnNldAoJZnJhbWVfZGlnIC0zIC8vIHR1cGxlIHRhaWwKCXN3YXAKCWNvbmNhdAoJZnJhbWVfYnVyeSAtMyAvLyB0dXBsZSB0YWlsCglmcmFtZV9kaWcgLTQgLy8gdHVwbGUgaGVhZAoJZnJhbWVfZGlnIC0zIC8vIHR1cGxlIHRhaWwKCWZyYW1lX2RpZyAtMiAvLyBoZWFkIG9mZnNldAoJcmV0c3Vi",
      "clear": "I3ByYWdtYSB2ZXJzaW9uIDEw"
    },
    "contract": {
      "name": "Votations",
      "desc": "",
      "methods": [
        {
          "name": "createApplication",
          "args": [],
          "returns": {
            "type": "void"
          }
        },
        {
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
        },
        {
          "name": "vote",
          "args": [
            {
              "name": "candidate",
              "type": "address"
            }
          ],
          "returns": {
            "type": "void"
          }
        }
      ]
    }
  }
  
}


deployContract();