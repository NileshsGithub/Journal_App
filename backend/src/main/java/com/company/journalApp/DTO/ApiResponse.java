package com.company.journalApp.DTO;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Builder
public class ApiResponse<T> {
    private Integer totalPages;
    private Long totalRecords;
    private Integer currentPage;
    private Integer currentPageSize;
    private List<T> responseData;

    public ApiResponse(Integer totalPages, Long totalRecords, Integer currentPage, Integer currentPageSize, List<T> responseData) {
        this.totalPages = totalPages;
        this.totalRecords = totalRecords;
        this.currentPage = currentPage;
        this.currentPageSize = currentPageSize;
        this.responseData = responseData;
    }
}
