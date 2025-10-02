import { useLocation } from 'react-router-dom';
import AuthModal from './AuthModal';

const AuthPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get('mode') || 'login'; // default to login

  return (
    <AuthModal
      isOpen={true}
      onClose={() => {}}
      mode={mode}
      onAuth={(userData) => {
        // handle auth
      }}
    />
  );
};

export default AuthPage;
