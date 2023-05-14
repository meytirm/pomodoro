import BaseButton from "./BaseButton";
import {useEffect, useState, useRef} from "react";

function AppTasksHeader() {
    const [optionIsOpen, setOptionIsOpen] = useState(false)
    const dropdownRef = useRef()
    const buttonActiveClass = optionIsOpen ? 'p-button--active' : ''

    const menuIsOpen = optionIsOpen ? <ul className="p-dropdown__menu">
        <li className="p-dropdown__item">hello</li>
        <li className="p-dropdown__item">hello</li>
        <li className="p-dropdown__item">hello</li>
    </ul> : ''

    useEffect(() => {
        let handler = (e) => {
            if (!dropdownRef.current.contains(e.target)) {
                setOptionIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handler)

        return () => {
            document.addEventListener('mousedown', handler)
        }
    })
    return (
        <div className="task-header">
            <h4>Tasks</h4>
            <div className="p-dropdown" ref={dropdownRef}>
                <BaseButton onClick={() => setOptionIsOpen(!optionIsOpen)} active={optionIsOpen} className={buttonActiveClass}>
                    <span className="icon-cog"></span>
                </BaseButton>
                {menuIsOpen}
            </div>
        </div>
    )
}

export default AppTasksHeader