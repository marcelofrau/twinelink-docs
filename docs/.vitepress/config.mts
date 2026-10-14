import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
    base: '/twinelink-docs/',
    title: 'twinelink',
    description: 'Open-source cross-device link with remote desktop (RDP) and Wake-on-LAN.',
    cleanUrls: true,
    mermaid: {},
    themeConfig: {
      nav: [
        { text: 'Architecture', link: '/architecture/overview' },
        { text: 'Requirements', link: '/requirements/functional' },
        { text: 'Plan', link: '/plan/roadmap' },
        { text: 'Development', link: '/development/setup' },
        { text: 'ADRs', link: '/adr/' },
      ],
      sidebar: [
        {
          text: 'Architecture',
          items: [
            { text: 'Overview', link: '/architecture/overview' },
            { text: 'Desktop', link: '/architecture/desktop' },
            { text: 'Android', link: '/architecture/android' },
            { text: 'Protocol', link: '/architecture/protocol' },
            { text: 'Transport', link: '/architecture/transport' },
            { text: 'Startup performance', link: '/architecture/startup-performance' },
          ],
        },
        {
          text: 'Requirements',
          items: [
            { text: 'Functional', link: '/requirements/functional' },
            { text: 'Non-functional', link: '/requirements/non-functional' },
            { text: 'Constraints', link: '/requirements/constraints' },
          ],
        },
        {
          text: 'Plan',
          items: [
            { text: 'Roadmap', link: '/plan/roadmap' },
            { text: 'Milestones', link: '/plan/milestones' },
            { text: 'Risk register', link: '/plan/risk-register' },
            { text: 'Session log', link: '/plan/session-log' },
          ],
        },
        {
          text: 'Development',
          items: [
            { text: 'Setup', link: '/development/setup' },
            { text: 'Build desktop', link: '/development/build-desktop' },
            { text: 'Build Android', link: '/development/build-android' },
            { text: 'Conventions', link: '/development/conventions' },
            { text: 'Testing', link: '/development/testing' },
          ],
        },
        {
          text: 'ADRs',
          items: [
            { text: 'Index', link: '/adr/' },
            { text: '0001 Fork strategy', link: '/adr/0001-fork-strategy' },
            { text: '0002 Name', link: '/adr/0002-name' },
            { text: '0003 Transport', link: '/adr/0003-transport-abstraction' },
            { text: '0004 Topology', link: '/adr/0004-repo-topology' },
            { text: '0005 Licensing', link: '/adr/0005-licensing' },
          ],
        },
      ],
      socialLinks: [{ icon: 'github', link: 'https://github.com/marcelofrau/twinelink' }],
    },
  }),
)
