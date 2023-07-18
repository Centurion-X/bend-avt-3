// import from NestJS framework
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
// import from external libraries
import { ExtractJwt, Strategy } from 'passport-jwt';
// import from application files
import { jwtConstants } from '../../../private/constants';
/* eslint-disable prettier/prettier */
@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy)
{
    constructor()
    {
        super
        ({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: jwtConstants.secret
        });
    }
    async validate(object: any)
    {
        return {id: object.sub, login: object.username};
    }
}