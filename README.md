# gcnft
gcnft - Welcome to the *G*itHub *C*ommit *NFT* Platform


## Initial Idea
The idea of GCNFT is to create a system that allows people with github commits (i.e. people who make the commits) to covert these commits to NFTs.

* Our system will require users to authenticate with github so that we can confirm they have ownership of a given commit.
* The user can then determine which commit to be created with an NFT (i.e. select a commit from a range of commits).
* We will use IPFS as a storage system for the github commit ID (creating a simple asset, e.g. a text file with the github commit ID)
* The NFT miniting process will then be done against the IPFS asset
* The NFT will then be offered to the user for storage in a blockchain wallet
* The user will then have the ability to trade this NFT in a marketplace.





![NFTSystemMockup](https://user-images.githubusercontent.com/1847652/112325267-711db280-8cab-11eb-9b85-ffe5a96263b7.png)

## ✨ Getting started

### 1. Install the Flow CLI

Before you start, install the [Flow command-line interface (CLI)](https://docs.onflow.org/flow-cli).
The Flow CLI is a command-line interface that provides useful utilities for building Flow applications. The tool we need in this demo is Flow emulator, a local emulator of Flow blockchain.

_⚠️ This project requires `flow-cli v0.15.0` or above._

### 2. Clone the project

Clone the project
```https://github.com/wilkesalex/gcnft.git```


### 3. Starting the Services

- Start Flow emulator
Run `flow emulator start` at project root. Flow CLI uses `./flow.json` as config to start up the local Flow emulator.
The emulator provides a local access node at `http://localhost:8080`

- Deploy the contracts

```flow project deploy```

- You can execute the transactions at project root using the following commands
`flow transactions send --code ./transactions/{filename, eg:mintCommitContract}.cdc --signer emulator-account`

- Or scripts using the following command 
`flow scripts execute --code ./scripts/{filename, eg:CheckTokenMetadata}.cdc`

### 4. Setup the Github OAuth

- Open Github.
- Go to settings after clicking on your profile picture in the top-right corner.
- Click on Developer settings.
- Click on OAuth apps.
- Fill out the details accordingly.
- Copythe Client ID and Secrets and save them in a secure place.

## Starting the demo app

### 1. Go to frontend folder run the command

```npm install```

### 2. Run 

```npm start```
Server starts at `http://localhost:3000`

## Starting IPFS

1. ```npm install -g ipfs```

2. Run these commands for CORS:

```ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin "["*"]"`
```ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials "["true"]"```

3. now you can run the local IPFS server:
```jsipfs daemon```

4.now you can run 

    `npm install`
    `npm start`
then you need to take the HTTP API server address from the daemon and use this to connect to (probably just change the port)
then open the Web UI from the daemon, go back to the web page
upload a file - when you upload a file it gives you a link. check this link in local IPFS Web UI in Files -> Pins to see if it has a match. the local node will sync the file to other nodes
if you click on the node, after some time, it will work on `ipfs.io`