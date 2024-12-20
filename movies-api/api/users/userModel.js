import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true},
  password: {
    type: String,
    required: [true, 'Password is required'],
    validate: {
        validator: function (value) {
            // 验证密码是否符合至少8个字符，包含字母、数字和特殊字符的要求
            return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
        },
        message: 'Password must be at least 8 characters long, contain at least one letter, one number, and one special character',
    },
},
});

export default mongoose.model('User', UserSchema);
