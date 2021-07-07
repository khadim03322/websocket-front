import { Injectable } from '@angular/core';

// Declare SockJS and Stomp
declare var SockJS;
declare var Stomp;

@Injectable({
  providedIn: 'root'
})


export class MessageService {

 

  constructor() { 

    this.initializeWebSocketConnection();

  }

  
  
  public stompClient;
  public msg = [] as  any;


  initializeWebSocketConnection() {
    const serverUrl = 'http://localhost:8081/socket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    // tslint:disable-next-line:only-arrow-functions
    this.stompClient.connect({}, function(frame) {

      that.stompClient.subscribe('/message', (message) => {
        if (message.body) {

          that.msg.push(message.body);
        }
      });
    });
  }
  
  sendMessage(message) {
    this.stompClient.send('/app/send/message' , {}, message);
  }


}
