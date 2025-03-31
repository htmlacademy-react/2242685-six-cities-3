import { ClockLoader } from 'react-spinners';

export default function LoadingScreen() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}
    >
      <ClockLoader size={100} color='#4481C3' />
    </div>

  );
}
