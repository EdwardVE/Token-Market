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
      "emitShares(string,string,uint64)uint64": {
        "call_config": {
          "no_op": "CALL"
        }
      },
      "transferShares(uint64,address)void": {
        "call_config": {
          "no_op": "CALL"
        }
      },
      "createApplication()void": {
        "call_config": {
          "no_op": "CREATE"
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
        "declared": {},
        "reserved": {}
      }
    },
    "state": {
      "global": {
        "num_byte_slices": 0,
        "num_uints": 0
      },
      "local": {
        "num_byte_slices": 0,
        "num_uints": 0
      }
    },
    "source": {
      "approval": "I3ByYWdtYSB2ZXJzaW9uIDEwCgovLyBUaGlzIFRFQUwgd2FzIGdlbmVyYXRlZCBieSBURUFMU2NyaXB0IHYwLjEwMC4yCi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbGdvcmFuZGZvdW5kYXRpb24vVEVBTFNjcmlwdAoKLy8gVGhpcyBjb250cmFjdCBpcyBjb21wbGlhbnQgd2l0aCBhbmQvb3IgaW1wbGVtZW50cyB0aGUgZm9sbG93aW5nIEFSQ3M6IFsgQVJDNCBdCgovLyBUaGUgZm9sbG93aW5nIHRlbiBsaW5lcyBvZiBURUFMIGhhbmRsZSBpbml0aWFsIHByb2dyYW0gZmxvdwovLyBUaGlzIHBhdHRlcm4gaXMgdXNlZCB0byBtYWtlIGl0IGVhc3kgZm9yIGFueW9uZSB0byBwYXJzZSB0aGUgc3RhcnQgb2YgdGhlIHByb2dyYW0gYW5kIGRldGVybWluZSBpZiBhIHNwZWNpZmljIGFjdGlvbiBpcyBhbGxvd2VkCi8vIEhlcmUsIGFjdGlvbiByZWZlcnMgdG8gdGhlIE9uQ29tcGxldGUgaW4gY29tYmluYXRpb24gd2l0aCB3aGV0aGVyIHRoZSBhcHAgaXMgYmVpbmcgY3JlYXRlZCBvciBjYWxsZWQKLy8gRXZlcnkgcG9zc2libGUgYWN0aW9uIGZvciB0aGlzIGNvbnRyYWN0IGlzIHJlcHJlc2VudGVkIGluIHRoZSBzd2l0Y2ggc3RhdGVtZW50Ci8vIElmIHRoZSBhY3Rpb24gaXMgbm90IGltcGxlbWVudGVkIGluIHRoZSBjb250cmFjdCwgaXRzIHJlc3BlY3RpdmUgYnJhbmNoIHdpbGwgYmUgIipOT1RfSU1QTEVNRU5URUQiIHdoaWNoIGp1c3QgY29udGFpbnMgImVyciIKdHhuIEFwcGxpY2F0aW9uSUQKIQppbnQgNgoqCnR4biBPbkNvbXBsZXRpb24KKwpzd2l0Y2ggKmNhbGxfTm9PcCAqTk9UX0lNUExFTUVOVEVEICpOT1RfSU1QTEVNRU5URUQgKk5PVF9JTVBMRU1FTlRFRCAqTk9UX0lNUExFTUVOVEVEICpOT1RfSU1QTEVNRU5URUQgKmNyZWF0ZV9Ob09wICpOT1RfSU1QTEVNRU5URUQgKk5PVF9JTVBMRU1FTlRFRCAqTk9UX0lNUExFTUVOVEVEICpOT1RfSU1QTEVNRU5URUQgKk5PVF9JTVBMRU1FTlRFRAoKKk5PVF9JTVBMRU1FTlRFRDoKCS8vIFRoZSByZXF1ZXN0ZWQgYWN0aW9uIGlzIG5vdCBpbXBsZW1lbnRlZCBpbiB0aGlzIGNvbnRyYWN0LiBBcmUgeW91IHVzaW5nIHRoZSBjb3JyZWN0IE9uQ29tcGxldGU/IERpZCB5b3Ugc2V0IHlvdXIgYXBwIElEPwoJZXJyCgovLyBlbWl0U2hhcmVzKHN0cmluZyxzdHJpbmcsdWludDY0KXVpbnQ2NAoqYWJpX3JvdXRlX2VtaXRTaGFyZXM6CgkvLyBUaGUgQUJJIHJldHVybiBwcmVmaXgKCWJ5dGUgMHgxNTFmN2M3NQoKCS8vIHE6IHVpbnQ2NAoJdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwoJYnRvaQoKCS8vIHVuaXROYW1lOiBzdHJpbmcKCXR4bmEgQXBwbGljYXRpb25BcmdzIDIKCWV4dHJhY3QgMiAwCgoJLy8gbmFtZTogc3RyaW5nCgl0eG5hIEFwcGxpY2F0aW9uQXJncyAxCglleHRyYWN0IDIgMAoKCS8vIGV4ZWN1dGUgZW1pdFNoYXJlcyhzdHJpbmcsc3RyaW5nLHVpbnQ2NCl1aW50NjQKCWNhbGxzdWIgZW1pdFNoYXJlcwoJaXRvYgoJY29uY2F0Cglsb2cKCWludCAxCglyZXR1cm4KCi8vIGVtaXRTaGFyZXMobmFtZTogc3RyaW5nLCB1bml0TmFtZTogc3RyaW5nLCBxOiB1aW50NjQpOiBBc3NldElECmVtaXRTaGFyZXM6Cglwcm90byAzIDEKCgkvLyBjb250cmFjdHMvSW52ZXN0bWVudC5hbGdvLnRzOjgKCS8vIHJldHVybiBzZW5kQXNzZXRDcmVhdGlvbih7CgkvLyAgICAgICBjb25maWdBc3NldE5hbWU6IG5hbWUsCgkvLyAgICAgICBjb25maWdBc3NldFVuaXROYW1lOiB1bml0TmFtZSwKCS8vICAgICAgIGNvbmZpZ0Fzc2V0RGVjaW1hbHM6IDEwLAoJLy8gICAgICAgY29uZmlnQXNzZXRUb3RhbDogcSwKCS8vICAgICB9KTsKCWl0eG5fYmVnaW4KCWludCBhY2ZnCglpdHhuX2ZpZWxkIFR5cGVFbnVtCgoJLy8gY29udHJhY3RzL0ludmVzdG1lbnQuYWxnby50czo5CgkvLyBjb25maWdBc3NldE5hbWU6IG5hbWUKCWZyYW1lX2RpZyAtMSAvLyBuYW1lOiBzdHJpbmcKCWl0eG5fZmllbGQgQ29uZmlnQXNzZXROYW1lCgoJLy8gY29udHJhY3RzL0ludmVzdG1lbnQuYWxnby50czoxMAoJLy8gY29uZmlnQXNzZXRVbml0TmFtZTogdW5pdE5hbWUKCWZyYW1lX2RpZyAtMiAvLyB1bml0TmFtZTogc3RyaW5nCglpdHhuX2ZpZWxkIENvbmZpZ0Fzc2V0VW5pdE5hbWUKCgkvLyBjb250cmFjdHMvSW52ZXN0bWVudC5hbGdvLnRzOjExCgkvLyBjb25maWdBc3NldERlY2ltYWxzOiAxMAoJaW50IDEwCglpdHhuX2ZpZWxkIENvbmZpZ0Fzc2V0RGVjaW1hbHMKCgkvLyBjb250cmFjdHMvSW52ZXN0bWVudC5hbGdvLnRzOjEyCgkvLyBjb25maWdBc3NldFRvdGFsOiBxCglmcmFtZV9kaWcgLTMgLy8gcTogdWludDY0CglpdHhuX2ZpZWxkIENvbmZpZ0Fzc2V0VG90YWwKCgkvLyBGZWUgZmllbGQgbm90IHNldCwgZGVmYXVsdGluZyB0byAwCglpbnQgMAoJaXR4bl9maWVsZCBGZWUKCgkvLyBTdWJtaXQgaW5uZXIgdHJhbnNhY3Rpb24KCWl0eG5fc3VibWl0CglpdHhuIENyZWF0ZWRBc3NldElECglyZXRzdWIKCi8vIHRyYW5zZmVyU2hhcmVzKHVpbnQ2NCxhZGRyZXNzKXZvaWQKKmFiaV9yb3V0ZV90cmFuc2ZlclNoYXJlczoKCS8vIHJlY2VpdmVyOiBhZGRyZXNzCgl0eG5hIEFwcGxpY2F0aW9uQXJncyAyCglkdXAKCWxlbgoJaW50IDMyCgk9PQoKCS8vIGFyZ3VtZW50IDAgKHJlY2VpdmVyKSBmb3IgdHJhbnNmZXJTaGFyZXMgbXVzdCBiZSBhIGFkZHJlc3MKCWFzc2VydAoKCS8vIGFzc2V0OiB1aW50NjQKCXR4bmEgQXBwbGljYXRpb25BcmdzIDEKCWJ0b2kKCgkvLyBleGVjdXRlIHRyYW5zZmVyU2hhcmVzKHVpbnQ2NCxhZGRyZXNzKXZvaWQKCWNhbGxzdWIgdHJhbnNmZXJTaGFyZXMKCWludCAxCglyZXR1cm4KCi8vIHRyYW5zZmVyU2hhcmVzKGFzc2V0OiBBc3NldElELCByZWNlaXZlcjogQWRkcmVzcyk6IHZvaWQKdHJhbnNmZXJTaGFyZXM6Cglwcm90byAyIDAKCgkvLyBjb250cmFjdHMvSW52ZXN0bWVudC5hbGdvLnRzOjE4CgkvLyBzZW5kQXNzZXRUcmFuc2Zlcih7CgkvLyAgICAgICBhc3NldFJlY2VpdmVyOiByZWNlaXZlciwKCS8vICAgICAgIGFzc2V0QW1vdW50OiAxLCAvLyBUcmFuc2ZlcmVuY2lhIGRlIHVuIE5GVAoJLy8gICAgICAgeGZlckFzc2V0OiBhc3NldCwKCS8vICAgICB9KQoJaXR4bl9iZWdpbgoJaW50IGF4ZmVyCglpdHhuX2ZpZWxkIFR5cGVFbnVtCgoJLy8gY29udHJhY3RzL0ludmVzdG1lbnQuYWxnby50czoxOQoJLy8gYXNzZXRSZWNlaXZlcjogcmVjZWl2ZXIKCWZyYW1lX2RpZyAtMiAvLyByZWNlaXZlcjogQWRkcmVzcwoJaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCgoJLy8gY29udHJhY3RzL0ludmVzdG1lbnQuYWxnby50czoyMAoJLy8gYXNzZXRBbW91bnQ6IDEKCWludCAxCglpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CgoJLy8gY29udHJhY3RzL0ludmVzdG1lbnQuYWxnby50czoyMQoJLy8geGZlckFzc2V0OiBhc3NldAoJZnJhbWVfZGlnIC0xIC8vIGFzc2V0OiBBc3NldElECglpdHhuX2ZpZWxkIFhmZXJBc3NldAoKCS8vIEZlZSBmaWVsZCBub3Qgc2V0LCBkZWZhdWx0aW5nIHRvIDAKCWludCAwCglpdHhuX2ZpZWxkIEZlZQoKCS8vIFN1Ym1pdCBpbm5lciB0cmFuc2FjdGlvbgoJaXR4bl9zdWJtaXQKCXJldHN1YgoKKmFiaV9yb3V0ZV9jcmVhdGVBcHBsaWNhdGlvbjoKCWludCAxCglyZXR1cm4KCipjcmVhdGVfTm9PcDoKCW1ldGhvZCAiY3JlYXRlQXBwbGljYXRpb24oKXZvaWQiCgl0eG5hIEFwcGxpY2F0aW9uQXJncyAwCgltYXRjaCAqYWJpX3JvdXRlX2NyZWF0ZUFwcGxpY2F0aW9uCgoJLy8gdGhpcyBjb250cmFjdCBkb2VzIG5vdCBpbXBsZW1lbnQgdGhlIGdpdmVuIEFCSSBtZXRob2QgZm9yIGNyZWF0ZSBOb09wCgllcnIKCipjYWxsX05vT3A6CgltZXRob2QgImVtaXRTaGFyZXMoc3RyaW5nLHN0cmluZyx1aW50NjQpdWludDY0IgoJbWV0aG9kICJ0cmFuc2ZlclNoYXJlcyh1aW50NjQsYWRkcmVzcyl2b2lkIgoJdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAoJbWF0Y2ggKmFiaV9yb3V0ZV9lbWl0U2hhcmVzICphYmlfcm91dGVfdHJhbnNmZXJTaGFyZXMKCgkvLyB0aGlzIGNvbnRyYWN0IGRvZXMgbm90IGltcGxlbWVudCB0aGUgZ2l2ZW4gQUJJIG1ldGhvZCBmb3IgY2FsbCBOb09wCgllcnI=",
      "clear": "I3ByYWdtYSB2ZXJzaW9uIDEw"
    },
    "contract": {
      "name": "ShareFactory",
      "desc": "",
      "methods": [
        {
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
        },
        {
          "name": "transferShares",
          "args": [
            {
              "name": "asset",
              "type": "uint64"
            },
            {
              "name": "receiver",
              "type": "address"
            }
          ],
          "returns": {
            "type": "void"
          }
        },
        {
          "name": "createApplication",
          "args": [],
          "returns": {
            "type": "void"
          }
        }
      ]
    }
  }
}


deployContract();