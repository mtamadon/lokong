import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Logs extends BaseSchema {
  protected $tableName = 'logs'

  public async up () {
    this.schema.createTable(this.$tableName, (table) => {
      table.increments('id')
      table.integer('server_id').references('id').inTable('servers')
      table.integer('kong_latency').index()
      table.integer('app_latency').index()
      table.integer('total_latency').index()
      table.string('path').index()
      table.string('url').index()
      table.string('ip').index()
      table.integer('status').index()
      table.jsonb('querystring')
      table.jsonb('user_id')
      table.jsonb('login')
      table.string('service')
      table.string('service_id')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.$tableName)
  }
}
