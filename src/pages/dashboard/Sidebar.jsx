import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react"
import { useContext, createContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import useLogout from "../../hooks/useLogout"

const SidebarContext = createContext()

export default function Sidebar({ children }) {
    const [expanded, setExpanded] = useState(true);
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate("/Landing");

    }
    const {auth} = useAuth();

    const HandleHomeClick=()=>{
        navigate('/');
    }


    return (
        <aside className="h-screen">
            <nav className="h-full flex flex-col bg-white border-r shadow-sm relative">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <img
                        src="https://img.logoipsum.com/243.svg"
                        className={`overflow-hidden transition-all cursor-pointer ${expanded ? "w-32" : "w-0"
                            }`} onClick={()=>HandleHomeClick()}
                        alt=""
                    />
                    <button
                        onClick={() => setExpanded((curr) => !curr)}
                        className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
                    >
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </button>
                </div>

                <SidebarContext.Provider value={{ expanded }}>
                    <ul className="flex-1 px-3">{children}</ul>
                </SidebarContext.Provider>

                <div className="border-t border-b flex px-3 py-5 absolute bottom-12">
                    <img
                        src={auth.avatar}
                        alt=""
                        className="w-10 h-10 rounded-full"
                    />
                    <div
                        className={`
                            flex justify-between items-center
                            overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
                        `}
                    >
                        <div className="leading-4">
                            <h4 className="font-semibold">{auth.username}</h4>
                            <span className="text-xs text-gray-600">{auth.email}</span>
                        </div>
                        <MoreVertical size={20} />
                    </div>
                </div>
            </nav>
        </aside>
    )
}

export function SidebarItem({ icon, text, active, alert, to }) {
    const { expanded } = useContext(SidebarContext);

    return (
        <li>
            <Link to={to}
                className={`
                relative flex items-center py-2 px-3 my-1
                font-medium rounded-md cursor-pointer
                transition-colors group
                ${active
                        ? "bg-indigo-200 text-indigo-800"
                        : "hover:bg-indigo-200 text-gray-600"
                    }
            `}>
                {icon}
                <span
                    className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}
                >
                    {text}
                </span>
                {alert && (
                    <div
                        className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`}
                    />
                )}

                {!expanded && (
                    <div
                        className={`
                            absolute left-full rounded-md px-2 py-1 ml-6
                            bg-indigo-100 text-indigo-800 text-sm
                            invisible opacity-20 -translate-x-3 transition-all
                            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                        `}
                    >
                        {text}
                    </div>
                )}
            </Link>
        </li>
    )
}
