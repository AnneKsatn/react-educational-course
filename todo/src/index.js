
// Импорт убирать нельзя. Когда бейбл преобразует наш код из JSX в обычный, он добавляет вызовы библиотеки React
import React from 'react'

// Библиотека, которая преобразует виртаульный DOM в реальный
import ReactDom from 'react-dom'
import AppHeader from './components/app-header'
import TodoList from './components/todo-list'
import SearchPanel from './components/search-panel'


const Theory = () => {
    return (
        <div>
            <p>Блок JSX - кода возвращает / создает реакт элемент так как после обработки с помощью бейбл он превращается в функцию React.createElement(...), поэтому корнем фрагмента должен быть один элемент </p>
            <p> в "{ }" можно использовать элементы, числа, строки и т.д. Другие объекты нельзя</p>
            <p> "{ }" можно использовать для передачи атрибутов</p>
        </div>
    )
}

const App = () => {

    const todoData = [
        {
            label: "Drink Coffee",
            important: false
        },
        {
            label: "To do React App",
            important: true
        },
        {
            label: "Have a lunch",
            important: false
        }
    ]

    return (
        <div>
            <AppHeader />
            <SearchPanel />
            <TodoList todos={todoData}/>
            <Theory />
        </div>
    )
}

// const el = React.createElement('h1', null, 'Hello world')

// Первым элементов принимает REACT ЭЛЕМЕНТ, не КОМПОНЕНТ.
ReactDom.render(<App />, document.getElementById('root'))