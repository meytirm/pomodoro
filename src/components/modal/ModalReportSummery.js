import moment from "moment";

function ModalReportSummery() {
    const allDates = JSON.parse(localStorage.getItem('report'))
    const allSeconds = allDates.dates.data.reduce((total, currentNumber) => total + currentNumber, 0)
    const hours = (allSeconds / 3600).toFixed(1)

    const allDays = allDates.dates.data.length

    let dayStreak = 0

    for (let i = allDays - 1; i >= 1; i--) {
        const nowDate = moment(allDates.dates.labels[i])
        const previousDate = moment(allDates.dates.labels[(i - 1)])
        const isDayStreak = nowDate.diff(previousDate, 'days') === 1

        if (isDayStreak) {
            dayStreak++
        } else {
            break
        }
    }

    return (
        <div className="summery">
            <div className="summery__item">
                <div className="summery__icon">
                    <div className="icon-access_time"></div>
                    <div className="summery__info">{hours}</div>
                </div>
                <div className="summery__label">hours focused</div>
            </div>
            <div className="summery__item">
                <div className="summery__icon">
                    <div className="icon-calendar"></div>
                    <div className="summery__info">{allDays}</div>
                </div>
                <div className="summery__label">days accessed</div>
            </div>
            <div className="summery__item">
                <div className="summery__icon">
                    <div className="icon-local_fire_department"></div>
                    <div className="summery__info">{dayStreak}</div>
                </div>
                <div className="summery__label">day streak</div>
            </div>
        </div>
    )
}

export default ModalReportSummery