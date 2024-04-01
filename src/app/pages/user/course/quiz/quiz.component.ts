import { Component } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.less']
})
export class QuizComponent {
  quizs = [
    {
      quiz: 'Cho số thực a > 0. Số nào sau đây là căn bậc 2 của số thực a?',
      choices: [
        'A. $\\sqrt{a}$',
        'B. $-\\sqrt{a}$',
        'C. $\\sqrt{2a}$',
        'D. $2\\sqrt{a}$'
    ]
    }
  ]
}
