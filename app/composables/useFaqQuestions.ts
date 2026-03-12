import { useI18n } from 'vue-i18n'

export function useFaqQuestions() {
  const { locale } = useI18n()
  
  const questions = {
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

  return computed(() => questions[locale.value as 'en' | 'vi'] || questions.en)
}
