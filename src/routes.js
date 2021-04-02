// Biblioteca para criar o servidor
const express = require("express");

// Conexão como pacote de rotes 
const routes = express.Router()

//variavel base para as rotas 
const views = __dirname + "/views/";

//objeto do avatar/ usuarios
const profile = {
 data: {
  name: "Gabysx",
  avatar: "https://github.com/gabysx.png",
  "monthly-budget": 3000,
  "hours-per-day": 5, 
  "days-per-week": 5,
  "vacation-per-year": 4,
  "value-hour": 55,
 },

 controllers: {
   index(req, res) {
    return res.render(views + "profile", { profile: profile.data })
   },

   update(req, res) {

    // req.body para pegar os dados 
    const data = req.body

    // definir quantas semanas tem um ano = 52
    const weeksPerYear = 52

    // remover as semanas de férias do ano, para pegar quantas semanas tem em um mês 
    const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12

    // quantas horas por semana estou trabalhando
    const weekTotalHours = data["hours-per-day"] * data["days-per-week"]

    // Total de horas trabalhadas no mes 
    const monthlyTotalHours = weekTotalHours * weeksPerMonth

    //Qual vai ser o valor da minha hora 
    const valueHour = data["monthly-budget"] / monthlyTotalHours

    profile.data = {
      ...profile.data,
      ...req.body,
      "value-hour": valueHour,
    }

    return res.redirect('/profile')
   }
 }
}

const Job = {
  // referencia de como os dados ficariam como objetos no array { name: 'Gabriela Candido', 'daily-hours': '5', 'total-hours': '7' }
  data: [
    {
      id:1,
      name:"Pizzaria Guloso",
      "daily-hours": 2,
      "total-hours": 60,
      created_at: Date.now(),
    },
    {
      id:2,
      name:"OneTwo Project",
      "daily-hours": 3,
      "total-hours": 47,
      created_at: Date.now(),
    },
  ],
  controllers: {
    index(req, res) {
        const updatedJobs = Job.data.map((job) => {
          
          const remaining = Job.services.remainingDays(job)
          const status = remaining <= 0 ? 'done' : 'progress'
        
          return {
            ...job,
            remaining,
            status,
            budget: Job.services.calculateBudget(job, profile.data["value-hour"])
          }
        })

        return res.render(views + "index", { jobs: updatedJobs });

    },

    create(req, res) {
      return res.render(views + "job")
    },

    save(req, res) { 
        const lastId = Job.data[Job.data.length - 1] ? Job.data[Job.data.length - 1].id : 0 

       // req.body = { name: 'Gabriela Candido', 'daily-hours': '5', 'total-hours': '7' }
        Job.data.push({
          id:lastId + 1,
          name: req.body.name,
          "daily-hours": req.body["daily-hours"],
          "total-hours": req.body["total-hours"],
          created_at: Date.now()// atribuindo uma nova data
      
        }) 
         return res.redirect('/')
    },

    show(req, res) {
        const jobId = req.params.id
    
        const job = Job.data.find(job => Number(job.id) === Number(jobId))
    
        if (!job) {
          return res.send('Job not found!')
    
        }

        job.budget = Job.services.calculateBudget(job, profile.data["value-hour"])
    
        return res.render(views + "job-edit", { job })
    },

    update(req, res) {
      const jobId  = req.params.id

      const job = Job.data.find(job => Number(job.id) === Number(jobId))

      if(!job) {
        return res.send(' Job not found!')
      }

      const updatedJob = {
        ...job, 
        name: req.body.name,
        "total-hours": req.body["total-hours"],
        "daily-hours": req.body["daily-hours"],
      }

      Job.data = Job.data.map( job => {
        if( Number(job.id) === Number(jobId)){
          job = updatedJob
        }
        return job
      })

      res.redirect('/')
    },

    delete(req, res) {
      const jobId = req.params.id

      Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))

      return res.redirect('/')

    }
  },
  services: { 
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
  },
}

//request(req), response
routes.get('/', Job.controllers.index);

routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)

routes.get('/job/:id', Job.controllers.show)
routes.post('/job/:id', Job.controllers.update)
routes.post('/job/delete/:id', Job.controllers.delete)

routes.get('/profile', profile.controllers.index)
routes.post('/profile', profile.controllers.update)

//jogar para fora com o 
module.exports = routes;