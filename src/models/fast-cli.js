const util = require('util');
const exec = util.promisify(require('child_process').exec);

class FastCli {
    async consultVelocity() {
        try {
            const { stdout, stderr } = await exec('fast --upload --json');

            if (stderr) {
                console.log(`Stderr: ${stderr}`)
                return
            }

            return JSON.parse(stdout);
        } catch (e) {
            console.log(e)
        }
    }
}

exports.FastCli = FastCli