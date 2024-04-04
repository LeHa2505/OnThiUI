import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.less'],
})
export class QuizComponent implements OnInit {
  quizs = [
    {
      quiz: 'Cho số thực $$a > 0$$. Số nào sau đây là căn bậc 2 của số thực a?',
      choices: [
        'A. $$\\sqrt{a}$$',
        'B. $$-\\sqrt{a}$$',
        'C. $$\\sqrt{2a}$$',
        'D. $$2\\sqrt{a}$$',
      ],
      answer: 'A. $$\\sqrt{a}$$',
      chosenAnswer: '',
      note: 'Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\). Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\). Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\). Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\).'
    },
    {
      quiz: 'Cho số thực $$a > 0$$. Số nào sau đây là căn bậc 2 của số thực a?',
      choices: [
        'A. $$\\sqrt{a}$$',
        'B. $$-\\sqrt{a}$$',
        'C. $$\\sqrt{2a}$$',
        'D. $$2\\sqrt{a}$$',
      ],
      answer: 'A. $$\\sqrt{a}$$',
      chosenAnswer: '',
      note: 'Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\). Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\). Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\). Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\).'
    },
    {
      quiz: 'Cho số thực $$a > 0$$. Số nào sau đây là căn bậc 2 của số thực a?',
      choices: [
        'A. $$\\sqrt{a}$$',
        'B. $$-\\sqrt{a}$$',
        'C. $$\\sqrt{2a}$$',
        'D. $$2\\sqrt{a}$$',
      ],
      answer: 'A. $$\\sqrt{a}$$',
      chosenAnswer: '',
      note: 'Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\). Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\). Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\). Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\).'
    },
    {
      quiz: 'Cho số thực $$a > 0$$. Số nào sau đây là căn bậc 2 của số thực a?',
      choices: [
        'A. $$\\sqrt{a}$$',
        'B. $$-\\sqrt{a}$$',
        'C. $$\\sqrt{2a}$$',
        'D. $$2\\sqrt{a}$$',
      ],
      answer: 'A. $$\\sqrt{a}$$',
      chosenAnswer: '',
      note: 'Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\). Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\). Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\). Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\).'
    },
    {
      quiz: 'Cho số thực $$a > 0$$. Số nào sau đây là căn bậc 2 của số thực a?',
      choices: [
        'A. $$\\sqrt{a}$$',
        'B. $$-\\sqrt{a}$$',
        'C. $$\\sqrt{2a}$$',
        'D. $$2\\sqrt{a}$$',
      ],
      answer: 'A. $$\\sqrt{a}$$',
      chosenAnswer: '',
      note: 'Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\). Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\). Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\). Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\).'
    },
    {
      quiz: 'Cho số thực $$a > 0$$. Số nào sau đây là căn bậc 2 của số thực a?',
      choices: [
        'A. $$\\sqrt{a}$$',
        'B. $$-\\sqrt{a}$$',
        'C. $$\\sqrt{2a}$$',
        'D. $$2\\sqrt{a}$$',
      ],
      answer: 'A. $$\\sqrt{a}$$',
      chosenAnswer: '',
      note: 'Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\). Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\). Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\). Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\).'
    },
    {
      quiz: 'Cho số thực $$a > 0$$. Số nào sau đây là căn bậc 2 của số thực a?',
      choices: [
        'A. $$\\sqrt{a}$$',
        'B. $$-\\sqrt{a}$$',
        'C. $$\\sqrt{2a}$$',
        'D. $$2\\sqrt{a}$$',
      ],
      answer: 'A. $$\\sqrt{a}$$',
      chosenAnswer: '',
      note: 'Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\). Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\). Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\). Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\).'
    },
    {
      quiz: 'Cho số thực $$a > 0$$. Số nào sau đây là căn bậc 2 của số thực a?',
      choices: [
        'A. $$\\sqrt{a}$$',
        'B. $$-\\sqrt{a}$$',
        'C. $$\\sqrt{2a}$$',
        'D. $$2\\sqrt{a}$$',
      ],
      answer: 'A. $$\\sqrt{a}$$',
      chosenAnswer: '',
      note: 'Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\). Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\). Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\). Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\).'
    },
    {
      quiz: 'Cho số thực $$a > 0$$. Số nào sau đây là căn bậc 2 của số thực a?',
      choices: [
        'A. $$\\sqrt{a}$$',
        'B. $$-\\sqrt{a}$$',
        'C. $$\\sqrt{2a}$$',
        'D. $$2\\sqrt{a}$$',
      ],
      answer: 'A. $$\\sqrt{a}$$',
      chosenAnswer: '',
      note: 'Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\). Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\). Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\). Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\).'
    },
    {
      quiz: 'Cho số thực $$a > 0$$. Số nào sau đây là căn bậc 2 của số thực a?',
      choices: [
        'A. $$\\sqrt{a}$$',
        'B. $$-\\sqrt{a}$$',
        'C. $$\\sqrt{2a}$$',
        'D. $$2\\sqrt{a}$$',
      ],
      answer: 'A. $$\\sqrt{a}$$',
      chosenAnswer: '',
      note: 'Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\). Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\). Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\). Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\).'
    },
    {
      quiz: 'Cho số thực $$a > 0$$. Số nào sau đây là căn bậc 2 của số thực a?',
      choices: [
        'A. $$\\sqrt{a}$$',
        'B. $$-\\sqrt{a}$$',
        'C. $$\\sqrt{2a}$$',
        'D. $$2\\sqrt{a}$$',
      ],
      answer: 'A. $$\\sqrt{a}$$',
      chosenAnswer: '',
      note: 'Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\). Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\). Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\). Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\).'
    },
    {
      quiz: 'Cho số thực $$a > 0$$. Số nào sau đây là căn bậc 2 của số thực a?',
      choices: [
        'A. $$\\sqrt{a}$$',
        'B. $$-\\sqrt{a}$$',
        'C. $$\\sqrt{2a}$$',
        'D. $$2\\sqrt{a}$$',
      ],
      answer: 'A. $$\\sqrt{a}$$',
      chosenAnswer: '',
      note: 'Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\). Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\). Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\). Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\).'
    },
  ];

  isFinished = false;
  isFinishLoading = false;
  isVisible = false;
  @ViewChild('template', { static: true }) template!: TemplateRef<any>;

  constructor(public gs: GlobalService,
              private el: ElementRef,
              private notification: NzNotificationService) {}

  ngOnInit() {
    this.loadMathConfig();
    this.renderMath();
    this.actionWithinOneSecond();
  }

  onFinish() {
    this.showModal();
  }

  actionWithinOneSecond(): void {
    setTimeout(() => {
      this.isFinishLoading = true;
    }, 1000); // 1000 milliseconds = 1 giây
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

  renderMath() {
    // console.log("render math")
    // MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

    this.mathJaxObject = this.gs.nativeGlobal()['MathJax'];
    //setInterval(()=>{},1)
    let angObj = this;
    setTimeout(() => {
      angObj.mathJaxObject.Hub.Queue(
        ['Typeset', angObj.mathJaxObject.Hub],
        'mathContent'
      );
    }, 1000);
  }

  loadMathConfig() {
    console.log('load config');

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
}
