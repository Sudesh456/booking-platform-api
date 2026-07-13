import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
) {}

async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);

    if (existingUser) {
        throw new UnauthorizedException(
            'Email already exists',
        );
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = await this.usersService.create({
        fullName: registerDto.fullName,
        email: registerDto.email,
        password: hashedPassword,
    });

    return {
        message: 'User registered successfully',
        user: {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
        },
    };
}

async loginDto(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
        throw new UnauthorizedException(
            'Invalid credentials',
        );
    }

    const passwordMatch = await bcrypt.compare(
        loginDto.password,
        user.password,
    );

    if (!passwordMatch) {
        throw new UnauthorizedException(
            'Invalid credentials',
        );
    } 
    const payload = {
        sub: user.id,
        email: user.email,
    };
    return {
        access_token: this.jwtService.sign(payload),
    };
}
}
