<script setup lang="ts">
type LocalizedText = {
  en: string
  vi: string
}

interface TeamMember {
  name: string
  initials: string
  image?: string
  profileUrl?: string
  title: LocalizedText
  organization?: LocalizedText
}

interface FocusArea {
  icon: string
  title: LocalizedText
  description: LocalizedText
}

interface Partner {
  name: string
  image: string
  website?: string
  description: LocalizedText
}

const { locale, switchLocalePath } = useDocusI18n()

const isVietnamese = computed(() => locale.value === 'vi')

const copy = {
  en: {
    hero: {
      eyebrow: 'Carbon market handbook',
      title: 'About Us',
      description: 'This page introduces the team and partner institutions behind the Carbon Market Handbook. The handbook is designed to help Vietnamese SMEs build practical understanding of carbon credits, MRV, green finance, and market readiness.',
      primaryAction: 'Explore the handbook',
      secondaryAction: 'Vietnamese version',
    },
    leaders: {
      eyebrow: 'Editorial leadership',
      title: 'Co-Chairs and Editors',
      description: 'A cross-disciplinary team shaped the handbook with expertise in climate economics, public policy, sustainable finance, and implementation support.',
    },
    editors: {
      eyebrow: 'Editorial team',
      title: 'Other Editors',
    },
    focus: {
      eyebrow: 'How we work',
      title: 'From research to practical adoption',
    },
    partners: {
      eyebrow: 'Partner organizations',
      title: 'Supporting Institutions',
    },
    contact: {
      eyebrow: 'Get in touch',
      title: 'Work with the handbook team',
      description: 'For partnership, implementation support, or handbook inquiries, contact the editorial team directly.',
      action: 'Email the team',
    },
    mockupLabel: 'Mockup image',
  },
  vi: {
    hero: {
      eyebrow: 'Sổ tay thị trường carbon',
      title: 'Về Chúng Tôi',
      description: 'Trang này giới thiệu đội ngũ thực hiện và các đơn vị đồng hành phía sau Sổ tay Thị trường Carbon. Sổ tay được xây dựng để hỗ trợ doanh nghiệp SME Việt Nam hiểu rõ hơn về tín chỉ carbon, MRV, tài chính xanh và lộ trình sẵn sàng tham gia thị trường.',
      primaryAction: 'Khám phá sổ tay',
      secondaryAction: 'English version',
    },
    leaders: {
      eyebrow: 'Đội ngũ chủ trì',
      title: 'Đồng Chủ Trì và Biên Tập',
      description: 'Sổ tay được định hình bởi nhóm chuyên gia liên ngành với kinh nghiệm trong kinh tế khí hậu, chính sách công, tài chính bền vững và hỗ trợ triển khai thực tế.',
    },
    editors: {
      eyebrow: 'Nhóm biên tập',
      title: 'Các Biên Tập Khác',
    },
    focus: {
      eyebrow: 'Cách chúng tôi triển khai',
      title: 'Từ nghiên cứu đến ứng dụng thực tiễn',
    },
    partners: {
      eyebrow: 'Tổ chức đồng hành',
      title: 'Đơn Vị Thực Hiện',
    },
    contact: {
      eyebrow: 'Liên hệ',
      title: 'Kết nối với nhóm thực hiện sổ tay',
      description: 'Nếu bạn cần hợp tác, hỗ trợ triển khai hoặc trao đổi thêm về sổ tay, hãy liên hệ trực tiếp với nhóm biên tập.',
      action: 'Gửi email cho nhóm',
    },
    mockupLabel: 'Hình ảnh minh họa',
  },
} as const

