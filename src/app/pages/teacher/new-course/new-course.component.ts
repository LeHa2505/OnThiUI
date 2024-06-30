import { Component } from '@angular/core';
import {
  FormControl,
  FormRecord,
  NonNullableFormBuilder,
  Validators,
  FormGroup,
  FormBuilder,
  AbstractControl,
  ValidationErrors,
  FormArray,
} from '@angular/forms';
import { UploadService } from 'src/app/service/upload-service/upload.service';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { CloudinaryVideo } from '@cloudinary/url-gen';
import { CourseService } from 'src/app/service/course-service/course.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.less'],
})
export class NewCourseComponent {
  role = localStorage.getItem('role');
  idUser = localStorage.getItem('user_id');
  userAvatar = localStorage.getItem('avatar');
  idCourse: any;
  validateForm: FormGroup;
  activeTab = 1;
  isLoadingReview = false;
  files = [];
  description: any;
  listLessonChild: any;
  editorConfig = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'lists link image table wordcount',
    menubar: false,
    toolbar:
      'undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent',
  };
  fileList: NzUploadFile[] = [
    {
      uid: '1',
      name: 'xxx.png',
      status: 'done',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/xxx.png',
    },
    {
      uid: '2',
      name: 'yyy.png',
      status: 'done',
      url: 'http://www.baidu.com/yyy.png',
    },
    {
      uid: '3',
      name: 'zzz.png',
      status: 'error',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/zzz.png',
    },
  ];
  lessonPanels = [
    {
      active: true,
      name: 'This is panel header 1',
      disabled: false,
    },
    {
      active: false,
      disabled: false,
      name: 'This is panel header 2',
    },
    {
      active: false,
      disabled: true,
      name: 'This is panel header 3',
    },
  ];
  categoryList: any;
  courseTypeList: any;
  cloudName = 'djiv03sxd'; // replace with your own cloud name
  // uploadPreset = "aoh4fpwm"; // replace with your own upload preset
  myWidget;
  videoUpload: any;
  validateForm2: FormRecord<FormControl<string>> = this.fb.record({});
  validateForm3: FormRecord<FormControl<string>> = this.fb.record({});
  listOfControl: Array<{ id: number; controlInstance: string }> = [];
  date = null;
  index = 0;
  disable = false;
  current = 0;
  processing = false;
  listLessonParent: any;
  listLessonChildren: any;
  lessons: any = [];
  panels: any;
  steps = [
    {
      title: 'Step 1',
      description: 'Tổng quan khóa học',
      status: 'process',
      percentage: 0,
    },
    {
      title: 'Step 2',
      description: 'Danh sách chủ đề/chương',
      status: 'wait',
      percentage: 0,
    },
    { title: 'Step 3', description: 'Bài học', status: 'wait', percentage: 0 },
  ];
  indexVideoUpload: any;
  faqForm: FormGroup;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private fileService: UploadService,
    private notification: NzNotificationService
  ) {
    this.validateForm = this.fb.group(
      {
        COURSE_NAME: [null, [Validators.required]],
        DESCRIPTION: [null, [Validators.required]],
        CATEGORY_NAME: ['', [Validators.required]],
        ID_TEACHER: [this.idUser],
        PRICE: [null, [Validators.required]],
        DISCOUNT: [null, [Validators.required]],
        TYPE_COURSE: [null, [Validators.required]],
        AVATAR_COURSE: [this.courseAvatar, [Validators.required]],
        START_DATE: [null],
        END_DATE: [null],
        DATE: [null],
      },
      { validators: this.discountLessThanPrice }
    );
  }

  ngOnInit(): void {
    this.myWidget = (window as any).cloudinary.createUploadWidget(
      {
        cloudName: this.cloudName,
        uploadPreset: 'ml_default', // replace with your own upload preset
        resourceType: 'video', // to allow video uploads
        language: 'vi',
      },
      (error: any, result: any) => {
        if (!error && result && result.event === 'success') {
          console.log('Done! Here is the video info: ', result.info);
          this.validateForm3
            .get(`LINK_VIDEO_${this.indexVideoUpload}`)
            .setValue(result.info.url);
          this.validateForm3
            .get(`DURATION_${this.indexVideoUpload}`)
            .setValue(
              this.convertSecondsToMinutes(
                Number(result.info.duration)
              ).toString()
            );
          this.validateForm3
            .get(`ORDER_${this.indexVideoUpload}`)
            .setValue((Number(this.indexVideoUpload) + 1).toString());
          const uploadedVideo = document.getElementById(
            'uploadedvideo'
          ) as HTMLVideoElement;
          uploadedVideo.setAttribute('src', result.info.secure_url);
        }
      }
    );
    this.initCategoryList();
    this.initCourseTypeList();
    this.validateForm3 = this.fb.group({});
  }

  convertSecondsToMinutes(seconds: number): number {
    // Chuyển đổi giây thành phút
    let minutes = seconds / 60;

    // Làm tròn đến số thập phân thứ hai
    minutes = Math.round(minutes * 100) / 100;

    return minutes;
  }

  get lessonPanelArray(): FormArray {
    return this.faqForm.get('lessonPanelArray') as FormArray;
  }

  createLessonPanel(): FormGroup {
    return this.fb.group({
      exercises: this.fb.array([]),
      attachments: this.fb.array([]),
    });
  }

  addExercise(lessonIndex: number): void {
    const exercises = this.lessonPanelArray
      .at(lessonIndex)
      .get('exercises') as FormArray;
    exercises.push(
      this.fb.group({
        exerciseName: ['', Validators.required],
        questions: this.fb.array([]),
      })
    );
  }

  removeExercise(lessonIndex: number, exerciseIndex: number): void {
    const exercises = this.lessonPanelArray
      .at(lessonIndex)
      .get('exercises') as FormArray;
    exercises.removeAt(exerciseIndex);
  }

  addQuestion(lessonIndex: number, exerciseIndex: number, type: string): void {
    const questions = (
      this.lessonPanelArray.at(lessonIndex).get('exercises') as FormArray
    )
      .at(exerciseIndex)
      .get('questions') as FormArray;
    questions.push(
      this.fb.group({
        questionText: ['', Validators.required],
        questionType: [type, Validators.required],
        answer: ['', Validators.required],
        options:
          type === 'MCQ'
            ? this.fb.array([
                this.fb.control(''),
                this.fb.control(''),
                this.fb.control(''),
                this.fb.control(''),
              ])
            : null,
      })
    );
  }

  removeQuestion(
    lessonIndex: number,
    exerciseIndex: number,
    questionIndex: number
  ): void {
    const questions = (
      this.lessonPanelArray.at(lessonIndex).get('exercises') as FormArray
    )
      .at(exerciseIndex)
      .get('questions') as FormArray;
    questions.removeAt(questionIndex);
  }

  addAttachment(lessonIndex: number): void {
    const attachments = this.lessonPanelArray
      .at(lessonIndex)
      .get('attachments') as FormArray;
    attachments.push(this.fb.control(''));
  }

  removeAttachment(lessonIndex: number, attachmentIndex: number): void {
    const attachments = this.lessonPanelArray
      .at(lessonIndex)
      .get('attachments') as FormArray;
    attachments.removeAt(attachmentIndex);
  }

  faqs(): FormArray {
    return this.faqForm.get('faqs') as FormArray;
  }

  newFAQ(): FormGroup {
    return this.fb.group({
      question: ['', Validators.required],
      questionType: ['essay', Validators.required],
      answer: ['', Validators.required],
      optionA: [''],
      optionB: [''],
      optionC: [''],
      optionD: [''],
    });
  }

  addFAQ(): void {
    this.faqs().push(this.newFAQ());
  }

  removeFAQ(index: number): void {
    this.faqs().removeAt(index);
  }

  onQuestionTypeChange(index: number): void {
    const faqsArray = this.faqs();
    const faq = faqsArray.at(index);
    const questionType = faq.get('questionType').value;

    if (questionType === 'essay') {
      faq.get('answer').setValidators([Validators.required]);
      faq.get('optionA').clearValidators();
      faq.get('optionB').clearValidators();
      faq.get('optionC').clearValidators();
      faq.get('optionD').clearValidators();
    } else {
      faq.get('answer').setValidators([Validators.required]);
      faq.get('optionA').setValidators([Validators.required]);
      faq.get('optionB').setValidators([Validators.required]);
      faq.get('optionC').setValidators([Validators.required]);
      faq.get('optionD').setValidators([Validators.required]);
    }

    faq.get('answer').updateValueAndValidity();
    faq.get('optionA').updateValueAndValidity();
    faq.get('optionB').updateValueAndValidity();
    faq.get('optionC').updateValueAndValidity();
    faq.get('optionD').updateValueAndValidity();
  }

  submitFaqForm(): void {
    if (this.faqForm.valid) {
      console.log(this.faqForm.value);
      // Implement submission logic here, e.g., send the form data to a server
    } else {
      // Handle form validation errors
      console.log('Form is invalid');
    }
  }

  createNotification(message: string, type: string): void {
    this.notification.create(type, '', message).onClick.subscribe(() => {});
  }

  transformObjectToArray() {
    this.listLessonParent = Object.keys(this.validateForm2.value).map(
      (key) => ({
        LESSON_NAME: this.validateForm2.value[key],
        ORDER: parseInt(key.split(' ')[1]) + 1,
        ID_COURSE: this.idCourse,
        VIEW: 0,
      })
    );
  }

  pre(): void {
    this.current -= 1;
    this.updateStepStatus();
  }

  next(): void {
    this.current += 1;
    this.updateStepStatus();
  }

  done(): void {
    this.processing = true;
    this.steps[this.current].status = 'process';
    this.simulateAsyncProcess().then(() => {
      this.steps[this.current].status = 'finish';
      this.processing = false;
    });
  }

  onIndexChange(index: number): void {
    this.current = index;
    this.updateStepStatus();
  }

  simulateAsyncProcess(): Promise<void> {
    return new Promise((resolve) => {
      let percentage = 0;
      const interval = setInterval(() => {
        percentage += 10;
        this.steps[this.current].percentage = percentage;
        if (percentage === 100) {
          clearInterval(interval);
          resolve();
        }
      }, 200);
    });
  }

  updateStepStatus(): void {
    for (let i = 0; i < this.steps.length; i++) {
      if (i === this.current) {
        this.steps[i].status = 'process';
      } else if (i < this.current) {
        this.steps[i].status = 'finish';
      } else {
        this.steps[i].status = 'wait';
      }
    }
  }

  openWidget(index: number) {
    this.indexVideoUpload = index;
    this.myWidget.open();
  }

  initCategoryList() {
    this.categoryList = [
      { label: 'Toán học', value: 'Toán' },
      { label: 'Ngữ văn', value: 'Ngữ văn' },
      { label: 'Hóa học', value: 'Hóa học' },
      { label: 'Vật lý', value: 'Vật lý' },
      { label: 'Sinh học', value: 'Sinh học' },
      { label: 'Địa lý', value: 'Địa lý' },
      { label: 'Lịch sử', value: 'Lịch sử' },
      { label: 'Tiếng Anh', value: 'Tiếng anh' },
      { label: 'Tiếng Nhật', value: 'Tiếng nhật' },
      { label: 'Tiếng Trung', value: 'Tiếng trung' },
      { label: 'Tiếng Pháp', value: 'Tiếng pháp' },
      {
        label: 'Giáo dục công dân',
        value: 'GDCD',
      },
    ];
  }

  initCourseTypeList() {
    this.courseTypeList = [
      { label: 'Khóa cơ bản', value: 0 },
      { label: 'Khóa nâng cao', value: 1 },
      { label: 'Luyện đề theo tỉnh thành', value: 2 },
    ];
  }

  addField(e?: MouseEvent): void {
    e?.preventDefault();

    const id =
      this.listOfControl.length > 0
        ? this.listOfControl[this.listOfControl.length - 1].id + 1
        : 0;

    const control = {
      id,
      controlInstance: `LESSON_NAME ${id}`,
    };
    const index = this.listOfControl.push(control);
    console.log(this.listOfControl[this.listOfControl.length - 1]);
    this.validateForm2.addControl(
      this.listOfControl[index - 1].controlInstance,
      this.fb.control('', Validators.required)
    );
  }

  removeField(i: { id: number; controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControl.length > 1) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      console.log(this.listOfControl);
      this.validateForm2.removeControl(i.controlInstance);
    }
  }

  submitForm2(): void {
    if (this.validateForm2.valid) {
      console.log('submit', this.validateForm2.value);
      this.transformObjectToArray();
      this.courseService
        .teacherAddLessonParents(this.listLessonParent)
        .subscribe((res) => {
          if (res.success) {
            this.createNotification(res.message, 'success');
            this.listLessonParent = this.courseService
              .adminGetDetailCourse(this.idCourse)
              .subscribe((res) => {
                if (res.success) {
                  this.userMapLessonsToPanels(res.data.LESSON_INFO);
                  this.listLessonParent = this.panels;
                  this.next();
                }
              });
          } else {
            this.createNotification(res.message, 'error');
          }
        });
    } else {
      Object.values(this.validateForm2.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  userMapLessonsToPanels = (lessons) => {
    this.panels = [];
    lessons.sort((a, b) => a.ORDER - b.ORDER);

    lessons.forEach((lesson) => {
      if (!lesson.LESSON_PARENT) {
        const listChild = [];
        lessons.forEach((item) => {
          if (item.LESSON_PARENT && item.LESSON_PARENT == lesson.ID_LESSON) {
            const child = {
              id: item.ID_LESSON,
              video: item.LINK_VIDEO,
              subject: item.SUBJECT,
              continueTime: item.CONTINUE_TIME,
              view: item.VIEW,
              descrip: item.DESCRIPTION,
              active: false,
              name: item.LESSON_NAME,
              order: Number(item.ORDER),
              time: item.DURATION,
              lesson: listChild,
              disabled: false,
            };
            listChild.push(child);
          }
        });

        listChild.sort((a, b) => a.order - b.order);

        let time = 0;
        listChild.forEach((child) => {
          time = time + Number(child.time);
        });

        const newPanel = {
          id: lesson.ID_LESSON,
          video: lesson.LINK_VIDEO,
          subject: lesson.SUBJECT,
          continueTime: lesson.CONTINUE_TIME,
          view: lesson.VIEW,
          descrip: lesson.DESCRIPTION,
          active: false,
          name: lesson.LESSON_NAME,
          order: Number(lesson.ORDER),
          time: time,
          lesson: listChild,
          disabled: false,
        };
        this.panels.push(newPanel);
      }
    });
  };

  userMapLessonChildrensToPanels = (lessons) => {
    this.lessonPanels = [];
    lessons.sort((a, b) => a.ORDER - b.ORDER);

    lessons.forEach((lesson) => {
      if (lesson.LESSON_PARENT) {
        const newPanel = {
          id: lesson.ID_LESSON,
          video: lesson.LINK_VIDEO,
          subject: lesson.SUBJECT,
          continueTime: lesson.CONTINUE_TIME,
          view: lesson.VIEW,
          descrip: lesson.DESCRIPTION,
          active: false,
          name: lesson.LESSON_NAME,
          order: Number(lesson.ORDER),
          disabled: false,
        };
        this.lessonPanels.push(newPanel);
        const lessonItem = {
          ID_LESSON: lesson.ID_LESSON,
          LESSON_NAME: lesson.LESSON_NAME,
          LESSON_PARENT: lesson.LESSON_PARENT,
        };
        this.lessons.push(lessonItem);
      }
    });
    this.faqForm = this.fb.group({
      lessonPanelArray: this.fb.array(
        this.lessons.map(() => this.createLessonPanel())
      ),
    });
    this.addFAQ();
  };

  onChange(result: Date[]): void {
    console.log('onChange: ', result);
    this.validateForm.patchValue({
      START_DATE: result[0],
      END_DATE: result[1],
    });
  }

  submitForm(): void {
    console.log('Form Submitted', this.validateForm.value);
    if (this.validateForm.valid) {
      this.courseService
        .teacherAddCourse(this.validateForm.value)
        .subscribe((res) => {
          if (res.success) {
            this.idCourse = res.data;
            this.createNotification(res.message, 'success');
            this.next();
          } else {
            this.createNotification(res.message, 'error');
          }
        });
      // Handle form submission logic
      // this.courseService.teacherAddCourse();
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  discountLessThanPrice(control: AbstractControl): ValidationErrors | null {
    const price = control.get('PRICE').value;
    const discount = control.get('DISCOUNT').value;
    return discount > price ? { discountGreaterThanPrice: true } : null;
  }

  onTabChange(index: number) {
    this.activeTab = index + 1;
  }

  image: File | null = null;
  video: File | null = null;
  imageMin: File | null = null;
  images: any[] = [];
  formData = new FormData();
  courseAvatar: any;
  videoCourse: any;
  amountVideo: any;

  onUpload(): void {
    this.courseAvatar = null;
    if (this.image) {
      this.fileService.upload(this.image).subscribe(
        (data) => {
          this.courseAvatar = data.url;
          this.validateForm.patchValue({
            AVATAR_COURSE: this.courseAvatar,
          });
          console.log(this.validateForm.value.AVATAR_COURSE);
        },
        (err) => {}
      );
    }
  }

  onUploadVideo(): void {
    this.courseAvatar = null;
    if (this.video) {
      this.fileService.uploadVideo(this.video).subscribe(
        (data) => {
          this.videoCourse = data.url;
        },
        (err) => {}
      );
    }
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    this.formData.append('file', file);
  }

  onFileChange(event: any) {
    this.image = event.target.files[0];
    this.imageMin = null;
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.imageMin = evento.target.result;
    };
    if (this.image) {
      fr.readAsDataURL(this.image);
    }
    this.onUpload();
  }

  onFileChangeVideo(event: any) {
    this.video = event.target.files[0];
    this.imageMin = null;
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.imageMin = evento.target.result;
    };
    if (this.video) {
      fr.readAsDataURL(this.video);
    }
    this.onUploadVideo();
  }

  lessonControls: Array<any> = [];

  addLesson(): void {
    const lessonIndex = this.lessonControls.length;
    const lessonGroup = this.fb.group({
      LESSON_PARENT: ['', Validators.required],
      LESSON_NAME: ['', Validators.required],
      VIEW: [''],
      LINK_VIDEO: ['', Validators.required],
      DURATION: ['', Validators.required],
      ORDER: ['', Validators.required],
    });

    this.lessonControls.push({
      ...lessonGroup.controls,
      id: `lesson-${lessonIndex}`,
    });

    this.validateForm3.addControl(
      `LESSON_PARENT_${lessonIndex}`,
      lessonGroup.controls['LESSON_PARENT']
    );
    this.validateForm3.addControl(
      `LESSON_NAME_${lessonIndex}`,
      lessonGroup.controls['LESSON_NAME']
    );
    this.validateForm3.addControl(
      `VIEW_${lessonIndex}`,
      lessonGroup.controls['VIEW']
    );
    this.validateForm3.addControl(
      `LINK_VIDEO_${lessonIndex}`,
      lessonGroup.controls['LINK_VIDEO']
    );
    this.validateForm3.addControl(
      `DURATION_${lessonIndex}`,
      lessonGroup.controls['DURATION']
    );
    this.validateForm3.addControl(
      `ORDER_${lessonIndex}`,
      lessonGroup.controls['ORDER']
    );
  }

  removeLesson(index: number): void {
    this.lessonControls.splice(index, 1);
    this.validateForm3.removeControl(`LESSON_PARENT_${index}`);
    this.validateForm3.removeControl(`LESSON_NAME_${index}`);
    this.validateForm3.removeControl(`VIEW_${index}`);
    this.validateForm3.removeControl(`LINK_VIDEO_${index}`);
    this.validateForm3.removeControl(`DURATION_${index}`);
    this.validateForm3.removeControl(`ORDER_${index}`);
    // Update the control names for the remaining items
    this.lessonControls.forEach((control, i) => {
      control.id = `lesson-${i}`;
    });
  }

  submitForm3(): void {
    if (this.validateForm3.valid) {
      console.log('Form Value:', this.validateForm3.value);
      this.fomatForm3();
      this.courseService
        .teacherAddLessonParents(this.listLessonChild)
        .subscribe((res) => {
          if (res.success) {
            this.createNotification('Lưu bài học thành công', 'success');
            this.courseService
              .adminGetDetailCourse(this.idCourse)
              .subscribe((res) => {
                if (res.success) {
                  this.userMapLessonChildrensToPanels(res.data.LESSON_INFO);
                  this.listLessonChildren = this.lessonPanels;
                  this.next();
                }
              });
          } else this.createNotification(res.message, 'error');
        });
    } else {
      Object.values(this.validateForm3.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  fomatForm3() {
    const inputData = this.validateForm3.value;
    const formattedData = [];
    const keys = Object.keys(inputData);
    const numberOfEntries = Math.max(
      ...keys.map((key) => parseInt(key.split('_').pop()))
    );

    for (let i = 0; i <= numberOfEntries; i++) {
      formattedData.push({
        LESSON_PARENT: inputData[`LESSON_PARENT_${i}`],
        LESSON_NAME: inputData[`LESSON_NAME_${i}`],
        VIEW: 0,
        LINK_VIDEO: inputData[`LINK_VIDEO_${i}`],
        DURATION: inputData[`DURATION_${i}`],
        ORDER: inputData[`ORDER_${i}`],
        ID_COURSE: this.idCourse,
      });
    }
    this.listLessonChild = formattedData;
  }

  requestSubmitCourse() {
    this.courseService.submitCourse(this.idCourse).subscribe((res) => {
      if (res.success) {
        this.courseService
          .adminGetDetailCourse(this.idCourse)
          .subscribe((res) => {
            if (res.success) {
              this.isSubmitted = res.data.IS_SUBMITTED;
            }
          });
        this.createNotification(res.message, 'success');
      } else {
        this.createNotification(res.message, 'error');
      }
    });
  }

  requestUnSubmitCourse() {
    this.courseService.unSubmitCourse(this.idCourse).subscribe((res) => {
      if (res.success) {
        this.courseService
          .adminGetDetailCourse(this.idCourse)
          .subscribe((res) => {
            if (res.success) {
              this.isSubmitted = res.data.IS_SUBMITTED;
            }
          });
        this.createNotification(res.message, 'success');
      } else {
        this.createNotification(res.message, 'error');
      }
    });
  }
}
