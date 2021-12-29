const express = require('express')

const AnnounceMessage = require('./models/announce')
const AnnounceService = require('../services/announceservice')
const { initKeyPair, importaddress } = require('../util')
const networks = require('../networks');


const MIN_CHANNEL_EXPIRY = 0

const router = express.Router();
const announceService = new AnnounceService(networks.regtest, MIN_CHANNEL_EXPIRY)

router.post('/', (req, res) => {
    // Express is able to catch error and send the message on its own;
    const keyPair = initKeyPair(process.env.PRIVATE_KEY)
    const pubkey = keyPair.publicKey.toString('hex')

    const announcemsg = AnnounceMessage.fromObject(req.body)
    announceService.validate(pubkey, announcemsg.redeemScript)

    // Import the address to our dogecoin node
    // It allows being notified when the tarnsaction has been included in a block
    importaddress(this.redeemScript)
        .then(function (res) {
            console.log(res)
        })

    // TODO: save to database

    return res.send()
})

module.exports = router;