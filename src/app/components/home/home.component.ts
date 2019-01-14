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
  channel: any;
  selectedVideo: any;
  loading = true;

  constructor(private youtube: YoutubeService) { }

  ngOnInit() {
    this.youtube.getChannel().subscribe(data => {
      console.log(data);
      this.channel = data;
    });

    this.youtube.getVideos().subscribe(data => {
      this.videos = data;
    });
  }

  loaded() {
    this.loading = false;
  }

  openModal(video) {
    this.selectedVideo = video;
    $('#modelId').modal('show');
  }

  closeModal() {
    this.loading = true;
    this.selectedVideo = null;
    $('#modelId').modal('hide');
  }

  loadMore() {
    this.youtube.getVideos().subscribe(data => {
      this.videos.push.apply(this.videos, data);
    });
  }

}
