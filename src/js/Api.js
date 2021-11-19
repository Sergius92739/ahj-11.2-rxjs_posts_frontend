import { forkJoin } from 'rxjs';
import { switchMap, map, pluck } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import Post from './Post';
import Comments from './Comments';

export default class Api {
  constructor() {
    this.url = 'https://ahj-11-2-sergius-rxjs-posts.herokuapp.com/';
    this.updateBtn = document.querySelector('.update__button');
  }

  init() {
    this.getRequest();
    this.updateBtn.addEventListener('click', () => this.getRequest());
  }

  getRequest() {
    ajax.getJSON(`${this.url}posts/latest`)
      .pipe(
        pluck('data'),
        map((posts) => posts
          .map((post) => ajax
            .getJSON(`${this.url}posts/${post.id}/comments/latest`)
            .pipe(
              pluck('data'),
              map((comments) => ({
                ...post,
                comments,
              })),
            ))),
        switchMap((postData) => forkJoin(postData)),
      )
      .subscribe({
        next: (data) => Api.renderData(data),
        // eslint-disable-next-line no-console
        error: (err) => console.error(err),
      });
  }

  static renderData(data) {
    data.forEach((postObj) => {
      const post = new Post(document.querySelector('.posts'));
      post.drawPost(postObj);
      const comments = new Comments(document.querySelector(`[data-id="${postObj.id}"]`));
      postObj.comments.forEach((comment) => {
        comments.drawComments(comment);
      });
    });
  }
}
