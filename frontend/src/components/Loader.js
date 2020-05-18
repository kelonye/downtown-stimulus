import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function({ opacity = 1, fullscreen }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        ...(fullscreen
          ? {
              position: 'fixed',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }
          : {}),
        zIndex: 1000,
        opacity,
      }}
    >
      <div style={{ position: 'relative' }}>
        <CircularProgress
          style={{ position: 'relative' }}
          left={0}
          top={0}
          status="loading"
        />
      </div>
    </div>
  );
}
