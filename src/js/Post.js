export default class Post {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
  }

  static getMarkUp(data) {
    return `<li class="posts__item post" data-id="${data.id}">
    <div class="post__header">
      <div class="post__avatar"></div>
      <div class="post__info">
        <div class="post__author">${data.author}</div>
        <div class="post__date">${Post.dateFormatter(data.created)}</div>
      </div>
    </div>
    <h2 class="post__title">${data.title}</h2>
    <div class="post__image">
      <img src="${data.image}" alt="">
    </div>
    <div class="post__comments comments">
      <div class="comments__title">Latest comments</div>
      <ul class="comments__list">
      </ul>
    </div>
  </li>`;
  }

  drawPost(data) {
    this.container.insertAdjacentHTML('afterbegin', Post.getMarkUp(data));
    const avatar = document
      .querySelector(`[data-id="${data.id}"]`)
      .querySelector('.post__avatar');
    avatar.style.backgroundImage = `url('${data.avatar}')`;
    if (this.container.children.length > 10) {
      this.container.lastElementChild.remove();
    }
  }

  static cleanDate(str) {
    const temp1 = str.split(' ');
    const date = [temp1[1], temp1[0].slice(0, -1)].join(' ');
    return date;
  }

  static dateFormatter(date) {
    const formatter = new Intl.DateTimeFormat('ru', {
      timeZone: 'Europe/Moscow',
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
    return Post.cleanDate(formatter.format(date));
  }
}
