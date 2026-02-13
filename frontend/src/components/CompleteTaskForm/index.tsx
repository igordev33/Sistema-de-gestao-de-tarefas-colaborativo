import React, { useState } from "react"
import type { CompleteTask } from "../../types/TaskTypes"
import styles from "./CompleteTaskForm.module.css"

type CompleteTaskFormProps = {
    taskId: number
    onSubmit: (data: CompleteTask) => Promise<void>
    closeForm: () => void
}

const CompleteTaskForm = ({ taskId, onSubmit, closeForm }: CompleteTaskFormProps) => {
    const [taskSolution, setTaskSolution] = useState<string>("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setIsSubmitting(true)

        const payload: CompleteTask = {
            task_id: taskId,
            task_solution: taskSolution
        }

        try {
            await onSubmit(payload)
            closeForm()
        } catch (error) {
            console.error("Erro ao concluir tarefa:", error)
            setIsSubmitting(false)
        }
    }

    return (
        <div className={styles.background_container}>
            <form onSubmit={handleSubmit} className={styles.form_container}>
                <div className={styles.close_form_button_container}>
                    <button onClick={closeForm} className={styles.close_form_button} disabled={isSubmitting}> X </button>
                </div>
                <p className={styles.form_text}>Descreva em detalhes a resolução adotada para está tarefa: </p>
                <textarea onChange={(e) => setTaskSolution(e.target.value)} maxLength={500} className={styles.form_solution_textarea} disabled={isSubmitting}></textarea>
                <br />
                <small>{taskSolution.length} / 500</small>
                <br />
                <button type="submit" className={styles.form_complete_button} disabled={isSubmitting}>
                    {isSubmitting ? "Concluindo..." : "Concluir Tarefa"}
                </button>
            </form>
        </div>
    )
}

export default CompleteTaskForm