const coChairs: TeamMember[] = [
  {
    name: 'TS. Lê Duy Anh',
    initials: 'LA',
    image: '/about-us/mock-le-duy-anh.svg',
    profileUrl: 'https://vinuni.edu.vn/vi/people/ts-le-duy-anh/',
    title: {
      en: 'Program Director, Lecturer in Economics',
      vi: 'Giám đốc chương trình, Giảng viên Kinh tế học',
    },
    organization: {
      en: 'VinUniversity',
      vi: 'VinUniversity',
    },
  },
  {
    name: 'PGS.TS Vũ Anh Dũng',
    initials: 'VD',
    image: '/about-us/mock-vu-anh-dung.svg',
    profileUrl: 'https://vinuni.edu.vn/vi/people/pgs-ts-vu-anh-dzung/',
    title: {
      en: 'Founding Dean, College of Arts and Sciences',
      vi: 'Viện trưởng sáng lập Viện Khoa học và Giáo dục Khai phóng',
    },
    organization: {
      en: 'VinUniversity',
      vi: 'VinUniversity',
    },
  },
  {
    name: 'TS. Trương Thu Hà',
    initials: 'TH',
    image: '/about-us/mock-truong-thu-ha.svg',
    profileUrl: 'https://ueb.edu.vn/Don-Vi-Giang-Vien/UEB/TS-TRUONG-THU-HA-/1873/1931/31354',
    title: {
      en: 'Lecturer, Department of Public Policy',
      vi: 'Giảng viên Bộ môn Chính sách công',
    },
    organization: {
      en: 'VNU University of Economics and Business',
      vi: 'Trường Đại học Kinh tế, Đại học Quốc gia Hà Nội',
    },
  },
]

const editors: TeamMember[] = [
  {
    name: 'ThS. Trần Diệu Anh',
    initials: 'TT',
    profileUrl: 'https://vinuni.edu.vn/faculty/ths-tran-dieu-anh',
    title: {
      en: 'MA, Chulalongkorn University',
      vi: 'MA, Chulalongkorn University',
    },
  },
  {
    name: 'ThS. Trần Anh Khoa',
    initials: 'TA',
    profileUrl: 'https://vinuni.edu.vn/faculty/ths-tran-anh-khoa',
    title: {
      en: 'PhD candidate, INSEAD',
      vi: 'Nghiên cứu sinh Tiến sĩ, INSEAD',
    },
  },
  {
    name: 'Nguyễn Minh Khuê',
    initials: 'NM',
    profileUrl: 'https://vinuni.edu.vn/faculty/nguyen-minh-khue',
    title: {
      en: 'VinUniversity',
      vi: 'VinUniversity',
    },
  },
  {
    name: 'Trần Thị Hồng Phúc',
    initials: 'TT',
    profileUrl: 'https://vinuni.edu.vn/faculty/tran-thi-hong-phuc',
    title: {
      en: 'VinUniversity',
      vi: 'VinUniversity',
    },
  },
  {
    name: 'Lê Thiên Hà Ngân',
    initials: 'LT',
    profileUrl: 'https://vinuni.edu.vn/faculty/le-thien-ha-ngan',
    title: {
      en: 'VinUniversity',
      vi: 'VinUniversity',
    },
  },
  {
    name: 'Trần Khánh Thành',
    initials: 'TK',
    profileUrl: 'https://khanhthanh.is-a.dev/',
    title: {
      en: 'Software Engineer',
      vi: 'Kỹ sư phần mềm',
    },
    organization: {
      en: 'VinUniversity',
      vi: 'VinUniversity',
    },
  },
  {
    name: 'Tony Tin',
    initials: 'TT',
    title: {
      en: 'Technical Advisor',
      vi: 'Cố vấn kỹ thuật',
    },
  },
]

const focusAreas: FocusArea[] = [
  {
    icon: 'i-lucide-globe-2',
    title: {
      en: 'International collaboration framework',
      vi: 'Khung hợp tác quốc tế',
    },
    description: {
      en: 'Combining academic, financial, and governance expertise to strengthen carbon market readiness.',
      vi: 'Kết nối học thuật, tài chính và quản trị để nâng cao năng lực sẵn sàng tham gia thị trường carbon.',
    },
  },
  {
    icon: 'i-lucide-landmark',
    title: {
      en: 'Green finance capability',
      vi: 'Năng lực tài chính xanh',
    },
    description: {
      en: 'Linking handbook content to green credit, MRV processes, and transparent disclosure practices.',
      vi: 'Gắn nội dung sổ tay với tín dụng xanh, quy trình MRV và thực hành công bố minh bạch.',
    },
  },
  {
    icon: 'i-lucide-briefcase-business',
    title: {
      en: 'Practical implementation support',
      vi: 'Hỗ trợ triển khai thực tế',
    },
    description: {
      en: 'Helping SMEs through training, applied research, and practical implementation examples.',
      vi: 'Hỗ trợ doanh nghiệp SME thông qua đào tạo, nghiên cứu ứng dụng và các ví dụ triển khai thực tế.',
    },
  },
]

