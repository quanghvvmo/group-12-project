const pagination = async (arr, page, pageSize) => {
    let data = []
    const totalItem = arr.length;
    let totalPage
    if (totalItem % pageSize == 0){
        totalPage = totalItem / pageSize;
    }else{
        totalPage = parseInt(totalItem / pageSize) + 1;
    }
    for(let i = 0; i < pageSize; i++){
        data.push(arr[(page-1)*pageSize+i]);
        }
    return {totalPage, totalItem, page, pageSize, data};
}

export default pagination;