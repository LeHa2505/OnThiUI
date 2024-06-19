import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { HttpClient } from '@angular/common/http';
import { RxStompService } from 'src/app/service/chat-service/rx-stomp.service';
import { UserService } from 'src/app/service/user-service/user.service';
import {
  format,
  differenceInWeeks,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  parseISO,
  formatDistanceToNow,
} from 'date-fns';
import { vi } from 'date-fns/locale';

@Component({
  selector: 'app-layout-user',
  templateUrl: './layout-user.component.html',
  styleUrls: ['./layout-user.component.less'],
})
export class LayoutUserComponent implements OnInit {
  idUser = localStorage.getItem('user_id');
  role = localStorage.getItem('role');
  username = localStorage.getItem('username');
  avatar = localStorage.getItem('avatar');
  isCollapsed = false;
  notifications: any;
  title = 'WebSocketChatRoom';
  newmessage: string;
  private stompClient = null;
  notiLength: number;

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
      url: 'chat',
    },
    {
      title: 'Quản lý học viên',
      icon: 'fas fa-user',
      role: '2',
      url: 'student-manager',
    },
    {
      title: 'Quản lý khóa học',
      icon: 'fas fa-person-chalkboard',
      role: '2',
      url: 'course-manager',
    },
    {
      title: 'Quản lý người dùng',
      icon: 'fas fa-user',
      role: '0',
      url: 'admin/user-manage',
    },
    {
      title: 'Khóa học',
      icon: 'book',
      role: '0',
      subMenus: [
        {
          title: 'Quản lý khóa học',
          url: 'admin/course-manage',
        },
        {
          title: 'Yêu cầu mới',
          url: 'admin/course-request',
        },
      ],
    },
  ];

  breadcrumbs: string[] = [];
  disabled = true;
  greetings: string[] = [];
  url: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private modal: NzModalService,
    private authenSer: AuthenticationService,
    private msg: NzMessageService,
    private rxStompService: RxStompService,
    private el: ElementRef,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
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
    // Lấy breadcrumbs cho URL ban đầu
    const initialUrl = this.router.url;
    this.breadcrumbs = this.createBreadcrumbs(initialUrl);
    this.connect();
  }

  setConnected(connected: boolean) {
    this.disabled = !connected;
    if (connected) {
      // this.initNotification();
    }
  }

  private connectInterval: any;

  connect() {
    // const _this = this;

    // // Attempt to connect
    // const tryConnect = () => {
    //   const socket = new SockJS('http://localhost:8899/chat');
    //   _this.stompClient = Stomp.over(socket);
    //   _this.stompClient.connect(
    //     {},
    //     function (frame) {
    //       _this.initNotification();
    //       // Assuming you have a method to handle connected state
    //       // _this.setConnected(true);
    //       _this.stompClient.subscribe(
    //         '/send/notifications',
    //         function (notification) {
    //           // Assuming you have a method to handle new notifications
    //           // _this.handleNewNotification(JSON.parse(notification.body));
    //         }
    //       );
    //     },
    //     function (error) {
    //       // Handle connection error here if needed
    //     }
    //   );
    // };

    // // Start the initial connection attempt
    // tryConnect();

    // // Set up interval to reconnect every 0.5 seconds
    // this.connectInterval = setInterval(() => {
    //   tryConnect();
    // }, 2000);
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.disconnect();
      clearInterval(this.connectInterval);
    }
  }

  handleNewNotification(notification) {
    this.notifications.push(notification);
    // Cập nhật giao diện người dùng nếu cần thiết
  }

  showMessage(message) {
    this.greetings.push(message);
  }

  initUserInform() {}

  initNotification() {
    this.userService.getListNotification(this.idUser).subscribe((res) => {
      if (res.success) {
        this.notifications = res.data;
        this.notifications.sort((a, b) => {
          // Sắp xếp theo trạng thái IS_SEEN (false trước, true sau)
          if (a.IS_SEEN === false && b.IS_SEEN === true) {
            return -1; // a đến trước b
          } else if (a.IS_SEEN === true && b.IS_SEEN === false) {
            return 1; // b đến trước a
          } else {
            return 0; // Giữ nguyên thứ tự
          }
        });
        this.notiLength = this.notifications.reduce((count, notification) => {
          if (notification.IS_SEEN === false) {
              return count + 1;
          } else {
              return count;
          }
      }, 0);
      }
    });
  }

  updateNoti(item: any) {
    this.userService
      .updateNotification({
        ID_NOTIFICATION: item.ID_NOTIFICATION,
        ID_USER: item.ID_USER,
        IS_SEEN: true,
        CONTENT: item.CONTENT,
        TYPE_NOTIFICATION: item.TYPE_NOTIFICATION,
      })
      .subscribe((res) => {
        this.initNotification();
      });
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
      nzCentered: true,
    });
  }

  convertTime(timeString: string): string {
    const date = parseISO(timeString);
    const now = new Date();

    const weeksDifference = differenceInWeeks(now, date);

    if (weeksDifference > 7) {
      return format(date, 'dd/MM/yyyy');
    } else {
      return formatDistanceToNow(date, { addSuffix: true, locale: vi });
    }
  }
}
