interface Article {
id: number;
name:string;
title: string;
quote: string;
image:{
    url:string
};
content: string
seoUrl: string;
};


interface ArticleResponse {
  data: Article[];
}