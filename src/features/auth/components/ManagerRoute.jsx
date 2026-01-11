import ProtectedRoute from './ProtectedRoute';

const ManagerRoute = ({ children }) => (
  <ProtectedRoute requireManager={true}>{children}</ProtectedRoute>
);

export default ManagerRoute;
