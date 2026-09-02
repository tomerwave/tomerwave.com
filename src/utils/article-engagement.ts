export const ARTICLE_ENGAGED_MS = 30_000;
export const ARTICLE_DEEP_READ_RATIO = 0.75;

interface DeepReadInput {
  articleTop: number;
  articleHeight: number;
  viewportBottom: number;
}

export const hasReachedDeepRead = ({ articleTop, articleHeight, viewportBottom }: DeepReadInput) =>
  articleHeight > 0 && viewportBottom >= articleTop + articleHeight * ARTICLE_DEEP_READ_RATIO;
