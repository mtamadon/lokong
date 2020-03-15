import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Servers extends BaseSchema {
  protected $tableName = 'servers'

  public async up () {
    this.schema.createTable(this.$tableName, (table) => {
      table.increments('id')
      table.uuid('key').unique()
      table.string('name').index()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.$tableName)
  }
}
