fs = require("fs")

fs.readFile("hours.md", "utf8", (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const hours = []
  let totalHours = 0

  try {
    data.split("\n").map((row) => row.split("|").map((col, i) => i === 2 && hours.push(col.trim())))
    // remove title and divider
    hours.splice(0, 2)

    totalHours = hours.reduce((a, b) => Number(a) + Number(b))

    const newData = data.replace(/\#\# Total hours:\s?\d*.?\d*/, `## Total hours: ${totalHours}`)

    fs.writeFile("hours.md", newData, "utf-8", (writeError) => {
      if (writeError) {
        throw new Error("Writing to hours.md failed")
      }

      console.log("Hours were successfully updated!")
    })
  } catch (e) {
    console.log(e)
  }
})
