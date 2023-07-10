import React, { useEffect, useState } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { IconButton } from '@mui/material';
import { useHistory } from 'react-router';
import { getCreatedByParam, getPageParam, getPageSizeParam } from '../../utils/defaultParams';
import { useGetQueryParams } from '../../hooks/useGetQueryParams';

interface PaginatorProps {
  disableNextButton: boolean;
}

export const Paginator: React.FC<PaginatorProps> = ({
  disableNextButton
}) => {
  const history = useHistory();
  const { page, createdBy } = useGetQueryParams();
  const [pageNum, setPageNum] = useState<number>(0);

  const handleNextClick = () => setPageNum(pageNum + 1);
  const handlePrevClick = () => setPageNum(pageNum - 1);

  const createdByUser = createdBy ? getCreatedByParam(createdBy + '&') : '';

  useEffect(() => {
    history.replace(`?${createdByUser}${getPageParam(pageNum)}&${getPageSizeParam(8)}`)
  }, [pageNum]);

  return (
    <>
      <IconButton
        onClick={handlePrevClick}
        disabled={Number(page) === 0}
      >
        <KeyboardArrowLeftIcon />
      </IconButton>
      {pageNum}
      <IconButton
        onClick={handleNextClick}
        disabled={disableNextButton}
      >
        <KeyboardArrowRightIcon />
      </IconButton>
    </>
  )
}