import Article from "../interface/Article.interface";

export class ArticleManager {
  source: string;
  title: string;
  image: string;
  description: string;
  author: string;
  datePosted: string;
  constructor(
    source: string,
    title: string,
    image: string,
    description: string,
    author: string,
    datePosted: string
  ) {
    this.source = source;
    this.title = title;
    this.image = image;
    this.description = description;
    this.author = author;
    this.datePosted = datePosted;
  }
}

export class Store {
  static async getArticles(): Promise<Article[]> {
    try {
      if (localStorage.getItem("articles") === null) {
        return [];
      }
      return JSON.parse(localStorage.getItem("articles") || "[]");
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  static async addArticles(article: Article): Promise<void> {
    try {
      const articles = await Store.getArticles();
      articles.push(article);
      localStorage.setItem("articles", JSON.stringify(articles));
    } catch (error) {
      console.log(error);
    }
  }
  static async removeArticles(id: string): Promise<void> {
    try {
        const articles = await Store.getArticles();
        articles.forEach((item, index) => {
            if (item.id === id) {
                articles.splice(index, 1);
            }
        })
        localStorage.setItem('articles', JSON.stringify(articles))
    } catch (error) {
        console.log(error);
    }
  }
  static async removeAllArticles() {
      try {
          localStorage.removeItem('articles');
      } catch (error) {
          console.log(error);
      }
  }
}
