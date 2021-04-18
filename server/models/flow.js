// import mongoose from 'mongoose';

// const flowSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       unique: true,
//       required: true,
//     },
//   },
//   { timestamps: true },
// );

// flowSchema.statics.findByLogin = async function (login) {
//   let user = await this.findOne({
//     username: login,
//   });

//   if (!user) {
//     user = await this.findOne({ email: login });
//   }

//   return user;
// };

// const Flow = mongoose.model('Flow', flowSchema);

// export default Flow;
