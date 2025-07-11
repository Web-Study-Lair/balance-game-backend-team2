import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { DeleteGameDto } from './dto/delete-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GameEntity } from './entities/game.entity';
import { Repository } from 'typeorm';
import { SelectOptionEntity } from './entities/select_option.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameEntity) private gameRepository: Repository<GameEntity>,
    @InjectRepository(SelectOptionEntity) private optionRepository: Repository<SelectOptionEntity>
  ) { }

  async createGame(createGameDto: CreateGameDto) {
    const savedGame = await this.gameRepository.save({
      title: createGameDto.game.title,
      user_id: createGameDto.user.userId
    });

    // 아래처럼 쓰면 비동기 작업을 병렬로 처리함
    // 두개의 query를 동시에 날리고 둘 다 완료될 때 까지 기다림
    // option의 경우 서로 다른 레코드를 참조하고
    // 원자성을 보장할 필요가 없기 때문에 아래처럼 해도 되지만,
    // 만약 중복 키/제약조건 충돌 가능한 데이터를 다루는 경우 주의 필요
    // 트랜잭션을 코드상에서 구현해야할 수도 있음 
    await Promise.all([
      this.optionRepository.save({
        text: createGameDto.game.selectOption1.text,
        img: createGameDto.game.selectOption1.img,
        game: savedGame,
      }),
      this.optionRepository.save({
        text: createGameDto.game.selectOption2.text,
        img: createGameDto.game.selectOption2.img,
        game: savedGame,
      }),
    ]);

    return savedGame;
  }

  async findAllGames() {
    return await this.gameRepository.find();
  }

  async findGamesByUserID(userId: number) {
    return await this.gameRepository.find({
      where: {
        user_id: userId
      },
      // relations: ['options']
    });
  }

  async removeGame(deleteGameDto: DeleteGameDto) {
    // select_options의 onDelete: 'CASCADE' 옵션으로 인해 game만 삭제해도 select_options가 같이 삭제됨
    return await this.gameRepository.delete({ id: deleteGameDto.gameId });
  }
}
