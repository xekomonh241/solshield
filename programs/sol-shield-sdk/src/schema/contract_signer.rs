use crate::constants::*;
use anchor_lang::prelude::*;

#[repr(u8)]
#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, Debug, PartialEq)]
pub enum ContractSignerState {
  Uninitialized,
  Initialized,
  Singed,
}
impl Default for ContractSignerState {
  fn default() -> Self {
    ContractSignerState::Uninitialized
  }
}

#[account]
pub struct ContractSigner {
  pub authority: Pubkey,
  pub contract: Pubkey,
  pub state: ContractSignerState,
}

impl ContractSigner {
  pub const LEN: usize = DISCRIMINATOR_SIZE + PUBKEY_SIZE * 2 + U8_SIZE;
}
