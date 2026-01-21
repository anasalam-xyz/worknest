import { Cog8ToothIcon } from "@heroicons/react/24/solid";
import { UserIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import TaskCard from "../components/TaskCard";
import CreateTaskModal from "../components/Modals/CreateTaskModal";
import { useState, useEffect } from "react";
import { useAuth } from '../context/AuthContext'
import { useParams } from "react-router-dom";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import EditProjectModal from "../components/Modals/EditProjectModal";

export default function Project() {
    const [showEditProjectModal, setShowEditProjectModal] = useState(false);
    const [showCreateTask, setShowCreateTask] = useState(false);
    const navigate = useNavigate();
    const { projectId } = useParams();
    const [project, setProject] = useState([]);
    const [tasks, setTasks] = useState([]);
    const { owner, members } = project;
    useEffect(() => {
        fetchProject();
        fetchTasks();
    }, [projectId]);

    const { user } = useAuth();
    const isOwner =
        user && project &&
        (
            project.owner?._id === user._id ||
            project.owner === user._id
        );

    const fetchProject = async () => {
        try {
            const res = await API.get(`/projects/${projectId}`);
            setProject(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchTasks = async () => {
        try {
            const res = await API.get(`/tasks/project/${projectId}`);
            setTasks(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handlePrevPage = () => {
        navigate('/dashboard');
    }

    const handleEditProject = () => {
        setShowEditProjectModal(true);
    }
    const handleDeleteProject = async () => {
        try {
            await API.delete(`/projects/${projectId}`);
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
        }
    }
    const priorityColors = {
        lowest: "green",
        low: "yellow",
        medium: "amber",
        high: "orange",
        urgent: "red",
        critical: "purple"
    }
    const groupedTasks = {
        "pending": [],
        "in_progress": [],
        "completed": []
    }
    tasks.forEach(task => {
        groupedTasks[task.status].push(task);
    });
    return (
        <div className="min-h-screen bg-rose-50 py-8 px-[8%]">
            <EditProjectModal
                isOpen={showEditProjectModal}
                onClose={() => setShowEditProjectModal(false)}
                project={project}
                fetchProject={fetchProject}
            />
            <CreateTaskModal
                isOpen={showCreateTask}
                onClose={() => setShowCreateTask(false)}
                project={project}
                refreshTasks={fetchTasks}
            />
            <div className="flex flex-col sm:flex-row justify-between">
                <div className="sm:w-[28%] flex flex-row justify-between">
                    <div className="w-full bg-rose-50 flex flex-row justify-between">
                        <ArrowLeftIcon className="mt-2 mx-2 size-6 text-blue-300 hover:text-blue-400" onClick={handlePrevPage} />
                        <h2 className='w-full bg-rose-50 text-3xl text-gray-600 font-sans'>{project.name}</h2>
                    </div>
                    <div className="flex flex-row p-2 hover:bg-blue-50 rounded-full">
                        {isOwner && (<Cog8ToothIcon className="size-6 text-blue-300 hover:text-blue-400" onClick={handleEditProject} />)}
                        <TrashIcon className="mx-2 size-6 text-blue-300 hover:text-blue-400" onClick={handleDeleteProject} />
                    </div>
                </div>
                <button className="my-2 sm:my-0 w-full sm:w-32 bg-blue-400 text-white py-2 rounded-3xl hover:bg-blue-500 transition-colors duration-200" onClick={() => { setShowCreateTask(true) }}>Create Task</button>
            </div>
            <div className="py-8 flex flex-col sm:flex-row-reverse justify-between">
                <div className="w-full px-4 flex flex-col sm:flex-row justify-evenly">
                    <div className="px-2">
                        <h3 className="font-semibold">To Do</h3>
                        {groupedTasks["pending"].map((task) => (
                            <TaskCard key={task._id} task={task} owner={owner} members={members} setShowCreateTask={setShowCreateTask} taskid={task._id} fetchTasks={fetchTasks} title={task.title} user={task.assignedTo.username} color={priorityColors[task.priority]} />
                        ))}
                    </div>
                    <div className="px-2">
                        <h3 className="font-semibold">In Progress</h3>
                        {groupedTasks["in_progress"].map((task) => (
                            <TaskCard key={task._id} task={task} owner={owner} members={members} setShowCreateTask={setShowCreateTask} taskid={task._id} fetchTasks={fetchTasks} title={task.title} user={task.assignedTo.username} color={priorityColors[task.priority]} />
                        ))}
                    </div>
                    <div className="px-2">
                        <h3 className="font-semibold">Completed</h3>
                        {groupedTasks["completed"].map((task) => (
                            <TaskCard key={task._id} task={task} owner={owner} members={members} setShowCreateTask={setShowCreateTask} taskid={task._id} fetchTasks={fetchTasks} title={task.title} user={task.assignedTo.username} color={priorityColors[task.priority]} />
                        ))}
                    </div>
                </div>
                <div className="p-2 md:pr-4 sm:w-[30%] md:border-r md:border-slate-400">
                    <h2 className="text-xl">Project Info</h2>
                    <h3 className="mt-4 text-lg font-semibold">Notes</h3>
                    <p className="pl-4 md:pl-0 mt-2 font-sans">{project.description}</p>
                    <h3 className="mt-4 text-lg font-semibold">Members</h3>
                    <ul>
                        {owner && <li className="m-2 flex flex-row"><div className="rounded-full h-8 w-8 bg-pink-100 flex items-center justify-center text-gray-700 font-semibold">
                            <UserIcon className="size-6 text-blue-300" />
                        </div>{owner.username}</li>}
                        {members && members.map((member) => (<li className="m-2 flex flex-row"><div className="rounded-full h-8 w-8 bg-pink-100 flex items-center justify-center text-gray-700 font-semibold">
                            <UserIcon key={member._id} className="size-6 text-blue-300" />
                        </div>{member.username}</li>))}
                    </ul>
                </div>
            </div>
        </div>
    );
}