const partners: Partner[] = [
  {
    name: 'VinUniversity',
    image: '/about-us/mock-vinuniversity.svg',
    website: 'https://vinuni.edu.vn/',
    description: {
      en: 'A leading private university in Vietnam with a strong focus on interdisciplinary research and applied innovation.',
      vi: 'Trường đại học tư thục hàng đầu tại Việt Nam, nổi bật với định hướng liên ngành và đổi mới ứng dụng.',
    },
  },
  {
    name: 'British Council',
    image: '/about-us/mock-british-council.svg',
    website: 'https://www.britishcouncil.vn/',
    description: {
      en: 'The United Kingdom’s international organization for cultural relations and educational opportunities.',
      vi: 'Tổ chức quốc tế của Vương quốc Anh về quan hệ văn hóa và cơ hội giáo dục.',
    },
  },
]

const currentCopy = computed(() => copy[isVietnamese.value ? 'vi' : 'en'])
const handbookPath = computed(() => `/${isVietnamese.value ? 'vi' : 'en'}`)
const alternateLocalePath = computed(() => {
  const targetLocale = isVietnamese.value ? 'en' : 'vi'
  return (switchLocalePath(targetLocale) as string | undefined) || `/${targetLocale}/about-us`
})

const contactEmail = 'anh.ld@vinuni.edu.vn'

function localize(text: LocalizedText) {
  return isVietnamese.value ? text.vi : text.en
}

function imageAlt(name: string) {
  return `${name} ${currentCopy.value.mockupLabel.toLowerCase()}`
}
</script>

