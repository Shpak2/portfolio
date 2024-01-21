export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      contactButton: 'Contact me!',
      sidebarHome: 'Home',
      sidebarAbout: 'About',
      sidebarExperience: 'Experience',
      sidebarPortfolio: 'Portfolio',
      sidebarClients: 'Clients',
      sidebarReviews: 'Reviews',
      sidebarContacts: 'Contacts',
    },
    uk: {
      contactButton: 'Зв\'яжіться зі мною!',
      sidebarHome: 'Головна',
      sidebarAbout: 'Про мене',
      sidebarExperience: 'Досвід',
      sidebarPortfolio: 'Портфоліо',
      sidebarClients: 'Клієнти',
      sidebarReviews: 'Відгуки',
      sidebarContacts: 'Контакти',
    },
    pl: {
      contactButton: 'Skontaktuj się ze mną!',
      sidebarHome: 'Główna',
      sidebarAbout: 'O mnie',
      sidebarExperience: 'Doświadczenie',
      sidebarPortfolio: 'Portfolio',
      sidebarClients: 'Klienci',
      sidebarReviews: 'Opinie',
      sidebarContacts: 'Kontaktu',
    }
  }
}))