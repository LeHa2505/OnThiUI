import { Component } from '@angular/core';
import {
  NzContextMenuService,
  NzDropdownMenuComponent,
} from 'ng-zorro-antd/dropdown';
import { NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd/tree';

@Component({
  selector: 'app-file-manage',
  templateUrl: './file-manage.component.html',
  styleUrls: ['./file-manage.component.less'],
})
export class FileManageComponent {
  constructor(private nzContextMenuService: NzContextMenuService) {}

  // activated node
  activatedNode?: NzTreeNode;
  nodes = [
    {
      title: 'Lớp Toán',
      key: '100',
      author: 'NG ZORRO',
      expanded: true,
      children: [
        {
          title: 'Chương 1. Căn bậc hai. Căn bậc ba',
          key: '1000',
          author: 'NG ZORRO',
          expanded: true,
          children: [
            {
              title: 'Bài 1. Căn bậc hai',
              key: '1000',
              author: 'NG ZORRO',
              isLeaf: true,
            },
            {
              title: 'Bài 2: Căn thức bậc hai và hằng đẳng thức căn bậc hai',
              key: '1000',
              author: 'NG ZORRO',
              isLeaf: true,
            },
            {
              title: 'Bài 3: Liên hệ giữa phép nhân và phép khai phương',
              key: '1000',
              author: 'NG ZORRO',
              isLeaf: true,
            },
            {
              title: 'Bài 4: Liên hệ giữa phép chia và phép khai phương',
              key: '1000',
              author: 'NG ZORRO',
              isLeaf: true,
            },
            {
              title: 'Bài 5: Bảng căn bậc hai',
              key: '1000',
              author: 'NG ZORRO',
              isLeaf: true,
            },
          ],
        },
        {
          title: 'Chương 2. Hàm số bậc nhất',
          key: '1000',
          author: 'NG ZORRO',
          expanded: true,
          children: [
            {
              title: 'Bài 1: Nhắc lại và bổ sung các khái niệm về hàm số',
              key: '1000',
              author: 'NG ZORRO',
              isLeaf: true,
            },
            {
              title: 'Bài 2. Hàm số bậc nhất',
              key: '1000',
              author: 'NG ZORRO',
              isLeaf: true,
            },
            {
              title: 'Bài 3: Đồ thị của hàm số y = ax + b (a ≠ 0)',
              key: '1000',
              author: 'NG ZORRO',
              isLeaf: true,
            },
            {
              title: 'Bài 4: Đường thẳng song song và đường thẳng cắt nhau',
              key: '1000',
              author: 'NG ZORRO',
              isLeaf: true,
            },
            {
              title: 'Bài 5: Hệ số góc của đường thẳng y = ax + b (a ≠ 0)',
              key: '1000',
              author: 'NG ZORRO',
              isLeaf: true,
            },
          ]
        },
      ],
    },
    {
      title: 'Lớp Văn',
      key: '100',
      author: 'NG ZORRO',
      expanded: true,
      children: [
        {
          title: 'Bài 1 Ngữ Văn 9',
          key: '1000',
          author: 'NG ZORRO',
          expanded: true,
          children: [
            {
              title: 'Phong cách Hồ Chí Minh - Lê Anh Trà',
              key: '1000',
              author: 'NG ZORRO',
              isLeaf: true,
            },
            {
              title: 'Các phương châm hội thoại',
              key: '1000',
              author: 'NG ZORRO',
              isLeaf: true,
            },
            {
              title: 'Sử dụng một số biện pháp nghệ thuật trong văn bản thuyết minh',
              key: '1000',
              author: 'NG ZORRO',
              isLeaf: true,
            },
            {
              title: 'Luyện tập sử dụng một số biện pháp nghệ thuật trong văn bản thuyết minh',
              key: '1000',
              author: 'NG ZORRO',
              isLeaf: true,
            }
          ],
        },
        {
          title: 'Bài 2 Ngữ Văn 9',
          key: '1000',
          author: 'NG ZORRO',
          expanded: true,
          children: [
            {
              title: 'Đấu tranh cho một thế giới hòa bình - G.G. Mác-két',
              key: '1000',
              author: 'NG ZORRO',
              isLeaf: true,
            },
            {
              title: 'Các phương châm hội thoại (tiết 2)',
              key: '1000',
              author: 'NG ZORRO',
              isLeaf: true,
            },
            {
              title: 'Sử dụng yếu tố miêu tả trong văn bản thuyết minh',
              key: '1000',
              author: 'NG ZORRO',
              isLeaf: true,
            },
            {
              title: 'Luyện tập sử dụng yếu tố miêu tả trong văn bản thuyết minh',
              key: '1000',
              author: 'NG ZORRO',
              isLeaf: true,
            },
          ]
        },
      ],
    },
  ];

  name = 'Angular';
  pdfSrc = 'https://res.cloudinary.com/djiv03sxd/image/upload/v1717519493/file/ootd5qumpnfzjsmsvrt8.pdf';

  contentLoaded() {
    console.log('File loaded');
  }

  openFolder(data: NzTreeNode | NzFormatEmitEvent): void {
    // do something if u want
    if (data instanceof NzTreeNode) {
      data.isExpanded = !data.isExpanded;
    } else {
      const node = data.node;
      if (node) {
        node.isExpanded = !node.isExpanded;
      }
    }
  }

  activeNode(data: NzFormatEmitEvent): void {
    this.activatedNode = data.node!;
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }

  selectDropdown(): void {
    // do something
  }
}
