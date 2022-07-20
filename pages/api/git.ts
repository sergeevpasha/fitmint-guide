import * as git from 'git-rev-sync';

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    const { method } = request;

    switch (method) {
        case 'GET':
            response.status(200).json({ tag: git.tag() });
            break;
        default:
            response.status(400).json({ success: false });
            break;
    }
}
