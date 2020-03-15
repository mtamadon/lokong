import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Log extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public server_id: number
  @column()
  public login: boolean
  @column()
  public kong_latency: number
  @column()
  public app_latency: number
  @column()
  public total_latency: number
  @column()
  public status: number
  @column()
  public service: String
  @column()
  public service_id: String
  @column()
  public path: String
  @column()
  public ip: String
}
