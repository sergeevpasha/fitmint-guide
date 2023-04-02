import { NextApiRequest, NextApiResponse } from 'next';
import UserService from '../../../app/services/UserService';
import { UserModel } from '../../../app/models/User';
import dbConnect from '../../../mongoose';

async function showUser(address: string, response: NextApiResponse): Promise<void> {
    const user: UserModel | null = await UserService.findByAddress(address);
    response.status(200).json({ success: true, data: user });
}

async function decreaseUserAttempts(address: string, response: NextApiResponse): Promise<void> {
    const user: UserModel | null = await UserService.decreaseAttempts(address, 1);
    response.status(200).json({ success: true, data: user });
}

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    const {
        query: { address },
        method
    } = request;

    await dbConnect();

    switch (method) {
        case 'GET':
            await showUser(address as string, response);
            break;
        case 'PATCH':
            await decreaseUserAttempts(address as string, response);
            break;
        default:
            response.setHeader('Allow', ['GET', 'PATCH']);
            response.status(405).end(`Method ${method} Not Allowed`);
    }
}
