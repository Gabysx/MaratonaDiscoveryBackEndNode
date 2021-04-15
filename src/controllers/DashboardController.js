const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
  async index(req, res) {

    const jobs = Job.get();
    const profile = await Profile.get();

    const statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length
    }
    
    // Total de horas por dia de cada job em progress
    let jobTotalHours = 0; 


    const updatedJobs = jobs.map((job) => {

      const remaining = JobUtils.remainingDays(job)
      const status = remaining <= 0 ? 'done' : 'progress'

      //status = done or progress
      // statusCount[done or progress] somar mais 1
      // Somando a quantidade de status 
      statusCount[status] += 1;

      // Total de horas por dia de cada job em progress
      jobTotalHours = status === 'progress' ? jobTotalHours + Number(job["daily-hours"]) : jobTotalHours

      /* if(status === 'progress'){
        jobTotalHours += Number(job["daily-hours"]);
      } */


      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hour"])
      }
    });

    // quantidade de horas que quero trabalhar dia menos quantidade de horas dia de cada job em progress 
    const freeHours = profile["hours-per-day"] - jobTotalHours; 


    return res.render("index", {
      jobs: updatedJobs,
      profile: profile, 
      statusCount: statusCount,
      freeHours: freeHours
     });
  }
}
