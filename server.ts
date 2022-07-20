import { config } from 'dotenv';
import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { Base64 } from 'js-base64';
import UserService from './app/services/UserService';
import { ActivityRequest } from './app/models/Activity';
import ActivityService from './app/services/ActivityService';

config({ path: '.env.local' });

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.NEXT_PUBLIC_APP_PORT ? +process.env.NEXT_PUBLIC_APP_PORT : 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();
const fitmintGuideActivitiesContractAddress = process.env.NEXT_PUBLIC_FITMINT_GUIDE_ACTIVITIES_CONTRACT || '';
const accountTopUp = process.env.NEXT_PUBLIC_ACCOUNT_TOP_UP_EVENT || '';
const activityUploaded = process.env.NEXT_PUBLIC_ACTIVITY_UPLOADED_EVENT || '';

const rpcWsUrl = process.env.NEXT_PUBLIC_ACLHEMY_API_WS_URL || '';
const web3 = createAlchemyWeb3(rpcWsUrl);

app.prepare().then(() => {
    createServer(async (req: any, res) => {
        try {
            const parsedUrl = parse(req.url, true);
            await handle(req, res, parsedUrl);
        } catch (err) {
            res.statusCode = 500;
            res.end('internal server error');
        }
    }).listen(port);
});

web3.eth
    .subscribe('logs', {
        address: fitmintGuideActivitiesContractAddress,
        topics: [activityUploaded]
    })
    .on('data', async ({ data }) => {
        const decoded = web3.eth.abi.decodeParameters(['address', 'string'], data);
        const activity: ActivityRequest = JSON.parse(Base64.decode(decoded['1']));
        await ActivityService.create(activity);
    });

web3.eth
    .subscribe('logs', {
        address: fitmintGuideActivitiesContractAddress,
        topics: [accountTopUp]
    })
    .on('data', async ({ data }: { data: string }) => {
        const decoded = web3.eth.abi.decodeParameters(['address', 'uint256'], data);
        await UserService.increaseAttempts(decoded['0'], parseInt(decoded['1'], 10));
    });
