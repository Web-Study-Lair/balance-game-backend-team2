import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'hotcake',
    password: '1234',
    database: 'balancegame',
    entities: ['dist/**/*.entity.{ts,js}'],
    synchronize: true,
};