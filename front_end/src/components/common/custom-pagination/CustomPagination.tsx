import React, { useEffect, useState } from 'react';

import { DOTS, usePagination } from './usePagination';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import Constants from '@/utils/Constants';
import { cn } from '@/lib/utils';

const CustomPagination = (props: any) => {
    const {
        total = 0,
        itemCount = 1,
        siblingCount = 1,
        limit = Constants.PAGINATION.LIMIT,
        onChange = () => { },
        page = 1,
        // onChangeRowPerpage = {},
        // isRowPerPage = false,
        className,
        // classNameRowPerpage,
    } = props;
    const [currentPage, setCurrentPage] = useState(1);
    const [limitPage, setLimitPage] = useState(Constants.PAGINATION.LIMIT);

    const onPageChange = (e: any) => {
        setCurrentPage(parseInt(e, 10));
        onChange(parseInt(e, 10));
    };
    useEffect(() => {
        if (page) {
            setCurrentPage(parseInt(page, 10));
        } else {
            setCurrentPage(1);
        }
    }, [page]);

    const paginationRange = usePagination({
        total,
        limit: limit,
        siblingCount,
        currentPage,
        itemCount,
    });

    let lastPage = paginationRange?.[paginationRange?.length - 1] || 1;

    const onNext = () => {
        if (Number(currentPage) < Number(lastPage)) {
            onPageChange(currentPage + 1);

        }
    };

    const onPrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };
    return (
        <div className={cn('flex justify-between items-center w-full', className)}>
            {/* {currentPage === 0 || (Array.isArray(paginationRange) ? paginationRange?.length < 2 : false) ? (
                <></>
            ) : (
              
            )} */}
            <Pagination>
                <PaginationContent>
                    <PaginationItem className="flex items-center">
                        <PaginationPrevious
                            className={cn('cursor-pointer', {
                                'cursor-default': currentPage == 1,
                            })}
                            onClick={1 != currentPage ? onPrevious : undefined}
                        />
                    </PaginationItem>
                    {paginationRange?.map((pageNumber, key) => {
                        if (pageNumber === DOTS) {
                            return (
                                <PaginationItem key={key}>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            );
                        }
                        return (
                            <PaginationItem key={key}>
                                <PaginationLink
                                    className="cursor-pointer"
                                    onClick={() => onPageChange(pageNumber)}
                                    isActive={currentPage == pageNumber}
                                >
                                    {pageNumber}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    })}
                    <PaginationItem className="flex items-center">
                        <PaginationNext
                            className={cn('cursor-pointer', {
                                'cursor-default': lastPage == currentPage,
                            })}
                            onClick={lastPage != currentPage ? onNext : undefined}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default CustomPagination;
