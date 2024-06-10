import {Keypair} from "@solana/web3.js";

const fs = require('fs');
const keypair = Keypair.generate();
console.log(`New wallet generated! Publick Key: ${keypair.publicKey.toBase58()} Secret Key: ${keypair.secretKey.toString()}`);

let json = JSON.stringify(Array.from(keypair.secretKey));
        fs.writeFile('wallet.json', json, 'utf8', (err: NodeJS.ErrnoException | null) => {
            if (err) {
              console.error("An error occurred while writing JSON Object to File.");
              return console.error(err);
            }
            console.log("JSON file has been saved.");
          });