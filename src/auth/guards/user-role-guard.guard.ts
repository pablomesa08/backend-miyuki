import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class UseRoleGuardGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {

    const validRoles=['admin'];
    const req=context.switchToHttp().getRequest();
    const user=req.user;
    console.log(user.roles);
    for(const rol of user.roles ){
        if(validRoles.includes(rol)) return true;
    }
    throw new UnauthorizedException('Forbiden for your assigned role');
    }
}