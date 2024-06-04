let instance;
class BlogApp {
  constructor() {
    if (instance) {
      throw new Error("Cannot reinstantiate");
    }
    this.visits = 0;
    this.authors = 0;
    this.blogs = 0;
    instance = this;
  }
  getAppDetail() {
    return { visits: this.visits, authors: this.authors, blogs: this.blogs };
  }
  updateVisit() {
    this.visits++;
  }
}
const appclass = new BlogApp();
export default appclass;
