import baseUrl from '../API/baseURL'

const useUpdateDataWithImage = async (url, parmas) => {
    const config = {
        headers: { "Content-Type": "multipart/form-data" }
    }
    const res = await baseUrl.put(url, parmas, config);
    return res;
}

export { useUpdateDataWithImage };