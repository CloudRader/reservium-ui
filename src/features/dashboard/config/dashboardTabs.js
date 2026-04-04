/**
 * Dashboard tabs configuration
 */

export const DASHBOARD_TABS = {
  PERSONAL: 'personal',
  NOT_APPROVED: 'not_approved',
  UPDATE_REQUESTED: 'update_requested',
  CONFIRMED: 'confirmed',
  CANCELED: 'canceled',
};

export const TAB_LABELS = {
  [DASHBOARD_TABS.PERSONAL]: 'My Events',
  [DASHBOARD_TABS.NOT_APPROVED]: 'Not Approved',
  [DASHBOARD_TABS.UPDATE_REQUESTED]: 'Update Requested',
  [DASHBOARD_TABS.CONFIRMED]: 'Confirmed',
  [DASHBOARD_TABS.CANCELED]: 'Canceled',
};

export const PERSONAL_TABS = [
  {
    id: DASHBOARD_TABS.PERSONAL,
    label: TAB_LABELS[DASHBOARD_TABS.PERSONAL],
  },
];

export const MANAGER_TABS = [
  {
    id: DASHBOARD_TABS.NOT_APPROVED,
    label: TAB_LABELS[DASHBOARD_TABS.NOT_APPROVED],
  },
  {
    id: DASHBOARD_TABS.UPDATE_REQUESTED,
    label: TAB_LABELS[DASHBOARD_TABS.UPDATE_REQUESTED],
  },
  {
    id: DASHBOARD_TABS.CONFIRMED,
    label: TAB_LABELS[DASHBOARD_TABS.CONFIRMED],
  },
  {
    id: DASHBOARD_TABS.CANCELED,
    label: TAB_LABELS[DASHBOARD_TABS.CANCELED],
  },
];
