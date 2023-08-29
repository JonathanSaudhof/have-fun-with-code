/* eslint-disable */
import { GenericContainer, TestContainer } from 'testcontainers'
import * as path from 'path'

var __TEARDOWN_MESSAGE__: string

module.exports = async function () {
    // Start services that that the app needs to run (e.g. database, docker-compose, etc.).
    console.log('\nSetting up...\n')

    let container: TestContainer

    try {
        container = await GenericContainer.fromDockerfile(
            path.join(__dirname, '../../../../'),
            './apps/calculator-nest/docker/Dockerfile'
        ).build()

        globalThis.TestContainer = await container
            .withExposedPorts(3000)
            .start()

        globalThis.TestContainerHost = `http://${globalThis.TestContainer.getHost()}:${globalThis.TestContainer.getMappedPort(
            3000
        )}`

        console.log('TestContainer started.')
    } catch (err) {
        console.log(
            'Something went wrong during TestContainer start:',
            err.message
        )
    }

    // Hint: Use `globalThis` to pass variables to global teardown.
    globalThis.__TEARDOWN_MESSAGE__ = '\nTearing down...\n'
}
