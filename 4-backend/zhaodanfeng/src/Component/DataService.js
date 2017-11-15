const DataService = {
    getTodos: getTodos,
    setTodos: setTodos
};

const USER_ID = 'zhaodanfeng';
function getTodos() {
    return fetch('http://cloudapi.yoloke.com/rest/todo/get-todos.json',{
        method:"POST",
        body:JSON.stringify({"userId": USER_ID}),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(function(response) {
        return response.json();
    });
}

function setTodos(todosJson) {
    return fetch('http://cloudapi.yoloke.com/rest/todo/set-todos.json',{
        method:"POST",
        body:JSON.stringify({"userId": USER_ID, "todosJson": todosJson}),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(function(response) {
        return response.json();
    });
}

export default DataService;