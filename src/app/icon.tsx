import { ImageResponse } from 'next/og'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 22,
          background: '#3B1B28',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#F9F6F2',
          fontFamily: 'serif',
          fontWeight: 700,
          borderRadius: 2,
        }}
      >
        N
      </div>
    ),
    {
      ...size,
    }
  )
}
