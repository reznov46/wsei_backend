import React, { useEffect, useState } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { IconButton } from '@mui/material';
import { useHistory } from 'react-router';
import { getCategoryIdParam, getCreatedByParam, getPageNumParam, getPageSizeParam } from '../../utils/defaultParams';
import { useGetQueryParams } from '../../hooks/useGetQueryParams';

interface PaginatorProps {
  disableNextButton: boolean;
}

export const Paginator: React.FC<PaginatorProps> = ({
  disableNextButton
}) => {
  const history = useHistory();
  const { page, createdBy, categoryId } = useGetQueryParams();
  const [pageNum, setPageNum] = useState<number>(0);

  const handleNextClick = () => setPageNum(pageNum + 1);
  const handlePrevClick = () => setPageNum(pageNum - 1);

  const getSideEffectInURL = (): string => {
    const createdBySideEffect = createdBy ? getCreatedByParam(createdBy) : '';
    const categoryIdSideEffect = categoryId ? getCategoryIdParam(categoryId) : '';

    return createdBySideEffect || categoryIdSideEffect
  }

  useEffect(() => {
    const surfix = getSideEffectInURL().length ? `${getSideEffectInURL()}&` : '';
    const link = `?${surfix}${getPageNumParam(pageNum)}&${getPageSizeParam(8)}`;
    history.replace(link)
  }, [pageNum]);

  return (
    <>
      <IconButton
        onClick={handlePrevClick}
        disabled={Number(page) === 0}
      >
        <KeyboardArrowLeftIcon />
      </IconButton>
      {pageNum + 1}
      <IconButton
        onClick={handleNextClick}
        disabled={disableNextButton}
      >
        <KeyboardArrowRightIcon />
      </IconButton>
    </>
  )
}