import { Controller, Get, Post, Body, Delete, Query, ParseIntPipe, BadRequestException, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { DeleteGameDto } from './dto/delete-game.dto';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) { }

  @Post()
  async createGame(@Body() createGameDto: CreateGameDto) {
    return await this.gameService.createGame(createGameDto);
  }

  @Get()
  async findAllGames() {
    return await this.gameService.findAllGames();
  }

  @Get('user')
  // ParseIntPipe : Int 형식이 아닐 때 BadRequest 예외처리를 발생시킴 
  async findGamesByUserID(@Query('userId', new ParseIntPipe({
    exceptionFactory: (error) => new BadRequestException('userId must be number')
  })) userId: number) {
    return await this.gameService.findGamesByUserID(userId);
  }

  @Delete()
  @HttpCode(204)
  async removeGame(@Body() deleteGameDto: DeleteGameDto) {
    return await this.gameService.removeGame(deleteGameDto);
  }
}
