console.log("estou dentro do render process")

const coreCount = document.getElementById("cores")

// @ts-expect-error
coreCount?.innerText = `Core Count: ${api.threads}`