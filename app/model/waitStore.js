Model.waitStore = function(exports){
    exports.config = {
        fields : [
            {name:'id', type:'number'},
            {name:'name', type:'string'},
            {name:'type', type:'string'},
            {name:'coordinate', type:'array'},
            {name:'description', type:'string'},
            {name:'num_perhour', type:'number'},
            {name:'waiting_queue', type:'array'},
            {name:'picture', type:'string'}
        ]
    };
};
