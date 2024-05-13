import { Component, OnDestroy, OnInit } from '@angular/core';
import { RxStompService } from 'src/app/service/chat-service/rx-stomp.service';

export interface Message {
  body: string; // Nội dung của tin nhắn
  sender?: string; // Người gửi (tùy chọn)
  timestamp?: string; // Thời gian gửi (tùy chọn)
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less']
})

export class ChatComponent implements OnInit, OnDestroy {
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

  receivedMessages: string[] = [];
  // @ts-ignore, to suppress warning related to being undefined
  private topicSubscription: Subscription;

  constructor(private rxStompService: RxStompService) {}

  ngOnInit() {
    this.topicSubscription = this.rxStompService
      .watch('/topic/public')
      .subscribe((message: Message) => {
        this.receivedMessages.push(message.body);
      });
  }

  ngOnDestroy() {
    this.topicSubscription.unsubscribe();
  }

  onSendMessage() {
    const message = `Message generated at ${new Date()}`;
    this.rxStompService.publish({ destination: '/topic/public', body: message });
  }
}
