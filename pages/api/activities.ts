import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../mongoose';
import ActivityService from '../../app/services/ActivityService';
import { ActivityModel } from '../../app/models/Activity';

function validateRequest(request: any, response: NextApiResponse): boolean {
    const errors: unknown[] = [];

    if (!request.sneaker_level) {
        errors.push('Sneaker level is not set');
    } else if (+request.sneaker_level !== Number(request.sneaker_level)) {
        errors.push('Sneaker level must be a number');
    }

    if (!request.next_level) {
        errors.push('Next level cost is not set');
    } else if (+request.next_level !== Number(request.next_level)) {
        errors.push('Next level cost must be a number');
    }

    if (!request.health_spent) {
        errors.push('Health spent is not set');
    } else if (+request.health_spent !== Number(request.health_spent)) {
        errors.push('Health spent must be a number');
    }

    if (!request.repair_cost) {
        errors.push('Repair cost per health is not set');
    } else if (+request.repair_cost !== Number(request.repair_cost)) {
        errors.push('Repair cost per health must be a number');
    }

    if (!request.energy_spent) {
        errors.push('Energy spent is not set');
    } else if (+request.energy_spent !== Number(request.energy_spent)) {
        errors.push('Energy must be a number');
    }

    if (!request.earnings) {
        errors.push('Earnings is not set');
    } else if (+request.earnings !== Number(request.earnings)) {
        errors.push('Earnings must be a number');
    }

    if (!request.power) {
        errors.push('Sneaker power is not set');
    } else if (+request.power !== Number(request.power)) {
        errors.push('Sneaker power must be a number');
    }

    if (!request.durability) {
        errors.push('Sneaker durability is not set');
    } else if (+request.durability !== Number(request.durability)) {
        errors.push('Sneaker durability must be a number');
    }

    if (!request.stamina) {
        errors.push('Sneaker stamina is not set');
    } else if (+request.stamina !== Number(request.stamina)) {
        errors.push('Sneaker stamina must be a number');
    }

    if (!request.comfort) {
        errors.push('Sneaker comfort is not set');
    } else if (+request.comfort !== Number(request.comfort)) {
        errors.push('Sneaker comfort must be a number');
    }

    if (errors.length) {
        response.status(422).json({ success: false, data: { errors } });
        return false;
    }

    return true;
}

async function createActivity(request: { [p: string]: string | string[] }, response: NextApiResponse): Promise<void> {
    const activity: ActivityModel = await ActivityService.create(request);
    response.status(201).json({ success: true, data: activity });
}

async function showActivities(request: { [p: string]: string | string[] }, response: NextApiResponse): Promise<void> {
    const activities: ActivityModel[] | null = await ActivityService.query(request);
    response.status(200).json({ success: true, data: activities });
}

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    const { method } = request;

    await dbConnect();

    switch (method) {
        case 'GET':
            await showActivities(request.query, response);
            break;
        case 'POST':
            if (validateRequest(request.body, response)) {
                await createActivity(request.body, response);
            }
            break;
        default:
            response.status(400).json({ success: false });
            break;
    }
}
