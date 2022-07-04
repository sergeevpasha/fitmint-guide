import { User, UserModel } from '../models/User';

class UserService {
    public static async findByAddress(address: string): Promise<UserModel | null> {
        return User.findOne({ address: { $regex: new RegExp(address, 'i') } }).catch(() => null);
    }

    public static async checkAttemptAllowance(address: string): Promise<boolean> {
        const user = await User.findOne({ address: { $regex: new RegExp(address, 'i') } }).catch(() => null);
        return user.attempts > 0;
    }

    public static async increaseAttempts(address: string, attempts: number): Promise<void> {
        const user = await User.findOne({ address: { $regex: new RegExp(address, 'i') } }).catch(() => null);
        if (!user) {
            await User.create({
                address,
                attempts
            });
        } else {
            user.attempts += attempts;
            user.save();
        }
    }

    public static async decreaseAttempts(address: string, attempts: number): Promise<UserModel | null> {
        const user = await User.findOne({ address: { $regex: new RegExp(address, 'i') } }).catch(() => null);
        if (user) {
            user.attempts = user.attempts > 1 ? user.attempts - attempts : 0;
            return user.save();
        }

        return null;
    }
}

export default UserService;
