import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private nextPageToken: string;

  constructor(private http: HttpClient) { }

  getURL(uri: string): Observable<any> {
    const URL = environment.api_url + uri;

    const params = new HttpParams()
      .set('part', 'snippet')
      .set('maxResults', '10')
      .set('playlistId', environment.uploads_id)
      .set('key', environment.api_key);

    if (this.nextPageToken) {
      params.set('pageToken', this.nextPageToken);
    }

    return this.http.get(URL, { params });
  }

  getVideos(): Observable<any> {
    /* return this.getURL('/playlistItems')
      .pipe(map(res => res['items']
        .map(item => item['snippet']))
      ); */

    return this.getURL('/playlistItems')
      .pipe(map(res => {
        this.nextPageToken = res['pageToken'];
        return res['items'].map(item => item['snippet']);
      }));
  }
}
