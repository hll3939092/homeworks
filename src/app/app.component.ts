import {Component, OnInit} from '@angular/core';
import {Session} from '../model/Session';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tancolle3';
  sessions: Session[] = [];
  tables: any[] = [];

  ngOnInit(): void {
    const session = new Session();
    session.name = '1';
    session.time = 120;

    const session2 = new Session();
    session2.name = '2';
    session2.time = 190;
    const session3 = new Session();
    session3.name = '3';
    session3.time = 90;
    const session4 = new Session();
    session4.name = '4';
    session4.time = 80;
    const session5 = new Session();
    session5.name = '5';
    session5.time = 30;
    const session6 = new Session();
    session6.name = '6';
    session6.time = 10;
    const session7 = new Session();
    session7.name = '7';
    session7.time = 220;
    const session8 = new Session();
    session8.name = '8';
    session8.time = 45;
    this.sessions.push(session);
    this.sessions.push(session2);
    this.sessions.push(session3);
    this.sessions.push(session4);
    this.sessions.push(session5);
    this.sessions.push(session6);
    this.sessions.push(session7);
    this.sessions.push(session8);
  }
  add() {
    const session = new Session();
    this.sessions.push(session);
  }
  remove(index) {
    this.sessions.splice(index, 1);
  }
  calculate(ss, day) {
    let boolean = true;
    if (boolean) {
      for (const se of this.sessions) {
        if (se.time * 1 >= 240) {
          alert('no session can longer than 240 minutes');
          return;
        }
      }
      boolean = false;
    }
    const sessionList = ss.slice(0);
    sessionList.sort((a, b) => {
      return  b.time * 1 - a.time * 1;
    })
    const se1 = [];
    const se2 = [];
    let remainM = 180;
    let remainA = 240;

    for (let i = 0; i < sessionList.length; i ++) {
      if ((remainM - sessionList[i].time) >= 0 && (sessionList[i].time <= 180)) {
        remainM = remainM - sessionList[i].time * 1;
        se1.push(sessionList[i]);
        sessionList.splice(i, 1);
        i--;
      }
    }
    for (let i = 0; i < sessionList.length; i ++) {
      if ((remainA - sessionList[i].time) >= 0 && (sessionList[i].time <= 240)) {
        remainA = remainA - sessionList[i].time * 1;
        se2.push(sessionList[i]);
        sessionList.splice(i, 1);
        i--;
      }
    }
    const table = [];
    let am = 9 * 60;
    let pm = 1 * 60;
    for (let i = 0; i < se1.length; i++) {
      if (i === 0) {
        se1[i].schedule = '9:00 am';
      } else {
        am = am + se1[i - 1].time * 1;
        se1[i].schedule = Math.floor(am / 60) + ':' + (((am % 60) === 0) ? '00' : (am % 60)) + ' am';
      }
      table.push(se1[i]);
    }
    const lunch = new Session();
    lunch.schedule = '12:00 pm';
    lunch.time = 60;
    lunch.name = 'lunch';
    table.push(lunch);
    for (let i = 0; i < se2.length; i++) {
      if (i === 0) {
        se2[i].schedule = '1:00 pm';
      } else {
        pm = pm + se2[i - 1].time * 1;
        se2[i].schedule = Math.floor(pm / 60) + ':' + (((pm % 60) === 0) ? '00' : (pm % 60)) + ' pm';
      }
      table.push(se2[i]);
      if (i === se2.length - 1) {
        pm = pm + se2[i].time * 1;
      }
    }
    const network = new Session();
    console.log(Math.floor(pm / 60));
    network.schedule = Math.floor(pm / 60) + ':' + (((pm % 60) === 0) ? '00' : (pm % 60)) + ' pm';
    network.name = 'network';
    table.push(network);
    this.tables.push(table);
    if (sessionList.length > 0) {
      this.calculate(sessionList, day + 1);
    }
  }
}
