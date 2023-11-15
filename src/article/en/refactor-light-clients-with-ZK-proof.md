---
title: "Refactor light clients with ZK-proof"
description: 
lang: en
---

# **Issues with light clients for verification**

Light clients, also known as lightweight clients or SPV (Simplified Payment Verification) clients proposed in the[ original Bitcoin whitepaper](https://bitcoin.org/bitcoin.pdf), are designed to interact with blockchain networks without downloading the entire blockchain. An SPV client only downloads the 80-byte header for every block (10 mins per block, 800K blocks in total), and then asks a full node for transactions to/from the client’s addresses.

Light clients in MAP Protocol are constructed as smart contracts on MAP Relay Chain and all connected blockchains.  Although this is more secure and decentralized than solutions such as Multi-Party Computation (MPC), the amount of gas fee consumption with light clients verification network is more costly, which will not be efficient and practical enough to serve for cross-chain purposes.  To improve efficiency, light clients can instead validate a [ZK-SNARK](https://www.youtube.com/watch?v=h-94UhJLeck) proof that a block header is valid.


# **Understanding ZK-proof**

Zero-knowledge proofs (ZKPs) are a form of cryptographic protocol that allows one party, the prover, to prove to another party, the verifier, that a certain statement is true without revealing any information beyond the validity of the statement itself. In other words, zero-knowledge proofs enable the sharing of proof of knowledge without sharing the knowledge itself. Below are the two most common types of zero-knowledge proofs:


## **ZK-SNARKs (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge):**



* "Zero-Knowledge": The prover can demonstrate possession of certain information without revealing it.
* "Succinct": The proofs are small in size and quick to verify.
* "Non-Interactive": The proof is a single message sent from the prover to the verifier, with no back-and-forth communication required.

ZK-SNARKs are widely used in blockchain applications for enhancing privacy. For instance, Zcash, a privacy-focused cryptocurrency, utilizes ZK-SNARKs to enable transactions without revealing sender, receiver, or transaction amount.


## **ZK-STARKs (Zero-Knowledge Scalable Transparent Arguments of Knowledge):**



* "Zero-Knowledge": Similar to SNARKs, STARKs allow for proving knowledge without revealing the knowledge itself.
* "Scalable": STARKs are designed to be scalable with computation size and are efficient even for large datasets.
* "Transparent": Unlike SNARKs, STARKs do not require a trusted setup. The absence of this requirement enhances trust and security.

ZK-STARKs are considered an improvement over SNARKs due to their scalability and the lack of a need for a trusted setup. They are still in the early stages of adoption but hold promise for a wide range of applications, especially where transparency and scalability are crucial.


# **How does MAP Protocol use ZK-proof to refactor light clients?**




![alt_text](/images/article/images/refactor-light-clients-with-ZK-proof-1.png "image_tooltip")

With the recent development of ZK technology, MAP Protocol refactored its light client construction and optimized the efficiency of the cross-chain verification network.

In the original light clients verification network, clients need to store the public keys of all current validators along with their respective weights. Verifying the validity of a block requires accessing all the public keys of the validator set and aggregating the public keys of the validators participating in block signing (MAP relay chain uses aggregated BLS signatures). By employing zero-knowledge proofs, however, the process above can be expressed through arithmetic circuits, generating the corresponding zero-knowledge proofs;

In this design, the light client no longer needs to store the public keys and weights of all validators in the current validator set. Instead, it only stores the commitment value (hashed values of the industrial and weight information of all validators encoded) of the public keys and weights of the current validator set. The calculations for aggregating public keys and verifying the validity of the aggregated BLS signature are both expressed through arithmetic circuits and computed using the[ Groth16 protocol](https://codeocean.com/explore/3d07dc79-69aa-47bd-98d8-e319575f9a8a) to generate zero-knowledge proofs.


To read more in technical details, you can check out the ZK section we have written in the MAP Protocol [Whitepaper](/article?id=whitepaper).

# **Summary**

In MAP Protocol’s approach, ZK-proof, specifically zkSNARK proof, demonstrates that the current block header, under the validator set corresponding to the commitment value stored within the light client, is a legitimate block header.

The verification of the block header's validity for the light client involves a series of operations such as accessing all public keys and weights, calculating aggregated public keys, and verifying signature validity. This now simplifies verifying the legitimacy of a constant-sized zkSNARK proof, thus improving the efficiency of the light clients verification network while maintaining its decentralization.
