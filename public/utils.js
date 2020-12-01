var DetectOS = {
    init: function (cb) {
        var userAgent = navigator.userAgent || navigator.appVersion;
        var properties = userAgent.split(',');
        var obj = {};

        properties.forEach(function(property) {
            var tup = property.split(':');
            obj[tup[0]] = tup[1];
        });

        this.OS = obj.os ? obj.os.toLowerCase() : obj.os;
        this.version = obj.version;
        cb(this);
    }
};