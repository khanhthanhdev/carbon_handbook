export default defineNuxtPlugin({
  name: 'assistant-faq',
  enforce: 'pre',
  async setup(nuxtApp) {
    const faqQuestions = {
      en: [
        'What is a carbon credit and how is it different from an emission allowance?',
        'How should a Vietnamese SME start measuring greenhouse gas emissions?',
        'What documents are needed to register an emission reduction project?',
        'How can SMEs reduce MRV and verification costs?',
      ],
      vi: [
        'Tín chỉ carbon là gì và khác gì với phép phát thải?',
        'Các doanh nghiệp nhỏ và vừa Việt Nam nên bắt đầu đo lường khí thải nhà kính như thế nào?',
        'Cần những tài liệu nào để đăng ký dự án giảm phát thải?',
        'Các doanh nghiệp nhỏ và vừa có thể giảm chi phí MRV và xác minh như thế nào?',
      ],
    }

    if (process.client) {
      nuxtApp.hook('app:created', () => {
        const i18n = nuxtApp.$i18n as { locale: Ref<string> }
        const appConfig = useAppConfig()

        const updateAppConfig = () => {
          appConfig.assistant.faqQuestions = faqQuestions[i18n.locale.value as 'en' | 'vi'] || faqQuestions.en
        }

        updateAppConfig()
        watch(() => i18n.locale.value, updateAppConfig)
      })
    }
  }
})
