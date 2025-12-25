import ProjectCard from '../components/ProjectCard'

export default function Dashboard() {
    const handleCreate = () => {

    }
    const handleJoin = () => {

    }
    return (
        <>
        <h1 className='bg-rose-50 pt-10 px-24 text-3xl text-blue-300 font-mono'>My Projects</h1>
        <div className='flex flex-col sm:flex-row justify-around bg-rose-50 py-4 px-24'>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ProjectCard title={"hackathon '25"} color={"emerald"} progress={20}/>
                <ProjectCard title={"sybau"} color={"rose"} progress={43}/>
                <ProjectCard title={"After Hours"} color={"teal"} progress={90}/>
                <ProjectCard title={"IDK lowk"} color={"amber"} progress={60}/>
                <ProjectCard title={"project 5 "} color={"fuchsia"} progress={10}/>
            </div>
            <div>
                <button className="my-4 w-full bg-teal-300 text-white py-2 rounded-3xl hover:bg-teal-400 transition-colors duration-200" onClick={handleCreate}>
                    Create a Project
                </button>
                <button className="my-2 w-full bg-rose-300 text-white py-2 rounded-3xl hover:bg-rose-400 transition-colors duration-200" onClick={handleJoin}>
                    Join a Project
                </button>
            </div>
        </div>
        </>
    );
}