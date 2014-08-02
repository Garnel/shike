Model.pushStore = function(exports){
    exports.config = {
        fields : [
            {name:'name', type:'string'},
            {name:'coordinate', type:'array'},
            {name:'description', type:'string'},
            {name:'cost_time', type:'number'},
            {name:'picture', type:'string'}
        ]
    };
};
