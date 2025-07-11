import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { DeleteGameDto } from './dto/delete-game.dto';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) { }

  @Post('/')
  async createGame(@Body() createGameDto: CreateGameDto) {
    return await this.gameService.createGame(createGameDto);
  }

  @Get('/')
  async findAllGames() {
    return await this.gameService.findAllGames();
  }

  @Get('/:userId')
  findOneGame(@Param('userId') userId: number) {
    return this.gameService.findGamesByUserID(userId);
  }

  @Delete('/')
  async removeGame(@Body() deleteGameDto: DeleteGameDto) {
    return await this.gameService.removeGame(deleteGameDto);
  }
}
