import { AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { ChatService } from 'src/app/services/chat-service/chat.service';
import { User } from 'src/app/services/models/user';
import { UserI } from 'src/app/services/models/user.interface';

@Component({
	selector: 'app-main-page',
	templateUrl: './main-page.component.html',
	styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit
{

	constructor(public authService: AuthService,
                private router: Router,
                private chatService: ChatService) { }

	private user?: User;
	nick: string | undefined;
	picture: string | ArrayBuffer | undefined;
	liveUsers: number = 0;
	usersConnected!: UserI[]

	paramId: string | null = sessionStorage.getItem('token');

	ngOnInit()
	{
		if (this.paramId)
		    this.findUser(this.paramId);
        this.chatService.updateUserMain().subscribe(res => {
            this.nick = res.nick;
		    this.picture = res.avatar;
        })
        this.chatService.findUsersConnected()
		this.chatService.getConnectedUsers().subscribe(res => {

			this.liveUsers = res.length
		})

		this.nick = this.user?.nick;
		this.picture = this.user?.avatar;
		if (this.router.url == '/mainPage')
			this.router.navigate([`/landingPage/start`]);
	}

	async findUser(id: string) {
		await this.authService.getUserById(id)
			.then(res => {
				if (res.data === "ERROR!!") {
					this.authService.logOutUser(false)
					this.router.navigate(['/landingPage/start'])
				}
				else
                {
					this.user = res.data;
                    this.nick = this.user?.nick;
		            this.picture = this.user?.avatar;
                }
			})
            //.catch(() => this.authService.refreshToken())
	}

	showTabs(): void {
		let container = document.getElementById("all");
		let pageBack = document.getElementById("pageBack")
		let hiddenTabs = document.getElementById("hiddenTabs")
		container!.style.opacity = "50%";
		pageBack!.style.display = "block";
		hiddenTabs!.style.left = "-10vh";
	}

	hideTabs(): void {
		let container = document.getElementById("all");
		let pageBack = document.getElementById("pageBack")
		let hiddenTabs = document.getElementById("hiddenTabs")
		container!.style.opacity = "100%";
		pageBack!.style.display = "none";
		hiddenTabs!.style.left = "-200vw";
	}
}
