import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject } from 'rxjs';
import { CourseService } from 'src/app/service/course-service/course.service';
import { UploadService } from 'src/app/service/upload-service/upload.service';
import { UserService } from 'src/app/service/user-service/user.service';

@Component({
  selector: 'app-course-manager',
  templateUrl: './course-manager.component.html',
  styleUrls: ['./course-manager.component.less'],
})
export class CourseManagerComponent {
  role = localStorage.getItem('role');
  idUser = localStorage.getItem('user_id');
  userAvatar = localStorage.getItem('avatar');
  listCourses: any;
  paginatedCourses = [];
  pageIndex = 1;
  pageSize = 5; // number of items per page
  total = 0;

  constructor(
    private mess: NzMessageService,
    private userService: UserService,
    private modal: NzModalService,
    private fileService: UploadService,
    private notification: NzNotificationService,
    private couserService: CourseService
  ) {}

  ngOnInit(): void {
    this.getListCoursesByInputConditionAPI();
  }

  getListCoursesByInputConditionAPI() {
    this.couserService
      .getListCoursesByInputCondition({
        ID_USER: this.idUser,
      })
      .subscribe((res) => {
        this.listCourses = res.data;
        this.total = this.listCourses.length;
        this.updatePaginatedCourses();
      });
  }

  onPageChange(pageIndex: number) {
    this.pageIndex = pageIndex;
    this.updatePaginatedCourses();
  }

  updatePaginatedCourses() {
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedCourses = this.listCourses.slice(startIndex, endIndex);
  }


  getCategoryNameColor(type: string): string {
    const categoryName = type.toLowerCase();
    switch (categoryName) {
      case 'toán':
        return 'red';
      case 'ngữ văn':
        return 'geekblue';
      case 'hóa học':
        return 'orange';
      case 'vật lý':
        return 'gold';
      case 'sinh học':
        return 'volcano';
      case 'địa lý':
        return 'lime';
      case 'lịch sử':
        return 'purple';
      case 'tiếng pháp':
        return 'volcano';
      case 'tiếng trung':
        return 'gold';
      case 'tiếng nhật':
        return 'geekblue';
      case 'tiếng anh':
        return 'lime';
      case 'gdcd':
        return 'purple';
      default:
        return '#A4DDDE';
    }
  }

  typeCourseToCode(type: string): number {
    switch (type) {
      case 'Khóa cơ bản':
        return 0;
      case 'Khóa nâng cao':
        return 1;
      case 'Luyện đề theo tỉnh thành':
        return 2;
      default:
        return null;
    }
  }

  getCourseTypeColor(type: number): string {
    switch (type) {
      case 0:
        return 'green';
      case 1:
        return 'magenta';
      case 2:
        return 'blue';
      default:
        return 'cyan';
    }
  }

  getCourseType(type: number): string {
    switch (type) {
      case 0:
        return 'Cơ bản';
      case 1:
        return 'Nâng cao';
      case 2:
        return 'Luyện đề';
      default:
        return 'Unknown';
    }
  }
}
