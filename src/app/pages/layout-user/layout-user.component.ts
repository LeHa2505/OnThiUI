import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';

@Component({
  selector: 'app-layout-user',
  templateUrl: './layout-user.component.html',
  styleUrls: ['./layout-user.component.less'],
})
export class LayoutUserComponent implements OnInit {
  idUser = localStorage.getItem('user_id');
  role = localStorage.getItem('role');;
  username = localStorage.getItem('username');
  avatar =  localStorage.getItem('avatar');
  isCollapsed = false;
  notifications: any;

  menus: any[] = [
    {
      title: 'Trang chủ',
      icon: 'fas fa-house',
      url: '',
      role: '1',
    },
    {
      title: 'Khoá học',
      icon: 'fas fa-person-chalkboard',
      url: 'courses',
      role: '1',
    },
    // {
    //   title: 'Lịch học',
    //   icon: 'fas fa-calendar',
    //   url: 'my-calendar',
    //   role: 'student',
    // },
    // {
    //   title: 'Nhóm',
    //   icon: 'fas fa-user-group',
    //   role: 'student',
    // },
    {
      title: 'Tin nhắn',
      icon: 'fas fa-comment',
      role: '1',
      url: 'chat'
    },
    {
      title: 'Quản lý học viên',
      icon: 'fas fa-user',
      role: '2',
      url: 'student-manager'
    },
    {
      title: 'Quản lý khóa học',
      icon: 'fas fa-person-chalkboard',
      role: '2',
      url: 'course-manager'
    },
    {
      title: 'Quản lý người dùng',
      icon: 'fas fa-user',
      role: '0',
      url: 'admin/user-manage'
    },
    {
      title: 'Quản lý khóa học',
      icon: 'fas fa-person-chalkboard',
      role: '0',
      url: 'admin/course-manage'
    },
  ];

  breadcrumbs: string[] = [];

  url: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modal: NzModalService,
    private authenSer: AuthenticationService,
    private msg: NzMessageService,
  ) {
  }

  ngOnInit(): void {
    this.initUserInform();
    this.initNotification();
    // Theo dõi sự kiện thay đổi URL
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Lấy URL hiện tại
        this.url = this.router.url;
        // console.log('this.url',this.url);
        // Tạo breadcrumbs từ URL
        this.breadcrumbs = this.createBreadcrumbs(this.url);
      }
    });
    // Lấy breadcrumbs cho URL ban đầu
    const initialUrl = this.router.url;
    this.breadcrumbs = this.createBreadcrumbs(initialUrl);
  }

  // createNotification(message: string, type: string): void {
  //   this.notification.create(type, '', message).onClick.subscribe(() => {
  //     console.log('notification clicked!');
  //   });
  // }

  initUserInform() {
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
      nzTitle: '<i>Bạn muốn đăng xuất?</i>',
      nzOnOk: () => {
        localStorage.clear();
        // this.createNotification('Bạn đã đăng xuất thành công', 'success');
        // this.msg.success('Logout success');
        this.router.navigate(['/auth/login']);
        window.location.reload();
      },
      nzCentered: true
    });
  }
}
