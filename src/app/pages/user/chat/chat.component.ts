import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less']
})
export class ChatComponent {
  friends = [
    {
      name: 'Bạn 1',
      newestMess: 'Alo alo',
      time: '12 phút trước',
      tag: [
        'Nhóm toán',
        'Nhóm văn'
      ]
    },
    {
      name: 'Bạn 1',
      newestMess: 'Alo alo',
      time: '12 phút trước',
      tag: [
        'Nhóm toán',
        'Nhóm văn'
      ]
    },
    {
      name: 'Bạn 1',
      newestMess: 'Alo alo',
      time: '12 phút trước',
      tag: [
        'Nhóm toán',
        'Nhóm văn'
      ]
    },
    {
      name: 'Bạn 1',
      newestMess: 'Alo alo',
      time: '12 phút trước',
      tag: [
        'Nhóm toán',
        'Nhóm văn'
      ]
    },
    {
      name: 'Bạn 1',
      newestMess: 'Alo alo',
      time: '12 phút trước',
      tag: [
        'Nhóm toán',
        'Nhóm văn'
      ]
    },
    {
      name: 'Bạn 1',
      newestMess: 'Alo alo',
      time: '12 phút trước',
      tag: [
        'Nhóm toán',
        'Nhóm văn'
      ]
    },
    {
      name: 'Bạn 1',
      newestMess: 'Alo alo',
      time: '12 phút trước',
      tag: [
        'Nhóm toán',
        'Nhóm văn'
      ]
    },
    {
      name: 'Bạn 1',
      newestMess: 'Alo alo',
      time: '12 phút trước',
      tag: [
        'Nhóm toán',
        'Nhóm văn'
      ]
    }
  ]
  searchFriend: any;
}
