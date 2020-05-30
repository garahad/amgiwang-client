import { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_QUESTIONS } from '../graphql/queries';

const useSolvePage = () => {
  const [rating, setRating] = useState<number>(3);
  const [visible, setVisible] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [newQ, setNewQ] = useState<string>('');
  const [newAnswer, setNewAnswer] = useState<string>('');

  const { data: dataQuestions, error } = useQuery(GET_QUESTIONS, {
    variables: { id: 1 },
  });

  const importanceObj = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
  };

  const task = '문제 풀기';

  let answerVisible;
  if (!visible) {
    answerVisible = 'none';
  } else {
    answerVisible = '';
  }
  return {
    answerVisible,
    task,
    importanceObj,
    error,
    dataQuestions,
    setNewAnswer,
    newAnswer,
    setNewQ,
    newQ,
    setEditing,
    editing,
    setVisible,
    visible,
    setRating,
    rating,
  };
};

export default useSolvePage;
