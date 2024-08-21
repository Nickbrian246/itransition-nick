export interface ApiSuccessFullResponse<T> {
  data: T;
}
export interface ApiSuccessFullResponseWithMetaData<T, V> {
  data: T;
  metaData: V;
}

export type Token = { access_token: string };

export type likesData = {
  didUserLikeIt: boolean;
  counter: number;
};
