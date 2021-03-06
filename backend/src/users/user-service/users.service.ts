import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto, UpdateDto } from 'src/auth/dto';
import { Repository } from 'typeorm';
import { CreateUserDto } from './models/dtos';
import { UserEntity } from './models/entities/users.entity';
import { UserI } from './models/user.interface';

@Injectable()
export class UsersService
{
	constructor(@InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>) { }

	async getAllUsers(): Promise<UserEntity[]>
	{
		return await this.usersRepository.find()
	}

	async getUser(id: any): Promise<UserEntity>
	{
		return await this.usersRepository.findOne(id)
	}

	async createUser(user: LoginDto, clientID: number): Promise<UserEntity>
	{
		user.id = clientID
		user.nick = user.nick
		user.email = user.email
		user.avatar = 'http://localhost:3000/auth/assets/marvin.png'
		user.authentication = false
		const newUser = this.usersRepository.create(user)
		return await this.usersRepository.save(newUser)
	}

	async customCreateUser(user: CreateUserDto)
	{
		user.avatar = 'http://localhost:3000/auth/assets/marvin.png'
		user.authentication = false
        user.user42 = user.nick
		const newUser = this.usersRepository.create(user)
		return await this.usersRepository.save(newUser)
	}

	async getUserId(id: number): Promise<number>
	{
		const user = await this.usersRepository.findOne(id)
		return user.id
	}

	async updateUser(user: UpdateDto, clientID: number)
	{
		return await this.usersRepository.update(clientID, user)
	}

	async saveUserSecret(secret: string, clientID: number): Promise<any>
	{
		return await this.usersRepository.update(clientID, { secret });
	}

	async updateStatus(status: string, userId: number)
    {
        return this.usersRepository.update(userId, { status })
    }

    async updateWins(wins: number, userId: number)
    {
        return this.usersRepository.update(userId, { wins })
    }

    async updateDefeats(defeats: number, userId: number)
    {
        return this.usersRepository.update(userId, { defeats })
    }

	async updateFriends(user: UserI)
    {
        return await this.usersRepository.save(user);
    }
}
