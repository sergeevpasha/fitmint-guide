import { Activity, ActivityModel } from '../models/Activity';

class CalculatorService {
    public static async avgProfitPerPower(): Promise<number | null> {
        const avgProfitPerPower: ActivityModel[] = await Activity.aggregate([
            { $group: { _id: null, profit_per_power: { $avg: '$profit_per_power' } } }
        ]);

        return avgProfitPerPower[0]?.profit_per_power || null;
    }

    public static async avgEnergyEarningCoefficient(): Promise<number | null> {
        const avgEnergyEarningCoefficient: ActivityModel[] = await Activity.aggregate([
            { $group: { _id: null, energy_earning_coefficient: { $avg: '$energy_earning_coefficient' } } }
        ]);

        return avgEnergyEarningCoefficient[0]?.energy_earning_coefficient || null;
    }

    public static async avgDurabilitySpending(): Promise<number | null> {
        const avgDurabilitySpending: ActivityModel[] = await Activity.aggregate([
            { $group: { _id: null, durability_spending: { $avg: '$durability_spending' } } }
        ]);

        return avgDurabilitySpending[0]?.durability_spending || null;
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
