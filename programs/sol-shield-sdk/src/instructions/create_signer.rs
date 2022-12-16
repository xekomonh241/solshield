use crate::errors::ErrorCode;
use crate::schema::*;
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct CreateContractSigner<'info> {
  #[account(mut)]
  pub authority: Signer<'info>,

  #[account(mut, has_one = authority)]
  pub contract: Account<'info, Contract>,

  /// CHECK: Just a pure account
  pub contract_signer_authority: AccountInfo<'info>,

  #[account(init, payer = authority, space = ContractSigner::LEN,  
    seeds = [b"signer", contract.key().as_ref(), contract_signer_authority.key().as_ref()],
    bump
  )]
  pub contract_signer: Account<'info, ContractSigner>,

  pub system_program: Program<'info, System>,
  pub rent: Sysvar<'info, Rent>,
}

pub fn exec(ctx: Context<CreateContractSigner>) -> Result<()> {
  if ctx.accounts.contract.state != ContractState::Initialized {
    return err!(ErrorCode::InvalidState);
  }

  let contract_signer = &mut ctx.accounts.contract_signer;
  contract_signer.authority = ctx.accounts.contract_signer_authority.key();
  contract_signer.contract = ctx.accounts.contract.key();
  contract_signer.state = ContractSignerState::Initialized;

  let contract = &mut ctx.accounts.contract;
  contract.total_signer += 1;
  Ok(())
}
