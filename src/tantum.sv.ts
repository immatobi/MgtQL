import Axios from 'axios';

interface IResult {
    error: boolean,
    message: string,
    data: any
}

class Tatum {

    public apiKey: string;
    public apiUrl: string;
    public result: IResult;
    private chains: Array<{name: string, symbol: string}>
    private config: any;

    constructor(){

        this.apiKey = process.env.TATUM_API_KEY || '';
        this.apiUrl = process.env.TATUM_API_URL || '';

        this.result = { error: false, message: '', data: null }
        this.chains = [
            { name: 'bitcoin', symbol: 'BTC' }
        ];

        this.config = { headers: { 'x-api-key': this.apiKey } }

    }

    public async generateBTCWallet(mnemonic: string): Promise<IResult> {


        // await Axios.get(`${this.apiUrl}/bitcoin/wallet?mnemonic=${mnemonic}`, this.config)
        // .then((resp) => {

        //     this.result.data = resp.data;

        // }).catch((err) => {
        //     this.result.error = true;
        //     this.result.message = `Error:`;
        //     this.result.data = JSON.stringify(err);
        // })
        this.result.data = this.apiKey;
        return this.result;

    }

}

export default new Tatum();