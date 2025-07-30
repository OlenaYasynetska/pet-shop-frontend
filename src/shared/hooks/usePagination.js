import { useState, useMemo, useCallback } from 'react';

export const usePagination = (items, itemsPerPage = 8) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => {
    return Math.ceil(items.length / itemsPerPage);
  }, [items.length, itemsPerPage]);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const goToPage = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const goToPreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPages]);

  const resetToFirstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    goToPreviousPage,
    goToNextPage,
    resetToFirstPage,
    canGoPrevious,
    canGoNext
  };
}; 