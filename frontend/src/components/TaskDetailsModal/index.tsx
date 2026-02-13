import type { Task } from "../../types/TaskTypes"
import { formatDateToBrazilian, getStatus } from "../../utils/utils"
import styles from "./TaskDetailsModal.module.css"

type TaskDetailsModalProps = {
    task: Task
    onCloseModal: () => void
}

const TaskDetailsModal = ({task, onCloseModal}: TaskDetailsModalProps) => {

    const {label, Styles} = getStatus(task.task_priority, styles)

    const closeModal = () => {
        onCloseModal()
    }

    const creationDate = formatDateToBrazilian(task.task_creation_date)

    return (
        <div className={styles.background_container}>
            <div className={styles.task_container}>
                <div className={styles.close_modal_button_container}><button className={styles.close_modal_button} onClick={closeModal}> X </button></div>
                <p className={Styles}>{label} Prioridade</p>
                <h2 className={styles.task_title}>{task.task_title}</h2>
                <p className={styles.task_created_by}>Criado por: <strong className={styles.text_strong}>{task.task_created_by}</strong></p>
                <p className={styles.task_creation_date}>Data de criação: <strong className={styles.text_strong}>{creationDate}</strong></p>
                <p className={styles.task_description_label}>Descrição da tarefa:</p>
                <div className={styles.task_description_container}>
                    <p className={styles.task_description}>{task.task_description}</p>
                </div>
                <p className={styles.task_solution_label}>Resolução da tarefa</p>
                <div className={styles.task_solution_container}>
                    <p className={styles.task_solution}>{task.task_solution}</p>
                </div>
            </div>
        </div>
    )
}

export default TaskDetailsModal