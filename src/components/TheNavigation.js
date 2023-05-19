import BaseButton from "./BaseButton";

function TheNavigation() {
    return (
        <div className="p-navigation">
            <div className="p-navigation__brand">
                <img src="/pomodoro.png" alt="pomodoro" width="30px"/>
                <span className="p-navigation__text">Pomodoro</span>
            </div>
            <div className="p-navigation__menu">
                {/*<BaseButton>Report <span className="icon-insert_chart_outlined"></span></BaseButton>*/}
                <BaseButton>Setting <span className="icon-cog"></span></BaseButton>
                {/*<BaseButton>Login <span className="icon-user-solid-circle"></span></BaseButton>*/}
            </div>
        </div>
    )
}

export default TheNavigation