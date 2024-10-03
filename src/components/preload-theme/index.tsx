import { useLayoutEffect, useState } from "react"
import { MUSHROOM_HUNTER_THEME } from "../../constants"

export const usePreloadAssets = () => {
  const [status, setStatus] = useState<"preload-started">()

  useLayoutEffect(() => {
    const loadImgs = (uri: string) => {
      if (typeof uri === "string" && uri.endsWith(".png")) {
        const img = new Image()
        img.src = uri
      }
    }

    Object.values(MUSHROOM_HUNTER_THEME).forEach((value) => {
      if (Array.isArray(value)) {
        value.forEach((src) => {
          loadImgs(src)
        })
      } else {
        loadImgs(value)
      }
    })

    setStatus("preload-started")
  }, [])

  return status
}
