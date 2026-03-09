import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { User } from '../users/users.entity';
import { Customer } from '../customers/customers.entity';

export enum TaskStatus {
    Todo = 'todo',
    InProgress = 'in-progress',
    Done = 'done',
}

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column({
        type: 'enum',
        enum: TaskStatus,
        default: TaskStatus.Todo,
    })
    status: TaskStatus;

    @Column({ type: 'datetime', nullable: true })
    dueDate: Date;

    @ManyToOne(() => Customer, (customer) => customer.tasks, { eager: true })
    @JoinColumn({ name: 'customerId' })
    customer: Customer;

    @ManyToOne(() => User, { eager: true })
    @JoinColumn({ name: 'assignedToId' })
    assignedTo: User;
}
