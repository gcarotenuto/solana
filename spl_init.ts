import { Keypair, Connection } from "@solana/web3.js";
import {createMint} from "@solana/spl-token";
import wallet from "./wallet.json";

const fs = require('fs');
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com","finalized");

(async () => {
    
    const mint = await createMint(connection,keypair,keypair.publicKey, null, 6);
    console.log("Mint Address: ", mint.toBase58());

    let json = JSON.stringify(mint.toBase58());
    fs.writeFile('mintAddress.json', json, 'utf8', (err: NodeJS.ErrnoException | null) => {
        if (err) {
          console.error("An error occurred while writing JSON Object to File.");
          return console.error(err);
        }
        console.log("JSON file has been saved.");
      });

})();