import React from 'react'

export const SidebarLayout = ({ children, ...rest }) => {
  return (
    <div>
      <div>sidebar</div>
      <div>{children}</div>
    </div>
  )
}
