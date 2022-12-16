import * as anchor from "@project-serum/anchor";
import { web3, utils } from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { BN } from "bn.js";
import { IDL, SolShieldSdk } from "../target/types/sol_shield_sdk";

export const PROGRAMS = {
  rent: web3.SYSVAR_RENT_PUBKEY,
  systemProgram: web3.SystemProgram.programId,
  associatedTokenProgram: utils.token.ASSOCIATED_PROGRAM_ID,
  tokenProgram: utils.token.TOKEN_PROGRAM_ID,
};

describe("sol-shield-sdk", () => {
  const provider = anchor.AnchorProvider.env();
  // Configure the client to use the local cluster.
  anchor.setProvider(provider);
  const program = anchor.workspace.SolShieldSdk as Program<SolShieldSdk>;

  const programClient = new Program(IDL, program.programId, provider);

  let CONTRACT: web3.PublicKey;
  let CONTRACT_SIGNER: web3.PublicKey;

  const hash = [];
  for (let i = 0; i < 16; i++) {
    hash.push(1);
  }

  const deriveContractAddress = async (hash: number[]) => {
    const [contract] = await anchor.web3.PublicKey.findProgramAddressSync([Buffer.from("contract"), Buffer.from(hash)], program.programId);
    return contract;
  };

  const deriveSignerAddress = async (contract: web3.PublicKey, owner: web3.PublicKey) => {
    const [signer] = await anchor.web3.PublicKey.findProgramAddressSync([Buffer.from("signer"), contract.toBuffer(), owner.toBuffer()], program.programId);
    return signer;
  };
  it("Is createContract!", async () => {
    CONTRACT = await deriveContractAddress(hash);
    // Add your test here.
    const tx = await programClient.methods
      .createContract(hash, new BN(1))
      .accounts({
        authority: provider.publicKey,
        contract: CONTRACT,
        ...PROGRAMS,
      })
      .rpc();

    console.log("Your transaction signature", tx);
  });

  it("Is create signer!", async () => {
    CONTRACT_SIGNER = await deriveSignerAddress(CONTRACT, provider.publicKey);
    // Add your test here.
    const tx = await programClient.methods
      .createSigner()
      .accounts({
        authority: provider.publicKey,
        contract: CONTRACT,
        contractSigner: CONTRACT_SIGNER,
        contractSignerAuthority: provider.publicKey,
        ...PROGRAMS,
      })
      .rpc();

    console.log("Your transaction signature", tx);
  });

  it("Is active contract!", async () => {
    // Add your test here.
    const tx = await programClient.methods
      .activeContract()
      .accounts({
        authority: provider.publicKey,
        contract: CONTRACT,
        ...PROGRAMS,
      })
      .rpc();
    console.log("Your transaction signature", tx);
  });

  it("Is sign contract!", async () => {
    // Add your test here.
    const tx = await programClient.methods
      .signContract()
      .accounts({
        authority: provider.publicKey,
        contract: CONTRACT,
        contractSigner: CONTRACT_SIGNER,
        ...PROGRAMS,
      })
      .rpc();
    console.log("Your transaction signature", tx);

    const contractData = await programClient.account.contract.fetch(CONTRACT);
    console.log("contractData", contractData);
  });
});
