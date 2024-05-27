const pool = require('../../config/database')

module.exports = {
    doctor: (req, res) => {
        const id = req.params.doctorId;
        pool.query(
            `select doctorName, field, hospital from doctor where doctorId = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({
                        success: false,
                        message: 'Database connection error'
                    });
                }

                return res.status(200).json({
                    success: true,
                    data: results[0]
                });
            }
        )
    },

    doctors: (req, res) => {
        pool.query(
            `select * from doctor`,
            (error, results, fields) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({
                        success: false,
                        message: 'Database connection error'
                    });
                }

                return res.status(200).json({
                    success: true,
                    data: results
                });
            }
        )
    },

    day: (req, res) => {
        const id = req.params.doctorId;
        pool.query(
            `select day,noPatients,time from availabledays where doctorId = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({
                        success: false,
                        message: 'Database connection error'
                    });
                }

                return res.status(200).json({
                    success: true,
                    data: results
                });
            }
        )
    },

    appointment: (req, res) => {
        const body = req.body;
        //checkToken(req, res, next);
        pool.query(
            `insert into appointment(name, nationalID, telephone, email, payment) 
                        values(?,?,?,?,?)`,
            [body.name, body.nationalId, body.telephone, body.email, body.payment],
            (error, results, fields) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({
                        success: false,
                        message: 'Database connection error'
                    });
                }

                return res.status(200).json({
                    success: true,
                    data: results
                });
            }
        );
    },

    updatePatient: (req, res) => {
        console.log('hello');
        const body = req.body;
        const doctorId = req.params.doctorId;
        const date = req.params.date;
        //checkToken(req, res, next);
        pool.query(
            `update availabledays set noPatients = ? where doctorId = ? and day = ?`,
            [body.patientNo,doctorId,date],
            (error, results, fields) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({
                        success: false,
                        message: 'Database connection error'
                    });
                }

                console.log("Success");
            }
        );
    },
}