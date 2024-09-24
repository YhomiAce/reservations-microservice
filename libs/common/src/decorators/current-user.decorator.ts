import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserDto } from "../dto";

const getCurrentUserByContext = (context: ExecutionContext): UserDto => {
    const request = context.switchToHttp().getRequest();
    return request.user;
}

export const CurrentUser = createParamDecorator(
    (_data: unknown, context: ExecutionContext) => getCurrentUserByContext(context)
)