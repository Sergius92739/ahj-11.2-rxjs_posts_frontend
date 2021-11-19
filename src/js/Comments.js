import Post from './Post';

export default class Comments {
  constructor(post) {
    if (!(post instanceof HTMLElement)) {
      throw new Error('post is not HTMLElement');
    }
    this.post = post;
    this.container = this.post.querySelector('.comments__list');
  }

  static getMarkUp(data) {
    return `<li class="comments__item" data-id="${data.id}">
    <div class="comments__avatar"></div>
    <div class="comments__content">
      <div class="comments__info">
        <div class="comments__author">${data.author}</div>
        <div class="comments__date">${Post.dateFormatter(data.created)}</div>
      </div>
      <div class="comments__text">${data.content}</div>
    </div>
  </li>`;
  }

  drawComments(data) {
    this.container.insertAdjacentHTML('afterbegin', Comments.getMarkUp(data));
    const avatar = document
      .querySelector(`[data-id="${data.id}"]`)
      .querySelector('.comments__avatar');
    avatar.style.backgroundImage = `url('${data.avatar}')`;
  }
}
