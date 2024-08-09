export interface ApiSuccessFullResponse<T> {
  data: T;
}
export interface ApiSuccessFullResponseWithMetaData<T, V> {
  data: T;
  medaData: V;
}

export type Token = { access_token: string };
