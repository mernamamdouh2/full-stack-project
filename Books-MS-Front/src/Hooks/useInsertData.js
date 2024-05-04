import baseUrl from '../API/baseURL'

const useInsertDataWithImage = async (url, parmas) => {
    const config = {
        headers: { "Content-Type": "multipart/form-data" }
    }
    const res = await baseUrl.post(url, parmas, config);
    return res;
}

export { useInsertDataWithImage };