ERC20 Token Subgraph - Balance and User Tracker
Overview
This project involves an ERC20 token subgraph that tracks token balances and user interactions. By utilizing The Graph, the subgraph allows for easy querying of token data, including real-time balance tracking for any Ethereum address holding the token.

Features
Track User Balances: Provides real-time balance tracking for all token holders.
Monitor User Interactions: Records all token transfers, enabling a historical overview of token movements.
GraphQL Queries: Leverages GraphQL to query data efficiently and retrieve details about users and token balances.
Prerequisites
Node.js and npm installed
A deployed ERC20 token smart contract
Access to The Graph protocol
Installation
Clone the repository:

git clone https://github.com/Abidoyesimze/subgraph.git
Install dependencies:

Copy code
cd subgraph
npm install
Deploy the Subgraph:

Create a subgraph on The Graph Studio or Hosted Service.
Update the subgraph's manifest (subgraph.yaml) with your ERC20 token contract address and ABI.
Deploy the subgraph:
bash
Copy code
graph deploy --node https://api.thegraph.com/deploy/your-subgraph-name
Usage
Query Token Holders: To get a list of all token holders and their balances:

graphql

{
  tokenHolders {
    id
    balance
  }
}
Query Token Transfer Events: To retrieve all transfer events:

graphql

{
  transferEvents {
    from
    to
    value
  }
}
Technologies Used
Solidity: For the ERC20 token smart contract.
The Graph: For indexing and querying blockchain data.
GraphQL: To query indexed data from the subgraph.
Hardhat: For local blockchain development and testing.
