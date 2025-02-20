import { ConfigProvider, Pagination, theme } from "antd"

export default function CustomPagination({setPaginationParams, totalElements, paginationParams, loading} : {setPaginationParams : any, totalElements : number, paginationParams : any, loading: boolean}){
    return (
        <ConfigProvider theme={{algorithm: theme.darkAlgorithm,}}>
            <Pagination onChange={(page, pageSize) => {
                setPaginationParams({'pageNumber': page - 1, 'pageSize': pageSize})
            }} total={totalElements} defaultPageSize={paginationParams.pageSize} showSizeChanger
                        pageSizeOptions={[5, 10, 20, 50]} current={paginationParams.pageNumber + 1}
                        disabled={loading}
            />
        </ConfigProvider>
    )
}