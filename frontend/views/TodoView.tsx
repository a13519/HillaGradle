import {useEffect, useState} from "react";
import Todo from "Frontend/generated/com/example/application/Todo";
import {TodoEndpoint} from "Frontend/generated/endpoints";
import {TextField} from "@hilla/react-components/TextField.js";
import {Button} from "@hilla/react-components/Button.js";
import {Checkbox} from "@hilla/react-components/Checkbox";

export function TodoView() {

    const [todos, setTodos] = useState<Todo[]>([]);
    const [task, setTask] = useState('');

    useEffect(()=> {
        TodoEndpoint.findAll().then(setTodos);
    }, [])

    async function addTodo() {
        const saved = await TodoEndpoint.add(task);
        if (saved) {
            setTodos([...todos, saved]);
            setTask('');
        }
    }

    return (
        <div>
            <h1>Hilla cool todo!</h1>

            <div className={"flex gap-s"}>
                <TextField value={task} onChange={e=> setTask(e.target.value)}/>
                <Button theme="primary" onClick={addTodo}>Add</Button>
            </div>

            {todos.map(todo=>(
                <div key={todo.id}>
                    <Checkbox checked = {todo.done}/>
                    <span> {todo.task}</span>
                </div>
            ))}
        </div>
    );

}