Array.prototype.random = function (amount) {
    
    var that = this.slice();
    var randoms = [];
    
    for (var i = 0; i < amount; i++) {
        
        var index = Math.floor(Math.random() * that.length);
        randoms.push(that[index]);
        that.splice(index, 1);
        
    }
    
    return randoms;
}