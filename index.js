"use strict"
import fs from "fs"
import bencode from "bencode"
import dgram from "dgram"
import { Buffer } from "buffer"
import { parse } from "url"

// Read torrent file from file
const torrent = bencode.decode(fs.readFileSync("puppy.torrent"))
// parse the tracker url from the decoded torrent
const url = parse(torrent.announce.toString("utf8"))
// Create socket object for network communication, use ipv4
const socket = dgram.createSocket("udp4")
// Message must be in form of buffer to work, we can create buffer from a string
const myMsg = Buffer.from("hello", "utf8")
// Send message over socket, we are sending the entire buffer so no need for offset
socket.send(myMsg, 0, myMsg.length, url.port, url.host, () => { })
// Listen for the on event and send message
socket.on('message', msg => {
  console.log('message is', msg)
})
