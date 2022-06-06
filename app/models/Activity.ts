import mongoose from 'mongoose';

export interface ActivityModel {
    calories: number;
    earnings: number;
    sneaker_level: number;
    next_level: number;
    health_spent: number;
    repair_cost: number;
    energy_spent: number;
    power: number;
    durability: number;
    stamina: number;
    comfort: number;
    profit_per_power: number;
    energy_earning_coefficient: number;
    durability_spending: number;
}

const schema = new mongoose.Schema<ActivityModel>({
    sneaker_level: {
        type: mongoose.Schema.Types.Number
    },
    next_level: {
        type: mongoose.Schema.Types.Number
    },
    calories: {
        type: mongoose.Schema.Types.Number
    },
    earnings: {
        type: mongoose.Schema.Types.Number
    },
    energy_spent: {
        type: mongoose.Schema.Types.Number
    },
    health_spent: {
        type: mongoose.Schema.Types.Number
    },
    repair_cost: {
        type: mongoose.Schema.Types.Number
    },
    power: {
        type: mongoose.Schema.Types.Number
    },
    durability: {
        type: mongoose.Schema.Types.Number
    },
    stamina: {
        type: mongoose.Schema.Types.Number
    },
    comfort: {
        type: mongoose.Schema.Types.Number
    },
    profit_per_power: {
        type: Number,
        default() {
            return this.earnings / this.energy_spent / this.power;
        }
    },
    energy_earning_coefficient: {
        type: Number,
        default() {
            return this.earnings / this.energy_spent / (this.power + this.sneaker_level);
        }
    },
    durability_spending: {
        type: Number,
        default() {
            return this.repair_cost + this.repair_cost * (this.durability / 100);
        }
    }
});

export const Activity = mongoose.models.Activity || mongoose.model<ActivityModel>('Activity', schema);

export default { Activity };
