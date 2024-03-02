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
  role: any = localStorage.getItem('role');
  username = localStorage.getItem('username');
  isCollapsed = false;
  menus: any[] = [
    {
      title: 'New agreement',
      icon: 'file-add',
      url: '',
      role: 'user',
    },
    {
      title: 'Manage agreements',
      icon: 'hdd',
      subMenus: [
        {
          title: 'Agreements list',
          url: 'agreements',
        },
      ],
      role: 'user',
    },
    {
      title: 'Manage LCs',
      icon: 'audit',
      subMenus: [
        {
          title: 'LCs list',
          url: 'LCs',
        },
      ],
      role: 'user',
    },
    {
      title: 'Manage documents',
      icon: 'file-done',
      subMenus: [
        {
          title: 'Documents list',
          url: `documents`,
        },
      ],
      role: 'user',
    },
    {
      title: 'Manage agreements',
      icon: 'database',
      subMenus: [
        {
          title: 'Agreements list',
          url: 'agreements',
        },
      ],
      role: 'bank',
    },
    {
      title: 'Manage LCs',
      icon: 'audit',
      subMenus: [
        {
          title: 'LCs list',
          url: 'bank/LCs',
        },
      ],
      role: 'bank',
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
