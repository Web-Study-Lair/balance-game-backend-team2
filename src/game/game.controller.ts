import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

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

  @Get('/:id')
  findOneGame(@Param('id', ParseUUIDPipe) id: string) {
    return this.gameService.findOneGame(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
  //   return this.gameService.update(+id, updateGameDto);
  // }

  @Delete('/:id')
  async removeGame(@Param('id', ParseUUIDPipe) id: string) {
    return await this.gameService.removeGame(id);
  }
}
