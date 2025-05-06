import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DashboardLayout from '@/components/DashboardLayout/DashboardLayout';
import { ALL_ACTIONS } from '@/constants';

jest.mock('@/components/House/HouseList', () => {
  const Mock = () => <div>HouseList Component</div>;
  Mock.displayName = 'HouseList';
  return Mock;
});
jest.mock('@/components/House/HouseDetails', () => {
  const Mock = () => <div>HouseDetails Component</div>;
  Mock.displayName = 'HouseDetails';
  return Mock;
});
jest.mock('@/components/House/CreateHouseForm', () => {
  const Mock = () => <div>CreateHouseForm Component</div>;
  Mock.displayName = 'CreateHouseForm';
  return Mock;
});
jest.mock('@/components/User/UserList', () => {
  const Mock = () => <div>UserList Component</div>;
  Mock.displayName = 'UserList';
  return Mock;
});
jest.mock('@/components/User/UserDetails', () => {
  const Mock = () => <div>UserDetails Component</div>;
  Mock.displayName = 'UserDetails';
  return Mock;
});
jest.mock('@/components/User/CreateUserForm', () => {
  const Mock = () => <div>CreateUserForm Component</div>;
  Mock.displayName = 'CreateUserForm';
  return Mock;
});

describe('DashboardLayout', () => {
  it('renders the title correctly for admin', () => {
    render(<DashboardLayout isAdmin={true} />);

    expect(screen.getByText(/Admin dashboard/i)).toBeInTheDocument();
  });

  it('renders the title correctly for non-admin', () => {
    render(<DashboardLayout isAdmin={false} />);

    expect(screen.getByText(/Agent dashboard/i)).toBeInTheDocument();
  });

  it('shows all actions for admin', async () => {
    render(<DashboardLayout isAdmin={true} />);

    const select = screen.getByLabelText(/Select Action/i);
    fireEvent.mouseDown(select);

    await waitFor(() => screen.getByRole('listbox'));

    ALL_ACTIONS.forEach((action) => {
      expect(screen.getByText(action.label)).toBeInTheDocument();
    });
  });

  it('filters actions for non-admin', async () => {
    render(<DashboardLayout isAdmin={false} />);

    const select = screen.getByLabelText(/Select Action/i);
    fireEvent.mouseDown(select);

    await waitFor(() => screen.getByRole('listbox'));

    const filteredActions = ALL_ACTIONS.filter((a) => !a.isAdminOnly);
    filteredActions.forEach((action) => {
      expect(screen.getByText(action.label)).toBeInTheDocument();
    });

    const adminOnlyActions = ALL_ACTIONS.filter((a) => a.isAdminOnly);
    adminOnlyActions.forEach((action) => {
      expect(screen.queryByText(action.label)).not.toBeInTheDocument();
    });
  });

  it('renders component based on selected action', async () => {
    render(<DashboardLayout isAdmin={true} />);

    const select = screen.getByLabelText(/Select Action/i);
    fireEvent.mouseDown(select);

    await waitFor(() => screen.getByRole('listbox'));

    const listItem = screen.getByText('List all properties');
    fireEvent.click(listItem);

    expect(screen.getByText(/HouseList Component/i)).toBeInTheDocument();
  });
});
