import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const message =
            exception instanceof HttpException
                ? exception.getResponse()
                : exception.message;

        response.status(status).json({
            status,
            name: HttpStatus[status],
            /**
             * ParseIntPipe같이 message가 string이 아닌 message를 포함한 object의 경우
             * message.message를 해야하기 때문에 아래처럼 작성
             */
            message: typeof message === 'string' ? message : message?.message,
            // exception
            // errors: exception.stack,
        });
    }
}