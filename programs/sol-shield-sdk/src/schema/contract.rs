use crate::constants::*;
use anchor_lang::prelude::*;

#[repr(u8)]
#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, Debug, PartialEq)]
pub enum ContractState {
  Uninitialized,
  Initialized,
  Processing,
  Approved,
}
impl Default for ContractState {
  fn default() -> Self {
    ContractState::Uninitialized
  }
}

#[account]
pub struct Contract {
  pub authority: Pubkey,
  pub hash: [u8; 16],
  pub expired_at: i64,
  pub total_signer: u8,
  pub total_signed: u8,
  pub state: ContractState,
}

impl Contract {
  pub const LEN: usize = DISCRIMINATOR_SIZE + PUBKEY_SIZE + U8_SIZE * 16 + I64_SIZE + U8_SIZE * 3;
}
