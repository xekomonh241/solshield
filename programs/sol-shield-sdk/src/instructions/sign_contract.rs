use crate::errors::ErrorCode;
use crate::schema::*;
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct SignContract<'info> {
  #[account(mut)]
  pub authority: Signer<'info>,

  #[account(mut)]
  pub contract: Account<'info, Contract>,

  #[account(mut, has_one = authority, )]
  pub contract_signer: Account<'info, ContractSigner>,
}

pub fn exec(ctx: Context<SignContract>) -> Result<()> {
  if ctx.accounts.contract.state != ContractState::Processing {
    return err!(ErrorCode::InvalidState);
  }

  let contract_signer = &mut ctx.accounts.contract_signer;
  contract_signer.state = ContractSignerState::Singed;

  let contract = &mut ctx.accounts.contract;
  contract.total_signed += 1;
  if contract.total_signed == contract.total_signer {
    contract.state = ContractState::Approved
  }
  Ok(())
}
