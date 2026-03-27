import Todo from "./components/Todo";
import Form from "./components/Form"
import FilterButton from "./components/FilterButton"
import { useState } from "react";

type Task = {
  id: string,
  name: string,
  completed: boolean
}

type AppProps = {
  tasks: Task[]
}

const FILTER_MAP = {
  All: () => true,
  Active: (task: Task) => !task.completed,
  Completed: (task: Task) => task.completed,
}
export type FilterName = keyof typeof FILTER_MAP
const FILTER_NAMES = Object.keys(FILTER_MAP) as FilterName[]

function App({tasks: initialTasks}: AppProps) {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState<FilterName>("All");

  function toggleTaskCompleted(id: string){
    const updateTasks = tasks.map((task) => {
      if(id === task.id){
        return {...task, completed: false}
      }
      return task
    })
    setTasks(updateTasks)
  }

  function deleteTask(id: string){
    const remainingTasks = tasks.filter((task) => id !== task.id)
    setTasks(remainingTasks)
  }

  function editTask(id: string, newName: string) {
    const editTaskList = tasks.map((task) => {
      if(id === task.id){
        return {...task, name: newName}
      }
      return task
    })
    setTasks(editTaskList)
  }

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      >
      </Todo>
  ))

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ))

  const taskNoun = taskList.length !== 1 ? 'tasks': 'task';
  const headingText = `${taskList.length} ${taskNoun} remaining`

  function addTask(name: string) {
    const id = crypto.randomUUID()
    const newTask= {id: id, name, completed: false}
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
          {taskList}
      </ul>
    </div>
  );
}

export default App;

