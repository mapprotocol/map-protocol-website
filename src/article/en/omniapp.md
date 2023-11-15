---
title: "Omnichain dApp with MAP Protocol"
description: 
lang: en
---


Omnichain dApp refers to decentralized apps that do not rely on any trusted third parties, but use truly decentralized methods to achieve cross-chain capabilities. You can use [MAP Protocol](/what-is-map-protocol), the peer-to-peer omnichain network focused on cross-chain interoperability, to build your Omnichain dAPp.

MAP Protocol decentralized cross-chain flow

The following diagram illustrates the process for omnichain dApps to achieve decentralized cross-chain functionality, showing transactions related to dApp logic activities transmitted from Ethereum through the MAP Relay Chain to Polygon.




![alt_text](/images/article/images/omniapp.png "image_tooltip")


The specific process is as follows:



1. Users interact with the dApp logic contract on Ethereum.
2. After the relevant logic is completed, the contract will call the *`TransferOut`* method in the MOS contract.
3. The  *`TransferOut`*method will Emit an Event containing the calldata of the transaction in the logic contract.
4. The Ethereum-MAPO Messenger will listen to this Event.
5. The Ethereum-MAPO Messenger will construct proof data of the transaction that the Event is in.
6. The Ethereum-MAPO Messenger will pass this proof data to the MAP Relay Chain through the *`TransferIn`* method in the MOS contract on the MAP Relay Chain.
7. The *`TransferIn`* method will verify this proof data in the light client of Ethereum deployed on the MAP Relay Chain.
8. If the verification is successful, an Event will be Emitted; its content also contains the same calldata as passed by the Messenger.
9. The MAPO-Polygon Messenger will listen to this Event.
10. The MAPO-Polygon Messenger will construct proof data of the transaction that the Event is in.
11. The MAPO-Polygon Messenger will pass this proof data to Polygon through the TransferIn method in the MOS contract on Polygon.
12. The *`TransferIn`* method will verify this proof data in the light client of the MAP Relay Chain deployed on Polygon.
13. If the verification is successful, the MOS contract will call the logic contract of the all-chain dApp on Polygon and execute the passed calldata.
14. The logic contract of the all-chain dApp can Emit an Event similar to 'execution completed'.


# **MAP Protocol OmniAPp Key Components**


## **[MOS Contract](https://github.com/mapprotocol/mapo-service-contracts/blob/main/evm/contracts/MapoServiceV3.sol)**

The MAPO Omnichain Service Contract is the core contract of MAP Protocol responsible for cross-chain message transmission. MOS Contracts are deployed on the source chain, MAP Relay Chain, and target chain to send, undertake, and receive cross-chain messages. The omnichain dApp involves two key methods:

**TransferOut**

**The transferOut method will be called by the logic contract of the all-chain dApp and pass the constructed calldata.**


```
function transferOut(uint256 _toChain, bytes memory _messageData, address _feeToken)
```





* <code>uint256 _toChain<strong> is the target chain chain id.</strong></code>
* <code>bytes memory _messageData<strong> is the calldata to be passed.</strong></code>
* <code>address _feeToken<strong> is the address of the token for which the fee is to be charged.</strong></code>

<strong>TransferIn</strong>

The transferIn method will be called by the Messenger and pass the constructed transaction proof to the target chain. It will also pass the proof to the light client on the same chain for verification and execute the contained calldata after successful verification.

```
    function transferIn(uint256 _chainId, bytes memory _receiptProof)

```



* `uint256 _chainId` is the chain id of the chain where MOS is located.
* `bytes memory _receiptProof` is the transaction proof calldata constructed by the Messenger.


## **[Messenger](https://github.com/mapprotocol/compass)**

Messenger is a non-privileged inter-chain program responsible for cross-chain message transmission in the MAP Protocol. Its main responsibilities:



* Listen to MOS's transfer out transactions and construct the corresponding proof data on the source chain.
* Call the MOS's TransferIn method to complete the transmission of cross-chain proof data and its contained cross-chain messages.


### **[MAPO Executor](https://github.com/mapprotocol/mapo-service-contracts/blob/main/evm/contracts/interface/IMapoExecutor.sol)**

The MAPO Executor is an interface that developers need to implement themselves, allowing the MOS contract to execute the specific logic of the all-chain dApp when called on the target chain.

```
    function mapoExecute (uint256 _fromChain, uint256 _toChain, bytes calldata _fromAddress, bytes32 _orderId, bytes calldata _message）

```



* `uint256 _fromChain` is the chain id of the starting chain.
* `uint256 _toChain` is the chain id of the target chain.
* `bytes calldata _fromAddress` is the initiating address of this transaction, which is the address of the all-chain dApp.
* `bytes32 _orderId` is the unique ID of this cross-chain transaction.
* `bytes calldata _message` is the execution logic contained in this transaction


# **Possible Examples of Omnichain dApp**

Through the MAP Protocol's omnichain interoperability infrastructure, developers can design and develop many creative and practically meaningful Omni-DApps. Here we list some possibilities.


## **Omni-DeFi**

Omnichain DeFi refers to protocols that can accept different assets from different chains to participate in economic activities by leveraging the underlying infrastructure of MAP Protocol.


## **Omni-Swap**

Omni-Swap aims to enable users to easily complete asset exchanges across different chains by creating liquidity pools on different chains along with the non-privileged role of MAP Protocol for cross-chain message transmission.


## **Omni-Loan**

Omni-Loan refers to a protocol that allows using assets of one chain as collateral and borrowing assets on another chain. This enables users' single-chain assets to easily participate in different chain's economic activities without cross-chain transfers.


## **Omni-Staking**

Omni-Staking refers to a kind of staking activity where assets of one chain participate in the staking pool of another chain without cross-chain asset exchange and earn rewards.


## **Omni-NFT**

All-chain NFTs are NFTs that can circulate between chains while maintaining all-chain uniqueness, maintaining a unified tokenID sequence across different blockchains.


## **Omni-PFP**

Omni-PFP is a unique Profile for Picture NFT that can be freely displayed and circulated across all chains. Users can burn their NFT on Chain A and choose to mint an NFT with the same tokenID on any other chain. These tokenIDs are unique across all chains.


## **Omni-DID**

Omni-DID is an all-chain ID/domain name system that allows users' Omni-DIDs to be registered and recognized across all chains. After a user registers the DID-associated address for BNB Chain in the Omni-DID registration contract on Ethereum, users on BNB Chain can transfer to the user or perform similar actions through the Omni-DID.

## BRC-20 asset liquidity

BRC-20 is an experimental standard for fungible tokens on the Bitcoin blockchain and inscribed on the Bitcoin network. MAP Protocol supports the cross-chain transfer of BRC-20 tokens from the Bitcoin network to the MAP Protocol network in a peer-to-peer manner.

This enables other cryptocurrencies on different blockchains to be traded with BRC-20 assets in a more convenient and cost-effective way, enhancing the liquidity of inscription assets. This layer of interoperability helps expand the use cases of Bitcoin and integrates the Bitcoin ecosystem into a broader crypto-based financial ecosystem, bringing new contributions to the Bitcoin community.
