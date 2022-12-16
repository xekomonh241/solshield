use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
  #[msg("Operation overflowed")]
  Overflow,
  #[msg("Invalid contract State")]
  InvalidState,
  #[msg("Not have permission")]
  InvalidPermission,
}
