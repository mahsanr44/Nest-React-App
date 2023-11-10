import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post, Redirect, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {

  constructor(private catsService:CatsService){}

    @Post()
    async create(@Body() createCatDto:CreateCatDto):Promise<string>{
        return 'This action adds a new cat';
    }

    @Get(':id')
    findOne(@Param('id',ParseIntPipe) id: number) {
      return `This action returns a #${id} cat`;
    }

    // @Get()
    // @HttpCode(207)
    // @Redirect('https://nestjs.com', 301)
    // async findAll(@Req() request:Request):Promise<string>{
    //     return 'This action returns all cats';
    // }

    @Get()
    async findAll():Promise<Cat[]>{
      return this.catsService.findAll();
    }
}
