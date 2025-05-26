import mongoose from 'mongoose';

const DonorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 0 },
    gender: { type: String, enum: ['Male', 'Female'], required: true },
    organ_donating: { type: String, required: true },
    blood_type: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      required: true,
    },
    health_status: {
      type: String,
      enum: ['Healthy', 'Stable', 'Moderate'],
      required: true,
    },
    latitude: { type: Number, required: true, min: -90, max: 90 },
    longitude: { type: Number, required: true, min: -180, max: 180 },
  },
  { timestamps: true }
);

const Donor = mongoose.models.Donor || mongoose.model('Donor', DonorSchema);
export default Donor