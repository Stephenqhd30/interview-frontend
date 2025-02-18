// @ts-ignore
/* eslint-disable */
import request from "@/request";

/** doQuestionFavour POST /api/questionFavour/ */
export async function doQuestionFavourUsingPost(
  body: API.QuestionFavourAddRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseInt_>("/api/questionFavour/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** listFavourQuestionByPage POST /api/questionFavour/list/page */
export async function listFavourQuestionByPageUsingPost(
  body: API.QuestionFavourQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageQuestionVO_>(
    "/api/questionFavour/list/page",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** listMyFavourQuestionByPage POST /api/questionFavour/my/list/page */
export async function listMyFavourQuestionByPageUsingPost(
  body: API.QuestionQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageQuestionVO_>(
    "/api/questionFavour/my/list/page",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}
