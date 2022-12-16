use anchor_lang::prelude::*;

declare_id!("33eJhB9P4Kmf51MUpRgpJpdDab2MWP9FmpVHrASspJ3B");

pub mod constants;

pub mod instructions;
pub use instructions::*;

pub mod schema;
pub use schema::*;

pub mod errors;
pub use errors::*;

#[program]
pub mod sol_shield_sdk {
    use super::*;

    pub fn create_contract(
        ctx: Context<CreateContract>,
        hash: [u8; 16],
        expired_at: i64,
    ) -> Result<()> {
        create_contract::exec(ctx, hash, expired_at)
    }

    pub fn create_signer(ctx: Context<CreateContractSigner>) -> Result<()> {
        create_signer::exec(ctx)
    }

    pub fn active_contract(ctx: Context<ActiveContract>) -> Result<()> {
        active_contract::exec(ctx)
    }

    pub fn sign_contract(ctx: Context<SignContract>) -> Result<()> {
        sign_contract::exec(ctx)
    }
}

#[derive(Accounts)]
pub struct Initialize {}
