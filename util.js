Function.prototype.curry = function() {
        if (arguments.length < 1) {
                return this;
        }
        var method = this;
        var args = $.makeArray(arguments);
        return function() {
                return method.apply(this, args.concat($.makeArray(arguments)));
        };
};