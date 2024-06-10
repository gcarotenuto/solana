import { Keypair, Connection, PublicKey } from "@solana/web3.js";
import {mintTo, getOrCreateAssociatedTokenAccount} from "@solana/spl-token";
import wallet from "./wallet.json";
import mintAddress from "./mintAddress.json";
const fs = require('fs');

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com","finalized");
const mint = new PublicKey(mintAddress);

(async () => {
    
    const tokenAccount = await getOrCreateAssociatedTokenAccount(connection,keypair,mint,keypair.publicKey);

    const ata = tokenAccount.address;
    console.log("Associated Token Account: ", ata.toBase58());

    let json = JSON.stringify(ata.toBase58());
        fs.writeFile('associatedTOkenAccount.json', json, 'utf8', (err: NodeJS.ErrnoException | null) => {
            if (err) {
              console.error("An error occurred while writing JSON Object to File.");
              return console.error(err);
            }
            console.log("JSON file has been saved.");
          });

    const amount = 10e6;

    await mintTo(connection,keypair,mint,ata,keypair.publicKey,amount);
    console.log("Minted",amount,"to",ata.toBase58());


})();