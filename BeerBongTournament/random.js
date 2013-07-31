Array.prototype.random = function (amount) {
    var randoms = [];
    for (var i = 0; i < amount; i++) {
        var index = Math.floor(Math.random() * this.length);
        randoms.push(this[index]);
        this.splice(index, 1);
    }
    return randoms;
}