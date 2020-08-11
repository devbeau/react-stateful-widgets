import React, {useState} from 'react';

let todosArray = [];

localStorage.getItem('todoArray') !== null
    ? todosArray = JSON.parse(localStorage.getItem('todoArray'))
    : todosArray = [{id: 1, name: 'default', isChecked: false, edit:false}]


export default function Todos(){
    let [todos, setTodos] = useState(todosArray)
    

    function addRemoveButton (item){
        return (event) =>  {
            let newItem = {...item};
            let newTodos = [...todos]
            newItem.isChecked = !newItem.isChecked;
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

    function editTodo(item){
        return (event) => {
            let newItem = {...item};
            let newTodos = [...todos];
            newItem.edit = !newItem.edit;
            if (event.target.textContent === 'edit'){
                newTodos.splice(newItem.id - 1, 1, newItem);
                setTodos(updateIds(newTodos));
            } else {
                newItem.name = event.target.previousElementSibling.value;
                newTodos.splice(newItem.id - 1, 1, newItem);
                setTodos(updateIds(newTodos));
            }
        }
    }

    return (
        <div className='widget-todos container'>
            <h2>Todo App</h2>
            <div className='createTodo'>
                <input type= 'text' id= 'todoText' className='tdTextBox'></input>
                <button onClick={addTodo()} className='tdBtn'>Add Todo</button>
            </div>
            <ul>
            {
                todos.map((item) => {
                    return (
                            <li key = {item.id} id={'todo-'+item.id} className='tdListItem'>
                                <input id={'checkbox-'+item.id} className='tdCheckbox' type='checkbox' checked={item.isChecked} onChange={addRemoveButton(item)}/>
                                {
                                item.edit 
                                    ? <input className='editInput' type='text' defaultValue={item.name}></input>
                                    : item.name
                                /* li textContent or textBoxInput*/}
                                <button className='editButton' onClick={editTodo(item)}>
                                    {item.edit ? 'submit': 'edit'}
                                </button>
                                {item.isChecked && <button className ='removeBtn'onClick={removeItem(item)}>X</button>}
                            </li>
                    )
                })
            }
            </ul>
            {localStorage.setItem('todoArray', JSON.stringify(todos))}
        </div>
        
    )
}