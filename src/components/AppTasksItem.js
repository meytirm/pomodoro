import BaseButton from "./BaseButton";
import AppModal from "./AppModal";
import {useState} from "react";

function AppTasksItem({task}) {
    const [editModal, setEditModal] = useState(false)
    const [removeModal, setRemoveModal] = useState(false)
    return (
        <div>
            <div className="p-list__item">
                <div className="p-list__info">
                    <span className="p-list__icon p-list--done icon-checkmark2"></span>
                    <span className="p-list__title">{task.title}</span>
                </div>
                <div className="p-list__options">
                    <span className="p-list__remaining">0/{task.countOfPomodoro}</span>
                    <div className="p-list__operation">
                        <BaseButton onClick={() => setRemoveModal(true)}>
                            <span className="icon-bin"></span>
                        </BaseButton>
                        <BaseButton onClick={() => setEditModal(true)}>
                            <span className="icon-edit-pencil"></span>
                        </BaseButton>
                    </div>
                </div>
            </div>
            <AppModal value={editModal} close={() => setEditModal(false)} submit={() => alert('sub')}>
                ddd
            </AppModal>
            <AppModal
                title="Delete"
                value={removeModal}
                close={() => setRemoveModal(false)}
                submit={() => alert('sub')}>
                Are you sure to delete?
            </AppModal>
        </div>
    )
}

export default AppTasksItem