import { Migration } from '@mikro-orm/migrations';

export class Migration20240929214500 extends Migration {

  override async up(): Promise<void> {
    this.addSql('create table "user" ("id" varchar(255) not null, "name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz null, constraint "user_pkey" primary key ("id"));');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');

    this.addSql('alter table "task" add column "user_id" varchar(255) not null;');
    this.addSql('alter table "task" alter column "id" type varchar(255) using ("id"::varchar(255));');
    this.addSql('alter table "task" add constraint "task_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "task" alter column "id" drop default;');
  }

  override async down(): Promise<void> {
    this.addSql('alter table "task" drop constraint "task_user_id_foreign";');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('alter table "task" drop column "user_id";');

    this.addSql('alter table "task" alter column "id" type int using ("id"::int);');
    this.addSql('create sequence if not exists "task_id_seq";');
    this.addSql('select setval(\'task_id_seq\', (select max("id") from "task"));');
    this.addSql('alter table "task" alter column "id" set default nextval(\'task_id_seq\');');
  }

}
