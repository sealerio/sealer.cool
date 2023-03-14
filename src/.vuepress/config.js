const {description} = require('../../package')

enSideBar = {
    nav: [
        {
            text: 'github',
            link: 'https://github.com/sealerio/sealer'
        },
        {
            text: 'version',
            ariLabel: 'version',
            items: [  //多级导航栏
                {text: 'v0.8.6', link: '/v0.8.6/en/getting-started/introduction'},
                {text: 'v0.9.0', link: '/v0.9.0/introduction/introduction'},
                {text: 'v0.9.1', link: '/docs/introduction/introduction'},
            ]
        },
    ],
    sidebar: {
        '/docs/': [
            {
                title: 'Introduction',
                collapsable: true,
                children: [
                    'introduction/introduction',
                    'introduction/architecture',
                ]
            },
            {
                title: 'Getting Started',
                collapsable: true,
                children: [
                    'getting-started/quick-start',
                    'getting-started/install-sealer',
                ]
            },
            {
                title: 'Commands',
                collapsable: true,
                children: [
                    'command/sealer',
                    'command/image/image',
                    'command/cluster/cluster',
                    'command/alpha/sealer_alpha',
                ]
            },
            {
                title: 'Concepts',
                collapsable: true,
                children: [
                    'concept/kubefile',
                    'concept/sealer-image',
                    'concept/clusterfile',
                ]
            },
            {
                title: 'Advanced',
                collapsable: true,
                children: [
                    'advanced/customize-cluster-image',
                    'advanced/use-sealer-image-offline',
                    'advanced/run-with-clusterfile',
                    'advanced/sealer-run-rootless',
                ]
            },
            {
                title: 'Find Sealer Images',
                collapsable: true,
                children: [
                    'sealer-images/cluster-images',
                ]
            },
            // {
            //     title: 'Best Practices',
            //     collapsable: true,
            //     children: [
            //         'best-practices/intro',
            //     ]
            // },
            // {
            //     title: 'Reference',
            //     collapsable: true,
            //     children: [
            //         'reference/buildah',
            //     ]
            // },
            {
                title: 'Contributing',
                collapsable: true,
                children: [
                    'contributing/code-of-conduct',
                    'contributing/contribute',
                ]
            },
            {
                title: 'Help',
                collapsable: true,
                children: [
                    'help/contact',
                    'help/faq',
                ]
            },
            // 'release-notes/0.9.0',
        ],
        '/v0.9.0/': [
            {
                title: 'Introduction',
                collapsable: true,
                children: [
                    'introduction/introduction',
                    'introduction/architecture',
                ]
            },
            {
                title: 'Getting Started',
                collapsable: true,
                children: [
                    'getting-started/quick-start',
                    'getting-started/install-sealer',
                ]
            },
            {
                title: 'Commands',
                collapsable: true,
                children: [
                    'command/sealer',
                    'command/image/image',
                    'command/cluster/cluster',
                    'command/alpha/sealer_alpha',
                ]
            },
            {
                title: 'Concepts',
                collapsable: true,
                children: [
                    'concept/kubefile',
                    'concept/sealer-image',
                    'concept/clusterfile',
                ]
            },
            {
                title: 'Advanced',
                collapsable: true,
                children: [
                    'advanced/customize-cluster-image',
                ]
            },
            {
                title: 'Find Sealer Images',
                collapsable: true,
                children: [
                    'sealer-images/cluster-images',
                ]
            },
            // {
            //     title: 'Best Practices',
            //     collapsable: true,
            //     children: [
            //         'best-practices/intro',
            //     ]
            // },
            // {
            //     title: 'Reference',
            //     collapsable: true,
            //     children: [
            //         'reference/buildah',
            //     ]
            // },
            {
                title: 'Contributing',
                collapsable: true,
                children: [
                    'contributing/code-of-conduct',
                    'contributing/contribute',
                ]
            },
            {
                title: 'Help',
                collapsable: true,
                children: [
                    'help/contact',
                    'help/faq',
                ]
            },
            // 'release-notes/0.9.0',
        ],
        '/v0.8.6/en/': [
            {
                title: 'Getting Started',
                collapsable: true,
                children: [
                    'getting-started/introduction',
                    'getting-started/quick-start',
                    'getting-started/run-cloudimage',
                    'getting-started/using-clusterfile',
                    'getting-started/build-cloudimage',
                    'getting-started/build-appimage',
                    'getting-started/config',
                    'getting-started/plugin',
                    'getting-started/applications',
                ]
            },
            {
                title: 'Advanced',
                collapsable: true,
                children: [
                    'advanced/architecture',
                    'advanced/arm-cloudimage',
                    'advanced/containerd-baseimage',
                    'advanced/define-cloudimage',
                    'advanced/develop-plugin',
                    'advanced/gpu-cloudimage',
                    'advanced/raw-docker-baseimage',
                    'advanced/registry-configuration',
                    'advanced/save-charts-package',
                    'advanced/takeover-existed-cluster',
                    'advanced/use-kyverno-baseimage',
                    'advanced/use-sealer-in-container',
                ]
            },
            {
                title: 'Reference',
                collapsable: true,
                children: [
                    'reference/cloudrootfs',
                    'reference/clusterfile',
                    'reference/kubefile',
                ]
            },
            {
                title: 'Contributing',
                collapsable: true,
                children: [
                    'contributing/code-of-conduct',
                    'contributing/contribute',
                ]
            },
            {
                title: 'Help',
                collapsable: true,
                children: [
                    'help/contact',
                    'help/faq',
                ]
            },
        ],
    },
};

