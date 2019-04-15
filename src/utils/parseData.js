export default function parseData(res) {
    const { msg, code } = res.data
    const data = res.data.data
    return { code, msg, data }
}