import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import {
  Numberu64,
  generateRandomSeed,
  signTransactionInstructions,
} from './utils';
import { Schedule } from './state';
import { create, TOKEN_VESTING_PROGRAM_ID } from './main';
import { tokenMint, sourceAccount } from '../config';
import { Wallet } from '@solana/wallet-adapter-react';
import { unlock } from '.';

/**
 *
 * Simple example of a linear unlock.
 *
 * This is just an example, please be careful using the vesting contract and test it first with test tokens.
 *
 */

/** Path to your wallet */

const wallet = Keypair.fromSecretKey(
  new Uint8Array([70, 216, 137, 37, 153, 95, 120, 139, 178, 4, 58, 33, 147, 176, 66, 204, 114, 69, 197, 178, 66, 243, 169, 79, 215, 229, 134, 42, 103, 49, 199, 188, 83, 184, 253, 73, 145, 21, 75, 176, 81, 64, 8, 3, 31, 54, 74, 50, 99, 110, 164, 219, 4, 229, 3, 28, 194, 243, 90, 195, 253, 174, 161, 28]),
);

/** There are better way to generate an array of dates but be careful as it's irreversible */
const DATES = [
  1645592419,
  1645592539
];



/** Token info */
const MINT = new PublicKey(tokenMint);
const DECIMALS = 9;

/** Info about the source */
const SOURCE_TOKEN_ACCOUNT = new PublicKey(sourceAccount);



/** Your RPC connection */


/** Do some checks before sending the tokens */
const checks = async (destinationTokenAccount: PublicKey, destinationOwner: PublicKey, connection) => {
  let tokenInfo = null;
  connection.getParsedAccountInfo(
    // @ts-ignore
    destinationTokenAccount

  ).then(res => {
    tokenInfo = res;
    // @ts-ignore
    const parsed = tokenInfo.value.data.parsed;
    if (parsed.info.mint !== MINT.toBase58()) {
      throw new Error('Invalid mint');
    }
    if (parsed.info.owner !== destinationOwner.toBase58()) {
      throw new Error('Invalid owner');
    }
    if (parsed.info.tokenAmount.decimals !== DECIMALS) {
      throw new Error('Invalid decimals');
    }
  })
    .catch(err => console.log(err));



};

/** Function that locks the tokens */
export const lockToken = async (destinationTokenAccount: string, destinationOwner: string, amount: number, connection) => {
  debugger;
  const destinationTokenAct = new PublicKey(destinationTokenAccount);
  const destinationOwnerAct = new PublicKey(destinationOwner);
  await checks(destinationTokenAct, destinationOwnerAct, connection);
  const schedules: Schedule[] = [];
  for (let date of DATES) {
    schedules.push(
      new Schedule(
        /** Has to be in seconds */
        new Numberu64(date),
        /** Don't forget to add decimals */
        new Numberu64(amount * Math.pow(10, DECIMALS)),
      ),
    );
  }
  const seed = generateRandomSeed();

  console.log(`Seed: ${seed}`);

  const instruction = await create(
    connection,
    TOKEN_VESTING_PROGRAM_ID,
    Buffer.from(seed),
    wallet.publicKey,
    wallet.publicKey,
    SOURCE_TOKEN_ACCOUNT,
    destinationTokenAct,
    MINT,
    schedules,
  );

  const tx = await signTransactionInstructions(
    connection,
    [wallet],
    wallet.publicKey,
    instruction,
  );

  console.log(`Transaction: ${tx} ${seed}`);
  return tx;
};




export const unLockToken = async (seed,connection) => {

  const instructions = await unlock( connection,
    TOKEN_VESTING_PROGRAM_ID,
    Buffer.from(seed),
    MINT
 )

 const tx = await signTransactionInstructions(
  connection,
  [wallet],
  wallet.publicKey,
  instructions,
);

console.log(`Transaction: ${tx} ${seed}`);

}