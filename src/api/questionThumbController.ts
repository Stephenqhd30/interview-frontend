// @ts-ignore
/* eslint-disable */
import request from '@/libs/request';

/** doThumb POST /api/questionThumb/ */
export async function doThumbUsingPost(
  body: API.QuestionThumbAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/api/questionThumb/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
