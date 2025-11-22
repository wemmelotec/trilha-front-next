import React from 'react'

type WithPermissionOptions = {
  check?: () => boolean
  fallback?: React.ReactNode
}

// Higher-order component that renders Wrapped if check() returns true
export default function withPermission<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options?: WithPermissionOptions
) {
  const { check = () => true, fallback = null } = options || {}

  return function WithPermissionWrapper(props: P) {
    const allowed = check()
    if (!allowed) return <>{fallback}</>
    return <WrappedComponent {...props} />
  }
}
