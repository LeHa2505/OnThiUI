import { StompRService, StompConfig } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { RxStomp } from '@stomp/rx-stomp';
/**
 * Must add dependency "@stomp/ng2-stompjs": "^6.0.1"
 */

export class SocketService {
  constructor(private stompService: StompRService, private rxStomp: RxStomp) {}

  private init(): void {
    if (!this.stompService.connected()) {
      this.stompService.config = this.stompConfig();

      this.stompService.initAndConnect();
    }
  }

  onEvent(): Observable<Message> {
    this.init();

    return this.stompService.subscribe('/event');
  }

  private stompConfig(): StompConfig {
    const provider = function() {
      return new SockJS('/api/socket');
    };

    const config = new StompConfig();
    config.url = provider;
    config.heartbeat_in = 0;
    config.heartbeat_out = 0;
    config.reconnect_delay = 10000;

    return config;
  }
}