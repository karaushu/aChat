navigator.webkitGetUserMedia({ video: false, audio: true }, function (stream) {
    var Peer = require('simple-peer')
    var peer = new Peer({
        initiator: location.hash === '#init',
        trickle: false,
        stream: stream
    })

    peer.on('signal', function (data) {
        document.getElementById('yourId').value = JSON.stringify(data)
    })

    document.getElementById('connect').addEventListener('click', function () {
        var otherId = JSON.parse(document.getElementById('otherId').value)
        peer.signal(otherId)
    })


    peer.on('stream', function (stream) {
        var audio = document.createElement('audio')
        document.body.appendChild(audio)

        audio.src = window.URL.createObjectURL(stream)
        audio.play()
    })
}, function (err) {
    console.error(err)
})