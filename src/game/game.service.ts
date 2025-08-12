import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { DeleteGameDto } from './dto/delete-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GameEntity } from './entities/game.entity';
import { Repository } from 'typeorm';
import { SelectOptionEntity } from './entities/select_option.entity';
import { plainToInstance } from 'class-transformer';
import { GameResponseDto } from './dto/game-response.dto';
import { UpdateSelectCountDto } from './dto/update-select-count.dto';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameEntity)
    private gameRepository: Repository<GameEntity>,
    @InjectRepository(SelectOptionEntity)
    private selectOptionRepository: Repository<SelectOptionEntity>,
  ) {}

  async createGame(createGameDto: CreateGameDto) {
    try {
      const savedGame = await this.gameRepository.save({
        title: createGameDto.game.title,
        user_id: createGameDto.user.userId,
      });

      // 아래처럼 쓰면 비동기 작업을 병렬로 처리함
      // 두개의 query를 동시에 날리고 둘 다 완료될 때 까지 기다림
      // option의 경우 서로 다른 레코드를 참조하고
      // 원자성을 보장할 필요가 없기 때문에 아래처럼 해도 되지만,
      // 만약 중복 키/제약조건 충돌 가능한 데이터를 다루는 경우 주의 필요
      // 트랜잭션을 코드상에서 구현해야할 수도 있음
      await Promise.all(
        // [
        //   this.selectOptionRepository.save({
        //     text: createGameDto.game.selectOption1.text,
        //     img: createGameDto.game.selectOption1.img,
        //     game: savedGame,
        //   }),
        //   this.selectOptionRepository.save({
        //     text: createGameDto.game.selectOption2.text,
        //     img: createGameDto.game.selectOption2.img,
        //     game: savedGame,
        //   }),
        // ]
        createGameDto.game.selectOption.map((option) => {
          this.selectOptionRepository.save({
            text: option.text,
            img: option.img,
            game: savedGame,
          });
        }),
      );

      return {
        message: '밸런스 게임 생성 완료',
        gameId: savedGame.id,
      };
    } catch (e) {
      return e;
    }
  }

  async findAllGames() {
    const games = await this.gameRepository.find();

    // DTO에 맞춰서 객체의 내용물을 변환
    return plainToInstance(GameResponseDto, games, {
      // DTO에서 @Expose를 붙이지 않은 요소는 전부 제외한채 반환하도록 하는 옵션
      excludeExtraneousValues: true,
    });
  }

  async findGamesByUserID(userId: number) {
    // userId의 유저가 존재하지 않을 때의 예외처리
    if ((await this.gameRepository.findOneBy({ user_id: userId })) === null) {
      throw new NotFoundException(`userId ${userId} is not found`);
    }

    const games = await this.gameRepository.find({
      where: {
        user_id: userId,
      },
    });

    return plainToInstance(GameResponseDto, games, {
      excludeExtraneousValues: true,
    });
  }

  async updateSelectCount(updateSelectCountDto: UpdateSelectCountDto) {
    const game = await this.gameRepository.findOneBy({
      id: updateSelectCountDto.gameId,
    });
    // gameId의 게임이 존재하지 않을 때의 예외처리
    if (!game) {
      throw new NotFoundException(
        `gameId ${updateSelectCountDto.gameId} is not found`,
      );
    }

    game.select_option[updateSelectCountDto.selectOption].count =
      updateSelectCountDto.count;
    return await this.gameRepository.save(game);
  }

  async removeGame(deleteGameDto: DeleteGameDto) {
    const game = await this.gameRepository.findOneBy({
      id: deleteGameDto.gameId,
    });

    // gameId의 게임이 존재하지 않을 때의 예외처리
    if (game === null) {
      throw new NotFoundException(
        `gameId ${deleteGameDto.gameId} is not found`,
      );
    }

    if (game.user_id !== deleteGameDto.user.userId) {
      throw new ForbiddenException(
        `userId ${deleteGameDto.user.userId} is not owner of gameId ${deleteGameDto.gameId}`,
      );
    }

    // select_options의 onDelete: 'CASCADE' 옵션으로 인해 game만 삭제해도 select_options가 같이 삭제됨
    return await this.gameRepository.delete({ id: deleteGameDto.gameId });
  }
}
