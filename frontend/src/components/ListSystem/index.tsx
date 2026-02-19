import { useEffect, useMemo, useState } from "react"
import type { FilterValues } from "../../types/FilterFormTypes"
import type { CreateTaskData, Task, TaskCreate, PaginatedResponse, CompleteTask } from "../../types/TaskTypes"
import CreateTaskForm from "../CreateTaskForm"
import FilterForm from "../FilterForm"
import TaskItem from "../TaskItem"
import styles from "./ListSystem.module.css"
import PaginationComponent from "../PaginationComponent"
import CompleteTaskForm from "../CompleteTaskForm"
import TaskDetailsModal from "../TaskDetailsModal"
import api from "../../api/axios"
import { useAuth } from "../../contexts/AuthContext"

function ListSystem() {

  const [taskList, setTaskList] = useState<Task[]>([])
  const [showCreateTaskForm, setShowCreateTaskForm] = useState<boolean>(false)
  const [showFilterForm, setShowFilterForm] = useState<boolean>(false)
  const [filterValues, setFilterValues] = useState<FilterValues>({
    priority: "all",
    status: "all",
    createdBy: "all"
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [showCompleteTaskForm, setShowCompleteTaskForm] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [showTaskDetails, setShowTaskDetails] = useState(false)
  const { user, logout } = useAuth()

  const showingCreateTaskForm = () => {
    setShowCreateTaskForm(true)
  }

  const closingCreateTaskForm = () => {
    setShowCreateTaskForm(false)
  }

  const showingFilterForm = () => {
    setShowFilterForm(true)
  }

  const closingFilterForm = () => {
    setShowFilterForm(false)
  }

  const openCompleteTaskForm = (task: Task) => {
    setSelectedTask(task)
    setShowCompleteTaskForm(true)
  }

  const closeCompleteTaskForm = () => {
    setShowCompleteTaskForm(false)
    setSelectedTask(null)
  }

  const openTaskDetails = (task: Task) => {
    setSelectedTask(task)
    setShowTaskDetails(true)
  }

  const closeTaskDetails = () => {
    setSelectedTask(null)
    setShowTaskDetails(false)
  }

  // Busca os dados da Api ao montar o componente
  useEffect(() => {
    api.get<PaginatedResponse<Task>>(`/tasks?page=${currentPage}`)
      .then(response => {
        setTaskList(response.data.tasks)
        setTotalPages(response.data.total_pages)
      })
      .catch(error => console.error("Erro ao buscar dados de tarefas", error))
  }, [currentPage])

  // Função responsável por completar uma tarefa
  const completeTask = async (data: CompleteTask) => {
    const { task_id, task_solution } = data
    try {
      await api.patch(`/tasks/${task_id}`, {
        task_status: "done",
        task_solution: task_solution
      })
      setTaskList(prev => prev.map(task =>
        task.task_id === task_id
          ? { ...task, task_status: "done", task_solution: task_solution }
          : task
      ))
    } catch (error) {
      console.error("Erro ao atualizar tarefa", error)
      throw error // Re-lança o erro para que o componente possa tratá-lo
    }
  }

  //função responsável por criar uma tarefa
  const createTask = (dados: TaskCreate) => {
    api.post<CreateTaskData>(`/tasks/`, dados)
      .then(response => setTaskList(prev => [response.data.task, ...prev]))
      .catch(error => console.error("Erro ao cadastrar tarefa", error))
  }

  // função responsável por aplicar os filtros
  const filterTasks = (filter: FilterValues) => {
    setFilterValues(filter)
  }

  // Guarda em uma váriavel uma lista já filtrada
  const filteredTasks = useMemo(() => {
    return taskList.filter(task => {

      const priorityMatch =
        filterValues.priority === "all" ||
        task.task_priority === filterValues.priority

      const statusMatch =
        filterValues.status === "all" ||
        task.task_status === filterValues.status

      const createdByMatch =
        filterValues.createdBy === "all" ||
        task.task_created_by === filterValues.createdBy

      return priorityMatch && statusMatch && createdByMatch
    })
  }, [taskList, filterValues])

  const increasePage = () => {
    setCurrentPage(currentPage + 1)
  }

  const decreasePage = () => {
    setCurrentPage(currentPage - 1)
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__container}>
          <h1 className={styles.header__title}>Bem vindo, {user?.name}</h1>
          <button className={styles.header__logout_button} onClick={logout}>Sair</button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.main__button_container}>
          <button onClick={showingCreateTaskForm} className={styles.main__add_button}>+ Nova Tarefa</button>
          <button onClick={showingFilterForm} className={styles.main__filter_button}>Filtrar</button>
        </div>

        {showCreateTaskForm && <CreateTaskForm onSubmit={createTask} closeForm={closingCreateTaskForm} />}

        {showFilterForm && <FilterForm onFilterChange={filterTasks} closeForm={closingFilterForm} />}

        {filteredTasks.map((data) => {
          return (
            <TaskItem onOpenTaskDetails={openTaskDetails} task={data} onOpenCompleteForm={openCompleteTaskForm} key={data.task_id} />
          )
        })}

        {showTaskDetails && selectedTask && (
          <TaskDetailsModal
            task={selectedTask}
            onCloseModal={closeTaskDetails}
          />
        )}

        {showCompleteTaskForm && selectedTask !== null && (
          <CompleteTaskForm
            taskId={selectedTask.task_id}
            onSubmit={completeTask}
            closeForm={closeCompleteTaskForm}
          />
        )}

        <PaginationComponent currentPage={currentPage} totalPages={totalPages} onChange={setCurrentPage} increasePage={increasePage} decreasePage={decreasePage} />
      </main>
    </>
  )
}

export default ListSystem