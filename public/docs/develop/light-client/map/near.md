# MAPO light client on near protocol

## Contract Address

[Here to get MAPO mainnet and testnet light client contract address.](/develop/light-client/README.md)


## How it works

MAPO light client is a contract deployed on NEAR blockchain. It updates and saves the validators' information of MAPO
blockchain periodically, and uses them to verify the proof generated by MAPO blockchain. Here is the main workflow about
how it works:

1. The light client contract is deployed and initialized with the MAPO blockchain information, e.g., the epoch size, the
   validators threshold, and the trusted validators' information for a specific epoch(we call this epoch **current
   epoch**).
2. The light client receives the last block header of **current epoch** from an off-chain program called **maintainer**.
   The block header can be verified by the stored validators. After the successful verification, the light client gets
   the
   validators' information from the block header for the next epoch. The light client then stores the validators and
   updates
   the **current epoch** to the next epoch. This step is triggered once per epoch, and the light client can store
   validators
   for the latest 20 epochs at most.
3. The light client can verify the validity of the receipt in a certain MAPO block only if the validators information
   for the corresponding epoch are stored. So if an application want to use the MAPO light client to verify the proof, it
   can
   first check if the corresponding validators are stored by getting the verifiable header range from the MAPO light
   client.

## How to verify

The content of proof data includes:

1. MAPO block header where the receipt exists
2. The aggregated G2 public key of the signed validators
3. The receipt to prove
4. The index of the receipt in the block
5. The proof to prove the existence of the above receipt

The light client follows these steps to verify the proof data:

1. Compute the epoch number of the block header and get the validators record by epoch number. If no record exists,
   an error is returned.
2. Use the validators to verify the ecdsa signature of the block header, and use validator and the aggregated G2 public
   key to verify the BLS signature of the block header. This proves the validity of the block header. If verification
   fails, an error is returned.
3. All the receipts hashes in a MAPO block constructs a Merkle Patricia Tree, and the tree root is recorded in the block
   header. The light client retrieves the tree leaf through the tree root from block header, the key index and
   the proof in the proof data. Then it checks whether the tree leaf equals to the hash of the receipt included in the
   proof data. If not, an error is returned.

If all above verifications pass, the proof data is proved to be valid.

## Proof

### Here is the data structure about the proof.

ReceiptProof includes the proof and the receipt to prove.

```rust
pub struct ReceiptProof {
    // the block header where the receipt exists
    pub header: Header,
    // the aggregated G2 public key of the signed validators
    pub agg_pk: G2,
    // the receipt to prove
    pub receipt: Receipt,
    // the index of the receipt in the block
    pub key_index: Vec<u8>,
    // the proof to prove the existence of the above receipt
    pub proof: Vec<ProofEntry>,
}
```
