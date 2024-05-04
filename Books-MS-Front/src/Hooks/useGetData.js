import baseUrl from '../API/baseURL'

const useGetData = async (url, parmas) => {
    const res = await baseUrl.get(url, parmas);
    return res.data;
}

export { useGetData };