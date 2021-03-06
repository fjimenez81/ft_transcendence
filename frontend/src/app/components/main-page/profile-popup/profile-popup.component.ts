import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { UserI } from 'src/app/services/models/user.interface';

@Component({
  selector: 'app-profile-popup',
  templateUrl: './profile-popup.component.html',
  styleUrls: ['./profile-popup.component.css']
})
export class ProfilePopupComponent implements OnInit {

  constructor(public authService: AuthService) { }

  @Input() userPopup!: UserI;
  status: string = "Offline";

  ngOnInit(): void {
    this.winsDefeats();
    this.updateStatusColor();
  }

  ngOnChanges()
  {
    //this.updateUser();
    this.winsDefeats();
    this.updateStatusColor();
    this.hideMatchHistorial();
  }

  winsDefeats(): void
  {
    let defeatsPercent: number;
		let front = document.getElementById("front");
		let back = document.getElementById("back");

    if (this.userPopup.defeats! <= 0 && this.userPopup.wins! <= 0)
      defeatsPercent = 50;
    else if (this.userPopup.defeats! <= 0 && this.userPopup.wins! > 0)
      defeatsPercent = 0;
    else if (this.userPopup.wins! <= 0 && this.userPopup.defeats! > 0)
      defeatsPercent = 100;
    else
      defeatsPercent = this.userPopup.defeats! * 100 / (this.userPopup.wins! + this.userPopup.defeats!);
    if (defeatsPercent > 50)
    {
		  front!.style.width = (100 - defeatsPercent) + "%";
		  front!.style.right = "";
      front!.style.left = "0%";
      front!.style.borderRadius = "100vh 0% 0% 100vh";
      front!.style.backgroundColor = "#59c977";
      back!.style.backgroundColor = "#e08080";
    }
    else
    {
		  front!.style.width = defeatsPercent + "%";
		  front!.style.right = "0%";
      front!.style.left = "";
      front!.style.borderRadius = "0% 100vh 100vh 0%";
      front!.style.backgroundColor = "#e08080";
      back!.style.backgroundColor = "#59c977";
    }
  }

  openUser(): void
  {
    window.open("https://profile.intra.42.fr/users/" + this.userPopup.user42);
  }

  updateStatusColor(): void
  {
		let avatar = document.getElementById("avatarPopup");
		let status = document.getElementById("status");

    if (this.userPopup.status == 'online')
    {
      this.status = "Online";
      status!.style.color = "rgba(89, 201, 119, .8)";
      status!.style.border = "0.5vh solid rgba(89, 201, 119, .8)";
      avatar!.style.border = "0.5vh solid rgba(89, 201, 119, .8)";
    }
    else if (this.userPopup.status == 'inGame')
    {
      this.status = "In a game";
      status!.style.color = "rgba(126, 179, 217, .8)";
      status!.style.border = "0.5vh solid rgba(126, 179, 217, .8)";
      avatar!.style.border = "0.5vh solid rgba(126, 179, 217, .8)";
    }
    else if (this.userPopup.status == 'offline')
    {
      this.status = "Offline";
      status!.style.color = "rgba(19, 5, 11, .3)";
      status!.style.border = "0.5vh solid rgba(19, 5, 11, .3)";
      avatar!.style.border = "0.5vh solid rgba(19, 5, 11, .3)";
    }
  }

  showMatchHistorial()
  {
    let MatchHistorial = document.getElementById("MatchHistorial");
    let ProfileBox = document.getElementById("ProfileBox");

    MatchHistorial!.style.display = 'block';
    ProfileBox!.style.display = 'none';
  }
  hideMatchHistorial()
  {
    let MatchHistorial = document.getElementById("MatchHistorial");
    let ProfileBox = document.getElementById("ProfileBox");

    MatchHistorial!.style.display = 'none';
    ProfileBox!.style.display = 'block';
  }
  styleMatch(match: string)
  {
    let matchList = document.getElementById("matchList");
      if (match[0] == 'W')
        matchList!.style.color = '#e08080';
      else if (match[0] == 'L')
        matchList!.style.color = '#59c977';
    return (match);
  }

    private async updateUser()
    {
      await this.authService.getUserById(this.userPopup.id.toString())
        .then(res => { this.userPopup = res.data; })
    }

}
