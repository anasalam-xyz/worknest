import API from '../api/axios';
import CreateProjectModal from '../components/Modals/CreateProjectModal';
import JoinProjectModal from '../components/Modals/JoinProjectModal';
import ProjectCard from '../components/ProjectCard'
import { useState, useEffect } from 'react';

export default function Dashboard() {

    const [projects, setProjects] = useState([]);
    const getUserProjects = async () => {
        try {
            const res = await API.get("/projects");
            setProjects(res.data);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        getUserProjects();
    }, []);
    const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
    const [showJoinProjectModal, setShowJoinProjectModal] = useState(false);
    const handleCreateProject = () => {
        setShowCreateProjectModal(true);
    }
    const handleJoinProject = () => {
        setShowJoinProjectModal(true);
    }

    return (
        <div className='min-h-screen bg-rose-50'>
            <h1 className='pt-10 px-[10%] text-3xl text-blue-300 font-mono'>My Projects</h1>
            <div className='flex flex-col-reverse sm:flex-row justify-around bg-rose-50 px-6 md:px-24'>
                <div className="py-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {projects && projects.map((project) => {
                        return (<ProjectCard
                            key={project._id}
                            project={project}
                        />);
                    }
                    )}
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
                refreshProjects={getUserProjects}
            />
            <JoinProjectModal
                isOpen={showJoinProjectModal}
                onClose={() => setShowJoinProjectModal(false)}
                refreshProjects={getUserProjects}
            />
        </div>
    );
}