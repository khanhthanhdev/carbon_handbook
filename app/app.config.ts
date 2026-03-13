export default defineAppConfig({
  docus: {
    name: "Carbon Credits Guide",
    description:
      "Comprehensive carbon credit documentation for Vietnamese SMEs",
    socials: {},
    github: false,
  },
  modules: ['@nuxthq/studio'],
  extends: ['docus'],
  studio: {
      // Enable/disable the studio module
    enabled: true,
    repository: {
          provider: 'github', // 'github' or 'gitlab'
          owner: 'khanhthanhdev',
          repo: 'https://github.com/khanhthanhdev/carbon_handbook',
          branch: 'main'
    },
    dev: true,
    },
  sitemap: {
    enabled: true,
  },
  marketing: {
    headerSolidOffset: 24,
    handbookPaths: {
      en: '/en/part-1-concepts-and-legal-documents-related-to-carbon-credits/acknowledge',
      vi: '/vi/part-1-concepts-and-legal-documents-related-to-carbon-credits/acknowledge',
    },
    labels: {
      handbook: {
        en: 'Handbook',
        vi: 'Sổ tay',
      },
      whatsInside: {
        en: "What's Inside",
        vi: 'Nội dung',
      },
      about: {
        en: 'About Us',
        vi: 'Về Chúng Tôi',
      },
      openHandbook: {
        en: 'Open the handbook',
        vi: 'Mở sổ tay',
      },
      exploreHandbook: {
        en: 'Explore the handbook',
        vi: 'Khám phá sổ tay',
      },
      switchLocale: {
        en: 'Tiếng Việt',
        vi: 'English',
      },
      footerNote: {
        en: 'Carbon market handbook for Vietnamese SMEs',
        vi: 'Sổ tay thị trường carbon cho doanh nghiệp SME Việt Nam',
      },
    },
  },
  ui: {
    colors: {
      primary: "green",
      neutral: "zinc",
    },
    container: {
      base: "w-full max-w-[1840px] mx-auto px-3 sm:px-4 lg:px-6 xl:px-8",
    },
    page: {
      slots: {
        root: "flex flex-col gap-0 lg:grid lg:gap-x-8 xl:gap-x-10",
        left: "min-w-0 lg:col-span-1",
        center: "min-w-0 lg:col-span-1",
        right: "min-w-0 order-first lg:order-last lg:col-span-1",
      },
      compoundVariants: [
        {
          left: true,
          right: false,
          class: {
            root: "lg:grid-cols-[15rem_minmax(0,1fr)] xl:grid-cols-[16rem_minmax(0,1fr)]",
          },
        },
        {
          left: false,
          right: true,
          class: {
            root: "lg:grid-cols-[minmax(0,1fr)_13.5rem] xl:grid-cols-[minmax(0,1fr)_14.5rem]",
          },
        },
        {
          left: true,
          right: true,
          class: {
            root: "lg:grid-cols-[15rem_minmax(0,1fr)_13.5rem] xl:grid-cols-[16rem_minmax(0,1fr)_14.5rem]",
          },
        },
        {
          left: false,
          right: false,
          class: {
            root: "lg:grid-cols-1",
          },
        },
      ],
    },
    pageHeader: {
      slots: {
        root: "relative border-b border-default py-6",
        wrapper: "flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between",
        headline:
          "mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary/80",
        title: "text-2xl text-pretty font-semibold text-highlighted sm:text-[2rem]",
        description: "text-[15px] text-pretty text-muted",
        links: "flex flex-wrap items-center gap-1.5",
      },
    },
    pageAside: {
      slots: {
        root: "hidden overflow-y-auto py-6 lg:block lg:max-h-[calc(100vh-var(--ui-header-height))] lg:sticky lg:top-[var(--ui-header-height)] lg:pe-4 lg:ps-3 lg:-ms-3",
        top: "sticky -top-6 -mt-6 pointer-events-none z-[1]",
        topHeader: "h-6 bg-default -mx-3 px-3",
        topBody: "bg-default relative pointer-events-auto flex flex-col -mx-3 px-3",
        topFooter: "h-6 bg-gradient-to-b from-default -mx-3 px-3",
      },
    },
    pageBody: {
      base: "docs-page-body mt-6 space-y-8 pb-16",
    },
    commandPalette: {
      slots: {
        item: "items-center",
        input: "[&_.iconify]:size-4 [&_.iconify]:mx-0.5",
        itemLeadingIcon: "size-4 mx-0.5",
      },
    },
    contentNavigation: {
      slots: {
        list: "isolate -mx-2 -mt-1",
        listWithChildren: "ms-4 border-s border-default",
        trigger: "text-[13px] font-semibold",
        link: "group relative flex w-full items-center gap-1.5 px-2 py-1 text-[13px] before:absolute before:inset-x-0 before:inset-y-px before:z-[-1] before:rounded-md focus:outline-none focus-visible:outline-none focus-visible:before:ring-2 focus-visible:before:ring-inset",
        linkLeadingIcon: "size-4 mr-1",
        linkTrailing: "hidden",
        linkTrailingIcon: "size-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180",
      },
      defaultVariants: {
        variant: "link",
      },
    },
    contentToc: {
      slots: {
        root: "sticky top-[var(--ui-header-height)] z-10 -mx-3 max-h-[calc(100vh-var(--ui-header-height))] overflow-y-auto bg-default/75 px-3 backdrop-blur sm:-mx-4 sm:px-4 lg:bg-[initial]",
        container: "border-b border-dashed border-default pt-3 pb-2 sm:pt-4 lg:border-0 lg:py-6 flex flex-col",
        bottom: "hidden gap-4 lg:flex lg:flex-col",
        trigger: "group flex flex-1 items-center gap-1.5 py-1 text-[13px] font-semibold focus-visible:outline-primary",
        trailingIcon: "size-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180 lg:hidden",
        link: "group relative flex items-center py-0.5 text-[13px] focus-visible:outline-primary",
        list: "min-w-0",
        listWithChildren: "ms-2 border-s border-default ps-3",
        indicator: "absolute ms-2 h-[var(--indicator-size)] w-px rounded-full transition-[translate,height] duration-200 translate-y-[var(--indicator-position)]",
      },
    },
    contentSurround: {
      slots: {
        root: "grid grid-cols-1 gap-4 sm:grid-cols-2",
        link: "group block rounded-lg border border-default px-4 py-5 transition-colors hover:bg-elevated/50 focus-visible:outline-primary",
        linkLeading: "mb-3 inline-flex items-center rounded-full bg-elevated p-1.5 ring ring-accented transition group-hover:bg-primary/10 group-hover:ring-primary/50",
        linkLeadingIcon: "size-4 shrink-0 text-highlighted transition-[color,translate] group-hover:text-primary",
        linkTitle: "mb-1 truncate text-sm font-medium text-highlighted",
        linkDescription: "line-clamp-2 text-[13px] text-muted",
      },
    },
    pageLinks: {
      slots: {
        linkLeadingIcon: "size-4",
        linkLabelExternalIcon: "size-2.5",
      },
    },
  },
  assistant: {
    floatingInput: true,
    explainWithAi: true,
    faqQuestions: [
      'What is a carbon credit and how is it different from an emission allowance?',
      'How should a Vietnamese SME start measuring greenhouse gas emissions?',
      'What documents are needed to register an emission reduction project?',
      'How can SMEs reduce MRV and verification costs?',
    ] as any,
  },
});
