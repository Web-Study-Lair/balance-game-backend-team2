import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GameEntity } from './entities/game.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameEntity) private gameRepository: Repository<GameEntity>
  ) { }

  async createGame(createGameDto: CreateGameDto) {
    console.log(`${createGameDto.question}, ${createGameDto.option_1}, ${createGameDto.option_2}`);
    return await this.gameRepository.save(createGameDto);
  }

  async findAllGames() {
    return await this.gameRepository.find();
  }

  async findOneGame(id: string) {
    return await this.gameRepository.findOneBy({ game_id: id });
  }

  // update(id: number, updateGameDto: UpdateGameDto) {
  //   return `This action updates a #${id} game`;
  // }

  async removeGame(id: string) {
    return await this.gameRepository.delete({ game_id: id });
  }
}
