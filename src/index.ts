export function timer(action: TimerHandler, time: number): RemovableHandler {
  const timer = setTimeout(action, time)
  return { remove: () => clearTimeout(timer) }
}

export function interval(action: TimerHandler, time: number): RemovableHandler {
  const interval = setInterval(action, time)
  return { remove: () => clearInterval(interval) }
}

export function makeQueuer(time: number) {
  let timeout: RemovableHandler | null
  let pending: () => any
  const handler = () => {
    pending()
    timeout = null
  }
  return {
    push: (act: () => any, instant?: boolean) => {
      pending = act
      if (instant && timeout) timeout.remove()
      if (!timeout || instant) timeout = timer(handler, instant ? 1 : time)
    },
    cancel: () => {
      if (timeout) timeout.remove()
    },
  }
}

export interface RemovableHandler {
  remove: () => void
}
