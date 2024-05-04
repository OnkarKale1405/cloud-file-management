
import Sidebar, { SidebarItem } from "../pages/dashboard/Sidebar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function MainComponent() {
    return (
        <div className="main-container">
            <Sidebar>
                <SidebarItem
                    icon={<FontAwesomeIcon icon="fa-solid fa-user" />}
                    text="Profile"
                    active={true}
                    alert={false}
                    to="/dashboard/profile"
                />

                <SidebarItem
                    icon={<FontAwesomeIcon icon="fa-solid fa-file" />}
                    text="Files"
                    active={false}
                    alert={true}
                    to="/dashboard/files"
                />
            </Sidebar>
        </div>
    );
}

export default MainComponent;