<template>
  <section class="about-landing">
    <div class="about-landing__shell">
      <section class="about-hero">
        <div class="about-hero__copy">
          <p class="about-eyebrow">
            {{ currentCopy.hero.eyebrow }}
          </p>
          <h1 class="about-hero__title">
            {{ currentCopy.hero.title }}
          </h1>
          <p class="about-hero__description">
            {{ currentCopy.hero.description }}
          </p>
        </div>

        <div class="about-hero__actions">
          <NuxtLink
            :to="handbookPath"
            class="about-button about-button--primary"
          >
            {{ currentCopy.hero.primaryAction }}
          </NuxtLink>
          <NuxtLink
            :to="alternateLocalePath"
            class="about-button about-button--secondary"
          >
            {{ currentCopy.hero.secondaryAction }}
          </NuxtLink>
        </div>
      </section>

      <section class="about-section">
        <div class="about-section__intro">
          <p class="about-eyebrow">
            {{ currentCopy.leaders.eyebrow }}
          </p>
          <h2 class="about-section__title">
            {{ currentCopy.leaders.title }}
          </h2>
          <p class="about-section__description">
            {{ currentCopy.leaders.description }}
          </p>
        </div>

        <div class="about-profile-grid">
          <article
            v-for="member in coChairs"
            :key="member.name"
            class="about-profile-card"
          >
            <component
              :is="member.profileUrl ? 'a' : 'div'"
              class="about-profile-card__inner"
              :href="member.profileUrl"
              :target="member.profileUrl ? '_blank' : undefined"
              :rel="member.profileUrl ? 'noreferrer' : undefined"
            >
              <img
                v-if="member.image"
                class="about-profile-card__image"
                :src="member.image"
                :alt="imageAlt(member.name)"
              >
              <div class="about-profile-card__body">
                <h3 class="about-profile-card__name">
                  {{ member.name }}
                </h3>
                <p class="about-profile-card__role">
                  {{ localize(member.title) }}
                </p>
                <p
                  v-if="member.organization"
                  class="about-profile-card__org"
                >
                  {{ localize(member.organization) }}
                </p>
              </div>
            </component>
          </article>
        </div>
      </section>

      <section class="about-section">
        <div class="about-section__intro">
          <p class="about-eyebrow">
            {{ currentCopy.editors.eyebrow }}
          </p>
          <h2 class="about-section__title">
            {{ currentCopy.editors.title }}
          </h2>
        </div>

        <div class="about-editor-grid">
          <article
            v-for="member in editors"
            :key="member.name"
            class="about-editor-card"
          >
            <component
              :is="member.profileUrl ? 'a' : 'div'"
              class="about-editor-card__inner"
              :href="member.profileUrl"
              :target="member.profileUrl ? '_blank' : undefined"
              :rel="member.profileUrl ? 'noreferrer' : undefined"
            >
              <div class="about-editor-card__avatar">
                {{ member.initials }}
              </div>
              <div class="about-editor-card__body">
                <h3 class="about-editor-card__name">
                  {{ member.name }}
                </h3>
                <p class="about-editor-card__meta">
                  {{ localize(member.title) }}
                </p>
                <p
                  v-if="member.organization"
                  class="about-editor-card__meta"
                >
                  {{ localize(member.organization) }}
                </p>
              </div>
            </component>
          </article>
        </div>
      </section>

      <section class="about-section">
        <div class="about-section__intro">
          <p class="about-eyebrow">
            {{ currentCopy.focus.eyebrow }}
          </p>
          <h2 class="about-section__title">
            {{ currentCopy.focus.title }}
          </h2>
        </div>

        <div class="about-focus-grid">
          <article
            v-for="item in focusAreas"
            :key="item.icon"
            class="about-focus-card"
          >
            <div class="about-focus-card__icon">
              <UIcon :name="item.icon" />
            </div>
            <h3 class="about-focus-card__title">
              {{ localize(item.title) }}
            </h3>
            <p class="about-focus-card__description">
              {{ localize(item.description) }}
            </p>
          </article>
        </div>
      </section>

      <section class="about-section">
        <div class="about-section__intro">
          <p class="about-eyebrow">
            {{ currentCopy.partners.eyebrow }}
          </p>
          <h2 class="about-section__title">
            {{ currentCopy.partners.title }}
          </h2>
        </div>

        <div class="about-partner-grid">
          <article
            v-for="partner in partners"
            :key="partner.name"
            class="about-partner-card"
          >
            <component
              :is="partner.website ? 'a' : 'div'"
              class="about-partner-card__inner"
              :href="partner.website"
              :target="partner.website ? '_blank' : undefined"
              :rel="partner.website ? 'noreferrer' : undefined"
            >
              <img
                class="about-partner-card__image"
                :src="partner.image"
                :alt="imageAlt(partner.name)"
              >
              <div class="about-partner-card__body">
                <h3 class="about-partner-card__name">
                  {{ partner.name }}
                </h3>
                <p class="about-partner-card__description">
                  {{ localize(partner.description) }}
                </p>
              </div>
            </component>
          </article>
        </div>
      </section>

      <section class="about-contact">
        <div class="about-contact__copy">
          <p class="about-eyebrow">
            {{ currentCopy.contact.eyebrow }}
          </p>
          <h2 class="about-section__title">
            {{ currentCopy.contact.title }}
          </h2>
          <p class="about-section__description">
            {{ currentCopy.contact.description }}
          </p>
        </div>

        <a
          class="about-button about-button--primary"
          :href="`mailto:${contactEmail}`"
        >
          {{ currentCopy.contact.action }}
        </a>
      </section>
    </div>
  </section>
</template>

