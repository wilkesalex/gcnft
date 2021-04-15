import commitContract from 0xf8d6e0586b0a20c7

transaction {
  let receiverRef: &{commitContract.NFTReceiver}
  let minterRef: &commitContract.NFTMinter

  prepare(acct: AuthAccount) {
      self.receiverRef = acct.getCapability<&{commitContract.NFTReceiver}>(/public/NFTReceiver)
          .borrow()
          ?? panic("Could not borrow receiver reference")        
      
      self.minterRef = acct.borrow<&commitContract.NFTMinter>(from: /storage/NFTMinter)
          ?? panic("could not borrow minter reference")
  }

  execute {
      let metadata : {String : String} = {
          "github_username": "wilkesalex",
          "github_commit_url": "https://github.com/wilkesalex/gcnft/commit/7ae592b0836fc126c4d94154efdce09e97a32a4b", 
          "github_commit_ipfs_uri": "ipfs://QmRvaBPPnuV9YoUE4bmtsqcZopP7tnK2x4ZGWwndFLcaje"
      }
      let newNFT <- self.minterRef.mintNFT()
  
      self.receiverRef.deposit(token: <-newNFT, metadata: metadata)

      log("NFT Minted and deposited to Account 2's Collection")
  }
}