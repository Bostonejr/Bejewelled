import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '0xf46qxf',
    dataset: 'production',
  },
  deployment: {
    /** Standalone Studios pick up bugfixes and features without a redeploy. */
    autoUpdates: true,

    /**
     * The deployed Studio at https://bejewelled.sanity.studio. Pinned here so
     * `sanity deploy` redeploys that Studio rather than prompting for an
     * application id and risking a second, divergent one.
     */
    appId: 'evvxvsqw25xe8dcr78d56h0i',
  },
})
