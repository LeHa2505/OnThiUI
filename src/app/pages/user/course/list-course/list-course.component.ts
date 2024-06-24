import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CourseFilterModel } from 'src/app/models/CourseFilterModel.model';
import { CourseService } from 'src/app/service/course-service/course.service';
import { colorsArray } from 'src/constants';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user-service/user.service';
import { UploadService } from 'src/app/service/upload-service/upload.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-list-course',
  templateUrl: './list-course.component.html',
  styleUrls: ['./list-course.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class ListCourseComponent implements OnInit {
  listCourse: any[] = [];
  role = localStorage.getItem('role');
  idUser = localStorage.getItem('user_id');
  userAvatar = localStorage.getItem('avatar');
  listClass: any[] = [];
  checkOptions: any[] = [];
  selectedSubject: object[];
  selectedMenuItem: string;
  courseFilter: CourseFilterModel = new CourseFilterModel();
  colorsArray = colorsArray;
  totalCourses: number;
  currentPage: number = 1;
  allCourses: any[] = [];
  courseName: string;
  teacherName: string;
  isLoading = false;
  messageNotification: string;
  isLoadingClass = false;
  listProvinces: any;
  listOfOption = ['Apples', 'Nails', 'Bananas', 'Helicopters'];
  listOfSelectedValue: string[] = [];
  public sanitizedContent: SafeHtml;

  @ViewChild('template', { static: true }) template!: TemplateRef<any>;

  constructor(
    private courseService: CourseService,
    private userService: UserService,
    private notification: NzNotificationService,
    public router: Router,
    private fileService: UploadService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.initListCourse();
    this.initListClass();
    this.initCheckOptions();
    this.initProvinces();
  }

  initProvinces() {
    this.userService.getAllProvinces().subscribe((res) => {
      this.listProvinces = res.data.data;
    });
  }

  initListClass() {
    this.isLoadingClass = true;
    this.userService.getListCourses(Number(this.idUser)).subscribe((res) => {
      if (res.success) {
        if (res.data.length > 0) {
          this.listClass = res.data;
        }
        else {
          this.listClass = null;
        }
        this.isLoadingClass = false;
      }
    });
    
  }

  initListCourse() {
    this.selectedMenuItem = 'Tất cả';
    this.courseFilter.LIST_CATEGORY_NAME = [];
    this.courseFilter.COURSE_NAME = '';
    this.courseFilter.TYPE_COURSE = null;
    this.courseFilter.USERNAME = '';
    this.courseFilter.ACTIVE = true;

    this.searchApi();
  }

  initCheckOptions() {
    this.checkOptions = [
      { label: 'Toán học', value: 'toán học', checked: false },
      { label: 'Ngữ Văn', value: 'ngữ văn', checked: false },
      { label: 'Hóa học', value: 'hóa học', checked: false },
      { label: 'Vật lý', value: 'vật lý', checked: false },
      { label: 'Sinh học', value: 'sinh học', checked: false },
      { label: 'Địa lý', value: 'địa lý', checked: false },
      { label: 'Lịch sử', value: 'lịch sử', checked: false },
      { label: 'Tiếng Anh', value: 'tiếng anh', checked: false },
      { label: 'Tiếng Nhật', value: 'tiếng nhật', checked: false },
      { label: 'Tiếng Trung', value: 'tiếng trung', checked: false },
      { label: 'Tiếng Pháp', value: 'tiếng pháp', checked: false },
      {
        label: 'Giáo dục công dân',
        value: 'giáo dục công dân',
        checked: false,
      },
    ];
  }

  isNotSelected(value: string): boolean {
    return this.listOfSelectedValue.indexOf(value) === -1;
  }

  updatePaginatedCourses(pageIndex: number, pageSize: number = 12) {
    const startIndex = (pageIndex - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    this.listCourse = this.allCourses.slice(startIndex, endIndex);
  }

  onPageChange(pageIndex: number) {
    this.currentPage = pageIndex;
    this.updatePaginatedCourses(pageIndex);
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

  getRandomColor(): string {
    const randomIndex = Math.floor(Math.random() * this.colorsArray.length);
    return this.colorsArray[randomIndex];
  }

  selectMenuItem(item: string): void {
    this.selectedMenuItem = item;
    
  }

  calculateMonthsDifference(startDate: Date, endDate: Date): number {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const yearDiff = end.getFullYear() - start.getFullYear();
    const monthDiff = end.getMonth() - start.getMonth();
    const dayDiff = end.getDate() - start.getDate();

    let totalMonths = yearDiff * 12 + monthDiff;

    // If the end day is greater than the start day, add one more month to the total
    if (dayDiff > 0) {
      totalMonths += 1;
    }

    return totalMonths;
  }

  onChangeSelectedSubject(value: object[]): void {
    this.selectedSubject = value;
  }

  searchCourse() {
    this.courseFilter.LIST_CATEGORY_NAME = this.selectedSubject;
    this.courseFilter.COURSE_NAME = this.courseName;
    this.courseFilter.TYPE_COURSE = this.typeCourseToCode(
      this.selectedMenuItem
    );
    this.courseFilter.USERNAME = this.teacherName;
    this.courseFilter.ACTIVE = true;
    
    this.searchApi();
  }

  searchApi() {
    this.isLoading = true;
    this.courseService
      .getListCoursesByInputCondition(this.courseFilter)
      .subscribe((res) => {
        this.isLoading = false;
        this.allCourses = res.data; // Lưu toàn bộ danh sách khóa học
        if (this.allCourses) {
          this.totalCourses = this.allCourses.length; // Lưu tổng số khóa học
          this.updatePaginatedCourses(1);
          this.createSuccessNotification(res.message);
        } else {
          this.listCourse = [];
          this.totalCourses = 0;
          this.createBasicNotification(this.template, res.message);
        }
      });
  }

  createSuccessNotification(message: string): void {
    this.notification.create('success', '', message).onClick.subscribe(() => {
    });
  }

  createBasicNotification(template: TemplateRef<{}>, message: string): void {
    this.messageNotification = message;
    this.notification.template(template);
  }

  resetValueSelected() {
    this.selectedSubject = null;
    this.checkOptions = this.checkOptions.map((option) => ({
      ...option,
      checked: false,
    }));
  }

  getCourseDetail(item: any) {
    this.courseService.idCourse = Number(item);
    localStorage.setItem('idCourse', item);
    this.router.navigateByUrl('/courses/course-detail');
  }
}
