import CreateProjectModal from '../components/Modals/CreateProjectModal';
import JoinProjectModal from '../components/Modals/JoinProjectModal';
import ProjectCard from '../components/ProjectCard'
import { useState } from 'react';

export default function Dashboard() {
    const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
    const [showJoinProjectModal, setShowJoinProjectModal] = useState(false);
    const handleCreateProject = () => {
        setShowCreateProjectModal(true);
    }
    const handleJoinProject = () => {
        setShowJoinProjectModal(true);
    }
    return (
        <>
            <h1 className='bg-rose-50 pt-10 px-[10%] text-3xl text-blue-300 font-mono'>My Projects</h1>
            <div className='flex flex-col-reverse sm:flex-row justify-around bg-rose-50 px-6 md:px-24'>
                <div className="py-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <ProjectCard title={"hackathon '25"} color={"emerald"} progress={20} />
                    <ProjectCard title={"sybau"} color={"rose"} progress={43} />
                    <ProjectCard title={"After Hours"} color={"teal"} progress={90} />
                    <ProjectCard title={"IDK lowk"} color={"amber"} progress={60} />
                    <ProjectCard title={"project 5 "} color={"fuchsia"} progress={10} />
                </div>
                <div>
                    <button className="my-4 w-full bg-teal-300 text-white py-2 rounded-3xl hover:bg-teal-400 transition-colors duration-200" onClick={handleCreateProject}>
                        Create a Project
                    </button>
                    <button className="my-1 w-full bg-rose-300 text-white py-2 rounded-3xl hover:bg-rose-400 transition-colors duration-200" onClick={handleJoinProject}>
                        Join a Project
                    </button>
                </div>
            </div>
            <CreateProjectModal
                isOpen={showCreateProjectModal}
                onClose={() => setShowCreateProjectModal(false)}
            />
            <JoinProjectModal
                isOpen={showJoinProjectModal}
                onClose={() => setShowJoinProjectModal(false)}
            />
        </>
    );
}