export type ComponentCardItem = {
  className: string;
  images: { light: string; dark: string };
};

export type SubRouteProps = {
  title: string;
  images: { light: string; dark: string };
  href: string;
};

export type RouteProps = {
  title: string;
  images: { light: string; dark: string };
  href: string;
  group: boolean;
  card?: ComponentCardItem;
  subRoutes?: SubRouteProps[];
};

export const components: RouteProps[] = [
  {
    title: 'Panel de control',
    href: '/dashboard',
    group: false,
    images: {
      light: 'assets/icons/panel-blanco.png',
      dark: 'assets/icons/panel-negro.png'
    },
  },
  {
    title: 'Administración Académica',
    href: '',
    group: true,
    images: {
      light: 'assets/icons/academico-blanco.png',
      dark: 'assets/icons/academico-negro.png'
    },
    subRoutes: [
      { title: 'Nivel Educativo', images: {
          light: 'assets/icons/nivel-blanco.png',
          dark: 'assets/icons/nivel-negro.png'
      }, href: '/dashboard/nivel-educativo' },
      { title: 'Grado Académico', images: {
          light: 'assets/icons/grado-blanco.png',
          dark: 'assets/icons/grado-negro.png'
        }, href: '/dashboard/grado-academico' },
    ],
  },
  {
    title: 'Administración financiera',
    href: '',
    group: true,
    images: {
      light: 'assets/icons/finanza-blanco.png',
      dark: 'assets/icons/finanza-negro.png'
    },
    subRoutes: [
      { title: 'Concepto de pago',
        images: {
          light: 'assets/icons/conceptoP-blanco.png',
          dark: 'assets/icons/conceptoP-negro.png'
        }, href: '/dashboard/concepto-de-pago' },
      { title: 'Pagos',
        images: {
          light: 'assets/icons/pagos-blanco.png',
          dark: 'assets/icons/pagos-negro.png'
        }, href: '/dashboard/pagos' },
      { title: 'Voucher Pago', images: {
          light: 'assets/icons/voucher-blanco.png',
          dark: 'assets/icons/voucher-negro.png'
      }, href: '/dashboard/voucher-pago' },
    ],
  },
  {
    title: 'Administración de Personal',
    href: '',
    group: true,
    images: {
      light: 'assets/icons/personal-blanco.png',
      dark: 'assets/icons/personal-negro.png'
    },
    subRoutes: [
      { title: 'Estudiantes', images: {
          light: 'assets/icons/estudiantes-blanco.png',
          dark: 'assets/icons/estudiantes-negro.png'
      }, href: '/dashboard/estudiantes' },
      { title: 'Padres', images: {
          light: 'assets/icons/padres-blanco.png',
          dark: 'assets/icons/padres-negro.png'
      }, href: '/dashboard/padres' },
    ],
  },
  {
    title: 'Matrículas',
    href: '/dashboard/matriculas',
    group: false,
    images: {
      light: 'assets/icons/matriculas-blanco.png',
      dark: 'assets/icons/matriculas-negro.png'
    },
  },
  {
    title: 'Pensiones',
    href: '/dashboard/pensiones',
    group: false,
    images: {
      light: 'assets/icons/pensiones-blanco.png',
      dark: 'assets/icons/pensiones-negro.png'
    },
  },
  {
    title: 'Reportes',
    href: '/dashboard/reportes',
    group: false,
    images: {
      light: 'assets/icons/reportes-blanco.png',
      dark: 'assets/icons/reportes-negro.png'
    },
  },
  {
    title: 'Configuraciones',
    href: '/dashboard/configuraciones',
    group: false,
    images: {
      light: 'assets/icons/confi-blanco.png',
      dark: 'assets/icons/confi-negro.png'
    },
  }
];
