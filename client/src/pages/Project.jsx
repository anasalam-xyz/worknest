import { Cog8ToothIcon } from "@heroicons/react/24/solid";
import { UserIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";
import TaskCard from "../components/TaskCard";
import CreateTaskModal from "../components/Modals/CreateTaskModal";
import { useState } from "react";
import CreateProjectModal from "../components/Modals/CreateProjectModal";

export default function Project() {
    const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
    const [showCreateTask, setShowCreateTask] = useState(false);
    const handleEditProject = (e) => {
        setShowCreateProjectModal(true);
    };
    const handleDeleteProject = (e) => {

    }
    return (
        <div className="bg-rose-50 py-8 px-[10%]">
            <CreateProjectModal
                isOpen={showCreateProjectModal}
                onClose={() => setShowCreateProjectModal(false)}
            />
            <CreateTaskModal
                isOpen={showCreateTask}
                onClose={() => setShowCreateTask(false)} />
            <div className="flex flex-col sm:flex-row justify-between">
                <div className="sm:w-[24%] flex flex-row justify-between">
                    <h2 className='w-full bg-rose-50 text-3xl text-gray-600 font-sans'>Prototype X</h2>
                    <div className="flex flex-row p-2 hover:bg-blue-50 rounded-full">
                        <Cog8ToothIcon className="size-6 text-blue-300 hover:text-blue-400" onClick={handleEditProject} />
                        <TrashIcon className="mx-2 size-6 text-blue-300 hover:text-blue-400" onClick={handleDeleteProject} />
                    </div>
                </div>
                <button className="my-2 sm:my-0 w-full sm:w-32 bg-blue-400 text-white py-2 rounded-3xl hover:bg-blue-500 transition-colors duration-200" onClick={() => { setShowCreateTask(true) }}>Create Task</button>
            </div>
            <div className="py-8 flex flex-col sm:flex-row-reverse justify-between">
                <div className="w-full flex flex-col sm:flex-row justify-evenly">
                    <div>
                        <h3 className="font-semibold">To Do</h3>
                        <TaskCard title="Fix login bug" user="Aanya" color="emerald" />
                        <TaskCard title="Final Design dashboard" user="Rohit" color="teal" />
                        <TaskCard title="Deploy backend in render" user="Mehul" color="amber" />
                        <TaskCard title="Deploy backend" user="Mehul" color="fuchsia" />
                    </div>
                    <div>
                        <h3 className="font-semibold">In Progress</h3>
                        <TaskCard title="Fix login bug" user="Aanya" color="emerald" />
                        <TaskCard title="Design dashboard" user="Rohit" color="rose" />
                        <TaskCard title="Design dashboard" user="Rohit" color="emerald" />
                        <TaskCard title="Design dashboard" user="Rohit" color="teal" />
                        <TaskCard title="Deploy backend" user="Mehul" color="amber" />
                    </div>
                    <div>
                        <h3 className="font-semibold">Completed</h3>
                        <TaskCard title="Fix login bug" user="Aanya" color="emerald" />
                        <TaskCard title="Design dashboard" user="Rohit" color="teal" />
                        <TaskCard title="Deploy backend" user="Mehul" color="fuchsia" />
                    </div>
                </div>
                <div className="md:pr-4 sm:w-[30%] md:border-r md:border-slate-400">
                    <h2 className="text-xl">Project Info</h2>
                    <h3 className="mt-4 text-lg font-semibold">Notes</h3>
                    <p className="pl-4 md:pl-0 mt-2 font-sans">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum sit illum autem quia ullam, voluptatem quos ratione doloribus expedita labore minima unde ipsum molestiae numquam nemo eum cupiditate officia obcaecati.</p>
                    <h3 className="mt-4 text-lg font-semibold">Members</h3>
                    <ul>
                        <li className="m-2 flex flex-row"><div className="rounded-full h-8 w-8 bg-pink-100 flex items-center justify-center text-gray-700 font-semibold">
                            <UserIcon className="size-6 text-blue-300" />
                        </div>Alice</li>
                        <li className="m-2 flex flex-row"><div className="rounded-full h-8 w-8 bg-pink-100 flex items-center justify-center text-gray-700 font-semibold">
                            <UserIcon className="size-6 text-blue-300" />
                        </div>Bob</li>
                        <li className="m-2 flex flex-row"><div className="rounded-full h-8 w-8 bg-pink-100 flex items-center justify-center text-gray-700 font-semibold">
                            <UserIcon className="size-6 text-blue-300" />
                        </div>Smith</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}