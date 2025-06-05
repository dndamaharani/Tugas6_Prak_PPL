import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'expenses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.text('description').nullable()
      table.decimal('amount', 15, 2).notNullable()
      table.enum('category', [
        'Makanan',
        'Transport',
        'Belanja',
        'Hiburan',
        'Kesehatan',
        'Pendidikan',
        'Tagihan',
        'Lainnya'
      ]).defaultTo('Lainnya')
      table.date('expense_date').notNullable()
      table.timestamp('created_at', { useTz: true }).nullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}