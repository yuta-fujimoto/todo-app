import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TodoService } from './todo.service';
import { Request } from 'express';
import { Task } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Get()
    getTasks(@Req() req: Request): Promise<Task[]> {
        return this.todoService.getTasks(req.user.id)
    }

    @Get(':id')
    getTaskById(
        @Req() req: Request,
        @Param('id', ParseIntPipe) taskId: number,
    ): Promise<Task> {
        return this.todoService.getTaskById(req.user.id, taskId)
    }

    @Post()
    createTask(@Req() req: Request, @Body() dto: CreateTaskDto): Promise<Task> {
        return this.todoService.createTask(req.user.id, dto)
    }

    @Patch(':id')
    updateTaskById(
        @Req() req: Request,
        @Param('id', ParseIntPipe) taskId: number,
        @Body() dto: UpdateTaskDto,
    ): Promise<Task> {
        return this.todoService.updateTaskById(req.user.id, taskId, dto)
    }
    
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteTaskById(
        @Req() req: Request,
        @Param('id', ParseIntPipe) taskId: number,
    ) : Promise<void> {
        return this.todoService.deleteTaskById(req.user.id, taskId)
    }

}
