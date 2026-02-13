import type React from "react"
import type { Task } from "../../types/TaskTypes"
import styles from "./TaskItem.module.css"
import doneIcon from "../../assets/done_icon.png";
import undoneIcon from "../../assets/undone_icon.png";
import { format_text_to_show_only_100_characters, formatDateToBrazilian, getStatus } from "../../utils/utils";

type TaskItemProps = {
    task: Task
    onOpenCompleteForm: (task: Task) => void
    onOpenTaskDetails: (task: Task) => void
}

function TaskItem({ task, onOpenCompleteForm, onOpenTaskDetails }: TaskItemProps) {

    const isTaskDone = task.task_status === "done"

    function openCompleteForm(e: React.MouseEvent) {
        e.preventDefault()

        if (isTaskDone) return

        onOpenCompleteForm(task)
    }

    function openTaskDetails() {
        onOpenTaskDetails(task)
    }

    const { label, Styles } = getStatus(task.task_priority, styles);

    const formatedDescription = format_text_to_show_only_100_characters(task.task_description)

    return (
        <div className={styles.task_container}>
            <div className={styles.task_information_container}>
                <p className={Styles}>{label} Prioridade</p>
                <p className={styles.task_title}>{task.task_title}</p>
                <p className={styles.task_description}>{formatedDescription}</p>
                <p>Criado por: <strong className={styles.text_white_strong}>{task.task_created_by}</strong></p>
                <p>Data de criação: <strong className={styles.text_white_strong}>{formatDateToBrazilian(task.task_creation_date)}</strong></p>
                <div className={styles.task_button_container}>
                    <button onClick={openCompleteForm} className={isTaskDone ? styles.task_button_disabled : styles.task_button} disabled={isTaskDone}>{isTaskDone ? "Concluída" : "Concluir"}</button>
                    <button onClick={openTaskDetails} className={styles.task_button}> Visualizar </button>
                </div>
            </div>

            <div className={styles.task_status_container}>
                <p>Status: </p>
                <img src={task.task_status == "done" ? doneIcon : undoneIcon} alt="Status datarefa" className={styles.status_image} />
            </div>
        </div>
    )
}

export default TaskItem

