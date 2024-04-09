import { Component } from '@angular/core';
import { formatDistance } from 'date-fns';
import { vi } from 'date-fns/locale';

@Component({
  selector: 'app-watch-video',
  templateUrl: './watch-video.component.html',
  styleUrls: ['./watch-video.component.less'],
})
export class WatchVideoComponent {
  short = {
    title:
      '3 lưu ý quan trọng cho 2k9 học Toán tốt hơn. Lưu lại ngay nhé. #2k9quyettamdonv1 #toan9 #LearnOnTikTok #hocgioilop9 #tuyensinh10',
    author: 'Ngô Thị Lan',
    avatar:
      'https://img.freepik.com/free-photo/asian-woman-teacher-with-notebooks-smiling-looking-confident-isolated-white-background_1258-166523.jpg',
    timeUpload: formatDistance(
      new Date(),
      new Date(new Date().getTime() - 7 * 60 * 60 * 1000),
      { locale: vi }
    ),
    url: '../../../../../assets/videos/shorts-1.mp4',
    description:
      'Để nâng cao kỹ năng Toán trong năm học 2k9, hãy lưu ý ba điều quan trọng này: thực hành thường xuyên, hiểu rõ kiến thức cơ bản, và giữ tinh thần quyết tâm. Hãy ghi nhớ để có cơ hội thành công trong học tập và kỳ thi sắp tới!',
  };

  comments = [
    {
      author: 'Trang',
      like: 0,
      dislike: 0,
      time: formatDistance(new Date(), new Date(), { locale: vi }),
      content:
        'Em có một chút thắc mắc về căn bậc 2 như này ... Mong cô giải đáp ạ',
    },
    {
      author: 'Linh',
      like: 2,
      dislike: 1,
      time: formatDistance(new Date(), new Date(), { locale: vi }),
      content:
        'Em có một chút thắc mắc về căn bậc 2 như này ... Mong cô giải đáp ạ',
    },
    {
      author: 'Trang',
      like: 0,
      dislike: 0,
      time: formatDistance(new Date(), new Date(), { locale: vi }),
      content:
        'Em có một chút thắc mắc về căn bậc 2 như này ... Mong cô giải đáp ạ',
    },
    {
      author: 'Linh',
      like: 2,
      dislike: 1,
      time: formatDistance(new Date(), new Date(), { locale: vi }),
      content:
        'Em có một chút thắc mắc về căn bậc 2 như này ... Mong cô giải đáp ạ',
    },
    {
      author: 'Trang',
      like: 0,
      dislike: 0,
      time: formatDistance(new Date(), new Date(), { locale: vi }),
      content:
        'Em có một chút thắc mắc về căn bậc 2 như này ... Mong cô giải đáp ạ',
    },
    {
      author: 'Linh',
      like: 2,
      dislike: 1,
      time: formatDistance(new Date(), new Date(), { locale: vi }),
      content:
        'Em có một chút thắc mắc về căn bậc 2 như này ... Mong cô giải đáp ạ',
    },
  ];

  data: any[] = [];

  submitting = false;
  user = {
    author: 'Hà Trang',
    avatar: 'https://cdn-icons-png.flaticon.com/512/1993/1993167.png',
  };
  inputValue = '';

  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
    this.inputValue = '';
    setTimeout(() => {
      this.submitting = false;
      const newData = [
        {
          ...this.user,
          content,
          datetime: new Date(),
          displayTime: formatDistance(new Date(), new Date(), { locale: vi }),
        },
        ...this.data,
      ];
      this.data = newData.map((e) => ({
        ...e,
        displayTime: formatDistance(new Date(), e.datetime, { locale: vi }),
      }));
    }, 800);
  }
}
