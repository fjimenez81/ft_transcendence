import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";



@Injectable()
export class verifyUser implements CanActivate
{
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext)
    {
        const request = context.switchToHttp().getRequest()
        try
        {
            const jwt = request.cookies['clientID']
            return this.jwtService.verify(jwt)
        }
        catch
        {
            throw new UnauthorizedException('unauthorized!!')
        }
    }
}