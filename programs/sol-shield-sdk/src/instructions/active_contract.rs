use crate::errors::ErrorCode;
use crate::schema::*;
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct ActiveContract<'info> {
  #[account(mut)]
  pub authority: Signer<'info>,

  #[account(mut, has_one = authority)]
  pub contract: Account<'info, Contract>,
}

pub fn exec(ctx: Context<ActiveContract>) -> Result<()> {
  if ctx.accounts.contract.state != ContractState::Initialized {
    return err!(ErrorCode::InvalidState);
  }

  let contract = &mut ctx.accounts.contract;
  contract.state = ContractState::Processing;
  Ok(())
}
