import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// QueryDateParams
interface QueryDateParams {


}

// QueryDateResponse
interface QueryDateResponse {
    code: number;
    message: string;
    data: {
        staking: string;
        validators: number;
        addAddress: number;
        day7Transactions: number;
        day30Transactions: number;
    };
}


const queryDate = async (params?: QueryDateParams): Promise<QueryDateResponse> => {
    const config: AxiosRequestConfig = {
        method: 'get', 
        url: 'https://ms-mainnet-api.chainservice.io/scan/queryDate',
        params, 
    };

    try {
        const response: AxiosResponse<QueryDateResponse> = await axios(config);
        return response.data;
    } catch (error) {
        // 处理错误
        console.error(error);
        throw error;
    }
};

export default queryDate;
