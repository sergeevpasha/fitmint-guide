import { Activity, ActivityModel } from '../models/Activity';

class ActivityService {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static async query(_query: any): Promise<ActivityModel[] | null> {
        return Activity.find();
    }

    public static async findByPk(id: string): Promise<ActivityModel | null> {
        return Activity.findById(id).catch(() => null);
    }

    public static async create(createActivity: any): Promise<any> {
        return Activity.create({
            type: createActivity.type,
            calories: createActivity.calories,
            earnings: createActivity.earnings,
            health_spent: createActivity.health_spent,
            repair_cost: createActivity.repair_cost,
            energy_spent: createActivity.energy_spent,
            sneaker_level: createActivity.sneaker_level,
            next_level: createActivity.next_level,
            power: createActivity.power,
            durability: createActivity.durability,
            stamina: createActivity.stamina,
            comfort: createActivity.comfort,
            version: createActivity.version
        });
    }
}

export default ActivityService;
