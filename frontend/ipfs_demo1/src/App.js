/* eslint-disable no-console */
'use strict'

const React = require('react')
const ipfsClient = require('ipfs-http-client')

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      added_file_hash: null
    }

    // bind methods
    this.captureFile = this.captureFile.bind(this)
    this.saveToIpfs = this.saveToIpfs.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.connect = this.connect.bind(this)
    this.multiaddr = React.createRef()
  }

  captureFile (event) {
    event.stopPropagation()
    event.preventDefault()
    if (document.getElementById('keep-filename').checked) {
      this.saveToIpfsWithFilename(event.target.files)
    } else {
      this.saveToIpfs(event.target.files)
    }
  }

  // Example #1
  // Add file to IPFS and return a CID
  async saveToIpfs ([ file ]) {
    try {
      const added = await this.state.ipfs.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      console.log(added)
      this.setState({ added_file_hash: added.cid.toString() })
    } catch (err) {
      console.error(err)
    }
  }

  // Example #2
  // Add file to IPFS and wrap it in a directory to keep the original filename
  async saveToIpfsWithFilename ([ file ]) {
    const fileDetails = {
      path: file.name,
      content: file
    }
    const options = {
      wrapWithDirectory: true,
      progress: (prog) => console.log(`received: ${prog}`)
    }

    try {
      const added = await this.state.ipfs.add(fileDetails, options)
      console.log(added)
      this.setState({ added_file_hash: added.cid.toString() })
    } catch (err) {
      console.error(err)
    }
  }

  handleSubmit (event) {
    event.preventDefault()
  }

  async connect () {
    this.setState({
      ipfs: ipfsClient(this.multiaddr.current.value)
    })
  }

  

  render () {
    if (this.state.ipfs) {
      return (
        <div style={{ textAlign: 'center' }}>

<form>
<div class="form-group">
    <label for="exampleFormControlSelect1">Example select</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>github-hash-1</option>
      <option>github-hash-2</option>
      <option>github-hash-3</option>
      <option>github-hash-4</option>
      <option>github-hash-5</option>
    </select>
  </div>
</form>
            <hr/>
          <form id='capture-media' onSubmit={this.handleSubmit}>
            <input type='file' name='input-file' id='input-file' onChange={this.captureFile} /><br/>
          </form>
          <div>
            <a id="gateway-link" target='_blank'
              href={'https://ipfs.io/ipfs/' + this.state.added_file_hash}>
              {this.state.added_file_hash}
            </a>
          </div>
        </div>
      )
    }

    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Welcome to Github Commit NFT</h1>
        <h2>In this page of the app you can upload your github commit hash to IPFS</h2>
        <br/><br/>
        <form>
          <input id="connect-input" type="text" defaultValue="/ip4/127.0.0.1/tcp/5001" ref={this.multiaddr} />
          <input id="connect-submit" type="button" value="Connect" onClick={this.connect} />
        </form>
      </div>
    )
  }
}
module.exports = App