<style scoped>
.about-landing {
  position: relative;
  padding: clamp(1.25rem, 2vw, 2rem) 0 4rem;
  background:
    radial-gradient(circle at top left, rgba(200, 225, 206, 0.45), transparent 32rem),
    linear-gradient(180deg, #f6f8f4 0%, #f0f3ed 100%);
}

.about-landing__shell {
  width: min(1100px, calc(100vw - 1.5rem));
  margin: 0 auto;
  display: grid;
  gap: 1.25rem;
}

.about-hero,
.about-section,
.about-contact {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(30, 63, 41, 0.1);
  border-radius: 1.75rem;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 24px 60px rgba(28, 46, 33, 0.08);
  backdrop-filter: blur(12px);
}

.about-hero {
  display: grid;
  gap: 1.5rem;
  padding: clamp(1.5rem, 3vw, 2.5rem);
  background:
    linear-gradient(145deg, rgba(232, 241, 233, 0.95) 0%, rgba(255, 255, 255, 0.96) 58%, rgba(247, 246, 240, 0.92) 100%);
}

.about-hero::after {
  content: "";
  position: absolute;
  inset: auto -6rem -6rem auto;
  width: 16rem;
  height: 16rem;
  border-radius: 999px;
  background: rgba(74, 118, 85, 0.1);
  filter: blur(8px);
}

.about-hero__copy,
.about-section__intro,
.about-contact__copy {
  position: relative;
  z-index: 1;
}

.about-eyebrow {
  margin: 0;
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #2f6b45;
}

.about-hero__title {
  margin: 0.8rem 0 0;
  font-size: clamp(2.3rem, 1.9rem + 1.6vw, 4rem);
  line-height: 0.98;
  color: #13231a;
}

.about-hero__description,
.about-section__description {
  max-width: 62rem;
  margin: 1rem 0 0;
  font-size: 0.98rem;
  line-height: 1.75;
  color: #4f5f54;
}

.about-hero__actions {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.about-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 3rem;
  padding: 0.75rem 1.15rem;
  border-radius: 999px;
  border: 1px solid transparent;
  font-weight: 600;
  text-decoration: none;
  transition: transform 180ms ease, box-shadow 180ms ease, background-color 180ms ease, border-color 180ms ease, color 180ms ease;
}

.about-button:hover {
  transform: translateY(-1px);
}

.about-button--primary {
  background: #173f2b;
  color: #ffffff;
  box-shadow: 0 18px 34px rgba(23, 63, 43, 0.18);
}

.about-button--secondary {
  border-color: rgba(23, 63, 43, 0.14);
  background: rgba(255, 255, 255, 0.88);
  color: #173f2b;
}

.about-section,
.about-contact {
  padding: clamp(1.25rem, 2.5vw, 2rem);
}

.about-section__title {
  margin: 0.55rem 0 0;
  font-size: clamp(1.45rem, 1.25rem + 0.7vw, 2.1rem);
  line-height: 1.08;
  color: #16251b;
}

.about-profile-grid,
.about-focus-grid,
.about-partner-grid {
  display: grid;
  gap: 1rem;
  margin-top: 1.25rem;
}

.about-profile-grid {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.about-profile-card,
.about-editor-card,
.about-focus-card,
.about-partner-card {
  min-width: 0;
}

.about-profile-card__inner,
.about-editor-card__inner,
.about-partner-card__inner {
  display: block;
  height: 100%;
  text-decoration: none;
  color: inherit;
}

.about-profile-card__inner,
.about-focus-card,
.about-partner-card__inner {
  height: 100%;
  border-radius: 1.4rem;
  border: 1px solid rgba(30, 63, 41, 0.08);
  background: linear-gradient(180deg, #ffffff 0%, #fbfcfa 100%);
  box-shadow: 0 14px 34px rgba(26, 42, 30, 0.06);
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
}

.about-profile-card__inner:hover,
.about-focus-card:hover,
.about-partner-card__inner:hover,
.about-editor-card__inner:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 44px rgba(26, 42, 30, 0.1);
}

.about-profile-card__image {
  display: block;
  width: 100%;
  aspect-ratio: 5 / 6;
  object-fit: cover;
  border-radius: 1.2rem 1.2rem 0 0;
  background: #dde8df;
}

.about-profile-card__body,
.about-partner-card__body {
  padding: 1rem 1rem 1.1rem;
}

.about-profile-card__name,
.about-editor-card__name,
.about-focus-card__title,
.about-partner-card__name {
  margin: 0;
  color: #173123;
}

.about-profile-card__name {
  font-size: 1.08rem;
  line-height: 1.3;
}

.about-profile-card__role,
.about-profile-card__org,
.about-editor-card__meta,
.about-focus-card__description,
.about-partner-card__description {
  margin: 0.45rem 0 0;
  font-size: 0.92rem;
  line-height: 1.6;
  color: #57675c;
}

.about-editor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 0.85rem;
  margin-top: 1.25rem;
}

.about-editor-card__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
  padding: 1rem 0.9rem;
  text-align: center;
  border-radius: 1.2rem;
  border: 1px solid rgba(30, 63, 41, 0.08);
  background: rgba(247, 250, 246, 0.94);
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
}

