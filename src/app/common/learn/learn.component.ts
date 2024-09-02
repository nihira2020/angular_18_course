import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AsyncSubject, BehaviorSubject, concat, delay, every, filter, find, first, last, map, merge, Observable, of, ReplaySubject, Subject, take } from 'rxjs';
import { ChildnewComponent } from '../childnew/childnew.component';

@Component({
  selector: 'app-learn',
  standalone: true,
  imports: [CommonModule,ChildnewComponent],
  templateUrl: './learn.component.html',
  styleUrl: './learn.component.css'
})
export class LearnComponent implements OnInit {

  ticketinfo = [
    { 'id': 1, 'name': 'angular', color: 'green' },
    { 'id': 2, 'name': 'react', color: 'red' },
    { 'id': 3, 'name': 'vuejs', color: 'blue' }
  ]

  ticketinfo$ = of(this.ticketinfo)

  data$ = of(1, 2, 3);
  data1$ = of(5, 6, 7).pipe(delay(1000));
  data2$ = of(8, 9);

  subject$ = new Subject();
  behaviorsubject$=new BehaviorSubject(1)
  replaysubject$=new ReplaySubject()
  asyncsubject$=new AsyncSubject()

  observable = new Observable((subscriber) => {
    subscriber.next('Order placed');
    setTimeout(() => {
      subscriber.next('Order approved')
    }, 2000)
    setTimeout(() => {
      subscriber.next('packed')
    }, 4000)
    setTimeout(() => {
      subscriber.next('Shipped')
    }, 6000)



    //subscriber.complete();
  });

  ngOnInit(): void {
    // this.observable.subscribe({
    //   next(x){
    //     console.log(x)
    //   },
    //   error(err){
    //     console.log('Error occured '+err)
    //   },
    //   complete(){
    //     console.log('completed')
    //   }

    // })

    // this.ticketinfo$.subscribe(item=>{
    //   console.log(item);
    // })

    // this.data$.pipe(map((x)=>x*2)).subscribe(item=>{
    //   console.log(item);
    // })

    // this.data$.pipe(filter((x)=>x>1)).subscribe(item=>{
    //   console.log(item);
    // })

    //  merge(this.data1$,this.data$).subscribe(item=>{
    //   console.log(item);
    // })

    // merge(this.data1$,this.data$).pipe(take(2)).subscribe(item=>{
    //   console.log(item);
    // })

    // merge(this.data$).pipe(every(x => x > 1)).subscribe(item => {
    //   console.log(item);
    // })

    // this.subject$.subscribe(item => {
    //   console.log('Observer 1 :' + item)
    // })
    // this.subject$.next(1);
    // this.subject$.next(2);
    // this.subject$.subscribe(item => {
    //   console.log('Observer 2 :' + item)
    // })
    // this.subject$.next(3);

    // this.behaviorsubject$.subscribe(item => {
    //   console.log('Observer 1 :' + item)
    // })
    // this.behaviorsubject$.next(1);
    // this.behaviorsubject$.next(2);
    // this.behaviorsubject$.subscribe(item => {
    //   console.log('Observer 2 :' + item)
    // })
    // this.behaviorsubject$.next(3);

    // this.replaysubject$.subscribe(item => {
    //   console.log('Observer 1 :' + item)
    // })
    // this.replaysubject$.next(1);
    // this.replaysubject$.next(2);
    // this.replaysubject$.subscribe(item => {
    //   console.log('Observer 2 :' + item)
    // })
    // this.replaysubject$.next(3);


    this.asyncsubject$.subscribe(item => {
      console.log('Observer 1 :' + item)
    })
    this.asyncsubject$.next(1);
    this.asyncsubject$.next(2);
    this.asyncsubject$.next(3);
    this.asyncsubject$.complete();
    this.asyncsubject$.subscribe(item => {
      console.log('Observer 2 :' + item)
    })

  }



}
