import { Activity, ActivityModel, ActivityType } from '../models/Activity';

class CalculatorService {
    public static async avgRepairCostPerEnergy(): Promise<number | null> {
        const avgRepairCostPerEnergy: ActivityModel[] = await Activity.aggregate([
            { $group: { _id: null, repair_cost_per_energy: { $avg: '$repair_cost_per_energy' } } }
        ]);

        return avgRepairCostPerEnergy[0]?.repair_cost_per_energy || null;
    }

    public static async avgProfitPerPowerTypeModifiers(): Promise<{
        walk: number | null;
        jog: number | null;
        run: number | null;
    }> {
        const walkTypes: ActivityModel[] = await Activity.aggregate([
            { $match: { type: ActivityType.WALK } },
            {
                $group: { _id: null, profit_per_power: { $avg: '$profit_per_power' } }
            }
        ]);

        const jogTypes: ActivityModel[] = await Activity.aggregate([
            { $match: { type: ActivityType.JOG } },
            {
                $group: { _id: null, profit_per_power: { $avg: '$profit_per_power' } }
            }
        ]);

        const runTypes: ActivityModel[] = await Activity.aggregate([
            { $match: { type: ActivityType.RUN } },
            {
                $group: { _id: null, profit_per_power: { $avg: '$profit_per_power' } }
            }
        ]);

        return {
            walk: walkTypes[0]?.profit_per_power || null,
            jog: jogTypes[0]?.profit_per_power || null,
            run: runTypes[0]?.profit_per_power || null
        };
    }

    public static async repairToSneakerLevelList(): Promise<object[] | null> {
        const activities: ActivityModel[] | null = await Activity.find({}, ['-_id', 'sneaker_level', 'repair_cost'], {
            sort: {
                durability: 1
            }
        });

        return activities
            ? [...new Map(activities.map((activity: ActivityModel) => [activity.sneaker_level, activity])).values()]
            : null;
    }
}

export default CalculatorService;
