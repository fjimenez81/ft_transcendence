import { Injectable } from '@angular/core';
import { RoomI, RoomPaginateI } from '../models/room.interface';
import axios from 'axios';
import { Socket, SocketIoConfig } from "ngx-socket-io";
import { CustomSocket } from './custom-socket/custom-socket';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageI, MessagePaginateI } from '../models/message.interface';
import { Observable } from 'rxjs';
import { UserI } from '../models/user.interface';

@Injectable({
	providedIn: 'root'
})
export class ChatService
{
	constructor(private snackBar: MatSnackBar,
				private socket: CustomSocket) {}

	async createRoom(room: RoomI)
	{
		this.socket.emit('createRoom', room)
		this.snackBar.open(`Room ${room.name} created successfully`, 'Close', {
			duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
		})
	}

	findMyRooms()
	{
		this.socket.emit('findRooms')
	}

	getMyRooms(): Observable<RoomI[]>
	{
		return this.socket.fromEvent<RoomI[]>('rooms')
	}

	deleteRoom(room: RoomI)
	{
		this.socket.emit('deleteRoom', room)
	}

	async deleteRooms(rooms: RoomI[])
	{
		this.socket.emit('removeAllRoom', rooms)
		this.snackBar.open(`Rooms deleted successfully`, 'Close', {
			duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
		})
	}

	async RoomLeave(room: RoomI)
	{
		this.socket.emit('RoomLeave', room)
	}

	joinRoom(room: RoomI)
	{
		this.socket.emit('joinRoom', room);
	}

	leaveRoom(room: RoomI)
	{
		this.socket.emit('leaveRoom', room);
	}

	sendMessage(message: MessageI)
	{
		this.socket.emit('addMessage', message);
	}

	getAddedMessage(): Observable<MessageI>
	{
		return this.socket.fromEvent<MessageI>('messageAdded');
	}

	getMessages(): Observable<MessagePaginateI>
	{
		return this.socket.fromEvent<MessagePaginateI>('messages');
	}

	findUsersConnected()
	{
		this.socket.emit('usersConnected');
	}

	getConnectedUsers(): Observable<UserI[]>
	{
		return this.socket.fromEvent<UserI[]>('connectedUsers')
	}

	blockUser(blockUser: string)
	{
		return this.socket.emit('blockUser', blockUser)
	}

	unLockUser(unLockUser: string)
	{
		return this.socket.emit('UnblockUser', unLockUser)
	}

	userBanned(user: UserI)
	{
		return this.socket.emit('userBanned', user)
	}

	convertToAdmin(user: UserI)
	{
		this.socket.emit('convertToAdmin', user)
	}

	typing()
	{
		this.socket.emit('typing')
	}

	typingMessage(): Observable<string>
	{
		return this.socket.fromEvent('typing')
	}

    verifyPassword(password: string, roomId: number)
    {
        return axios.post('http://localhost:3000/chatRoom/verifyPassword', {password, roomId})
    }

    updatePassword(password: string, room: RoomI)
    {
        return axios.put('http://localhost:3000/chatRoom/updatePassword', {password, room})
    }

    updateOption(option: string, room: RoomI)
    {
        return axios.put('http://localhost:3000/chatRoom/updateOption', {option, room})
    }

    updateAdmins(userId: number, room: RoomI)
    {
        return axios.put('http://localhost:3000/chatRoom/updateAdmins', {userId, room})
    }

    allUsersStatus()
    {
        this.socket.emit('allUsersStatus')
    }

    getAllUsersStatus(): Observable<UserI[]>
    {
        return this.socket.fromEvent('allUsers')
    }

    updateMain()
    {
        this.socket.emit('updateMain')
    }

    updateUserMain(): Observable<UserI>
    {
        return this.socket.fromEvent<UserI>('updateUser')
    }

    findQR()
    {
        this.socket.emit('findQR')
    }

    getQR(): Observable<string>
    {
        return this.socket.fromEvent<string>('getQR')
    }

}
