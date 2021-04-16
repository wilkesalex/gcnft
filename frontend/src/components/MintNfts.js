import React, {useState,  useEffect } from "react";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types"
import {A} from "hookrouter"

export default function MintNfts() {
    const initForm = {
      github_username: "",
      github_commit_url: "",
      github_commit_ipfs_uri: "",
      };
    const [form, setForm] = useState(initForm);
   

    const mintToken = async() => {
        console.log(form.name)
        const encoded = await fcl.send([
            // fcl.payer(fcl.authz),
            //  fcl.authorizations([fcl.authz]),
            // fcl.limit(50),
            // fcl.args([
            //     fcl.arg(form.name,t.String),
            //     fcl.arg(form.velocity,t.String),
            //     fcl.arg(form.angle,t.String),
            //     fcl.arg(form.rating,t.String),
            //     fcl.arg(form.uri,t.String)    
            //   ]),
            fcl.transaction`
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
            
        
                `,
                fcl.proposer(fcl.currentUser().authorization),      
      ]);
      await fcl.decode(encoded);
    }

    const handleChange = (e) => {
        const { value, name } = e.target;
        const fieldValue = { ...form };
        fieldValue[name] = value
        setForm(fieldValue);
      };

  return (
    <div class="leading-loose">
      <div class="mt-4">
          <A href="/githublogin" class="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded" >Authorize</A>
        </div>
      <form  class="max-w-xl m-4 p-10 bg-white rounded shadow-xl">
        <p class="text-gray-800 font-medium"> information</p>
        <div class="">
          <label class="block text-sm text-gray-00" for="github_username">Github Username</label>
          <input class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" id="github_username" name="github_username" type="text" required="" placeholder="Your Github Username" value={form.name}  onChange={handleChange} aria-label="Name"/>
        </div>
        <div class="mt-2">
          <label class="block text-sm text-gray-600" for="github_commit_url">Github Commit URL</label>
          <input class="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded" id="github_commit_url" name="github_commit_url" value={form.velocity}  onChange={handleChange} type="text" required="" placeholder="Github Commit URL" aria-label="Email"/>
        </div>
        <div class="">
          <label class="block text-sm text-gray-600" for="github_commit_ipfs_uri">IPFS URI to Github Commit Hash</label>
          <input class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="github_commit_ipfs_uri" name="github_commit_ipfs_uri" type="text" required="" placeholder="IPFS URI" value={form.uri}  onChange={handleChange} aria-label="Name"/>
        </div>
        <div class="mt-4">
          <button onClick={mintToken} class="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded" type="submit">Mint token</button>
        </div>
      </form>
    </div>
    
  );
}
