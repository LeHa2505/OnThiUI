import { Component } from '@angular/core';

@Component({
  selector: 'app-course-manager',
  templateUrl: './course-manager.component.html',
  styleUrls: ['./course-manager.component.less']
})
export class CourseManagerComponent {
  courses = [
    { title: 'Cooking class for your summer holiday' },
    { title: 'Cooking class for your summer holiday' },
    { title: 'Cooking class for your summer holiday' },
    { title: 'Cooking class for your summer holiday' },
  ];
}
