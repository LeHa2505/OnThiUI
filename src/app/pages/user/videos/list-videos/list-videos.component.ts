import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user-service/user.service';

@Component({
  selector: 'app-list-videos',
  templateUrl: './list-videos.component.html',
  styleUrls: ['./list-videos.component.less'],
})
export class ListVideosComponent {
  role = localStorage.getItem('role');
  idUser = localStorage.getItem('user_id');
  userAvatar = localStorage.getItem('avatar');
  shorts: any;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getShortsAPI();
  }

  getShortsAPI() {
    this.userService.userGetShortsById(this.idUser).subscribe((res) => {
      if (res.success) {
        this.shorts = res.data;
      }
    });
  }
}
