import { useState, useRef, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import {
  DELETE_CATEGORY,
  GET_CATEGORIES,
  EDIT_CATEGORY,
} from '../graphql/queries';

type useMutateCategoryProps = {
  history: any;
};

const useMutateCategory = ({ history }: useMutateCategoryProps) => {
  const [editing, setEditing] = useState<boolean>(false);
  const inputEl = useRef() as any;

  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORIES, variables: { id: 1 } }],
    onCompleted: () => {
      alert('삭제되었습니다');
      history.push('/');
    },
  });
  const [editCategory] = useMutation(EDIT_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORIES, variables: { id: 1 } }],
  });

  useEffect(() => {
    if (inputEl && inputEl.current) inputEl.current.focus();
  }, [inputEl, editing]);

  return { editing, setEditing, inputEl, deleteCategory, editCategory };
};

export default useMutateCategory;
