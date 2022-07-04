import mongoose from 'mongoose';

export type Address = string;

export interface UserModel {
    address: Address;
    attempts: number;
}

const schema = new mongoose.Schema<UserModel>({
    address: {
        type: mongoose.Schema.Types.String
    },
    attempts: {
        type: mongoose.Schema.Types.Number
    }
});

export const User = mongoose.models?.User || mongoose.model<UserModel>('User', schema);

export default { User };
