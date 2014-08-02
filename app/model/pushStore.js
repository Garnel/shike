Model.pushStore = function(exports){
    exports.config = {
        fields : [
            {name:'id', type:'number'},
            {name:'name', type:'string'},
            {name:'type', type:'string'},
            {name:'coordinate', type:'array'},
            {name:'description', type:'string'},
            {name:'cost_time', type:'number'},
            {name:'picture', type:'string'}
        ]
    };
};
