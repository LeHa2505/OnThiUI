import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/service/course-service/course.service';
import { UserService } from 'src/app/service/user-service/user.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.less'],
})
export class QuizComponent implements OnInit {
  quizs = [];
  detailExercise: any;
  idCourse: any;
  idLesson: any;
  detailCourse: any;
  detailLesson: any;
  idExercise: number;
  isFinished = false;
  isFinishLoading = false;
  isVisible = false;
  @ViewChild('template', { static: true }) template!: TemplateRef<any>;

  constructor(
    public gs: GlobalService,
    private el: ElementRef,
    private notification: NzNotificationService,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    this.idLesson = Number(this.courseService.idLesson);
    this.idCourse = Number(this.courseService.idCourse);

    if (!this.idLesson || !this.idCourse) {
      this.idCourse = Number(localStorage.getItem('idCourse'));
      this.idLesson = Number(localStorage.getItem('idLesson'));
    }

    this.idExercise = Number(this.route.snapshot.paramMap.get('id'));

    try {
      await this.getDetailExerciseAPI();
      await this.getDetailCourseAPI();
      await this.getDetailLessonAPI();
    } catch (error) {
      console.error('Error during API calls:', error);
    }

    this.loadMathConfig();
    this.renderMath();
    this.actionWithinOneSecond();
  }

  async getDetailExerciseAPI() {
    const res = await firstValueFrom(this.courseService.getDetailExercise(this.idExercise));
    if (res.success) {
      this.detailExercise = res.data;
      this.formatQuiz();
    }
  }

  formatQuiz() {
    const formattedQuizs = this.detailExercise.QUIZ_INFO.map((quiz) => ({
      quiz: quiz.CONTENT_QUIZ,
      choices: quiz.OPTIONS.split('||'),
      answer: quiz.ANSWER,
      chosenAnswer: '',
      note: quiz.DESCRIPTION,
      order: quiz.ORDER
    }))
    .sort((a, b) => a.order - b.order)
    .map(({ order, ...rest }) => rest);

    this.quizs = formattedQuizs;
  }

  async getDetailCourseAPI() {
    const res = await firstValueFrom(this.courseService.userGetDetailCourse(this.idCourse));
    if (res.success) {
      this.detailCourse = res.data;
    }
  }

  async getDetailLessonAPI() {
    const res = await firstValueFrom(this.courseService.userGetLessonDetail(this.idLesson));
    if (res.success) {
      this.detailLesson = res.data;
    }
  }

  renderMath() {
    this.mathJaxObject = this.gs.nativeGlobal()['MathJax'];
    let angObj = this;
    setTimeout(() => {
      angObj.mathJaxObject.Hub.Queue(
        ['Typeset', angObj.mathJaxObject.Hub],
        'mathContent'
      );
    }, 1000);
  }

  loadMathConfig() {
    this.mathJaxObject = this.gs.nativeGlobal()['MathJax'];
    this.mathJaxObject.Hub.Config({
      showMathMenu: false,
      tex2jax: {
        inlineMath: [
          ['$', '$'],
          ['\\(', '\\)'],
        ],
      },
      menuSettings: { zoom: 'Double-Click', zscale: '150%' },
      CommonHTML: { linebreaks: { automatic: true } },
      'HTML-CSS': { linebreaks: { automatic: true } },
      SVG: { linebreaks: { automatic: true } },
    });
  }

  actionWithinOneSecond() {
    setTimeout(() => {
      this.isFinishLoading = true;
    }, 1000); // 1000 milliseconds = 1 giây
  }

  onFinish() {
    this.showModal();
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.createBasicNotification(this.template);
    this.isVisible = false;
    this.isFinished = true;
    this.loadMathConfig();
    this.renderMath();
  }

  createBasicNotification(template: TemplateRef<{}>): void {
    this.notification.template(template);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  countCorrectAnswer() {
    let correctCount = 0;
    for (let i = 0; i < this.quizs.length; i++) {
      if (this.quizs[i].chosenAnswer == this.quizs[i].answer) {
        correctCount++;
      }
    }
    return correctCount;
  }

  countWrongAnswer() {
    let wrongCount = 0;
    for (let i = 0; i < this.quizs.length; i++) {
      if (this.quizs[i].chosenAnswer != this.quizs[i].answer) {
        wrongCount++;
      }
    }
    return wrongCount;
  }

  scrollToTarget(position: String) {
    if (position == 'question-1') {
      position = 'questions';
    }
    const targetElement = this.el.nativeElement.querySelector('#' + position);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  mathJaxObject;
  ngOnChanges(changes: SimpleChanges) {
    if (changes['content']) {
      this.renderMath();
    }
  }

  doAgain() {
    window.location.reload();
  }
}
