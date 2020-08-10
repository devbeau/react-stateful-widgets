import React, {useState} from 'react';
import { array } from 'prop-types';

let todosArray = []

function setId(arr){
    return arr.length + 1
}

todosArray.push({   
        id: setId(todosArray),
        name: 'example',
        isChecked: false,
    });
todosArray.push({ 
        id: setId(todosArray),  
        name: 'example 2',
        isChecked: false,
    });
todosArray.push({
        id: setId(todosArray), 
        name: 'example 3',
        isChecked: false,
    });


// function newKey(){
//     return todosArray.length + 1;
// }

export default function Todos(){
    let [todos, setTodos] = useState(todosArray)
    // let [checkedTodo, setCheckedTodo] = useState

function addRemoveButton (item){
    return (event) =>  {
        let newItem = {...item};
        let newTodos = [...todos]
        newItem.isChecked = !newItem.isChecked;
        console.log(item, newItem);
        newItem.id = 
        newTodos[item.id - 1] =  newItem;
        event.stopPropagation();
        setTodos(updateIds(newTodos));
    }
}

function updateIds(todos){
    let newTodos = [...todos];
    return newTodos.map((item, ind) => {
        item.id = ind + 1;
        return item;
    })

}

function removeItem(item){
    return (event) => {
        event.stopPropagation();
        let newTodos = [...todos];
        newTodos.splice(item.id - 1, 1);
        setTodos(updateIds(newTodos));
    }
}

function addTodo(){
    return (event) => {
        let textBox = document.querySelector('#todoText');
        let newTodos = [...todos];
        let newItem = {name: textBox.value, isChecked: false, id: newTodos.length};
        newTodos[newTodos.length] = newItem;
        setTodos(updateIds(newTodos));
    }
}

    return (
        <div className='container'>
            <div>
                <input type= 'text' id= 'todoText'></input>
                <button onClick={addTodo()}>Add Todo</button>
            </div>
            {console.log(todos)}
            <ul>
            {
            todos.map((item) => {
                return (
                        <li key = {item.id} id={'todo-'+item.id}>{item.name}
                            <input id={'checkbox-'+item.id} type='checkbox' checked={item.isChecked} onChange={addRemoveButton(item)}></input>
                            {item.isChecked && <button onClick={removeItem(item)}>X</button>}
                        </li>
                )
            }
            )
            }
            </ul>
        </div>
    )
}