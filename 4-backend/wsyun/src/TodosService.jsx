const TodosService = function() {
    
    this.query =  (status, callback) => {
        let param = new FormData();
        param.append("userId", global.userInfo.userId);
        
        let opts = {
            method:"POST",
            body:param
        }
        
        fetch("http://cloudapi.yoloke.com/rest/todo/get-todos.json", opts)
            .then(function(response){
                return response.text();
            })
            .then(function(responseData){
                let data = JSON.parse(responseData);

                if(data.code === "success" && data.data.isSuccess){

                    let items = JSON.parse(data.data.todos[0].todosJson);
                    if(status !== 'all'){
                        items = items.filter(e => e.status === status);
                    }

                    callback(items);
                }
                else{
                    console.log(data);
                    callback([]);
                }
            })
            .catch(function(error){

                console.log(error);
                callback([]);
            });
    }

    this.save = (data) => {
        let param = new FormData();        
        param.append("userId", global.userInfo.userId);
        param.append("todosJson", JSON.stringify(data));
        
        let opts = {
            method:"POST",
            body:param
        }

        fetch("http://cloudapi.yoloke.com/rest/todo/set-todos.json", opts)
            .then(function(response){
                return response.text();
            })
            .then(function(responseData){
                //console.log(responseData);
            })
            .catch(function(error){
                console.log(error);
            });

    }
}

export default TodosService;