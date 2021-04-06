# gcnft_ipfs
 upload ipfs file

I made a new folder IPFS:

npm install node-pre-gyp -g

$ npm install ipfs

$ jsipfs daemon

> ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin "[\"*\"]"
> ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials "[\"true\"]"


After this, 

Can use the project to upload a file
Then use the webclient to see that file
After a while, the file will sync to IPFS
Then the IPFS URL will be available.

