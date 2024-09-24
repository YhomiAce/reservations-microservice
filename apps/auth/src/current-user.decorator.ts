import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "./users/entities/users.entity";

const getCurrentUserByContext = (context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest();
    return request.user;
}

export const CurrentUser = createParamDecorator(
    (_data: unknown, context: ExecutionContext) => getCurrentUserByContext(context)
)