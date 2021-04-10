const Job = require('../model/Job');
const JobUtils = require('../utilis/JobUtilis');
const Profile = require('../model/Profile');


module.exports = {
  create(req, res) {
    return res.render("job")
  },

  save(req, res) {
    const jobs = Job.get();
    const lastId = jobs[jobs.length - 1] ? jobs[jobs.length - 1].id : 0

    // req.body = { name: 'Gabriela Candido', 'daily-hours': '5', 'total-hours': '7' }
    Job.create({
      id: lastId + 1,
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      created_at: Date.now()// atribuindo uma nova data

    });
    
    return res.redirect('/')
  },

  show(req, res) {
    const jobId = req.params.id

    const jobs = Job.get()

    const profile = Profile.get()


    const job = jobs.find(job => Number(job.id) === Number(jobId))

    if (!job) {
      return res.send('Job not found!')

    }

    job.budget = JobUtils.calculateBudget(job, profile["value-hour"])

    return res.render("job-edit", { job })
  },

  update(req, res) {
    const jobId = req.params.id

    const jobs = Job.get();


    const job = jobs.find(job => Number(job.id) === Number(jobId))

    if (!job) {
      return res.send(' Job not found!')
    }

    const updatedJob = {
      ...job,
      name: req.body.name,
      "total-hours": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"],
    }

    const newJobs = jobs.map(job => {
      if (Number(job.id) === Number(jobId)) {
        job = updatedJob
      }
      return job
    })

    Job.update(newJobs)
    res.redirect('/')
  },

  delete(req, res) {

    const jobId = req.params.id
    Job.delete(jobId)

    return res.redirect('/')

  }
}