.about-editor-card__avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 999px;
  background: linear-gradient(135deg, #6f9a7c 0%, #4f765b 100%);
  color: #ffffff;
  font-size: 0.92rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.about-editor-card__name {
  font-size: 0.98rem;
  line-height: 1.35;
}

.about-editor-card__meta {
  font-size: 0.85rem;
}

.about-focus-grid {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.about-focus-card {
  padding: 1.2rem;
}

.about-focus-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 0.9rem;
  background: #e7f0e7;
  color: #244c31;
  font-size: 1.25rem;
}

.about-focus-card__title {
  margin-top: 0.85rem;
  font-size: 1rem;
  line-height: 1.35;
}

.about-partner-grid {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.about-partner-card__image {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 7;
  object-fit: cover;
  border-radius: 1.2rem 1.2rem 0 0;
  background: #ecf1eb;
}

.about-contact {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  background:
    linear-gradient(145deg, rgba(20, 43, 28, 0.95) 0%, rgba(28, 58, 39, 0.96) 100%);
}

.about-contact .about-eyebrow,
.about-contact .about-section__title,
.about-contact .about-section__description {
  color: #f2f7f2;
}

.about-contact .about-eyebrow {
  color: #b7dbc0;
}

@media (min-width: 900px) {
  .about-hero {
    grid-template-columns: minmax(0, 1.4fr) auto;
    align-items: end;
  }
}

@media (max-width: 768px) {
  .about-landing__shell {
    width: min(100%, calc(100vw - 1rem));
  }

  .about-contact {
    flex-direction: column;
    align-items: flex-start;
  }

  .about-hero__actions,
  .about-button {
    width: 100%;
  }
}

:global(.dark) .about-landing {
  background:
    radial-gradient(circle at top left, rgba(74, 118, 85, 0.28), transparent 28rem),
    linear-gradient(180deg, #0d1410 0%, #101712 100%);
}

:global(.dark) .about-hero,
:global(.dark) .about-section,
:global(.dark) .about-contact {
  border-color: rgba(182, 223, 193, 0.12);
  box-shadow: none;
}

:global(.dark) .about-hero,
:global(.dark) .about-section {
  background: rgba(16, 24, 18, 0.88);
}

:global(.dark) .about-hero {
  background:
    linear-gradient(145deg, rgba(20, 32, 24, 0.96) 0%, rgba(13, 19, 15, 0.97) 100%);
}

:global(.dark) .about-eyebrow {
  color: #9fceaa;
}

:global(.dark) .about-hero__title,
:global(.dark) .about-section__title,
:global(.dark) .about-profile-card__name,
:global(.dark) .about-editor-card__name,
:global(.dark) .about-focus-card__title,
:global(.dark) .about-partner-card__name {
  color: #f2f8f3;
}

:global(.dark) .about-hero__description,
:global(.dark) .about-section__description,
:global(.dark) .about-profile-card__role,
:global(.dark) .about-profile-card__org,
:global(.dark) .about-editor-card__meta,
:global(.dark) .about-focus-card__description,
:global(.dark) .about-partner-card__description {
  color: #b8c6bb;
}

:global(.dark) .about-button--primary {
  background: #b7dbc0;
  color: #12311e;
  box-shadow: none;
}

:global(.dark) .about-button--secondary {
  border-color: rgba(183, 219, 192, 0.2);
  background: rgba(255, 255, 255, 0.03);
  color: #eef5ef;
}

:global(.dark) .about-profile-card__inner,
:global(.dark) .about-editor-card__inner,
:global(.dark) .about-focus-card,
:global(.dark) .about-partner-card__inner {
  border-color: rgba(182, 223, 193, 0.1);
  background: linear-gradient(180deg, #131d16 0%, #0f1611 100%);
  box-shadow: none;
}

:global(.dark) .about-focus-card__icon {
  background: rgba(183, 219, 192, 0.12);
  color: #b7dbc0;
}

:global(.dark) .about-editor-card__avatar {
  background: linear-gradient(135deg, #8fb99a 0%, #6f967c 100%);
  color: #0d1d13;
}
</style>
