import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RawLogs extends BaseSchema {
  protected $tableName = 'raw_logs'

  public async up () {
    this.schema.createTable(this.$tableName, (table) => {
      table.increments('id')
      table.integer('server_id').references('id').inTable('servers')
      table.integer('log_id').references('id').inTable('logs')
      table.jsonb('raw')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.$tableName)
  }
}
