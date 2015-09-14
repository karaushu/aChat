/**
 * Created by Andrew Karaushu
 * budo -browserify сервер,
 * позволяет получать ваши скрипты и обрабатывать их быстро в локальной среде.
 */

//сделать и для других браузеров
navigator.webkitGetUserMedia({ video: false, audio: true }, function (stream) {
    var Peer = require('simple-peer');
    var peer = new Peer({
        initiator: location.hash === '#caller',
        trickle: false,
        stream: stream
    });

    peer.on('signal', function (data) {
        document.getElementById('myID').value = JSON.stringify(data);
    });

    document.getElementById('connect').addEventListener('click', function () {
        var secondID = JSON.parse(document.getElementById('secondID').value);
        peer.signal(secondID);
    });


    peer.on('stream', function (stream) {
        var audio = document.createElement('audio');
        document.body.appendChild(audio);

        audio.src = window.URL.createObjectURL(stream);
        audio.play()
    })
}, function (err) {
    console.error(err)
});
