import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';

@Component({
  selector: 'app-layout-user',
  templateUrl: './layout-user.component.html',
  styleUrls: ['./layout-user.component.less'],
})
export class LayoutUserComponent implements OnInit {
  // role: any = localStorage.getItem('role');
  // username = localStorage.getItem('username');
  role: any;
  username: any;
  isCollapsed = false;
  notifications: any;

  menus: any[] = [
    {
      title: 'Trang chủ',
      icon: 'fas fa-house',
      url: '',
      role: 'student',
    },
    {
      title: 'Khóa học',
      icon: 'fas fa-person-chalkboard',
      role: 'user',
    },
    {
      title: 'Lịch học',
      icon: 'fas fa-calendar',
      role: 'student',
    },
    {
      title: 'Tài liệu',
      icon: 'fas fa-book',
      role: 'student',
    },
    {
      title: 'Nhóm',
      icon: 'fas fa-user-group',
      role: 'student',
    },
  ];

  breadcrumbs: string[] = [];

  url: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modal: NzModalService,
    private authenSer: AuthenticationService,
    private msg: NzMessageService
  ) {
    this.initUserInform();
    this.initNotification();
    // Theo dõi sự kiện thay đổi URL
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Lấy URL hiện tại
        this.url = this.router.url;
        // Tạo breadcrumbs từ URL
        this.breadcrumbs = this.createBreadcrumbs(this.url);
      }
    });
  }

  ngOnInit(): void {
    // Lấy breadcrumbs cho URL ban đầu
    const initialUrl = this.router.url;
    this.breadcrumbs = this.createBreadcrumbs(initialUrl);
  }

  initUserInform() {
    this.role = 'student';
    this.username = 'Hà Trang';
  }

  initNotification() {
    this.notifications = [
      {
        content: 'Cô giáo Toán ới vào xem live kìa Trang ơi',
        time: '20 phút trước',
        status: 1
      },
      {
        content: 'Thật tuyệt vời, vừa hoàn thành xong 1 bài học kìa',
        time: 'Hôm qua',
        status: 2
      },
      {
        content: 'Lẹ lơn, sắp deadline mà chưa hoàn thành task kìa',
        time: '6pm hôm nay',
        status: 3
      },
      {
        content: 'Có bài tập mới cần hoàn thành nè, lẹ lẹ zô xem đề đi!',
        time: '1 tháng 3',
        status: 4
      },
      {
        content: 'Cô giáo Toán ới vào xem live kìa Trang ơi',
        time: '20 phút trước',
        status: 1
      },
      {
        content: 'Thật tuyệt vời, vừa hoàn thành xong 1 bài học kìa',
        time: 'Hôm qua',
        status: 2
      },
      {
        content: 'Lẹ lơn, sắp deadline mà chưa hoàn thành task kìa',
        time: '6pm hôm nay',
        status: 3
      },
      {
        content: 'Có bài tập mới cần hoàn thành nè, lẹ lẹ zô xem đề đi!',
        time: '1 tháng 3',
        status: 4
      }
    ]
  }

  private createBreadcrumbs(url: string): string[] {
    // Loại bỏ ký tự "/" ở đầu và chia URL thành các phần tử
    const parts = url.split('/').filter((part) => part !== '');

    // Dựa trên các phần tử URL, tạo mảng breadcrumbs
    const breadcrumbs = [];
    let currentUrl = ''; // Breadcrumb gốc

    for (const part of parts) {
      currentUrl += `${part}`;
      breadcrumbs.push(this.getMenuTitle(currentUrl));
    }
    return breadcrumbs;
  }
  getMenuTitle(url: string): string {
    const menuItem = this.menus.find((item) => item.url === url);
    return menuItem ? menuItem.title : url;
  }
  getMenuUrl(title: string): string {
    const menuItem = this.menus.find((item) => item.title === title);
    return menuItem ? menuItem.url : title;
  }

  showConfirm(): void {
    this.modal.confirm({
      nzTitle: '<i>Do you Want to log out?</i>',
      nzOnOk: () => {
        localStorage.clear();
        this.msg.success('Logout success');
        this.router.navigate(['/auth/login']);
        window.location.reload();
      },
      //   new Promise((resolve, reject) => {
      //       // this.authenSer.logout().subscribe((res) => {
      //       //   localStorage.clear();
      //       //   this.msg.success(res.message);
      //       //   this.router.navigate(['/auth/login']);
      //       //   window.location.reload();
      //       // }, (error) =>
      //       //   this.msg.error('Logout unsuccessfully')
      //       // );
      //     }).catch((error) => console.log(error)),
      // });
    });
  }

  uploadFile() {
    
  }
}
