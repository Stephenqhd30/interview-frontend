import React from "react";
import "./index.css";
import {listQuestionVoByPageUsingPost} from '@/api/questionController';

const QuestionsList: React.FC = () => {
  listQuestionVoByPageUsingPost({}).then(res => {
    console.log(res)
  })
  return (
    <>
      <h2>问题</h2>
    </>
  );
};

export default QuestionsList;
