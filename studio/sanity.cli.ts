import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '0xf46qxf',
    dataset: 'production',
  },
  deployment: {
    /** Standalone Studios pick up bugfixes and features without a redeploy. */
    autoUpdates: true,
  },
})
