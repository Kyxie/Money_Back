/*
 * @Date: 2022-02-28 23:17:42
 * @LastEditors: Kunyang Xie
 * @LastEditTime: 2022-03-04 11:36:01
 * @FilePath: \Money_Back\controller\ChartController.js
 */

const chartUtils = require("../common/chartUtils")
const { getJWTPayload } = require("../common/util")
const qs = require("qs")
const Record = require("../model/record")

exports.getValidChoices = async function (req, res) {}

exports.getLineChart = async function (req, res) {
    const params = qs.parse(req.query)
    const obj = await getJWTPayload(req.get("Authorization"))
    let today = new Date()
    let response = {}

    for (let key in params) {
        if (key === "week") {
            let date = chartUtils.weekToDate(params.week)
            let daysPerWeek = chartUtils.weekDaysNum(params.week, date)
            if (daysPerWeek < 7 && params.week === "1") {
                date.month = 1
                date.day = 1
            }

            let dayArray = []
            for (let i = 0; i < daysPerWeek; i++) {
                monthNum = date.month
                dayNum = date.day + i
                dayArray[i] = monthNum.toString() + "-" + dayNum.toString()
            }
            response["x-axis"] = dayArray

            Record.find(
                {
                    uid: obj.uid,
                    type: 0,
                    year: today.getFullYear(),
                    week: params.week,
                },
                function (err, data) {
                    if (err) throw err
                    res.send(data)
                }
            )
        } else if (key === "month") {
            console.log("nnn")
        } else if (key === "year") {
            let monthArray = []
            for (let i = 0; i < 12; i++) {
                monthArray[i] = (i + 1).toString()
            }
            response["x-axis"] = monthArray
            res.send(response)
        } else {
            console.log("Wrong key")
        }
    }
}

exports.getRankList = async function (req, res) {
    date = chartUtils.weekToDate(1)
    console.log(date)
}
