import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { RxStompService } from 'src/app/service/chat-service/rx-stomp.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.less']
})
export class MessageComponent {
  title = 'WebSocketChatRoom';
  greetings: string[] = [];
  disabled = true;
  newmessage: string;
  private stompClient = null;

  constructor(private rxStompService: RxStompService, 
              private route: ActivatedRoute,
              private http: HttpClient,
              private el: ElementRef,
  ) {
  }

  ngOnInit(): void {
    this.connect();
  }

  setConnected(connected: boolean) {
    this.disabled = !connected;
    if (connected) {
      this.greetings = [];
    }
  }
  
  connect() {
    const socket = new SockJS('http://localhost:8899/testchat');
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.connect({}, function (frame) {
      console.log('Connected: ' + frame);
      _this.stompClient.subscribe('/start/initial', function(hello){
        console.log(JSON.parse(hello.body));
        _this.showMessage(JSON.parse(hello.body));
      });
   });
  }

  sendMessage() {
    this.stompClient.send(
      '/current/resume',
      {},
      JSON.stringify(this.newmessage)
    );
    this.newmessage = "";
  }
  
  showMessage(message) {
    this.greetings.push(message);
  }

}