zhSideBar = {
    selectText: '选择语言',
    nav: [
        {
            text: 'github',
            link: 'https://github.com/sealerio/sealer'
        },
        {
            text: 'version',
            ariLabel: 'version',
            items: [  //多级导航栏
                {text: 'v0.8.6', link: '/v0.8.6/zh/getting-started/introduction'},
            ]
        },
    ],
    sidebar: {
        '/v0.8.6/zh/': [
            {
                title: '快速开始',
                collapsable: true,
                children: [
                    'getting-started/introduction',
                    'getting-started/quick-start',
                    'getting-started/using-clusterfile',
                    'getting-started/use-cloudimage',
                    'getting-started/build-cloudimage',
                    'getting-started/build-appimage',
                    'getting-started/config',
                    'getting-started/plugin',
                    'getting-started/applications',
                ]
            },
            {
                title: '高阶教程',
                collapsable: true,
                children: [
                    'advanced/architecture',
                    'advanced/arm-cloudimage',
                    'advanced/containerd-baseimage',
                    'advanced/define-cloudimage',
                    'advanced/develop-plugin',
                    'advanced/gpu-cloudimage',
                    'advanced/raw-docker-baseimage',
                    'advanced/registry-configuration',
                    'advanced/save-charts-package',
                    'advanced/use-kyverno-baseimage',
                ]
            },
            {
                title: 'CLI&API',
                collapsable: true,
                children: [
                    'reference/cloudrootfs',
                    'reference/clusterfile',
                    'reference/kubefile',
                ]
            },
            {
                title: '贡献',
                collapsable: true,
                children: [
                    'contributing/code-of-conduct',
                    'contributing/contribute',
                ]
            },
            {
                title: '帮助',
                collapsable: true,
                children: [
                    'help/contact',
                    'help/faq',
                ]
            },
        ],
    },
};

module.exports = {
    /**
     * Ref：https://v1.vuepress.vuejs.org/config/#title
     */
    title: 'sealer',
    /**
     * Ref：https://v1.vuepress.vuejs.org/config/#description
     */
    description: description,

    /**
     * Extra tags to be injected to the page HTML `<head>`
     *'
     * ref：https://v1.vuepress.vuejs.org/config/#head
     */
    head: [
        ['meta', {name: 'theme-color', content: '#3eaf7c'}],
        ['meta', {name: 'apple-mobile-web-app-capable', content: 'yes'}],
        ['meta', {name: 'apple-mobile-web-app-status-bar-style', content: 'black'}],
        ['link', {rel: 'icon', href: 'https://sealer.oss-cn-beijing.aliyuncs.com/website/logo.png'}]
    ],
    locales: {
        '/': {
            lang: 'en-US',
            title: 'sealer',
            description: description,
        },
        '/v0.8.6/zh/': {
            lang: '简体中文',
            title: 'sealer',
            description: 'sealer 官方文档',
        }
    },

    /**
     * Theme configuration, here is the default theme configuration for VuePress.
     *
     * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
     */
    themeConfig: {
        repo: '',
        logo: 'https://sealer.oss-cn-beijing.aliyuncs.com/website/logo.png',
        editLinks: false,
        docsDir: '',
        editLinkText: '',
        lastUpdated: false,
        locales: {
            '/v0.8.6/zh/': zhSideBar,
            '/': enSideBar,
        },
    },

    /**
     * Apply plugins, ref：https://v1.vuepress.vuejs.org/zh/plugin/
     */
    plugins: [
        '@vuepress/plugin-back-to-top',
        '@vuepress/plugin-medium-zoom',
    ]
}
