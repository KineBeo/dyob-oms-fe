interface Article {
id: number;
name:string;
title: string;
quote: string;
createdAt :string;
image:{
    url:string
};
content: string
seoUrl: string;
};


interface ArticleResponse {
  data: Article[];
}