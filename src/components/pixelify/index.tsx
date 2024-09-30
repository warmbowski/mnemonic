import { useEffect, useRef } from "react"

interface PixelifyProps {
  src: string
  className?: string
  pixelSize?: number
  width?: number
  height?: number
  centered?: boolean
  fillTransparencyColor?: string
}

export const Pixelify = ({
  src,
  className,
  width,
  height,
  pixelSize = 1,
  centered = false,
  fillTransparencyColor = "transparent",
}: PixelifyProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const pixelateImage = (
      idata: ImageData,
      blockSize: number,
      w: number,
      h: number
    ) => {
      const data = idata.data

      const wmax = ((w / blockSize) | 0) * blockSize
      const wrest = w - wmax

      const hmax = ((h / blockSize) | 0) * blockSize
      const hrest = h - hmax

      let hh = blockSize

      for (let y = 0; y < h; y += blockSize) {
        let ww = blockSize
        if (y == hmax) hh = hrest

        for (let x = 0; x < w; x += blockSize) {
          const n = 4 * (w * y + x)
          const r = data[n]
          const g = data[n + 1]
          const b = data[n + 2]
          const a = data[n + 3]

          if (x == wmax) ww = wrest

          for (let j = 0; j < hh; j++) {
            let m = n + 4 * (w * j)

            for (let i = 0; i < ww; i++) {
              data[m++] = r
              data[m++] = g
              data[m++] = b
              data[m++] = a
            }
          }
        }
      }
      return idata
    }

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = src
    // once image is loaded..
    img.onload = () => {
      const canvas = canvasRef.current
      if (canvas) {
        const ctx = canvas.getContext("2d")
        img.width = width ? width : img.width
        img.height = height ? height : img.height
        canvas.width = img.width
        canvas.height = img.height
        if (ctx) {
          ctx.drawImage(img, 0, 0, img.width, img.height)
          const origImageData = ctx.getImageData(0, 0, img.width, img.height)
          const newImageData = pixelateImage(
            origImageData,
            pixelSize,
            img.width,
            img.height
          )
          ctx.putImageData(newImageData, 0, 0)
        }
      }
    }
  }, [centered, fillTransparencyColor, height, pixelSize, src, width])

  return <canvas className={className} ref={canvasRef} />
}
