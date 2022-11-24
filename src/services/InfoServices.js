import ConsultModel from '../models/ConsultModel.js'
import AppointmentModel from '../models/AppointmentModel.js'

export async function getInfo(req, res) {
  try {
    const _consultsByGender = await ConsultModel.aggregate([
      {
        $lookup: {
          from: 'patients',
          localField: 'patient',
          foreignField: '_id',
          as: 'patient'
        }
      },
      {
        $group: {
          _id: '$patient.gender',
          count: { $sum: 1 }
        }
      }
    ])

    const _consultsByDate = await ConsultModel.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ])

    const _data = {
      byGender: _consultsByGender,
      byDate: _consultsByDate
    }

    /* Returning the response to the client. */
    return res.status(200).json(_data)
  } catch (err) {
    console.log(err)
    /* Returning the response to the client. */
    return res.status(500).json(err)
  }
}
