Model.message = function(exports){
    exports.config = {
        fields : [
            {name: 'storeid', type: 'number'},
            {name: 'waitnum', type: 'string'},
            {name: 'content', type: 'text'},
            {name: 'time', type: 'datetime',defaultValue: 'now()'}
        ]
    };
};
