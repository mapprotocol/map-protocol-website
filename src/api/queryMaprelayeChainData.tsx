import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// QueryDateParams
interface QueryDateParams {


}

// QueryDateResponse
interface QueryMaprelayeChainDataResponse {
    code: number;
    message: string;
    data: {
        staking: string;
        txCount: number;
        address: number;
        contract: number;
        validators: number;
        stakingApy: string;
        supply: string;
        crossAssetCount: string;
    };
}


const queryMaprelayeChainData = async (params?: QueryDateParams): Promise<QueryMaprelayeChainDataResponse> => {
    const config: AxiosRequestConfig = {
        method: 'get',
        url: 'https://makalu-api.mapscan.io/scan/queryMaprelayeChainData',
        params,
    };

    try {
        const response: AxiosResponse<QueryMaprelayeChainDataResponse> = await axios(config);
        return response.data;
    } catch (error) {

        console.error(error);
        throw error;
    }
};

export default queryMaprelayeChainData;
