use crate::schema::*;
use anchor_lang::prelude::*;

#[derive(Accounts)]
#[instruction(hash: [u8; 16])]
pub struct CreateContract<'info> {
  #[account(mut)]
  pub authority: Signer<'info>,
  #[account(
    init, 
    payer = authority, 
    space = Contract::LEN,
    seeds = [b"contract", hash.as_ref()],
    bump
  )]
  pub contract: Account<'info, Contract>,

  pub system_program: Program<'info, System>,
  pub rent: Sysvar<'info, Rent>,
}

pub fn exec(ctx: Context<CreateContract>, hash: [u8; 16], expired_at: i64) -> Result<()> {
  let contract = &mut ctx.accounts.contract;
  contract.authority = ctx.accounts.authority.key();
  contract.hash = hash;
  contract.expired_at = expired_at;
  contract.total_signer = 0;
  contract.total_signed = 0;
  contract.state = ContractState::Initialized;
  Ok(())
}
