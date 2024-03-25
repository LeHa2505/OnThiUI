import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-course',
  templateUrl: './list-course.component.html',
  styleUrls: ['./list-course.component.less'],
})
export class ListCourseComponent implements OnInit {
  
  listCourse: any[] = [];
  listClass: any[]  = [];
  checkOptionsOne = [
    { label: 'Toán học', value: 'Toán học', checked: true },
    { label: 'Ngữ Văn', value: 'Ngữ Văn' },
    { label: 'Tiếng Anh', value: 'Tiếng Anh' },
    { label: 'Hóa học', value: 'Hóa học' },
    { label: 'Vật lý', value: 'Vật lý' },
    { label: 'Sinh học', value: 'Sinh học' },
    { label: 'Tiếng Anh', value: 'Tiếng Anh' },
    { label: 'Tiếng Nhật', value: 'Tiếng Nhật' },
    { label: 'Tiếng Trung', value: 'Tiếng Trung' },
    { label: 'Tiếng Pháp', value: 'Tiếng Pháp' },
    { label: 'Giáo dục công dân', value: 'Giáo dục công dân' },
  ];

  constructor() {}

  ngOnInit(): void {
    this.initListCourse();
    this.initListClass();
  }

  initListClass() {
    this.listClass = [
      {
        name: 'Toán 1',
        description:
          'Chiến thần môn toán, quyết tâm lấy điểm cao để zô trường top nhé các iem',
        noti: 'LIVE',
        liveTime: '5pm',
        schedule: 'Thứ 2, 3 hằng tuần',
        timeDetail: '02.00 -03.30 PM',
        teacherName: 'Cô Liên',
        memberList: '25',
      },
      {
        name: 'Ngữ Văn 2',
        description:
          'Bậc thầy văn chương, nắm vững những ý chính để triển khai bài viết mượt mà nha',
        schedule: 'Thứ 2, 3 hằng tuần',
        timeDetail: '02.00 -03.30 PM',
        teacherName: 'Cô Liên',
        memberList: '25',
      },
      {
        name: 'Tiếng Anh 3',
        description:
          'Chiến thần môn toán, quyết tâm lấy điểm cao để zô trường top nhé các iem',
        noti: 'LIVE',
        liveTime: '5pm',
        schedule: 'Thứ 2, 3 hằng tuần',
        timeDetail: '02.00 -03.30 PM',
        teacherName: 'Cô Liên',
        memberList: '25',
      },
      {
        name: 'Toán 4',
        description:
          'Chiến thần môn toán, quyết tâm lấy điểm cao để zô trường top nhé các iem',
        noti: 'LIVE',
        liveTime: '5pm',
        schedule: 'Thứ 2, 3 hằng tuần',
        timeDetail: '02.00 -03.30 PM',
        teacherName: 'Cô Liên',
        memberList: '25',
      },
      {
        name: 'Toán 5',
        description:
          'Chiến thần môn toán, quyết tâm lấy điểm cao để zô trường top nhé các iem',
        noti: 'LIVE',
        liveTime: '5pm',
        schedule: 'Thứ 2, 3 hằng tuần',
        timeDetail: '02.00 -03.30 PM',
        teacherName: 'Cô Liên',
        memberList: '25',
      },
    ];
  }

  initListCourse() {
    this.listCourse = [
      {
        id: 'abc',
        title: 'Tổng ôn kiến thức Toán 9 các dạng Nâng cao',
        time: '3 tháng',
        teacher: 'Cô Lan',
        tags: [
          {
            nameTag: 'Toán',
            colorTag: 'blue' 
          },
          {
            nameTag: 'Nâng cao',
            colorTag: 'magenta' 
          }
        ],
        lessons: 80,
        quizs: 200,
        price: 599,
        discount: 499,
      },
      {
        id: 'abc',
        title: 'Tổng ôn kiến thức Toán 9 các dạng Nâng cao',
        time: '3 tháng',
        teacher: 'Cô Lan',
        tags: [
          {
            nameTag: 'Toán',
            colorTag: 'blue' 
          },
          {
            nameTag: 'Nâng cao',
            colorTag: 'magenta' 
          }
        ],
        lessons: 80,
        quizs: 200,
        price: 599,
        discount: 499,
      },
      {
        id: 'abc',
        title: 'Tổng ôn kiến thức Toán 9 các dạng Nâng cao',
        time: '3 tháng',
        teacher: 'Cô Lan',
        tags: [
          {
            nameTag: 'Toán',
            colorTag: 'blue' 
          },
          {
            nameTag: 'Nâng cao',
            colorTag: 'magenta' 
          }
        ],
        lessons: 80,
        quizs: 200,
        price: 599,
        discount: 499,
      },
      {
        id: 'abc',
        title: 'Tổng ôn kiến thức Toán 9 các dạng Nâng cao',
        time: '3 tháng',
        teacher: 'Cô Lan',
        tags: [
          {
            nameTag: 'Toán',
            colorTag: 'blue' 
          },
          {
            nameTag: 'Nâng cao',
            colorTag: 'magenta' 
          }
        ],
        lessons: 80,
        quizs: 200,
        price: 599,
        discount: 499,
      },
      {
        id: 'abc',
        title: 'Tổng ôn kiến thức Toán 9 các dạng Nâng cao',
        time: '3 tháng',
        teacher: 'Cô Lan',
        tags: [
          {
            nameTag: 'Toán',
            colorTag: 'blue' 
          },
          {
            nameTag: 'Nâng cao',
            colorTag: 'magenta' 
          }
        ],
        lessons: 80,
        quizs: 200,
        price: 599,
        discount: 499,
      },
      {
        id: 'abc',
        title: 'Tổng ôn kiến thức Toán 9 các dạng Nâng cao',
        time: '3 tháng',
        teacher: 'Cô Lan',
        tags: [
          {
            nameTag: 'Toán',
            colorTag: 'blue' 
          },
          {
            nameTag: 'Nâng cao',
            colorTag: 'magenta' 
          }
        ],
        lessons: 80,
        quizs: 200,
        price: 599,
        discount: 499,
      }
    ];
  }

  log(value: string[]): void {
    console.log(value);
  }
}
