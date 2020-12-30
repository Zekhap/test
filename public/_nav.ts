import { INavData } from './components/index';

export const navItems: INavData[] = [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'fas fa-tachometer-alt',
      badge: {
        variant: 'info',
        text: 'NEW'
      }
    },
    {
      title: true,
      name: 'Theme'
    },
    {
      name: 'Colors',
      url: '/theme/colors',
      icon: 'fas fa-tint'
    },
    {
      name: 'Typography',
      url: '/theme/typography',
      icon: 'fas fa-pen'
    },
    {
      title: true,
      name: 'Components'
    },
    {
      name: 'Base',
      url: '/base',
      icon: 'fas fa-puzzle-piece',
      children: [
        {
          name: 'Cards',
          url: '/base/cards'
        },
        {
          name: 'Carousels',
          url: '/base/carousels'
        },
        {
          name: 'Collapses',
          url: '/base/collapses'
        },
        {
          name: 'Forms',
          url: '/base/forms'
        },
        {
          name: 'Navbars',
          url: '/base/navbars'
  
        },
        {
          name: 'Pagination',
          url: '/base/paginations'
        },
        {
          name: 'Popovers',
          url: '/base/popovers'
        },
        {
          name: 'Progress',
          url: '/base/progress'
        },
        {
          name: 'Switches',
          url: '/base/switches'
        },
        {
          name: 'Tables',
          url: '/base/tables'
        },
        {
          name: 'Tabs',
          url: '/base/tabs'
        },
        {
          name: 'Tooltips',
          url: '/base/tooltips'
        }
      ]
    },
    {
      name: 'Buttons',
      url: '/buttons',
      icon: 'fas fa-location-arrow',
      children: [
        {
          name: 'Buttons',
          url: '/buttons/buttons',
          icon: 'fas fa-location-arrow',
        },
        {
          name: 'Dropdowns',
          url: '/buttons/dropdowns',
          icon: 'fas fa-location-arrow',
        },
        {
          name: 'Brand Buttons',
          url: '/buttons/brand-buttons',
          icon: 'fas fa-location-arrow',
        }
      ]
    },
    {
      name: 'Charts',
      url: '/charts',
      icon: 'fas fa-chart-pie'
    },
    {
      name: 'Icons',
      url: '/icons',
      icon: 'fas fa-star',
      children: [
        {
          name: 'Flags',
          url: '/icons/flags',
          icon: 'fas fa-star'
        },
        {
          name: 'Font Awesome',
          url: '/icons/font-awesome',
          icon: 'fas fa-star',
          badge: {
            variant: 'secondary',
            text: '4.7'
          }
        },
        {
          name: 'Simple Line Icons',
          url: '/icons/simple-line-icons',
          icon: 'fas fa-star'
        }
      ]
    },
    {
      name: 'Notifications',
      url: '/notifications',
      icon: 'fas fa-bell',
      children: [
        {
          name: 'Alerts',
          url: '/notifications/alerts',
          icon: 'fas fa-bell'
        },
        {
          name: 'Badges',
          url: '/notifications/badges',
          icon: 'fas fa-bell'
        },
        {
          name: 'Modals',
          url: '/notifications/modals',
          icon: 'fas fa-bell'
        }
      ]
    },
    {
      name: 'Widgets',
      url: '/widgets',
      icon: 'fas fa-calculator',
      badge: {
        variant: 'info',
        text: 'NEW'
      }
    },
    {
      divider: true
    },
    {
      title: true,
      name: 'Extras',
    },
    {
      name: 'Pages',
      url: '/pages',
      icon: 'fas fa-star',
      children: [
        {
          name: 'Login',
          url: '/login'
        },
        {
          name: 'Register',
          url: '/register'
        },
        {
          name: 'Error 404',
          url: '/404'
        },
        {
          name: 'Error 500',
          url: '/500'
        }
      ]
    },
    {
      name: 'Disabled',
      url: '/dashboard',
      icon: 'fas fa-ban',
      badge: {
        variant: 'secondary',
        text: 'NEW'
      },
      attributes: { disabled: true },
    },
    {
      name: 'Ya bois',
      url: '#',
      icon: 'fas fa-phone-alt',
      class: 'mt-auto',
      variant: 'success',
      attributes: { target: '_blank', rel: 'noopener' }
    }
  ];