"use server"

import Donor from "@/lib/donormodel";
import connectDB from "@/lib/mongodb";
import mongoose from "mongoose";

const data=[
  {
    "name":"Geeta Thapa",
    "age":54,
    "gender":"Male",
    "organ_donating":"Lung",
    "blood_type":"O-",
    "health_status":"Healthy",
    "latitude":26.380587,
    "longitude":86.958681
  },
  {
    "name":"Sunita Bhatta",
    "age":37,
    "gender":"Male",
    "organ_donating":"Lung",
    "blood_type":"O-",
    "health_status":"Healthy",
    "latitude":29.321343,
    "longitude":86.818455
  },
  {
    "name":"Anita K.C.",
    "age":57,
    "gender":"Female",
    "organ_donating":"Eye",
    "blood_type":"A+",
    "health_status":"Stable",
    "latitude":30.272052,
    "longitude":81.399196
  },
  {
    "name":"Laxmi Rai",
    "age":53,
    "gender":"Female",
    "organ_donating":"Liver",
    "blood_type":"B-",
    "health_status":"Moderate",
    "latitude":26.378439,
    "longitude":83.181916
  },
  {
    "name":"Anita Gurung",
    "age":34,
    "gender":"Male",
    "organ_donating":"Liver",
    "blood_type":"B-",
    "health_status":"Healthy",
    "latitude":30.364839,
    "longitude":87.503164
  },
  {
    "name":"Laxmi Dahal",
    "age":49,
    "gender":"Female",
    "organ_donating":"Eye",
    "blood_type":"AB+",
    "health_status":"Stable",
    "latitude":27.085095,
    "longitude":87.107644
  },
  {
    "name":"Raju Sharma",
    "age":59,
    "gender":"Female",
    "organ_donating":"Kidney",
    "blood_type":"AB+",
    "health_status":"Healthy",
    "latitude":29.638629,
    "longitude":86.604558
  },
  {
    "name":"Laxmi Gurung",
    "age":28,
    "gender":"Male",
    "organ_donating":"Kidney",
    "blood_type":"O+",
    "health_status":"Stable",
    "latitude":26.727457,
    "longitude":80.318614
  },
  {
    "name":"Sunita Shrestha",
    "age":32,
    "gender":"Female",
    "organ_donating":"Liver",
    "blood_type":"A-",
    "health_status":"Healthy",
    "latitude":26.478209,
    "longitude":86.543727
  },
  {
    "name":"Sunita Gurung",
    "age":37,
    "gender":"Male",
    "organ_donating":"Kidney",
    "blood_type":"O-",
    "health_status":"Healthy",
    "latitude":27.665655,
    "longitude":86.339048
  },
  {
    "name":"Reshma Bhatta",
    "age":26,
    "gender":"Female",
    "organ_donating":"Lung",
    "blood_type":"AB+",
    "health_status":"Stable",
    "latitude":30.292116,
    "longitude":88.074227
  },
  {
    "name":"Geeta Sharma",
    "age":51,
    "gender":"Female",
    "organ_donating":"Eye",
    "blood_type":"B+",
    "health_status":"Healthy",
    "latitude":29.539116,
    "longitude":85.849657
  },
  {
    "name":"Bikash Bhatta",
    "age":52,
    "gender":"Female",
    "organ_donating":"Liver",
    "blood_type":"O+",
    "health_status":"Moderate",
    "latitude":29.724049,
    "longitude":83.795514
  },
  {
    "name":"Sunita Thapa",
    "age":31,
    "gender":"Female",
    "organ_donating":"Heart",
    "blood_type":"AB-",
    "health_status":"Stable",
    "latitude":26.639015,
    "longitude":86.775397
  },
  {
    "name":"Krishna Bhatta",
    "age":28,
    "gender":"Female",
    "organ_donating":"Liver",
    "blood_type":"AB-",
    "health_status":"Healthy",
    "latitude":28.241772,
    "longitude":86.878878
  },
  {
    "name":"Milan Rai",
    "age":22,
    "gender":"Male",
    "organ_donating":"Heart",
    "blood_type":"B+",
    "health_status":"Stable",
    "latitude":30.444428,
    "longitude":85.167392
  },
  {
    "name":"Sunita Bhatta",
    "age":36,
    "gender":"Female",
    "organ_donating":"Liver",
    "blood_type":"B-",
    "health_status":"Moderate",
    "latitude":28.640995,
    "longitude":84.942254
  },
  {
    "name":"Raju Bhatta",
    "age":49,
    "gender":"Male",
    "organ_donating":"Lung",
    "blood_type":"A-",
    "health_status":"Stable",
    "latitude":28.322288,
    "longitude":81.205077
  },
  {
    "name":"Suman Lama",
    "age":24,
    "gender":"Male",
    "organ_donating":"Lung",
    "blood_type":"AB+",
    "health_status":"Moderate",
    "latitude":29.973543,
    "longitude":86.771509
  },
  {
    "name":"Bikash Thapa",
    "age":33,
    "gender":"Male",
    "organ_donating":"Heart",
    "blood_type":"O-",
    "health_status":"Stable",
    "latitude":28.620166,
    "longitude":83.493624
  },
  {
    "name":"Raju Bhatta",
    "age":57,
    "gender":"Female",
    "organ_donating":"Heart",
    "blood_type":"O+",
    "health_status":"Stable",
    "latitude":27.212795,
    "longitude":84.465692
  },
  {
    "name":"Raju Rai",
    "age":21,
    "gender":"Male",
    "organ_donating":"Eye",
    "blood_type":"AB+",
    "health_status":"Stable",
    "latitude":27.959375,
    "longitude":84.657091
  },
  {
    "name":"Krishna Gurung",
    "age":56,
    "gender":"Male",
    "organ_donating":"Liver",
    "blood_type":"O+",
    "health_status":"Healthy",
    "latitude":28.067083,
    "longitude":84.975403
  },
  {
    "name":"Raju Bhatta",
    "age":56,
    "gender":"Male",
    "organ_donating":"Heart",
    "blood_type":"AB-",
    "health_status":"Healthy",
    "latitude":26.520467,
    "longitude":82.892328
  },
  {
    "name":"Laxmi K.C.",
    "age":40,
    "gender":"Female",
    "organ_donating":"Liver",
    "blood_type":"A+",
    "health_status":"Moderate",
    "latitude":28.667578,
    "longitude":83.082038
  },
  {
    "name":"Suman Neupane",
    "age":48,
    "gender":"Female",
    "organ_donating":"Lung",
    "blood_type":"A+",
    "health_status":"Moderate",
    "latitude":26.387575,
    "longitude":85.079729
  },
  {
    "name":"Laxmi Rai",
    "age":23,
    "gender":"Male",
    "organ_donating":"Lung",
    "blood_type":"B-",
    "health_status":"Stable",
    "latitude":27.264702,
    "longitude":87.721051
  },
  {
    "name":"Laxmi Shrestha",
    "age":51,
    "gender":"Male",
    "organ_donating":"Heart",
    "blood_type":"A+",
    "health_status":"Moderate",
    "latitude":26.855371,
    "longitude":84.590601
  },
  {
    "name":"Reshma Dahal",
    "age":44,
    "gender":"Female",
    "organ_donating":"Liver",
    "blood_type":"A-",
    "health_status":"Healthy",
    "latitude":26.814678,
    "longitude":84.601586
  },
  {
    "name":"Bikash Bhatta",
    "age":40,
    "gender":"Female",
    "organ_donating":"Eye",
    "blood_type":"A-",
    "health_status":"Moderate",
    "latitude":27.170719,
    "longitude":81.754857
  },
  {
    "name":"Suman Bhatta",
    "age":57,
    "gender":"Male",
    "organ_donating":"Liver",
    "blood_type":"A-",
    "health_status":"Moderate",
    "latitude":28.749708,
    "longitude":81.049591
  },
  {
    "name":"Suman K.C.",
    "age":35,
    "gender":"Female",
    "organ_donating":"Eye",
    "blood_type":"AB+",
    "health_status":"Healthy",
    "latitude":29.662986,
    "longitude":88.16178
  },
  {
    "name":"Milan Shrestha",
    "age":44,
    "gender":"Male",
    "organ_donating":"Eye",
    "blood_type":"A+",
    "health_status":"Healthy",
    "latitude":27.862485,
    "longitude":83.488793
  },
  {
    "name":"Anita Shrestha",
    "age":51,
    "gender":"Female",
    "organ_donating":"Lung",
    "blood_type":"A-",
    "health_status":"Healthy",
    "latitude":27.070814,
    "longitude":87.601241
  },
  {
    "name":"Milan Neupane",
    "age":54,
    "gender":"Male",
    "organ_donating":"Heart",
    "blood_type":"AB+",
    "health_status":"Stable",
    "latitude":29.697152,
    "longitude":87.214789
  },
  {
    "name":"Sunita Sharma",
    "age":54,
    "gender":"Male",
    "organ_donating":"Eye",
    "blood_type":"AB+",
    "health_status":"Stable",
    "latitude":27.442485,
    "longitude":80.371659
  },
  {
    "name":"Suman Rai",
    "age":19,
    "gender":"Female",
    "organ_donating":"Lung",
    "blood_type":"AB+",
    "health_status":"Healthy",
    "latitude":30.134197,
    "longitude":85.08924
  },
  {
    "name":"Milan Thapa",
    "age":19,
    "gender":"Male",
    "organ_donating":"Liver",
    "blood_type":"B-",
    "health_status":"Stable",
    "latitude":29.223133,
    "longitude":86.636878
  },
  {
    "name":"Sunita Dahal",
    "age":39,
    "gender":"Male",
    "organ_donating":"Kidney",
    "blood_type":"A-",
    "health_status":"Healthy",
    "latitude":26.55988,
    "longitude":85.432907
  },
  {
    "name":"Sunita Dahal",
    "age":46,
    "gender":"Female",
    "organ_donating":"Liver",
    "blood_type":"AB-",
    "health_status":"Stable",
    "latitude":30.378987,
    "longitude":82.491409
  },
  {
    "name":"Milan Thapa",
    "age":50,
    "gender":"Male",
    "organ_donating":"Liver",
    "blood_type":"O+",
    "health_status":"Moderate",
    "latitude":30.248514,
    "longitude":84.023989
  },
  {
    "name":"Sunita Bhatta",
    "age":45,
    "gender":"Male",
    "organ_donating":"Lung",
    "blood_type":"AB-",
    "health_status":"Healthy",
    "latitude":29.649882,
    "longitude":83.493378
  },
  {
    "name":"Milan Bhatta",
    "age":53,
    "gender":"Male",
    "organ_donating":"Eye",
    "blood_type":"AB-",
    "health_status":"Stable",
    "latitude":26.616616,
    "longitude":81.288071
  },
  {
    "name":"Anita Thapa",
    "age":25,
    "gender":"Male",
    "organ_donating":"Liver",
    "blood_type":"O+",
    "health_status":"Moderate",
    "latitude":29.282468,
    "longitude":86.182844
  },
  {
    "name":"Laxmi Lama",
    "age":23,
    "gender":"Female",
    "organ_donating":"Kidney",
    "blood_type":"A+",
    "health_status":"Stable",
    "latitude":27.660549,
    "longitude":83.578927
  },
  {
    "name":"Suman Thapa",
    "age":28,
    "gender":"Female",
    "organ_donating":"Liver",
    "blood_type":"B-",
    "health_status":"Moderate",
    "latitude":27.838918,
    "longitude":85.404852
  },
  {
    "name":"Suman Gurung",
    "age":26,
    "gender":"Male",
    "organ_donating":"Heart",
    "blood_type":"B-",
    "health_status":"Stable",
    "latitude":26.870117,
    "longitude":83.734864
  },
  {
    "name":"Milan Neupane",
    "age":19,
    "gender":"Female",
    "organ_donating":"Lung",
    "blood_type":"A+",
    "health_status":"Moderate",
    "latitude":28.901058,
    "longitude":86.246722
  },
  {
    "name":"Milan Gurung",
    "age":37,
    "gender":"Male",
    "organ_donating":"Lung",
    "blood_type":"AB-",
    "health_status":"Moderate",
    "latitude":28.019192,
    "longitude":87.237545
  },
  {
    "name":"Krishna Neupane",
    "age":53,
    "gender":"Female",
    "organ_donating":"Lung",
    "blood_type":"AB-",
    "health_status":"Moderate",
    "latitude":26.909566,
    "longitude":85.391778
  },
  {
    "name":"Raju Bhatta",
    "age":27,
    "gender":"Female",
    "organ_donating":"Eye",
    "blood_type":"O+",
    "health_status":"Moderate",
    "latitude":29.289193,
    "longitude":87.223703
  },
  {
    "name":"Krishna Shrestha",
    "age":40,
    "gender":"Male",
    "organ_donating":"Heart",
    "blood_type":"AB+",
    "health_status":"Healthy",
    "latitude":26.516644,
    "longitude":81.035514
  },
  {
    "name":"Sunita Bhatta",
    "age":27,
    "gender":"Male",
    "organ_donating":"Eye",
    "blood_type":"A+",
    "health_status":"Stable",
    "latitude":27.17828,
    "longitude":84.368569
  },
  {
    "name":"Milan K.C.",
    "age":36,
    "gender":"Female",
    "organ_donating":"Heart",
    "blood_type":"AB-",
    "health_status":"Moderate",
    "latitude":28.832918,
    "longitude":85.690854
  },
  {
    "name":"Milan Thapa",
    "age":29,
    "gender":"Male",
    "organ_donating":"Kidney",
    "blood_type":"O+",
    "health_status":"Stable",
    "latitude":30.205248,
    "longitude":84.212081
  },
  {
    "name":"Raju Sharma",
    "age":43,
    "gender":"Male",
    "organ_donating":"Heart",
    "blood_type":"AB-",
    "health_status":"Moderate",
    "latitude":29.107098,
    "longitude":84.598641
  },
  {
    "name":"Anita Dahal",
    "age":42,
    "gender":"Female",
    "organ_donating":"Liver",
    "blood_type":"B-",
    "health_status":"Stable",
    "latitude":26.509128,
    "longitude":86.772303
  },
  {
    "name":"Sunita Gurung",
    "age":39,
    "gender":"Male",
    "organ_donating":"Eye",
    "blood_type":"A+",
    "health_status":"Healthy",
    "latitude":30.225067,
    "longitude":87.886765
  },
  {
    "name":"Sunita Lama",
    "age":47,
    "gender":"Female",
    "organ_donating":"Kidney",
    "blood_type":"O+",
    "health_status":"Healthy",
    "latitude":26.723757,
    "longitude":86.161225
  },
  {
    "name":"Laxmi Sharma",
    "age":48,
    "gender":"Female",
    "organ_donating":"Liver",
    "blood_type":"AB-",
    "health_status":"Moderate",
    "latitude":29.598279,
    "longitude":81.367204
  },
  {
    "name":"Krishna Neupane",
    "age":44,
    "gender":"Female",
    "organ_donating":"Kidney",
    "blood_type":"B+",
    "health_status":"Healthy",
    "latitude":29.590999,
    "longitude":84.47542
  },
  {
    "name":"Reshma Sharma",
    "age":27,
    "gender":"Male",
    "organ_donating":"Eye",
    "blood_type":"B-",
    "health_status":"Healthy",
    "latitude":26.780243,
    "longitude":85.518373
  },
  {
    "name":"Anita Gurung",
    "age":29,
    "gender":"Female",
    "organ_donating":"Eye",
    "blood_type":"B+",
    "health_status":"Stable",
    "latitude":30.376606,
    "longitude":84.860502
  },
  {
    "name":"Laxmi Lama",
    "age":35,
    "gender":"Female",
    "organ_donating":"Lung",
    "blood_type":"AB+",
    "health_status":"Stable",
    "latitude":27.663865,
    "longitude":86.437135
  },
  {
    "name":"Sunita Gurung",
    "age":42,
    "gender":"Female",
    "organ_donating":"Lung",
    "blood_type":"AB-",
    "health_status":"Moderate",
    "latitude":27.682566,
    "longitude":80.258184
  },
  {
    "name":"Suman Dahal",
    "age":35,
    "gender":"Female",
    "organ_donating":"Liver",
    "blood_type":"A-",
    "health_status":"Stable",
    "latitude":29.53693,
    "longitude":83.078397
  },
  {
    "name":"Bikash Gurung",
    "age":58,
    "gender":"Female",
    "organ_donating":"Kidney",
    "blood_type":"A+",
    "health_status":"Moderate",
    "latitude":27.46925,
    "longitude":85.863983
  },
  {
    "name":"Bikash Lama",
    "age":27,
    "gender":"Male",
    "organ_donating":"Eye",
    "blood_type":"AB+",
    "health_status":"Healthy",
    "latitude":29.722471,
    "longitude":85.921571
  },
  {
    "name":"Milan Shrestha",
    "age":19,
    "gender":"Male",
    "organ_donating":"Eye",
    "blood_type":"B-",
    "health_status":"Stable",
    "latitude":27.340722,
    "longitude":88.0271
  },
  {
    "name":"Milan Dahal",
    "age":55,
    "gender":"Male",
    "organ_donating":"Kidney",
    "blood_type":"A+",
    "health_status":"Healthy",
    "latitude":28.231633,
    "longitude":82.328717
  },
  {
    "name":"Raju Lama",
    "age":54,
    "gender":"Male",
    "organ_donating":"Kidney",
    "blood_type":"O+",
    "health_status":"Healthy",
    "latitude":26.644089,
    "longitude":87.324924
  },
  {
    "name":"Reshma Shrestha",
    "age":56,
    "gender":"Male",
    "organ_donating":"Eye",
    "blood_type":"O-",
    "health_status":"Moderate",
    "latitude":26.658283,
    "longitude":83.542209
  },
  {
    "name":"Bikash Thapa",
    "age":57,
    "gender":"Female",
    "organ_donating":"Liver",
    "blood_type":"O+",
    "health_status":"Stable",
    "latitude":26.559964,
    "longitude":87.638554
  },
  {
    "name":"Geeta Neupane",
    "age":22,
    "gender":"Female",
    "organ_donating":"Kidney",
    "blood_type":"B+",
    "health_status":"Stable",
    "latitude":29.35862,
    "longitude":83.92658
  },
  {
    "name":"Sunita Thapa",
    "age":57,
    "gender":"Female",
    "organ_donating":"Kidney",
    "blood_type":"A+",
    "health_status":"Moderate",
    "latitude":27.967308,
    "longitude":83.446659
  },
  {
    "name":"Geeta K.C.",
    "age":47,
    "gender":"Female",
    "organ_donating":"Liver",
    "blood_type":"AB+",
    "health_status":"Stable",
    "latitude":27.135975,
    "longitude":81.207397
  },
  {
    "name":"Anita Neupane",
    "age":30,
    "gender":"Female",
    "organ_donating":"Lung",
    "blood_type":"A-",
    "health_status":"Stable",
    "latitude":29.613043,
    "longitude":81.805837
  },
  {
    "name":"Krishna Sharma",
    "age":48,
    "gender":"Male",
    "organ_donating":"Liver",
    "blood_type":"A+",
    "health_status":"Healthy",
    "latitude":29.254495,
    "longitude":83.700872
  },
  {
    "name":"Suman K.C.",
    "age":28,
    "gender":"Male",
    "organ_donating":"Kidney",
    "blood_type":"B+",
    "health_status":"Healthy",
    "latitude":26.430913,
    "longitude":84.410338
  },
  {
    "name":"Bikash Sharma",
    "age":30,
    "gender":"Male",
    "organ_donating":"Heart",
    "blood_type":"AB-",
    "health_status":"Healthy",
    "latitude":28.304939,
    "longitude":84.513258
  },
  {
    "name":"Krishna Rai",
    "age":54,
    "gender":"Female",
    "organ_donating":"Lung",
    "blood_type":"O+",
    "health_status":"Stable",
    "latitude":28.311479,
    "longitude":80.190701
  },
  {
    "name":"Reshma Neupane",
    "age":34,
    "gender":"Female",
    "organ_donating":"Kidney",
    "blood_type":"AB-",
    "health_status":"Moderate",
    "latitude":26.764944,
    "longitude":81.200833
  },
  {
    "name":"Reshma Sharma",
    "age":36,
    "gender":"Male",
    "organ_donating":"Eye",
    "blood_type":"B-",
    "health_status":"Healthy",
    "latitude":28.525737,
    "longitude":83.976469
  },
  {
    "name":"Anita Thapa",
    "age":24,
    "gender":"Female",
    "organ_donating":"Liver",
    "blood_type":"O-",
    "health_status":"Healthy",
    "latitude":27.062387,
    "longitude":80.535089
  },
  {
    "name":"Bikash K.C.",
    "age":50,
    "gender":"Female",
    "organ_donating":"Liver",
    "blood_type":"A-",
    "health_status":"Healthy",
    "latitude":28.051265,
    "longitude":85.54642
  },
  {
    "name":"Suman Gurung",
    "age":49,
    "gender":"Male",
    "organ_donating":"Lung",
    "blood_type":"O-",
    "health_status":"Healthy",
    "latitude":27.582913,
    "longitude":87.019714
  },
  {
    "name":"Bikash Rai",
    "age":50,
    "gender":"Male",
    "organ_donating":"Eye",
    "blood_type":"B+",
    "health_status":"Stable",
    "latitude":29.79921,
    "longitude":87.551737
  },
  {
    "name":"Reshma Shrestha",
    "age":27,
    "gender":"Male",
    "organ_donating":"Kidney",
    "blood_type":"A+",
    "health_status":"Healthy",
    "latitude":26.610609,
    "longitude":86.409359
  },
  {
    "name":"Suman Gurung",
    "age":46,
    "gender":"Male",
    "organ_donating":"Heart",
    "blood_type":"A-",
    "health_status":"Healthy",
    "latitude":29.113172,
    "longitude":86.249673
  },
  {
    "name":"Milan Gurung",
    "age":25,
    "gender":"Female",
    "organ_donating":"Liver",
    "blood_type":"A+",
    "health_status":"Healthy",
    "latitude":30.12169,
    "longitude":87.410097
  },
  {
    "name":"Milan Shrestha",
    "age":33,
    "gender":"Female",
    "organ_donating":"Eye",
    "blood_type":"B-",
    "health_status":"Stable",
    "latitude":28.801471,
    "longitude":83.230707
  },
  {
    "name":"Anita Sharma",
    "age":50,
    "gender":"Male",
    "organ_donating":"Liver",
    "blood_type":"A-",
    "health_status":"Healthy",
    "latitude":29.231389,
    "longitude":81.2372
  },
  {
    "name":"Geeta Dahal",
    "age":39,
    "gender":"Male",
    "organ_donating":"Heart",
    "blood_type":"AB+",
    "health_status":"Moderate",
    "latitude":27.08339,
    "longitude":82.777296
  },
  {
    "name":"Geeta Thapa",
    "age":56,
    "gender":"Male",
    "organ_donating":"Kidney",
    "blood_type":"B-",
    "health_status":"Stable",
    "latitude":28.799297,
    "longitude":81.771223
  },
  {
    "name":"Suman Dahal",
    "age":18,
    "gender":"Male",
    "organ_donating":"Heart",
    "blood_type":"B+",
    "health_status":"Stable",
    "latitude":27.326922,
    "longitude":87.629699
  },
  {
    "name":"Geeta Rai",
    "age":42,
    "gender":"Male",
    "organ_donating":"Heart",
    "blood_type":"B+",
    "health_status":"Healthy",
    "latitude":30.249635,
    "longitude":85.353103
  },
  {
    "name":"Milan Neupane",
    "age":30,
    "gender":"Male",
    "organ_donating":"Heart",
    "blood_type":"B-",
    "health_status":"Moderate",
    "latitude":30.307525,
    "longitude":85.501224
  },
  {
    "name":"Geeta Lama",
    "age":29,
    "gender":"Female",
    "organ_donating":"Eye",
    "blood_type":"B+",
    "health_status":"Stable",
    "latitude":27.120405,
    "longitude":87.486646
  },
  {
    "name":"Bikash Dahal",
    "age":55,
    "gender":"Female",
    "organ_donating":"Heart",
    "blood_type":"A+",
    "health_status":"Moderate",
    "latitude":26.4424,
    "longitude":87.382497
  },
  {
    "name":"Milan Neupane",
    "age":38,
    "gender":"Female",
    "organ_donating":"Lung",
    "blood_type":"A+",
    "health_status":"Moderate",
    "latitude":29.000586,
    "longitude":85.590394
  },
  {
    "name":"bimal pandey",
    "age":20,
    "gender":"Male",
    "organ_donating":"Kidney",
    "blood_type":"A+",
    "health_status":"Healthy",
    "latitude":27.643085,
    "longitude":83.469926
  }
]

