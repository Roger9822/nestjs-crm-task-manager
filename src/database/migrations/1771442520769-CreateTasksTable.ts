import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTasksTable1771442520769 implements MigrationInterface {
    name = 'CreateTasksTable1771442520769'

 public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tasks',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'title', type: 'varchar' },
          { name: 'description', type: 'text' },
          {
            name: 'status',
            type: 'enum',
            enum: ['todo', 'in-progress', 'done'],
            default: "'todo'",
          },
          { name: 'dueDate', type: 'datetime', isNullable: true },
          { name: 'assignedToId', type: 'int' },
          { name: 'customerId', type: 'int' },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys('tasks', [
      new TableForeignKey({
        columnNames: ['assignedToId'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['customerId'],
        referencedTableName: 'customers',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tasks');
  }
}
