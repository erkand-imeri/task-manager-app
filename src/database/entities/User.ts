import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { Task } from './Task';

@Entity()
export class User {
    @PrimaryKey()
    id: string = uuidv4();

    @Property()
    name!: string;

    @Property({ unique: true })
    email!: string;

    @Property()
    password!: string;

    @OneToMany(() => Task, task => task.user)
    tasks = new Collection<Task>(this);

    @Property({ onCreate: () => new Date() })
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date(), nullable: true })
    updatedAt: Date = new Date();
}