const normalizeDonor = (donor) => {
  return {
    ...donor,
    // Fix gender casing: "male" -> "Male", "female" -> "Female"
    gender: donor.gender?.charAt(0).toUpperCase() + donor.gender?.slice(1).toLowerCase(),
    
    // Fix health_status casing: "healthy" -> "Healthy", "stable" -> "Stable" 
    health_status: donor.health_status?.charAt(0).toUpperCase() + donor.health_status?.slice(1).toLowerCase(),
    
    // Fix blood_type casing: "a+" -> "A+", "o-" -> "O-"
    blood_type: donor.blood_type?.toUpperCase(),
    
    // Trim name and ensure numbers are correct type
    name: donor.name?.trim(),
    age: typeof donor.age === 'string' ? parseInt(donor.age) : donor.age,
    latitude: typeof donor.latitude === 'string' ? parseFloat(donor.latitude) : donor.latitude,
    longitude: typeof donor.longitude === 'string' ? parseFloat(donor.longitude) : donor.longitude,
  };
};
export const insertData = async () => {
  try {
    await connectDB();

    // Normalize the data before inserting
    const normalizedData = data.map(normalizeDonor);

    // Insert into the database
    const insertedDocs = await Donor.insertMany(normalizedData);

    // Convert Mongoose documents to plain JS objects
    const plainDonors = insertedDocs.map(doc => ({
      _id: doc._id.toString(), // Optional, include if needed
      name: doc.name,
      age: doc.age,
      gender: doc.gender,
      organ_donating: doc.organ_donating,
      blood_type: doc.blood_type,
      health_status: doc.health_status,
      latitude: doc.latitude,
      longitude: doc.longitude,
    }));

    return plainDonors;
  } catch (error) {
    console.error('Error inserting donors:', error);
    throw error;
  }
};
