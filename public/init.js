;(function() {
    DetectOS.init(function(data) {
        window.DetectOS = data
        console.log('DetectOS OS: ' + data.OS)
        console.log('DetectOS version: ' + data.version)
    })
})()
