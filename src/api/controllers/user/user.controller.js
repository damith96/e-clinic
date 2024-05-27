const { sign } = require('jsonwebtoken');
const pool = require('../../config/database')
//const { compareSync } = require('bcrypt');

module.exports = {
    pharmacy: (req,res) => {
        const body = req.body;
        pool.query(
            `insert into pharmacy(name, email, patientName, age, phoneNo, whatsappNo, address, gender, substitute, allergy, allergicNote, comment, location) 
                                values(?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [body.name, body.email, body.patientName, body.age, body.phoneNo, body.whatsappNo, body.address, body.gender, body.substitute, body.allergy, body.allergicNote, body.comment, body.location],
            (error, results, fields) => {
                if (error) {
                    console.log("1111111111111111111");
                    console.log(error)
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

    login: (req, res) => {
        const body = req.body;
        pool.query(
            `select * from patient where username = ?`,
            [body.username],
            (error, results, fields) => {
                if (error) {
                    console.log(error);
                }
                if (!results[0]) {
                    return res.json({
                        success: false,
                        message: 'Invalid username or password'
                    })
                }
                const result = body.password === results[0].password;

                if (result) {
                    results[0].password = undefined;
                    // sign({email: fetchedUser.email, userId: fetchedUser._id})
                    const jsontoken = sign({ result: results[0] }, "qwe1234", {
                        expiresIn: "1h"
                    });
                    return res.json({
                        success: true,
                        message: 'login successfully',
                        token: jsontoken,
                        id: results[0].id,
                        expiresIn: 3600,
                        name: results[0].name
                    });
                } else {
                    return res.json({
                        success: false,
                        message: 'Invalid username or password'
                    });
                }

            }
        );
    },

    reservation: (req, res) => {
        const body = req.body;
        pool.query(
            `insert into reservation(id, patientName, type, nextDate, planningDate, note) 
                        values(?,?,?,?,?,?)`,
            [body.id, body.patientName, body.type, body.nextDate, body.planningDate, body.note],
            (error, results, fields) => {
                if (error) {
                    console.log(error)
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

    reservationInformation: (req, res) => {
        const id = req.params.id;
        pool.query(
            `select type,nextDate,status from reservation where id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
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

    schedule: (req, res) => {
        const table = req.params.type;
        pool.query(
            `select * from ${table}`,
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

    dashboard: (req, res) => {
        const id = req.params.id;
        pool.query(
            `select week1, week2 , week3 , week4 , week5 , week6 , week7 , clinicDays , appointments , medicines , surgaries from patient, weeks where patient.id =? and patient.id = weeks.patientId`,
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

    profile:(req, res) => {
        const id = req.params.id;
        pool.query(
            `select name, email, phone, address, birthday from patient where id =?`,
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

        );
    },

    updateProfile: (req, res) => {
        const id = req.params.id;
        const body = req.body;
        pool.query(
            `update patient set name=?,email=?,phone=?,address=?,birthday=? where id=?`,
            [body.name,body.email,body.phone,body.address,body.birthday,id],
            (error, results, fields) => {
                if (error) {
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
}