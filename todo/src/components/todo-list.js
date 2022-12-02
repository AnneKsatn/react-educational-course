import React from "react";
import TodoListItem from "./todo-list-item";

// С большой буквы - требование реакта. Отличает наши компоненты от html тегов. С маленькой буквы - теги, с большой - наши компоненты.
const TodoList = ({todos}) => {

    const elements = todos.map((item) => {
        return (
            <li>
                <TodoListItem {...item}/>
            </li>
        )
    });

    return (
        <ul>
            { elements }
        </ul>
    )
}

export default TodoList;