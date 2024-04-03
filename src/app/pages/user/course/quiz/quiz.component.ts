import {Component, ElementRef} from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.less'],
})
export class QuizComponent {
  quizs = [
    {
      quiz: 'Cho số thực $$a > 0$$. Số nào sau đây là căn bậc 2 của số thực a?',
      choices: [
        'A. $$\\sqrt{a}$$',
        'B. $$-\\sqrt{a}$$',
        'C. $$\\sqrt{2a}$$',
        'D. $$2\\sqrt{a}$$',
      ],
      answer: 'A',
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
      answer: 'A',
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
      answer: 'A',
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
      answer: 'A',
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
      answer: 'A',
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
      answer: 'A',
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
      answer: 'A',
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
      answer: 'A',
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
      answer: 'A',
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
      answer: 'A',
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
      answer: 'A',
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
      answer: 'A',
      chosenAnswer: '',
      note: 'Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\). Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\). Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\). Với số dương \\( a \\), số \\( \\sqrt{a} \\) được gọi là căn bậc hai số học của \\( a \\).'
    },
  ];

  isFinish = false;
  isFinishLoading = false;
  constructor(public gs: GlobalService,
              private el: ElementRef,) {}

  ngOnInit() {
    this.loadMathConfig();
    this.renderMath();
    this.actionWithinOneSecond();
  }

  actionWithinOneSecond(): void {
    setTimeout(() => {
      this.isFinishLoading = true;
    }, 1000); // 1000 milliseconds = 1 giây
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
