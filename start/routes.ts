/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import Log from 'App/Models/Log'
import RawLog from 'App/Models/RawLog'
import Server from 'App/Models/Server'
import Env from '@ioc:Adonis/Core/Env'
import { v4 as uuid } from 'uuid'
Route.on('/').render('welcome')

Route.any('/api/v1/servers', async ({ request, response }) => {
  if (request.header('token') != Env.get('token')) {
    return response.status(401).send({
      error: {
        message: 'unauthorized !'
      }
    })
  }
  let server = await Server.create({
    key: uuid(),
    name: request.input('name', 'default')
  })
  return response.status(201).send(server)
})
Route.any('/api/v1/log/:key', async ({ request, response }) => {
  if (request.all()) {
    console.log(request.all())
  }
  let server = await Server.query().first()
  if (!server) {
    return response.status(400).send({
      error: {
        message: 'Server not Found!'
      }
    })
  }
  const req = request.all()

  let log = await Log.create({
    server_id: server.id,
    login: req.consumer ? true : false,
    user_id: req.consumer ? req.consumer.custom_id : null,
    kong_latency: req.latencies.kong,
    app_latency: req.latencies.proxy,
    total_latency: req.latencies.request,
    status: req.response.status,
    ip: req.request.headers['x-real-ip'],
    path: req.request.uri,
    service: req.service.name,
    service_id: req.service.id
  })
  console.log(JSON.stringify(log))
  await RawLog.create({
    server_id: server.id,
    log_id: log.id,
    raw: request.all()
  })

  return response.status(201).send({
    message: 'stored',
    id: log.id,
    req: request.all()
  })
})
Route.get('/test', async ({ response }) => {

  response.send({
    message: 'hi bala',
    log: await Log.find('1')
  })

})
