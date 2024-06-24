import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CourseService } from 'src/app/service/course-service/course.service';
import { UploadService } from 'src/app/service/upload-service/upload.service';
import { UserService } from 'src/app/service/user-service/user.service';

@Component({
  selector: 'app-reels',
  templateUrl: './reels.component.html',
  styleUrls: ['./reels.component.less'],
})
export class ReelsComponent implements OnInit {
  role = localStorage.getItem('role');
  idUser = localStorage.getItem('user_id');
  userAvatar = localStorage.getItem('avatar');
  shorts: any;
  isAddVideoModalVisible = false;
  isEditVideoModalVisible = false;
  addVideoForm: FormGroup;
  editVideoForm: FormGroup;
  selectedVideo: any;
  cloudName = 'djiv03sxd';
  myWidget;
  videoUpload: any;
  indexVideoUpload: any;
  image: File | null = null;
  video: File | null = null;
  imageMin: File | null = null;
  images: any[] = [];
  formData = new FormData();
  courseAvatar: any;
  videoCourse: any;
  amountVideo: any;
  pageIndex = 1;
  pageSize = 10;
  totalVideos = 0;
  displayedVideos = [];
  allVideos = []; // Array to hold all videos
  deleteVideoId: any;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private courseService: CourseService,
    private fileService: UploadService,
    private notification: NzNotificationService,
    private modal: NzModalService,
    public router: Router,
  ) {
    this.addVideoForm = this.fb.group({
      ID_USER: [this.idUser],
      TITLE: [null, [Validators.required]],
      VIDEO_LINK: [null, [Validators.required]],
      THUMBNAIL: [null, [Validators.required]],
      DESCRIPTION: [null],
    });

    this.editVideoForm = this.fb.group({
      TITLE: [null, [Validators.required]],
      VIDEO_LINK: [null, [Validators.required]],
      THUMBNAIL: [null, [Validators.required]],
      DESCRIPTION: [null],
    });
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
          if (this.showAddVideoModal) {
            this.addVideoForm.patchValue({
              VIDEO_LINK: result.info.url,
              THUMBNAIL: result.info.thumbnail_url,
            });
            this.courseAvatar = result.info.thumbnail_url;
          }
          const uploadedVideo = document.getElementById(
            'uploadedvideo'
          ) as HTMLVideoElement;
          uploadedVideo.setAttribute('src', result.info.secure_url);
        }
      }
    );
    this.getShortsByUserIdAPI();
    this.loadAllVideos();
    this.updateDisplayedVideos();
  }

  loadAllVideos(): void {
    // Load your videos here (e.g., from a service)
    // For now, we'll use some dummy data
    this.allVideos = this.shorts;
    this.totalVideos = this.allVideos.length;
  }

  onPageChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this.updateDisplayedVideos();
  }

  updateDisplayedVideos(): void {
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedVideos = this.allVideos.slice(startIndex, endIndex);
  }

  openWidget() {
    this.myWidget.open();
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

  onUpload(): void {
    this.courseAvatar = null;
    if (this.image) {
      this.fileService.upload(this.image).subscribe(
        (data) => {
          this.courseAvatar = data.url;
          this.addVideoForm.patchValue({
            THUMBNAIL: this.courseAvatar,
          });
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

  getShortsByUserIdAPI() {
    this.userService.getShortsByUserId(this.idUser).subscribe((res) => {
      if (res.success) {
        this.shorts = res.data;
      }
    });
  }

  // Show Add Video Modal
  showAddVideoModal(): void {
    this.isAddVideoModalVisible = true;
  }

  // Show Edit Video Modal
  showEditVideoModal(video: any): void {
    this.selectedVideo = video;
    this.editVideoForm.patchValue({
      TITLE: video.TITLE,
      VIDEO_LINK: video.VIDEO_LINK,
      THUMBNAIL: video.THUMBNAIL,
      DESCRIPTION: video.DESCRIPTION,
    });
    this.isEditVideoModalVisible = true;
  }

  // Handle Add Video OK
  handleAddVideoOk(): void {
    if (this.addVideoForm.valid) {
      // Logic to add the video
      const newVideo = this.addVideoForm.value;
      console.log('Adding new video:', newVideo);
      this.userService.addShort(this.addVideoForm.value).subscribe((res) => {
        if (res.success) {
          this.getShortsByUserIdAPI();
          this.createNotification(res.message, 'success');
        } else {
          this.createNotification(res.message, 'error');
        }
      });
      // Close the modal
      this.isAddVideoModalVisible = false;
      this.addVideoForm.reset();
    } else {
      this.createNotification(
        'Vui lòng điền đầy đủ các trường thông tin.',
        'error'
      );
    }
  }

  createNotification(message: string, type: string): void {
    this.notification.create(type, '', message).onClick.subscribe(() => {});
  }

  // Handle Edit Video OK
  handleEditVideoOk(): void {
    if (this.editVideoForm.valid) {
      // Logic to update the video
      const updatedVideo = this.editVideoForm.value;
      console.log('Updating video:', updatedVideo);
      // Close the modal
      this.isEditVideoModalVisible = false;
    }
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    this.formData.append('file', file);
  }

  // Handle Cancel for both modals
  handleCancel(): void {
    this.isAddVideoModalVisible = false;
    this.isEditVideoModalVisible = false;
  }

  showDeleteConfirm(id: any): void {
    this.modal.confirm({
      nzTitle: '<i>Bạn có chắc chắn muốn xóa video này không?</i>',
      nzOnOk: () => {
        this.userService.deleteShort(id).subscribe((res) => {
          if (res.success) {
            this.getShortsByUserIdAPI();
            this.createNotification(res.message, 'success');
          } else {
            this.createNotification(res.message, 'error');
          }
        });
      },
      nzCentered: true,
    });
  }

  detailShort(item: any) {
    const idShort = Number(item.ID_SHORT);
    this.userService.idShort = idShort;
    localStorage.setItem('idShort', idShort.toString());
    this.router.navigateByUrl('/shorts/detail');
  }
}
