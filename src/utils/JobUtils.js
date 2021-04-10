module.exports = { 
  remainingDays(job) {
    //ajustes no job
    //calculo de tempo restante dados
    const remaininDays = (job["total-hours"] / job["daily-hours"]).toFixed()
    
    const createdDate = new Date(job.created_at)
    const dueDay = createdDate.getDate() + Number(remaininDays)
    const dueDateInMs = createdDate.setDate(dueDay)

    const timeDiffInMs = dueDateInMs - Date.now()

    // transformar milisecondos em dias 1 dia
    const dayInMs = 1000 * 60 * 60 * 24

    const dayDiff = Math.floor(timeDiffInMs / dayInMs)

    // restam X dias
    return dayDiff
  },
  calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
}