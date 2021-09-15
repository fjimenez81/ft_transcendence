import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from 'src/auth/auth-service/auth.service';
import { verifyUser } from 'src/auth/strategies/auth.guard';
import { RoomService } from 'src/chat/chat-service/room/room.service';
import { RoomDto } from 'src/chat/models/room/dto/room.dto';
import { RoomI } from 'src/chat/models/room/room.interface';
import { UserI } from 'src/users/user-service/models/user.interface';
import { UsersService } from 'src/users/user-service/users.service';

@Controller('chat')
export class ChatController
{
	constructor(private authService: AuthService,
				private userService: UsersService,
				private roomService: RoomService) {}

	@UseGuards(verifyUser)
	@Post('createRoom')
	async createRoom(@Req() req: Request, @Body() room: RoomDto)
	{
		const client: UserI = await this.userService.getUser(room.ownerId);
		return this.roomService.createRoom(room as RoomI, client);
	}

	@UseGuards(verifyUser)
	@Get('getAllRooms')
	async getAllRooms()
	{
		return this.roomService.getAllRooms()
	}

	@UseGuards(verifyUser)
	@Post('deleteRooms')
	async deleteRooms(@Req() req: Request, @Body() rooms: RoomI[])
	{
		return this.roomService.deleteAllRooms(rooms)
	}
}