import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { DeleteGameDto } from './dto/delete-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GameEntity } from './entities/game.entity';
import { DeepPartial, Repository } from 'typeorm';
import { UUID } from 'crypto';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameEntity) private gameRepository: Repository<GameEntity>
  ) { }

  async createGame(createGameDto: CreateGameDto) {
    const game = this.gameRepository.create({
      user_id: createGameDto.user.userId,
      title: createGameDto.balance.title,
      option_1_text: createGameDto.balance.option1.text,
      option_1_img: createGameDto.balance.option1.img,
      option_2_text: createGameDto.balance.option2.text,
      option_2_img: createGameDto.balance.option2.img
    });

    return await this.gameRepository.save(game);
  }

  async findAllGames() {
    return await this.gameRepository.find();
  }

  async findGamesByUserID(userId: string) {
    return await this.gameRepository.find({
      where: {
        user_id: userId
      },
    });
  }

  async removeGame(deleteGameDto: DeleteGameDto) {
    return await this.gameRepository.delete({ game_id: deleteGameDto.gameId });
  }
}
