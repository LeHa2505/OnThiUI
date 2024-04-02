import { Component } from '@angular/core';
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
    },
    {
      quiz: 'Cho số thực a > 0. Số nào sau đây là căn bậc 2 của số thực a?',
      choices: [
        'A. $$\\sqrt{a}$$',
        'B. $$-\\sqrt{a}$$',
        'C. $$\\sqrt{2a}$$',
        'D. $$2\\sqrt{a}$$',
      ],
    },
  ];

  constructor(public gs: GlobalService) {}

  ngOnInit() {
    this.loadMathConfig();
    this.renderMath();
  }

  mathJaxObject;
  ngOnChanges(changes: SimpleChanges) {
    if (changes['content']) {
      // console.log("content chnaged")
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
