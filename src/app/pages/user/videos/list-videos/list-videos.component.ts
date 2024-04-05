import { Component } from '@angular/core';

@Component({
  selector: 'app-list-videos',
  templateUrl: './list-videos.component.html',
  styleUrls: ['./list-videos.component.less']
})
export class ListVideosComponent {
  shorts = [
    {
      name: 'Kiến thức vật lý hay ho bổ ích',
      views: '1 triệu',
      img: 'https://i.pinimg.com/564x/38/30/4c/38304cc276e608f349dd84ca9df991fa.jpg',
    },
    {
      name: 'Tips hay cho bài toán căn bậc hai',
      views: '1 triệu',
      img: 'https://i.pinimg.com/564x/40/28/44/4028441952c481d349f7d743ab0a4aa6.jpg',
    },
    {
      name: 'Từ vựng xuất hiện nhiều trong hội thoại hằng ngày',
      views: '1 triệu',
      img: 'https://i.pinimg.com/564x/12/3d/6e/123d6e189f86e4aef3098e2eadd128c5.jpg',
    },
    {
      name: 'Những từ cần phải ghi nhớ',
      views: '1 triệu',
      img: 'https://i.pinimg.com/564x/54/20/1c/54201cde763411a0dd53c8093a42862b.jpg',
    },
    {
      name: 'Những từ cần phải ghi nhớ',
      views: '1 triệu',
      img: 'https://i.pinimg.com/564x/2b/5e/bd/2b5ebd3e3acb6233aad288173f19885e.jpg',
    },
    {
      name: 'Kiến thức vật lý hay ho bổ ích',
      views: '1 triệu',
      img: 'https://i.pinimg.com/564x/58/00/d8/5800d8b48df1ae07f1124451138ba31a.jpg',
    },
    {
      name: 'Tips hay cho bài toán căn bậc hai',
      views: '1 triệu',
      img: 'https://i.pinimg.com/564x/16/ec/45/16ec4585d91f730f249862c64bc37e3a.jpg',
    },
    {
      name: 'Từ vựng xuất hiện nhiều trong hội thoại hằng ngày',
      views: '1 triệu',
      img: 'https://i.pinimg.com/564x/5b/e7/cf/5be7cfdc7172bc7419e879f2182b60f1.jpg',
    },
    {
      name: 'Những từ cần phải ghi nhớ',
      views: '1 triệu',
      img: 'https://i.pinimg.com/564x/2b/cd/54/2bcd5407cbe152ad116fed21d4913bcc.jpg',
    },
    {
      name: 'Những từ cần phải ghi nhớ',
      views: '1 triệu',
      img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgd9o9wLIBk3dKcb4MwUCzaS1GqF4NU19v1PGzZRFUZjKt9qdEzyy08JBiBHjOJmfVINS_rN_wQjzRjmSdu4fLRbpIV6srtV8dYT0Lxgn_65OuKSVtrtuv474Ff4SVrr0xUoKv6Ee7D09V4/s1600/Spiral+Math-8.jpg',
    },
  ];
}
