import { UserEntity } from "@/user/user.entity";
import { UserService } from "@/user/user.service";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { verify } from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { AuthRequest } from "@/types/expressRequest.interface";


@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(private readonly userService : UserService) {}

    async use(req: AuthRequest, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
        req.user = new UserEntity();
        return next();
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
        const decode = verify(token, process.env.JWT_SECRET_KEY!) as { id: number; username: string; email: string };
        const user = await this.userService.findById(decode.id);
        req.user = user;
        return next();
    } catch (error) {
        req.user = new UserEntity();
        return next();
    }
}


}