import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private pageToken = '';

  constructor(private http: HttpClient) { }

  getURL(uri: string): Observable<any> {
    const URL = environment.api_url + uri;

    const params = new HttpParams()
      .set('part', 'snippet')
      .set('maxResults', '10')
      .set('playlistId', environment.uploads_id)
      .set('key', environment.api_key)
      .set('pageToken', this.pageToken);

    return this.http.get(URL, { params });
  }

  getVideos(): Observable<any> {

    return this.getURL('/playlistItems')
      .pipe(map(res => {
        console.log(res);
        this.pageToken = res['nextPageToken'];
        return res['items'].map(item => item['snippet']);
      }));
  }

  getChannel(): Observable<any> {

    const params = new HttpParams()
      .set('part', 'snippet')
      .set('id', environment.channel_id)
      .set('key', environment.api_key);

    return this.http.get(`${environment.api_url}/channels`, { params })
      .pipe(map(res => res['items'][0]['snippet']));
  }
}
