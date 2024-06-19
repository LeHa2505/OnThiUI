import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { MessageModel } from 'src/app/models/MessageModel.model';
import { ChatService } from 'src/app/service/chat-service/chat.service';
import { RxStompService } from 'src/app/service/chat-service/rx-stomp.service';

export interface Message {
  body: string; // Nội dung của tin nhắn
  sender?: string; // Người gửi (tùy chọn)
  timestamp?: string; // Thời gian gửi (tùy chọn)
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less'],
})
export class ChatComponent implements OnInit, OnDestroy {
  idUser = localStorage.getItem('user_id');
  username = localStorage.getItem('username');
  title = 'WebSocketChatRoom';
  greetings: string[] = [];
  disabled = true;
  newmessage: string;
  private stompClient = null;
  sentMessage: MessageModel;
  groups: any;

  currentGroupName: any;
  currentIdGroup: any;
  currentAvatarGroup: any;

  searchFriend: any;

  // receivedMessages = [
  //   {
  //     userName: 'Monika Figi',
  //     idUser: 1,
  //     avatar: 'https://png.pngtree.com/png-clipart/20190705/original/pngtree-phd-student-and-coach-character-avatar-icon-picture-png-image_4365456.jpg',
  //     content: 'Có ai biết làm bài 1 chương 1 ở file cô gửi không?'
  //     // ID_MESSAGE: 1,
  //     //       ID_CREATOR: 1,
  //     //       MESSAGE_BODY: "Message 1 content",
  //     //       USERNAME: "user1",
  //     //       "ID_GROUP": null
  //   },
  //   {
  //     userName: 'Monika Figi',
  //     idUser: 1,
  //     avatar: 'https://png.pngtree.com/png-clipart/20190705/original/pngtree-phd-student-and-coach-character-avatar-icon-picture-png-image_4365456.jpg',
  //     content: 'Có ai biết làm bài 1 chương 1 ở file cô gửi không?'
  //   },
  //   {
  //     userName: 'Thomas Rogh',
  //     idUser: 2,
  //     avatar: 'https://static.vecteezy.com/system/resources/thumbnails/021/770/056/small/avatar-of-a-student-character-free-vector.jpg',
  //     content: 'Hmm để mình xem lại!'
  //   },
  //   {
  //     userName: 'Monika Figi',
  //     idUser: 3,
  //     avatar: 'https://cdn3d.iconscout.com/3d/premium/thumb/student-male-7267574-5914564.png?f=webp',
  //     content: 'Lap lai!'
  //   },
  //   {
  //     userName: 'Thomas Rogh',
  //     idUser: 3,
  //     avatar: 'https://cdn3d.iconscout.com/3d/premium/thumb/student-male-7267574-5914564.png?f=webp',
  //     content: 'Lap lai!'
  //   },
  //   {
  //     userName: 'Monika Figi',
  //     idUser: 2,
  //     avatar: 'https://static.vecteezy.com/system/resources/thumbnails/021/770/056/small/avatar-of-a-student-character-free-vector.jpg',
  //     content: 'Tớ làm rồi này!'
  //   },
  //   {
  //     userName: 'Monika Figi',
  //     idUser: 2,
  //     avatar: 'https://static.vecteezy.com/system/resources/thumbnails/021/770/056/small/avatar-of-a-student-character-free-vector.jpg',
  //     content: 'Tớ làm rồi này!'
  //   }
  // ];

  receivedMessages: any;

  // @ts-ignore, to suppress warning related to being undefined
  private topicSubscription: Subscription;

  constructor(
    private rxStompService: RxStompService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private el: ElementRef,
    private chatService: ChatService
  ) {}

  ngOnInit() {
    this.connect();
    this.sentMessage = new MessageModel();
    this.getGroupsByUserId();
  }

  ngOnDestroy() {
    this.topicSubscription.unsubscribe();
  }

  setConnected(connected: boolean) {
    this.disabled = !connected;
    if (connected) {
      this.greetings = [];
    }
  }

  connect() {
    const socket = new SockJS('http://localhost:8899/chat');
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.connect({}, function (frame) {
      _this.stompClient.subscribe('/start/initial', function (hello) {
        _this.showMessage(JSON.parse(hello.body));
      });
    });
  }

  sendMessage() {
    // fomat message
    this.sentMessage.ID_CREATOR = Number(this.idUser);
    this.sentMessage.MESSAGE_BODY = this.newmessage;
    this.sentMessage.USERNAME = this.username;
    this.sentMessage.ID_GROUP = this.currentIdGroup;

    this.stompClient.send(
      '/current/resume',
      {},
      JSON.stringify(this.sentMessage)
    );
    this.showMessage(this.newmessage);
    this.newmessage = '';
    // this.sentMessage = null;
  }

  showMessage(message) {
    // this.greetings.push(message);
    this.receivedMessages.push({
      USERNAME: this.username,
      ID_CREATOR: Number(this.idUser),
      MESSAGE_BODY: message,
      ID_GROUP: this.currentIdGroup,
    });
    this.getMessageByIdGroups(this.currentIdGroup, this.currentGroupName, this.currentAvatarGroup);
  }

  getGroupsByUserId() {
    this.chatService.getGroupsByUserId(Number(this.idUser)).subscribe((res) => {
      this.groups = res.data;
      this.getMessageByIdGroups(this.groups[0].ID_GROUP, this.groups[0].GROUP_NAME, this.groups[0].AVATAR_GROUP)
      
      if (res.success) {
      }
    });
  }

  getMessageByIdGroups(id: any, name: any, avatar: any) {
    this.currentGroupName = name;
    this.currentIdGroup = id;
    this.currentAvatarGroup = avatar;
    this.chatService.getMessages(id).subscribe((res) => {
      this.receivedMessages = res.data;
    });
  } 
}
