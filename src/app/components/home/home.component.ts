import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  videos: any;
  selectedVideo: any;

  constructor(private youtube: YoutubeService) { }

  ngOnInit() {
    this.youtube.getVideos().subscribe(data => {
      this.videos = data;
    });
  }

  openModal(video) {
    this.selectedVideo = video;
    $('#modelId').modal('show');
  }

  closeModal() {
    this.selectedVideo = null;
    $('#modelId').modal('hide');
  }

  loadMore() {
    this.youtube.getVideos().subscribe(data => {
      this.videos.push.apply(this.videos, data);
    });
  }

}
