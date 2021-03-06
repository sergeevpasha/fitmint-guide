import mongoose from 'mongoose';

export enum ActivityType {
    RUN = 'RUN',
    JOG = 'JOG',
    WALK = 'WALK'
}

export interface ActivityModel {
    type: ActivityType;
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
    version: number;
    profit_per_power: number;
    repair_cost_per_energy: number;
    durability_coefficient: number;
}

export interface ActivityRequest {
    type: ActivityType;
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
    version: number;
}

const schema = new mongoose.Schema<ActivityModel>({
    type: {
        type: mongoose.Schema.Types.String,
        enum: ActivityType,
        default: ActivityType.WALK
    },
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
    version: {
        type: mongoose.Schema.Types.Number,
        default: 1
    },
    profit_per_power: {
        type: Number,
        default() {
            return this.earnings / this.energy_spent / this.power;
        }
    },
    repair_cost_per_energy: {
        type: Number,
        default() {
            return (this.repair_cost * this.health_spent) / this.energy_spent;
        }
    },
    durability_coefficient: {
        type: Number,
        default() {
            return (this.health_spent / this.energy_spent) * this.durability;
        }
    }
});

export const Activity = mongoose.models?.Activity || mongoose.model<ActivityModel>('Activity', schema);

export default { Activity };
