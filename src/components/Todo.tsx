import { useEffect, useRef, useState } from "react"


type TodoProps = {
  name: string
  completed?: boolean
  id: string
  toggleTaskCompleted: (id: string) => void
  deleteTask: (id: string) => void
  editTask: (id: string, newName: string) => void
}

function Todo({name, completed, id, toggleTaskCompleted, deleteTask, editTask}: TodoProps) {
  const [newName, setNewName] = useState("")
  const [isEditing, setEditing] = useState(false)
  const editFieldRef = useRef<HTMLInputElement>(null)
  const editButtonRef = useRef<HTMLButtonElement>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewName(e.target.value)
  }

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault()
    editTask(id, newName)
    setNewName("")
    setEditing(false)
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={id}>
          New name for {name}
        </label>
        <input id={id} className="todo-text" type="text" value={newName} onChange={handleChange} ref={editFieldRef}/>
      </div>
      <div className="btn-group">
        <button type="button" className="btn todo-cancel" onClick={() => setEditing(false)}>
          Cancel
          <span className="visually-hidden">renaming {name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {name}</span>
        </button>
      </div>
    </form>
  )
  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={id}
          type="checkbox"
          defaultChecked={completed}
          onChange={() => toggleTaskCompleted(id)}
        />
        <label className="todo-label" htmlFor={id}>
          {name}
        </label>
      </div>
      <div className="btn-group">
        <button type="button" className="btn" onClick={() => setEditing(true)} ref={editButtonRef}>
          Edit <span className="visually-hidden">{name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => deleteTask(id)}>
          Delete <span className="visually-hidden">{name}</span>
        </button>
      </div>
    </div>
  )


  const wasEditingRef = useRef(isEditing);

  useEffect(() => {
    const wasEditing = wasEditingRef.current;

    if (!wasEditing && isEditing) {
      editFieldRef.current?.focus();
    } else if (wasEditing && !isEditing) {
      editButtonRef.current?.focus();
    }

    wasEditingRef.current = isEditing;
  }, [isEditing]);

  return (
    <li className="todo">
      {isEditing ? editingTemplate : viewTemplate}
    </li>
  )}

export default Todo
