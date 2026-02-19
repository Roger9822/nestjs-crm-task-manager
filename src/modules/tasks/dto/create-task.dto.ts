import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../tasks.entity';

export class CreateTaskDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @IsOptional()
    dueDate?: Date;

    assignedToId: number;
}
