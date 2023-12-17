function TopBar(){
    return (
        <div id="topbar"></div>
    )
}

function SideBar(){
    return (
        <div id="sidebar"></div>
    )
}

function MessagesContainer(){
    return (
        <div id="messages"></div>
    )
}

export default function MainPage(){
    return (
        <div id="main-page-container">
            <TopBar />
            <div id="main-container">
                <SideBar />
                <MessagesContainer />
            </div>
        </div>
    )
}