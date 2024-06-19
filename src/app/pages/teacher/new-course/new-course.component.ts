import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadService } from 'src/app/service/upload-service/upload.service';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.less'],
})
export class NewCourseComponent {
  validateForm: FormGroup;
  activeTab = 1;
  isLoadingReview = false;
  files = [];
  description: any;
  editorConfig = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'lists link image table wordcount',
    menubar: false,
    toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent',
  };
  categoryList: any;
  cloudName = "djiv03sxd"; // replace with your own cloud name
  // uploadPreset = "aoh4fpwm"; // replace with your own upload preset
  myWidget;

  constructor(private fb: FormBuilder, private fileService: UploadService) {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      category: ['', [Validators.required]],
      priceOption: ['', [Validators.required]],
      includeEducoBundle: [true],
    });
  }

  ngOnInit(): void {
    this.initCategoryList();
    // this.myWidget = cloudinary.createUploadWidget(
    //   {
    //     cloudName: this.cloudName,
    //     // uploadPreset: this.uploadPreset
    //     // cropping: true, //add a cropping step
    //     // showAdvancedOptions: true,  //add advanced options (public_id and tag)
    //     // sources: [ "local", "url"], // restrict the upload sources to URL and local files
    //     // multiple: false,  //restrict upload to a single file
    //     // folder: "user_images", //upload files to the specified folder
    //     // tags: ["users", "profile"], //add the given tags to the uploaded files
    //     // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
    //     // clientAllowedFormats: ["images"], //restrict uploading to image files only
    //     // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
    //     // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
    //     // theme: "purple", //change to a purple theme
    //   },
    //   (error, result) => {
    //     if (!error && result && result.event === "success") {
    //       console.log("Done! Here is the image info: ", result.info);
    //       document
    //         .getElementById("uploadedimage")
    //         .setAttribute("src", result.info.secure_url);
    //     }
    //   }
    // );
  }

  openWidget() {
    this.myWidget.open();
  }

  initCategoryList() {
    this.categoryList = [
      { label: 'Toán học', value: 'toán học' },
      { label: 'Ngữ Văn', value: 'ngữ văn' },
      { label: 'Hóa học', value: 'hóa học' },
      { label: 'Vật lý', value: 'vật lý' },
      { label: 'Sinh học', value: 'sinh học' },
      { label: 'Địa lý', value: 'địa lý' },
      { label: 'Lịch sử', value: 'lịch sử' },
      { label: 'Tiếng Anh', value: 'tiếng anh' },
      { label: 'Tiếng Nhật', value: 'tiếng nhật' },
      { label: 'Tiếng Trung', value: 'tiếng trung' },
      { label: 'Tiếng Pháp', value: 'tiếng pháp' },
      {
        label: 'Giáo dục công dân',
        value: 'giáo dục công dân',
      },
    ];
  }

  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('Form Submitted', this.validateForm.value);
      // Handle form submission logic
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  onTabChange(index: number) {
    this.activeTab = index + 1;
  }

  image: File | null = null;
  imageMin: File | null = null;
  images: any[] = [];
  formData = new FormData();
  courseAvatar: any;

  onUpload(): void {
    this.courseAvatar = null;
    if (this.image) {
      this.fileService.upload(this.image).subscribe(
        (data) => {
          this.courseAvatar = data.url;
        },
        (err) => {}
      );
    }
  }

  onUploadVideo(): void {
    this.courseAvatar = null;
    if (this.image) {
      this.fileService.uploadVideo(this.image).subscribe(
        (data) => {
          this.courseAvatar = data.url;
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
    this.image = event.target.files[0];
    this.imageMin = null;
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.imageMin = evento.target.result;
    };
    if (this.image) {
      fr.readAsDataURL(this.image);
    }
    this.onUploadVideo();
  }
}
