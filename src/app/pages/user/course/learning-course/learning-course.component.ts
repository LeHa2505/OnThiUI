import { Component } from '@angular/core';
import { formatDistance } from 'date-fns';
import { vi } from 'date-fns/locale';

@Component({
  selector: 'app-learning-course',
  templateUrl: './learning-course.component.html',
  styleUrls: ['./learning-course.component.less']
})
export class LearningCourseComponent {
  editorConfig = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'lists link image table wordcount',
    menubar: false,
  }

  activeTab = 1;

  panels = [
    {
      active: false,
      name: 'Hướng dẫn học trực tuyến',
      time: '20 phút',
      lesson: [
        {
          time: '20 phút',
          name: 'Hướng dẫn học trực tuyến',
        },
      ],
      disabled: false,
    },
    {
      active: false,
      time: '2 tiếng',
      lesson: [
        {
          name: 'Căn bậc hai và khai căn',
          time: '65:00',
        },
        {
          name: 'Căn bậc ba',
          time: '25:00',
        },
        {
          name: 'Giải phương trình',
          time: '30:00',
        },
      ],
      disabled: false,
      name: 'Chủ đề 2. Hệ thức lượng',
    },
    {
      active: false,
      lesson: [
        {
          name: 'Hệ thức lượng',
          time: '30:00',
        },
      ],
      time: '20 phút',
      disabled: true,
      name: 'Chủ đề 3. Hàm số bậc nhất',
    },
    {
      active: false,
      lesson: [
        {
          name: 'Hệ thức lượng',
          time: '30:00',
        },
      ],
      time: '20 phút',
      disabled: true,
      name: 'Chủ đề 4. Đường tròn',
    },
    {
      active: false,
      lesson: [
        {
          name: 'Hệ thức lượng',
          time: '30:00',
        },
      ],
      time: '1 tiếng',
      disabled: true,
      name: 'Chủ đề 5. Hệ phương trình',
    },
  ];

  ratings = [
    {
      type: '5 sao',
      percent: 80,
    },
    {
      type: '4 sao',
      percent: 15,
    },
    {
      type: '3 sao',
      percent: 3,
    },
    {
      type: '2 sao',
      percent: 1,
    },
    {
      type: '1 sao',
      percent: 1,
    },
  ];

  comments = [
    {
      author: 'Trang',
      like: 0,
      dislike: 0,
      time: formatDistance(new Date(), new Date(), { locale: vi }),
      content: 'Em có một chút thắc mắc về căn bậc 2 như này ... Mong cô giải đáp ạ',
    },
    {
      author: 'Linh',
      like: 2,
      dislike: 1,
      time: formatDistance(new Date(), new Date(), { locale: vi }),
      content: 'Em có một chút thắc mắc về căn bậc 2 như này ... Mong cô giải đáp ạ',
    },
  ];

  files = [
    {
      fileName: 'Chủ đề 01. Căn thức.pdf',
      fileSize: '4.5 MB',
      isDownloaded: true,
      isDownloading: true,
      fileType: 'pdf'
    },
    {
      fileName: 'Chủ đề 01. Căn thức.pdf',
      fileSize: '25.7 MB',
      isDownloaded: true,
      isDownloading: true,
      fileType: 'pdf'
    },
    {
      fileName: 'Chủ đề 01. Căn thức.pdf',
      fileSize: '350 KB',
      isDownloaded: false,
      isDownloading: false,
      fileType: 'exel'
    },
    {
      fileName: 'Chủ đề 01. Căn thức.pdf',
      fileSize: '350 KB',
      isDownloaded: false,
      isDownloading: false,
      fileType: 'docs'
    },
    {
      fileName: 'Chủ đề 01. Căn thức.pdf',
      fileSize: '350 KB',
      isDownloaded: false,
      isDownloading: false,
      fileType: 'docs'
    },
    {
      fileName: 'Chủ đề 01. Căn thức.pdf',
      fileSize: '350 KB',
      isDownloaded: false,
      isDownloading: false,
      fileType: 'docs'
    }
  ]

  quizs = [
    {
      name: 'Bài tập về Căn thức',
      isFinish: true
    },
    {
      name: 'Bài tập về Căn thức',
      isFinish: false
    },
    {
      name: 'Bài tập về Căn thức',
      isFinish: false
    }
  ]

  data: any[] = [];
  submitting = false;
  user = {
    author: 'Hà Trang',
    avatar: 'https://cdn-icons-png.flaticon.com/512/1993/1993167.png'
  };
  inputValue = '';

  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
    this.inputValue = '';
    setTimeout(() => {
      this.submitting = false;
      this.data = [
        ...this.data,
        {
          ...this.user,
          content,
          datetime: new Date(),
          displayTime: formatDistance(new Date(), new Date())
        }
      ].map(e => ({
        ...e,
        displayTime: formatDistance(new Date(), e.datetime)
      }));
    }, 800);
  }

  // like(): void {
  //   this.likes = 1;
  //   this.dislikes = 0;
  // }

  // dislike(): void {
  //   this.likes = 0;
  //   this.dislikes = 1;
  // }

  onTabChange(index: number) {
    this.activeTab = index + 1;
  }
}
