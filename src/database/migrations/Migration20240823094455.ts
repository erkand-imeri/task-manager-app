import { Migration } from '@mikro-orm/migrations';

export class Migration20240823094455 extends Migration {

  override async up(): Promise<void> {
    this.addSql('create table "task" ("id" serial primary key, "title" varchar(255) not null, "description" varchar(255) not null, "completed" boolean not null default false, "created_at" timestamptz not null, "updated_at" timestamptz null);');
  }

  override async down(): Promise<void> {
    this.addSql('drop table if exists "task" cascade;');
  }

}
