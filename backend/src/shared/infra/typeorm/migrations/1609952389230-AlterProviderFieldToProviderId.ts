import {
  CreateDateColumn,
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterProviderFieldToProviderId1609952389230
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'provider');
    // delete the provider column in the appointments table

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
    // creates the provider_id column in the appointments table

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentProvider',
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
    // creates foreign key between the appointment and users tables
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

    await queryRunner.dropColumn('appointments', 'provider_id');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
    );
  }
}
