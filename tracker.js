import dgram from "dgram"
import { Buffer } from "buffer"
import { parse } from "url"

export const getPeers = (torrent, callback) => {

  const socket = dgram.createSocket("udp4")
  const url = parse(torrent.announce.toString("utf8"))

  // Send connection request to tracker
  udpSend(socket, buildConnReq(), url)

  socket.on('message', response => {
    if (respType(response) === 'connect') {
      // receive the response from tracker to connect
      const connResp = parseConnResp(response)
      // send announce request to tracker for needed files
      const annouceReq = buildAnnounceReq(connResp.connectionId)
      udpSend(socket, annouceReq, url)
    } else if (respType(response) === 'announce') {
      // parse announce resp
      const announceResp = parseAnnounceResp(response)
      // pass available peers for files to cb
      callback(announceResp.peers)
    }
  })
}

function udpSend(socket, message, rawUrl, callback = () => { }) {
  const url = parse(rawUrl);
  // Send full buffer  socket.send(message, 0, message.length, url.port, url.host, callback);
}

function respType(resp) {
  // ...
}

function buildConnReq() {
  // ...
}

function parseConnResp(resp) {
  // ...
}

function buildAnnounceReq(connId) {
  // ...
}

function parseAnnounceResp(resp) {
  // ...
}
