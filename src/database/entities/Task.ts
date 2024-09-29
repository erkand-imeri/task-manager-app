import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { v4 as uuidv4 } from 'uuid';
import { User } from './User';

@Entity()
export class Task {
  @PrimaryKey()
  id: string = uuidv4();

  @Property()
  title!: string;

  @Property()
  description?: string;

  @Property({ default: false })
  completed: boolean = false;

  @ManyToOne(() => User)
  user!: User;

  @Property({ onCreate: () => new Date() })
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date(), nullable: true })
  updatedAt: Date = new Date();
}
