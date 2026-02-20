import { useState } from "react"
import type { TaskCreate, TaskPriority } from "../../types/TaskTypes"
import styles from "./TaskForm.module.css"
import { useAuth } from "../../contexts/AuthContext"

type CreateTaskFormProps = {
    onSubmit: (task: TaskCreate) => void
    closeForm: () => void
}

function CreateTaskForm({ onSubmit, closeForm }: CreateTaskFormProps) {
    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [taskPriority, setTaskPriority] = useState<TaskPriority>('low')
    const { user } = useAuth()

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        if (!user) {
            window.alert("Ussuário não autenticado")
            return
        }

        onSubmit({
            task_title: taskTitle,
            task_description: taskDescription,
            task_priority: taskPriority,
            task_status: "pending",
            task_created_by: user?.name
        })

        closeForm()
    }

    return (
        <div className={styles.background_container}>
            <form onSubmit={handleSubmit} className={styles.form_container}>

                <div className={styles.close_form_button_container}><button onClick={closeForm} className={styles.close_form_button}> X </button></div>

                <label htmlFor="title" className={styles.form_container__title_label}>Título: </label>
                <input type="text" id="title" name="title" onChange={e => setTaskTitle(e.target.value)} className={styles.form_container__title_input} />

                <br />

                <label htmlFor="description" className={styles.form_container__description_label}>Descrição: </label>

                <br />

                <textarea rows={5} id="description" name="description" maxLength={500} onChange={e => setTaskDescription(e.target.value)} className={styles.form_container__description_input} />

                <br />

                <small>{taskDescription.length} / 500</small>

                <div className={styles.label_and_select_container}>
                    <label htmlFor="priority" className={styles.form_container__select_label}>Prioridade: </label>
                    <select id="priority" name="priority" onChange={e => setTaskPriority(e.target.value as TaskPriority)} className={styles.form_container__select}>
                        <option value="low">Baixa</option>
                        <option value="medium">Média</option>
                        <option value="high">Alta</option>
                    </select>
                </div>

                <button type="submit" className={styles.form_container__button}>Criar Tarefa</button>
            </form>
        </div>
    )
}

export default CreateTaskForm