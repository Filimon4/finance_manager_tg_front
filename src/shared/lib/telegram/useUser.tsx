
import React, { useMemo } from 'react'

const useUser = () => {
  const tg_user = useMemo(() => {
    return window.Telegram.WebApp.initDataUnsafe?.user
  }, [])

  return (
    <div>useUser</div>
  )
}

export default useUser
