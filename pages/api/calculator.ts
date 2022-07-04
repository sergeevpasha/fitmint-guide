import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../mongoose';
import CalculatorService from '../../app/services/CalculatorService';

async function getAverageData(response: NextApiResponse): Promise<void> {
    const avpProfitPerPowerTypeModifiers: any = await CalculatorService.avgProfitPerPowerTypeModifiers();
    const repairToSneakerLevelList: object[] | null = await CalculatorService.repairToSneakerLevelList();

    response.status(200).json({
        success: true,
        data: {
            avg_profit_per_power_type_modifier: avpProfitPerPowerTypeModifiers,
            repair_list: repairToSneakerLevelList
        }
    });
}

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    const { method } = request;

    await dbConnect();

    switch (method) {
        case 'GET':
            await getAverageData(response);
            break;
        default:
            response.status(400).json({ success: false });
            break;
    }
}
