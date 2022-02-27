/*
 * @Date: 2022-02-21 13:26:33
 * @LastEditors: Kunyang Xie
 * @LastEditTime: 2022-02-27 14:28:16
 * @FilePath: \Money_Back\controller\RecordController.js
 */

const { getJWTPayload } = require("../common/util")
const Record = require("../model/record")

exports.addRecord = async function (req, res) {
    const body = req.body
    // request.header.Authorization
    const obj = await getJWTPayload(req.get("Authorization"))
    const newRecord = new Record(body)
    newRecord.uid = obj.uid
    console.log(newRecord)
    // Save
    const result = await newRecord.save()
    // Response
    res.send({ code: 200, data: result })
}

exports.deleteRecord = async function (req, res) {
    const body = req.body
    const { _id } = body
    const obj = await getJWTPayload(req.get("Authorization"))
    Record.deleteOne(
        {
            uid: obj.uid,
            _id: _id,
        },
        function (error) {
            if (error) {
                res.send({ data: "delete failed" })
            } else {
                res.send({ code: 200 })
            }
        }
    )
}

exports.changeRecord = async function (req, res) {
    const obj = await getJWTPayload(req.get("Authorization"))
    const updateRecord = new Record(req.body)
    updateRecord.uid = obj.uid
    Record.findByIdAndUpdate(
        updateRecord._id,
        updateRecord,
        {},
        function (err, data) {
            if (err) throw err
            else {
                res.send({ code: 200 })
            }
        }
    )
}
