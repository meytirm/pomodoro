import moment from "moment/moment";

function reportData(tab) {
  const report = JSON.parse(localStorage.getItem('report'))
  const today = moment().format('YYYY-MM-DD')
  if (report.dates.labels[report.dates.labels.length - 1] !== today) {
    report.dates.labels.push(today)
    report.dates.data.push(0)
  }
  if (tab.name === 'pomodoro') {
    console.log(report.dates.data[report.dates.labels.length - 1])
    report.dates.data[report.dates.labels.length - 1] += 1
    localStorage.setItem('report', JSON.stringify(report))
  }
}

export default reportData