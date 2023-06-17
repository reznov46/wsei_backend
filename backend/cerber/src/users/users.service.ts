import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'common';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
	constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

	async getUserById(id: string): Promise<User | null> {
		return await this.usersRepository.findOne({
			where: {
				id,
			},
			select: {
				password: false,
			},
		});
	}

	async getUsers(): Promise<User[] | null> {
		try {
			return await this.usersRepository.find({
				select: {
					password: false,
				},
			});
		} catch (e) {
			return null;
		}
	}
}
